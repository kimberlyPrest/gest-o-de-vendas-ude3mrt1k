import { create } from 'zustand'

interface SyncState {
  lastSync: Date | null
  isSyncing: boolean
  syncError: boolean
  offlineQueue: any[] // Queue for offline actions
  setLastSync: (date: Date) => void
  setIsSyncing: (isSyncing: boolean) => void
  setSyncError: (error: boolean) => void
  addToQueue: (action: any) => void
  clearQueue: () => void
}

export const useSyncStore = create<SyncState>((set) => ({
  lastSync: null,
  isSyncing: false,
  syncError: false,
  offlineQueue: [],
  setLastSync: (date) => set({ lastSync: date, syncError: false }),
  setIsSyncing: (isSyncing) => set({ isSyncing }),
  setSyncError: (syncError) => set({ syncError }),
  addToQueue: (action) =>
    set((state) => ({ offlineQueue: [...state.offlineQueue, action] })),
  clearQueue: () => set({ offlineQueue: [] }),
}))
