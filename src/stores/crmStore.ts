import { create } from 'zustand'
import { googleSheetsService } from '@/services/googleSheetsService'
import { v4 as uuidv4 } from 'uuid'
import { useNotificationStore } from './notificationStore'
import { supabase } from '@/lib/supabase/client'
import { toast } from 'sonner'

export interface Note {
  id: string
  content: string
  createdAt: string
  author: string
}

export interface HistoryItem {
  id: string
  type: 'status_change' | 'interaction' | 'note_added' | 'follow_up_set'
  description: string
  date: string
  author: string
  metadata?: any
}

export interface CRMLead {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
  assentosAdicionais: number
  origem: string
  status: string
  dataCaptacao: string
  lastInteraction: string
  notes: Note[]
  history: HistoryItem[]
  followUp?: string
  valorEstimado?: number
}

export type CRMColumnId =
  | 'Capturado'
  | 'Em Contato'
  | 'Agendado'
  | 'Aguardando Cliente'
  | 'Comprou'
  | 'Não Comprou'
  | 'NO-SHOW'

export const COLUMNS: { id: CRMColumnId; label: string; color: string }[] = [
  { id: 'Capturado', label: 'Capturado', color: '#6B7280' },
  { id: 'Em Contato', label: 'Em Contato', color: '#3B82F6' },
  { id: 'Agendado', label: 'Agendado', color: '#8B5CF6' },
  { id: 'Aguardando Cliente', label: 'Aguardando', color: '#F59E0B' },
  { id: 'Comprou', label: 'Comprou', color: '#10B981' },
  { id: 'Não Comprou', label: 'Não Comprou', color: '#EF4444' },
  { id: 'NO-SHOW', label: 'NO-SHOW', color: '#4B5563' },
]

interface FilterState {
  search: string
  origin: string
  dateRange: { from?: Date; to?: Date } | undefined
  valueRange: { min: string; max: string }
}

interface CRMStore {
  leads: CRMLead[]
  filteredLeads: CRMLead[]
  filters: FilterState
  loading: boolean
  error: boolean

  fetchLeads: (forceSync?: boolean) => Promise<void>
  setFilter: (key: keyof FilterState, value: any) => void
  clearFilters: () => void
  moveLead: (leadId: string, newStatus: CRMColumnId) => void
  addNote: (leadId: string, noteContent: string) => void
  addInteraction: (leadId: string, type: string, details: string) => void
  scheduleFollowUp: (leadId: string, date: string) => void
  updateLead: (leadId: string, updates: Partial<CRMLead>) => void
}

export const calculateLeadValue = (lead: {
  origem: string
  assentosAdicionais: number
}) => {
  const seats = Number(lead.assentosAdicionais) || 0
  if (lead.origem === 'Planilha') {
    return 2999 + seats * 699
  }
  return seats * 500
}

const createHistoryItem = (
  type: HistoryItem['type'],
  description: string,
): HistoryItem => ({
  id: uuidv4(),
  type,
  description,
  date: new Date().toISOString(),
  author: 'Você',
})

// Helper to update Supabase with visual feedback
const updateLeadInDB = async (id: string, updates: any) => {
  try {
    const { error } = await supabase.from('leads').update(updates).eq('id', id)
    if (error) {
      console.error('Failed to update lead in DB:', error)
      toast.error('Erro ao salvar', {
        description: 'Não foi possível salvar as alterações no banco de dados.',
      })
    }
  } catch (err) {
    console.error('Exception updating lead in DB:', err)
    toast.error('Erro de conexão', {
      description: 'Verifique sua conexão com a internet.',
    })
  }
}

export const useCRMStore = create<CRMStore>((set, get) => ({
  leads: [],
  filteredLeads: [],
  loading: false,
  error: false,
  filters: {
    search: '',
    origin: 'all',
    dateRange: undefined,
    valueRange: { min: '', max: '' },
  },

  fetchLeads: async (forceSync = false) => {
    // Prevent fetching if already loading to avoid race conditions
    if (get().loading) return

    set({ loading: true, error: false })
    try {
      if (forceSync) {
        toast.info('Iniciando sincronização...', {
          description: 'Buscando dados da planilha e atualizando base.',
        })

        const { added, updated } = await googleSheetsService.syncLeads()

        if (added > 0 || updated > 0) {
          useNotificationStore.getState().addNotification({
            type: 'new_lead',
            title: 'Sincronização Concluída',
            message: `${added} novos leads, ${updated} atualizados.`,
            actionUrl: '/crm',
          })
          toast.success('Sincronização finalizada', {
            description: `${added} novos leads importados.`,
          })
        } else {
          toast.info('Tudo atualizado', {
            description: 'Nenhum novo dado encontrado.',
          })
        }
      }

      // Fetch from DB - This is the source of truth
      const leads = await googleSheetsService.fetchLeadsFromDB()

      // Ensure local required fields conform to CRMLead
      const processedLeads: CRMLead[] = leads.map((l) => ({
        ...l,
        id: l.id!,
        nomeCompleto: l.nomeCompleto || 'Sem Nome',
        email: l.email || '',
        telefone: l.telefone || '',
        assentosAdicionais: l.assentosAdicionais || 0,
        origem: l.origem || 'Desconhecido',
        status: l.status || 'Capturado',
        dataCaptacao: l.dataCaptacao || new Date().toISOString(),
        lastInteraction:
          l.lastInteraction || l.dataCaptacao || new Date().toISOString(),
        notes: l.notes || [],
        history: l.history || [],
        valorEstimado: l.valorEstimado ?? calculateLeadValue(l as CRMLead),
      }))

      set({ leads: processedLeads })
      // Re-apply filters
      get().setFilter('search', get().filters.search)
    } catch (error) {
      console.error('CRM Fetch Error:', error)
      set({ error: true })
      toast.error('Erro ao carregar leads', {
        description: 'Verifique sua conexão e tente novamente.',
      })
    } finally {
      set({ loading: false })
    }
  },

  setFilter: (key, value) => {
    set((state) => {
      const newFilters = { ...state.filters, [key]: value }
      const filtered = applyFilters(state.leads, newFilters)
      return { filters: newFilters, filteredLeads: filtered }
    })
  },

  clearFilters: () => {
    set((state) => {
      const defaultFilters = {
        search: '',
        origin: 'all',
        dateRange: undefined,
        valueRange: { min: '', max: '' },
      }
      return { filters: defaultFilters, filteredLeads: state.leads }
    })
  },

  moveLead: (leadId, newStatus) => {
    const { addNotification } = useNotificationStore.getState()

    set((state) => {
      const boughtLeads = state.leads.filter(
        (l) => l.status === 'Comprou',
      ).length
      const totalLeads = state.leads.length
      const currentRate = (boughtLeads / totalLeads) * 100

      if (newStatus === 'Comprou') {
        const newRate = ((boughtLeads + 1) / totalLeads) * 100
        if (currentRate < 5 && newRate >= 5) {
          addNotification({
            type: 'goal',
            title: 'Meta de Conversão Atingida!',
            message: 'A taxa de conversão do CRM ultrapassou 5%.',
            actionUrl: '/crm',
          })
        }
      }

      const updatedLeads = state.leads.map((lead) => {
        if (lead.id === leadId) {
          if (lead.status === newStatus) return lead
          const historyItem = createHistoryItem(
            'status_change',
            `Status alterado de ${lead.status} para ${newStatus}`,
          )
          const updatedLead = {
            ...lead,
            status: newStatus,
            lastInteraction: new Date().toISOString(),
            history: [historyItem, ...lead.history],
          }

          // Persist to DB
          updateLeadInDB(leadId, {
            status: newStatus,
            last_interaction: updatedLead.lastInteraction,
            history: updatedLead.history,
          })

          return updatedLead
        }
        return lead
      })
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },

  addNote: (leadId, noteContent) => {
    set((state) => {
      const updatedLeads = state.leads.map((lead) => {
        if (lead.id === leadId) {
          const newNote: Note = {
            id: uuidv4(),
            content: noteContent,
            createdAt: new Date().toISOString(),
            author: 'Você',
          }
          const historyItem = createHistoryItem(
            'note_added',
            'Nota adicionada ao lead',
          )
          const updatedLead = {
            ...lead,
            notes: [newNote, ...lead.notes],
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }

          updateLeadInDB(leadId, {
            notes: updatedLead.notes,
            history: updatedLead.history,
            last_interaction: updatedLead.lastInteraction,
          })

          return updatedLead
        }
        return lead
      })
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },

  addInteraction: (leadId, type, details) => {
    set((state) => {
      const updatedLeads = state.leads.map((lead) => {
        if (lead.id === leadId) {
          const historyItem = createHistoryItem(
            'interaction',
            `Interação registrada: ${type} - ${details}`,
          )
          const updatedLead = {
            ...lead,
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }

          updateLeadInDB(leadId, {
            history: updatedLead.history,
            last_interaction: updatedLead.lastInteraction,
          })

          return updatedLead
        }
        return lead
      })
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },

  scheduleFollowUp: (leadId, date) => {
    const { addNotification } = useNotificationStore.getState()
    const timeDiff = new Date(date).getTime() - Date.now()
    if (timeDiff > 0 && timeDiff < 7200000) {
      addNotification({
        type: 'follow_up',
        title: 'Follow-up Próximo',
        message: 'Você tem um follow-up agendado em breve.',
        actionUrl: '/crm',
      })
    }

    set((state) => {
      const updatedLeads = state.leads.map((lead) => {
        if (lead.id === leadId) {
          const historyItem = createHistoryItem(
            'follow_up_set',
            `Follow-up agendado para ${new Date(date).toLocaleString('pt-BR')}`,
          )
          const updatedLead = {
            ...lead,
            followUp: date,
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }

          updateLeadInDB(leadId, {
            follow_up: date,
            history: updatedLead.history,
            last_interaction: updatedLead.lastInteraction,
          })

          return updatedLead
        }
        return lead
      })
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },

  updateLead: (leadId, updates) => {
    set((state) => {
      const updatedLeads = state.leads.map((lead) => {
        if (lead.id === leadId) {
          const historyItem = createHistoryItem(
            'interaction',
            'Dados do lead atualizados manualmente',
          )
          const updatedLead = {
            ...lead,
            ...updates,
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }

          // Map updates to DB snake_case columns
          const dbUpdates: any = {
            history: updatedLead.history,
            last_interaction: updatedLead.lastInteraction,
          }
          if (updates.nomeCompleto)
            dbUpdates.nome_completo = updates.nomeCompleto
          if (updates.email) dbUpdates.email = updates.email
          if (updates.telefone) dbUpdates.telefone = updates.telefone
          if (updates.assentosAdicionais !== undefined)
            dbUpdates.assentos_adicionais = updates.assentosAdicionais
          if (updates.origem) dbUpdates.origem = updates.origem
          if (updates.valorEstimado !== undefined)
            dbUpdates.valor_estimado = updates.valorEstimado

          updateLeadInDB(leadId, dbUpdates)

          return updatedLead
        }
        return lead
      })
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },
}))

function applyFilters(leads: CRMLead[], filters: FilterState): CRMLead[] {
  return leads.filter((lead) => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matches =
        lead.nomeCompleto.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.telefone.includes(searchLower)
      if (!matches) return false
    }
    if (filters.origin !== 'all' && lead.origem !== filters.origin) return false
    if (filters.dateRange?.from) {
      const leadDate = new Date(lead.dataCaptacao).getTime()
      const fromDate = filters.dateRange.from.getTime()
      if (leadDate < fromDate) return false
      if (filters.dateRange.to) {
        const toDate = filters.dateRange.to.getTime() + 86400000
        if (leadDate > toDate) return false
      }
    }
    const potentialValue = lead.valorEstimado ?? calculateLeadValue(lead)
    if (
      filters.valueRange.min &&
      potentialValue < Number(filters.valueRange.min)
    )
      return false
    if (
      filters.valueRange.max &&
      potentialValue > Number(filters.valueRange.max)
    )
      return false
    return true
  })
}
