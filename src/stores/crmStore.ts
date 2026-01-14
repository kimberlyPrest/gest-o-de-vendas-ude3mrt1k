import { create } from 'zustand'
import { googleSheetsService, Lead } from '@/services/googleSheetsService'
import { v4 as uuidv4 } from 'uuid'
import { useSyncStore } from './syncStore'
import { useNotificationStore } from './notificationStore'

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

export interface CRMLead extends Lead {
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

  fetchLeads: (force?: boolean) => Promise<void>
  setFilter: (key: keyof FilterState, value: any) => void
  clearFilters: () => void
  moveLead: (leadId: string, newStatus: CRMColumnId) => void
  addNote: (leadId: string, noteContent: string) => void
  addInteraction: (leadId: string, type: string, details: string) => void
  scheduleFollowUp: (leadId: string, date: string) => void
  updateLead: (leadId: string, updates: Partial<CRMLead>) => void
}

const STORAGE_KEY = 'crm_leads_data_v2'

const saveToStorage = (leads: CRMLead[]) => {
  const persistenceData = leads.reduce(
    (acc, lead) => {
      acc[lead.id] = {
        status: lead.status,
        lastInteraction: lead.lastInteraction,
        notes: lead.notes,
        history: lead.history,
        followUp: lead.followUp,
        valorEstimado: lead.valorEstimado,
      }
      return acc
    },
    {} as Record<string, Partial<CRMLead>>,
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(persistenceData))
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

  fetchLeads: async (force = false) => {
    // Avoid double fetch if already has data and not forced
    if (!force && get().leads.length > 0) return

    set({ loading: true, error: false })
    try {
      let apiLeads: Lead[] = []
      try {
        apiLeads = await googleSheetsService.fetchLeads()
      } catch (err) {
        console.warn('Failed to fetch from API, checking cache...', err)
        const offlineData = localStorage.getItem(STORAGE_KEY)
        if (!offlineData) throw err
        apiLeads = generateMockLeads(5) // Fallback
      }

      const localDataStr = localStorage.getItem(STORAGE_KEY)
      const localData = localDataStr ? JSON.parse(localDataStr) : {}

      // Calculate if new leads arrived
      const currentIds = get().leads.map((l) => l.id)
      const newApiIds = apiLeads.map((l) => l.id)
      const hasNewLeads = newApiIds.some((id) => !currentIds.includes(id))

      if (hasNewLeads && currentIds.length > 0) {
        useNotificationStore.getState().addNotification({
          type: 'new_lead',
          title: 'Novos Leads Capturados',
          message: 'Novos leads foram sincronizados da planilha.',
          actionUrl: '/crm',
        })
      }

      const mergedLeads: CRMLead[] = apiLeads.map((lead) => {
        const local = localData[lead.id] || {}
        return {
          ...lead,
          status: local.status || lead.status || 'Capturado',
          lastInteraction: local.lastInteraction || lead.dataCaptacao,
          notes: local.notes || [],
          history: local.history || [
            {
              id: 'initial',
              type: 'status_change',
              description: 'Lead capturado',
              date: lead.dataCaptacao,
              author: 'Sistema',
            },
          ],
          followUp: local.followUp,
          valorEstimado: local.valorEstimado !== undefined
            ? local.valorEstimado
            : (lead.origem === 'Planilha'
              ? 2999 + ((lead.assentosAdicionais || 0) * 699)
              : (lead.assentosAdicionais || 0) * 500)
        }
      })

      if (mergedLeads.length < 5) {
        const mockMore = generateMockLeads(15)
        mockMore.forEach((m) => {
          if (!mergedLeads.find((l) => l.id === m.id)) {
            mergedLeads.push(m)
          }
        })
      }

      set({ leads: mergedLeads })
      get().setFilter('search', get().filters.search)
    } catch (error) {
      console.error(error)
      set({ error: true })
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
    const { addToQueue, syncError } = useSyncStore.getState()
    const { addNotification } = useNotificationStore.getState()

    // If offline, queue it
    if (!navigator.onLine || syncError) {
      addToQueue({ type: 'move_lead', leadId, newStatus })
    }

    set((state) => {
      // Check for conversion goal
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
          return {
            ...lead,
            status: newStatus,
            lastInteraction: new Date().toISOString(),
            history: [historyItem, ...lead.history],
          }
        }
        return lead
      })
      saveToStorage(updatedLeads)
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
          return {
            ...lead,
            notes: [newNote, ...lead.notes],
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }
        }
        return lead
      })
      saveToStorage(updatedLeads)
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
          return {
            ...lead,
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }
        }
        return lead
      })
      saveToStorage(updatedLeads)
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },

  scheduleFollowUp: (leadId, date) => {
    const { addNotification } = useNotificationStore.getState()

    // Schedule local notification (mock)
    const timeDiff = new Date(date).getTime() - Date.now()
    if (timeDiff > 0 && timeDiff < 7200000) {
      // If within 2 hours
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
          return {
            ...lead,
            followUp: date,
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }
        }
        return lead
      })
      saveToStorage(updatedLeads)
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
            'Dados do lead atualizados manualmente'
          )
          return {
            ...lead,
            ...updates,
            history: [historyItem, ...lead.history],
            lastInteraction: new Date().toISOString(),
          }
        }
        return lead
      })
      saveToStorage(updatedLeads)
      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  }
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
    const potentialValue = lead.assentosAdicionais * 500
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

function generateMockLeads(count: number): CRMLead[] {
  const statuses = COLUMNS.map((c) => c.id)
  const origins = ['Planilha', 'Manual', 'Site', 'Indicação']
  const names = [
    'Ana',
    'Bruno',
    'Carla',
    'Daniel',
    'Elena',
    'Fabio',
    'Gabriel',
    'Helena',
  ]
  const surnames = [
    'Silva',
    'Santos',
    'Oliveira',
    'Souza',
    'Lima',
    'Pereira',
    'Ferreira',
  ]

  return Array.from({ length: count }).map((_, i) => {
    const name = names[Math.floor(Math.random() * names.length)]
    const surname = surnames[Math.floor(Math.random() * surnames.length)]
    const captureDate = new Date(
      Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000),
    ).toISOString()

    return {
      id: `mock-${i}-${Date.now()}`,
      nomeCompleto: `${name} ${surname}`,
      email: `${name.toLowerCase()}.${surname.toLowerCase()}@example.com`,
      telefone: `(11) 9${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`,
      assentosAdicionais: Math.floor(Math.random() * 10) + 1,
      origem: origins[Math.floor(Math.random() * origins.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      dataCaptacao: captureDate,
      lastInteraction: captureDate,
      notes: [],
      history: [
        {
          id: uuidv4(),
          type: 'status_change',
          description: 'Lead capturado automaticamente',
          date: captureDate,
          author: 'Sistema',
        },
      ],
    }
  })
}
