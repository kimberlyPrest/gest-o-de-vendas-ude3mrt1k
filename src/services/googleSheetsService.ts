import { supabase } from '@/lib/supabase/client'
import { CRMLead } from '@/stores/crmStore'
import { toast } from 'sonner'

export interface Lead {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
  assentosAdicionais: number
  origem: string
  status: string
  dataCaptacao: string | null
}

export interface LiveData {
  id?: string
  date: string
  weekday: string
  peakViewers: number
  retainedViewers: number
  sales: number
  presenter: string
  conversionRate: number
  retentionRate: number
  revenue: number
  additionalSeats: number
}

// Helper to clean and parse currency strings
const parseCurrency = (value: string | number): number => {
  if (typeof value === 'number') return value
  if (!value) return 0
  const cleanStr = value.toString().replace(/[^0-9,-]+/g, '')
  return Number(cleanStr.replace('.', '').replace(',', '.'))
}

// Helper to parse dates
const parseDate = (value: string): string | null => {
  if (!value) return null
  if (value.match(/^\d{4}-\d{2}-\d{2}/)) return value

  const parts = value.split('/')
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0')
    const month = parts[1].padStart(2, '0')
    const year = parts[2].split(' ')[0]
    const fullYear = year.length === 2 ? `20${year}` : year
    if (fullYear.length === 4) {
      return `${fullYear}-${month}-${day}`
    }
  }
  return null
}

// Generate a stable ID based on unique attributes for Leads
const generateId = (item: any): string => {
  const seed = (item.email || item.nomeCompleto || JSON.stringify(item))
    .trim()
    .toLowerCase()
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

// Generate a stable ID based on Date and Presenter for Lives (Full Mirror Upsert)
const generateLiveId = (item: LiveData): string => {
  // We use only Date and Presenter as the unique key.
  // This allows updating metrics (revenue, sales) without creating duplicates.
  const normalizedPresenter = (item.presenter || 'Desconhecido')
    .trim()
    .toLowerCase()
  const normalizedDate = item.date
  const seed = `${normalizedDate}-${normalizedPresenter}`

  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

const fetchSheetData = async (type: 'crm' | 'lives'): Promise<any[]> => {
  try {
    const { data, error } = await supabase.functions.invoke(
      'google-sheets-proxy',
      {
        body: { type },
      },
    )

    if (error)
      throw new Error(
        error.message || 'Falha ao conectar com o serviço de planilhas',
      )
    if (data?.error) throw new Error(data.error)

    return data.values || []
  } catch (error) {
    console.error('Error in fetchSheetData:', error)
    throw error
  }
}

const mapRowsToObjects = (rows: any[][]): any[] => {
  if (rows.length < 2) return []
  const headers = rows[0].map((h: string) => h.toLowerCase().trim())
  const dataRows = rows.slice(1)

  return dataRows.map((row) => {
    const obj: any = {}
    headers.forEach((header: string, index: number) => {
      obj[header] = row[index] !== undefined ? row[index] : ''
    })
    return obj
  })
}

const findValue = (obj: any, keys: string[]): any => {
  for (const key of keys) {
    const found = Object.keys(obj).find((k) => k.includes(key))
    if (found) return obj[found]
  }
  return undefined
}

export const googleSheetsService = {
  async checkConnection(): Promise<boolean> {
    try {
      await fetchSheetData('lives')
      return true
    } catch (error) {
      console.error('Connection check failed:', error)
      return false
    }
  },

  async addLiveToSheet(live: Partial<LiveData>): Promise<void> {
    // This is a mock implementation since we don't have write access to Sheets API via the proxy yet
    // In a real scenario, this would call an edge function to append the row
    console.log('Adding live to sheet (mock):', live)
    // We can simulate an optimistic update by inserting into DB directly
    if (!live.date || !live.presenter) throw new Error('Dados incompletos')

    const liveData = live as LiveData
    const id = generateLiveId(liveData)

    const { error } = await supabase.from('lives').upsert({
      id,
      date: liveData.date,
      weekday: liveData.weekday,
      peak_viewers: liveData.peakViewers,
      retained_viewers: liveData.retainedViewers,
      sales: liveData.sales,
      presenter: liveData.presenter,
      conversion_rate: liveData.conversionRate,
      retention_rate: liveData.retentionRate,
      revenue: liveData.revenue,
      additional_seats: liveData.additionalSeats,
      updated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    })

    if (error) throw error
  },

  async syncLeads(): Promise<{ added: number; updated: number }> {
    try {
      // 1. Fetch from Google Sheets
      const rows = await fetchSheetData('crm')
      const rawObjects = mapRowsToObjects(rows)

      const sheetLeads = rawObjects
        .filter(
          (o) => findValue(o, ['nome', 'lead']) || findValue(o, ['email']),
        )
        .map((o) => {
          const nome = findValue(o, ['nome', 'lead']) || 'Sem Nome'
          const email = findValue(o, ['email', 'e-mail']) || ''
          const dateStr = findValue(o, ['data', 'criado'])

          return {
            id: generateId({ nome, email }),
            nomeCompleto: nome,
            email: email,
            telefone:
              findValue(o, ['telefone', 'whatsapp', 'celular', 'fone']) || '',
            assentosAdicionais: Number(
              findValue(o, ['assentos', 'lugares']) || 0,
            ),
            origem: findValue(o, ['origem', 'fonte']) || 'Planilha',
            status: findValue(o, ['status', 'fase', 'etapa']) || 'Capturado',
            dataCaptacao: parseDate(dateStr), // Keep null if invalid
          }
        })

      // 2. Fetch existing IDs from Supabase to optimize updates
      const { data: existingLeads, error: fetchError } = await supabase
        .from('leads')
        .select('id')

      if (fetchError) throw fetchError

      const existingIds = new Set(existingLeads?.map((l) => l.id))
      const newLeads = []
      const leadsToUpdate = []

      for (const lead of sheetLeads) {
        if (existingIds.has(lead.id)) {
          // Prepare update payload (snake_case for DB)
          // Exclude status and tracking dates to preserve CRM state
          leadsToUpdate.push({
            id: lead.id,
            nome_completo: lead.nomeCompleto,
            email: lead.email,
            telefone: lead.telefone,
            assentos_adicionais: lead.assentosAdicionais,
            origem: lead.origem,
            updated_at: new Date().toISOString(),
          })
        } else {
          // Prepare insert payload (snake_case for DB)
          newLeads.push({
            id: lead.id,
            nome_completo: lead.nomeCompleto,
            email: lead.email,
            telefone: lead.telefone,
            assentos_adicionais: lead.assentosAdicionais,
            origem: lead.origem,
            status: lead.status,
            data_captacao: lead.dataCaptacao || new Date().toISOString(),
            last_interaction: lead.dataCaptacao || new Date().toISOString(),
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
          })
        }
      }

      // 3. Perform Bulk Insert for New Leads
      if (newLeads.length > 0) {
        const { error: insertError } = await supabase
          .from('leads')
          .insert(newLeads)
        if (insertError) {
          console.error('Error inserting new leads:', insertError)
          throw insertError
        }
      }

      // 4. Perform Updates
      if (leadsToUpdate.length > 0) {
        const { error: updateError } = await supabase
          .from('leads')
          .upsert(leadsToUpdate, { onConflict: 'id' })
        if (updateError) {
          console.error('Error updating existing leads:', updateError)
          throw updateError
        }
      }

      return { added: newLeads.length, updated: leadsToUpdate.length }
    } catch (error) {
      console.error('Error syncing leads:', error)
      throw error
    }
  },

  async syncLives(): Promise<{
    added: number
    updated: number
    removed: number
  }> {
    try {
      // 1. Fetch from Google Sheets
      const rows = await fetchSheetData('lives')
      const rawObjects = mapRowsToObjects(rows)

      // 2. Parse and Prepare Data
      const sheetLives = rawObjects
        .map((o): LiveData | null => {
          const dateValue = findValue(o, ['data'])
          const date = parseDate(dateValue)
          if (!date) return null

          const peak = Number(findValue(o, ['pico', 'espectadores']) || 0)
          const sales = Number(findValue(o, ['vendas']) || 0)
          const retained = Number(
            findValue(o, ['retidos', 'retenção', 'retencao']) || 0,
          )

          let conversion = findValue(o, ['conversão', 'conversion'])
          if (typeof conversion === 'string')
            conversion = Number(conversion.replace('%', '').replace(',', '.'))
          if (!conversion && peak > 0) conversion = (sales / peak) * 100

          let retention = findValue(o, ['retenção', 'retencao', 'retention'])
          if (typeof retention === 'string')
            retention = Number(retention.replace('%', '').replace(',', '.'))
          if (!retention && peak > 0) retention = (retained / peak) * 100

          const liveObj = {
            date,
            weekday: findValue(o, ['dia', 'semana']) || '',
            peakViewers: peak,
            retainedViewers: retained,
            sales,
            presenter:
              findValue(o, ['apresentador', 'expert']) || 'Desconhecido',
            conversionRate: Number(conversion?.toFixed(2) || 0),
            retentionRate: Number(retention?.toFixed(2) || 0),
            revenue: parseCurrency(
              findValue(o, ['faturamento', 'receita']) || 0,
            ),
            additionalSeats: Number(findValue(o, ['assentos']) || 0),
          }
          // ID Generation based strictly on Date + Presenter
          return { ...liveObj, id: generateLiveId(liveObj) }
        })
        .filter((item): item is LiveData => item !== null)
        .filter((l) => l.revenue > 0 || l.sales > 0 || l.peakViewers > 0)

      const dbLives = sheetLives.map((l) => ({
        id: l.id!,
        date: l.date,
        weekday: l.weekday,
        peak_viewers: l.peakViewers,
        retained_viewers: l.retainedViewers,
        sales: l.sales,
        presenter: l.presenter,
        conversion_rate: l.conversionRate,
        retention_rate: l.retentionRate,
        revenue: l.revenue,
        additional_seats: l.additionalSeats,
        updated_at: new Date().toISOString(),
      }))

      // 3. Upsert All (Update or Insert) - "Full Mirror" Update Part
      if (dbLives.length > 0) {
        const { error } = await supabase
          .from('lives')
          .upsert(dbLives, { onConflict: 'id' })
        if (error) throw error
      }

      // 4. Delete Missing (Cleanup) - "Full Mirror" Delete Part
      // Get all live IDs currently in the DB
      const { data: allDbLives, error: fetchError } = await supabase
        .from('lives')
        .select('id')

      if (fetchError) throw fetchError

      const sheetIds = new Set(dbLives.map((l) => l.id))
      const idsToDelete = allDbLives
        .filter((row) => !sheetIds.has(row.id))
        .map((row) => row.id)

      let removed = 0
      if (idsToDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('lives')
          .delete()
          .in('id', idsToDelete)

        if (deleteError) throw deleteError
        removed = idsToDelete.length
      }

      return { added: dbLives.length, updated: 0, removed } // We don't distinguish added/updated in upsert easily without checking before
    } catch (error) {
      console.error('Error syncing lives:', error)
      toast.error('Erro na sincronização de Lives', {
        description: 'Verifique a conexão com a planilha.',
      })
      throw error
    }
  },

  async fetchLeadsFromDB(): Promise<Partial<CRMLead>[]> {
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('data_captacao', { ascending: false })

    if (error) {
      console.error('Failed to fetch leads from DB:', error)
      throw error
    }

    return (data || []).map((l) => ({
      id: l.id,
      nomeCompleto: l.nome_completo || 'Sem Nome',
      email: l.email || '',
      telefone: l.telefone || '',
      assentosAdicionais: l.assentos_adicionais || 0,
      origem: l.origem || 'Desconhecido',
      status: l.status || 'Capturado',
      dataCaptacao: l.data_captacao || new Date().toISOString(),
      lastInteraction:
        l.last_interaction || l.data_captacao || new Date().toISOString(),
      valorEstimado: l.valor_estimado ?? undefined,
      notes: Array.isArray(l.notes) ? l.notes : [],
      history: Array.isArray(l.history) ? l.history : [],
      followUp: l.follow_up || undefined,
    }))
  },

  async fetchLivesFromDB(): Promise<LiveData[]> {
    const { data, error } = await supabase
      .from('lives')
      .select('*')
      .order('date', { ascending: true })

    if (error) throw error

    return data.map((l) => ({
      id: l.id,
      date: l.date,
      weekday: l.weekday || '',
      peakViewers: l.peak_viewers || 0,
      retainedViewers: l.retained_viewers || 0,
      sales: l.sales || 0,
      presenter: l.presenter || '',
      conversionRate: Number(l.conversion_rate) || 0,
      retentionRate: Number(l.retention_rate) || 0,
      revenue: Number(l.revenue) || 0,
      additionalSeats: l.additional_seats || 0,
    }))
  },
}
