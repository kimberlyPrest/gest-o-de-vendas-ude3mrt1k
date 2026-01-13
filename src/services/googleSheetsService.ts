import { toast } from '@/hooks/use-toast'

export interface Lead {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
  assentosAdicionais: number
  origem: string
  status: string
  dataCaptacao: string
}

export interface LiveData {
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

const API_KEY = 'AIzaSyCwdVm83ZNLdP9I8vDKK8KHuz4Dg8vHwUg'
const CRM_SHEET_ID = '1j_Rwr5t3RPcs2HjEkrRBzJEnfhmJM8jZoq8IZNEpMk0'
const LIVES_SHEET_ID = '1ZkYOpKQIefyc5jrb3_fVKQ1jCSXLh_7HOzlN7Xw3_oc'
const CRM_TAB = 'Adapta Elite'
const LIVES_TAB = '🟢 Onboarding'

// Helper to clean and parse currency strings (e.g. "R$ 1.500,00" -> 1500.00)
const parseCurrency = (value: string | number): number => {
  if (typeof value === 'number') return value
  if (!value) return 0
  const cleanStr = value.toString().replace(/[^0-9,-]+/g, '') // Remove R$, spaces
  return Number(cleanStr.replace('.', '').replace(',', '.'))
}

// Helper to parse dates (e.g. "25/12/2023" -> "2023-12-25")
const parseDate = (value: string): string => {
  if (!value) return new Date().toISOString()
  if (value.match(/^\d{4}-\d{2}-\d{2}/)) return value // Already ISO

  // Handle DD/MM/YYYY
  const parts = value.split('/')
  if (parts.length === 3) {
    const day = parts[0].padStart(2, '0')
    const month = parts[1].padStart(2, '0')
    const year = parts[2].split(' ')[0] // Remove time if present
    if (year.length === 4) {
      return `${year}-${month}-${day}`
    }
  }
  return new Date().toISOString()
}

// Generate a stable ID based on email or content
const generateId = (item: any): string => {
  const seed = item.email || item.nomeCompleto || JSON.stringify(item)
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return Math.abs(hash).toString(16)
}

const fetchSheetData = async (
  spreadsheetId: string,
  range: string,
): Promise<any[]> => {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(range)}?key=${API_KEY}`
  const response = await fetch(url)
  if (!response.ok) {
    const errorBody = await response.json()
    throw new Error(
      errorBody.error?.message || `Failed to fetch sheet: ${response.status}`,
    )
  }
  const data = await response.json()
  return data.values || []
}

// Map row array to object using headers
const mapRowsToObjects = (rows: any[][]): any[] => {
  if (rows.length < 2) return []
  const headers = rows[0].map((h: string) => h.toLowerCase().trim())
  const dataRows = rows.slice(1)

  return dataRows.map((row) => {
    const obj: any = {}
    headers.forEach((header: string, index: number) => {
      obj[header] = row[index]
    })
    return obj
  })
}

// Flexible column finder
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
      // Try to fetch just 1 cell from Lives sheet to verify connection
      await fetchSheetData(LIVES_SHEET_ID, `${LIVES_TAB}!A1`)
      return true
    } catch (error) {
      console.error('Connection check failed:', error)
      return false
    }
  },

  async fetchLeads(): Promise<Lead[]> {
    try {
      const rows = await fetchSheetData(CRM_SHEET_ID, `${CRM_TAB}!A:Z`)
      const rawObjects = mapRowsToObjects(rows)

      return rawObjects
        .filter(
          (o) => findValue(o, ['nome', 'lead']) || findValue(o, ['email']),
        )
        .map((o) => {
          const nome = findValue(o, ['nome', 'lead']) || 'Sem Nome'
          const email = findValue(o, ['email', 'e-mail']) || ''
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
            dataCaptacao: parseDate(
              findValue(o, ['data', 'criado']) || new Date().toISOString(),
            ),
          }
        })
    } catch (error) {
      console.error('Error fetching leads:', error)
      throw error
    }
  },

  async fetchLivesData(): Promise<LiveData[]> {
    try {
      const rows = await fetchSheetData(LIVES_SHEET_ID, `${LIVES_TAB}!A:Z`)
      const rawObjects = mapRowsToObjects(rows)

      return rawObjects
        .filter((o) => findValue(o, ['data']))
        .map((o) => {
          const peak = Number(findValue(o, ['pico', 'espectadores']) || 0)
          const sales = Number(findValue(o, ['vendas']) || 0)
          const retained = Number(findValue(o, ['retidos', 'retenção']) || 0)
          const revenue = parseCurrency(
            findValue(o, ['faturamento', 'receita']) || 0,
          )

          // Calculate rates if not explicitly provided or if provided as strings
          let conversion = findValue(o, ['conversão', 'conversion'])
          if (typeof conversion === 'string') {
            conversion = Number(conversion.replace('%', '').replace(',', '.'))
          }
          if (!conversion && peak > 0) conversion = (sales / peak) * 100

          let retention = findValue(o, ['retenção', 'retention'])
          if (typeof retention === 'string') {
            retention = Number(retention.replace('%', '').replace(',', '.'))
          }
          if (!retention && peak > 0) retention = (retained / peak) * 100

          return {
            date: parseDate(findValue(o, ['data'])),
            weekday: findValue(o, ['dia', 'semana']) || '',
            peakViewers: peak,
            retainedViewers: retained,
            sales: sales,
            presenter:
              findValue(o, ['apresentador', 'expert', 'responsável']) ||
              'Desconhecido',
            conversionRate: Number(conversion?.toFixed(2) || 0),
            retentionRate: Number(retention?.toFixed(2) || 0),
            revenue: revenue,
            additionalSeats: Number(findValue(o, ['assentos']) || 0),
          }
        })
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    } catch (error) {
      console.error('Error fetching lives data:', error)
      throw error
    }
  },

  async addLiveToSheet(data: Partial<LiveData>): Promise<void> {
    // This is a mock implementation because writing requires OAuth2
    // and we only have an API Key.
    console.warn(
      'Writing to Google Sheets is not supported with API Key only. Mocking success.',
    )
    await new Promise((resolve) => setTimeout(resolve, 800))
    console.log('Would add data to sheet:', data)
    toast({
      title: 'Simulação',
      description:
        'Dados processados localmente. Escrita requer OAuth (não configurado).',
      className: 'bg-[#3B82F6] text-white border-none',
    })
  },
}
