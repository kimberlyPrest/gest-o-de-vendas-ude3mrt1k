import { create } from 'zustand'
import { googleSheetsService, LiveData } from '@/services/googleSheetsService'
import { toast } from 'sonner'

interface LivesState {
  allData: LiveData[]
  loading: boolean
  error: boolean
  fetchData: () => Promise<void>
  addLive: (live: Partial<LiveData>) => Promise<void>
}

export const useLivesStore = create<LivesState>((set, get) => ({
  allData: [],
  loading: false,
  error: false,
  fetchData: async () => {
    set({ loading: true, error: false })
    try {
      // Sync first
      try {
        const stats = await googleSheetsService.syncLives()

        if (stats.removed > 0) {
          toast.info('Sincronização de Lives', {
            description: `${stats.removed} registros antigos/inválidos removidos.`,
          })
        }
      } catch (syncError) {
        // Log error but continue to fetch local data
        console.error('Lives Sync Warning:', syncError)
        toast.warning('Sincronização Indisponível', {
          description:
            'Não foi possível atualizar com a planilha. Mostrando dados locais.',
        })
      }

      // Then Fetch from DB
      const data = await googleSheetsService.fetchLivesFromDB()
      set({ allData: data })
    } catch (error) {
      console.error(error)
      set({ error: true })
      toast.error('Erro ao carregar Lives', {
        description: 'Não foi possível carregar os dados da base de dados.',
      })
    } finally {
      set({ loading: false })
    }
  },
  addLive: async (live) => {
    try {
      await googleSheetsService.addLiveToSheet(live)
      // Refresh data after adding
      await get().fetchData()
      toast.success('Live adicionada', {
        description: 'Os dados foram salvos com sucesso.',
      })
    } catch (err) {
      console.error(err)
      toast.error('Erro ao adicionar', {
        description: 'Verifique os dados e tente novamente.',
      })
      throw err
    }
  },
}))
