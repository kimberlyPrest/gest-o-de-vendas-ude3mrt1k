import { create } from 'zustand'

interface SyncState {
  lastSync: Date | null
  isSyncing: boolean
  syncError: boolean
  failCount: number
  offlineQueue: any[] // Queue for offline actions
  setLastSync: (date: Date) => void
  setIsSyncing: (isSyncing: boolean) => void
  setSyncError: (error: boolean) => void
  incrementFailCount: () => void
  resetFailCount: () => void
  addToQueue: (action: any) => void
  clearQueue: () => void
  processQueue: () => Promise<void>
}

export const useSyncStore = create<SyncState>((set, get) => ({
  lastSync: null,
  isSyncing: false,
  syncError: false,
  failCount: 0,
  offlineQueue: [],
  setLastSync: (date) =>
    set({ lastSync: date, syncError: false, failCount: 0 }),
  setIsSyncing: (isSyncing) => set({ isSyncing }),
  setSyncError: (syncError) => set({ syncError }),
  incrementFailCount: () =>
    set((state) => ({ failCount: state.failCount + 1 })),
  resetFailCount: () => set({ failCount: 0, syncError: false }),
  addToQueue: (action) =>
    set((state) => ({ offlineQueue: [...state.offlineQueue, action] })),
  clearQueue: () => set({ offlineQueue: [] }),
  processQueue: async () => {
    const { offlineQueue, clearQueue } = get()
    if (offlineQueue.length === 0) return

    console.log('Processing offline queue:', offlineQueue)
    // Here we would actually replay actions against the API
    // For now we just clear the queue to simulate success
    clearQueue()
  },
}))
