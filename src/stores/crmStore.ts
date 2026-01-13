import { create } from 'zustand'
import { googleSheetsService, Lead } from '@/services/googleSheetsService'
import { differenceInDays } from 'date-fns'

export interface CRMLead extends Lead {
  lastInteraction: string
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

  fetchLeads: () => Promise<void>
  setFilter: (key: keyof FilterState, value: any) => void
  clearFilters: () => void
  moveLead: (leadId: string, newStatus: CRMColumnId) => void
}

const STORAGE_KEY = 'crm_leads_data'

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

  fetchLeads: async () => {
    set({ loading: true, error: false })
    try {
      const apiLeads = await googleSheetsService.fetchLeads()

      // Load local overrides
      const localDataStr = localStorage.getItem(STORAGE_KEY)
      const localData = localDataStr ? JSON.parse(localDataStr) : {}

      // Merge API leads with local state (status and lastInteraction)
      const mergedLeads: CRMLead[] = apiLeads.map((lead) => {
        const localLead = localData[lead.id]
        return {
          ...lead,
          status: localLead?.status || lead.status || 'Capturado',
          lastInteraction: localLead?.lastInteraction || lead.dataCaptacao,
        }
      })

      // Add extra mock leads to populate the board if it's too empty
      if (mergedLeads.length < 5) {
        const mockMore = generateMockLeads(15)
        mockMore.forEach((m) => {
          // Only add if not exists (mocking uniqueness by id)
          if (!mergedLeads.find((l) => l.id === m.id)) {
            const localM = localData[m.id]
            mergedLeads.push({
              ...m,
              status: localM?.status || m.status,
              lastInteraction: localM?.lastInteraction || m.dataCaptacao,
            })
          }
        })
      }

      set({ leads: mergedLeads })
      get().setFilter('search', get().filters.search) // Trigger filtering
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
      return {
        filters: defaultFilters,
        filteredLeads: state.leads,
      }
    })
  },

  moveLead: (leadId, newStatus) => {
    set((state) => {
      const updatedLeads = state.leads.map((lead) => {
        if (lead.id === leadId) {
          return {
            ...lead,
            status: newStatus,
            lastInteraction: new Date().toISOString(),
          }
        }
        return lead
      })

      // Persist to LocalStorage
      const persistenceData = updatedLeads.reduce(
        (acc, lead) => {
          acc[lead.id] = {
            status: lead.status,
            lastInteraction: lead.lastInteraction,
          }
          return acc
        },
        {} as Record<string, { status: string; lastInteraction: string }>,
      )

      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistenceData))

      const filtered = applyFilters(updatedLeads, state.filters)
      return { leads: updatedLeads, filteredLeads: filtered }
    })
  },
}))

// Helper to filter leads
function applyFilters(leads: CRMLead[], filters: FilterState): CRMLead[] {
  return leads.filter((lead) => {
    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      const matches =
        lead.nomeCompleto.toLowerCase().includes(searchLower) ||
        lead.email.toLowerCase().includes(searchLower) ||
        lead.telefone.includes(searchLower)
      if (!matches) return false
    }

    // Origin
    if (filters.origin !== 'all' && lead.origem !== filters.origin) {
      return false
    }

    // Date Range
    if (filters.dateRange?.from) {
      const leadDate = new Date(lead.dataCaptacao).getTime()
      const fromDate = filters.dateRange.from.getTime()
      if (leadDate < fromDate) return false

      if (filters.dateRange.to) {
        const toDate = filters.dateRange.to.getTime() + 86400000 // End of day approximation
        if (leadDate > toDate) return false
      }
    }

    // Value Range
    const potentialValue = lead.assentosAdicionais * 500
    if (
      filters.valueRange.min &&
      potentialValue < Number(filters.valueRange.min)
    ) {
      return false
    }
    if (
      filters.valueRange.max &&
      potentialValue > Number(filters.valueRange.max)
    ) {
      return false
    }

    return true
  })
}

// Generate some mock leads to make the board look alive
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
    return {
      id: `mock-${i}`,
      nomeCompleto: `${name} ${surname}`,
      email: `${name.toLowerCase()}.${surname.toLowerCase()}@example.com`,
      telefone: `(11) 9${Math.floor(Math.random() * 90000) + 10000}-${Math.floor(Math.random() * 9000) + 1000}`,
      assentosAdicionais: Math.floor(Math.random() * 10) + 1,
      origem: origins[Math.floor(Math.random() * origins.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      dataCaptacao: new Date(
        Date.now() - Math.floor(Math.random() * 10 * 24 * 60 * 60 * 1000),
      ).toISOString(),
      lastInteraction: new Date(
        Date.now() - Math.floor(Math.random() * 5 * 24 * 60 * 60 * 1000),
      ).toISOString(),
    }
  })
}
