import { create } from 'zustand'
import { googleSheetsService, LiveData } from '@/services/googleSheetsService'

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
      await googleSheetsService.syncLives()

      // Then Fetch from DB
      const data = await googleSheetsService.fetchLivesFromDB()
      set({ allData: data })
    } catch (error) {
      console.error(error)
      set({ error: true })
    } finally {
      set({ loading: false })
    }
  },
  addLive: async (live) => {
    try {
      await googleSheetsService.addLiveToSheet(live)
      // Refresh data after adding
      await get().fetchData()
    } catch (err) {
      console.error(err)
      throw err
    }
  },
}))
