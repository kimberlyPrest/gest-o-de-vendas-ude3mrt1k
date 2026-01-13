import { create } from 'zustand'
import { googleSheetsService } from '@/services/googleSheetsService'

type ConnectionStatus = 'connecting' | 'online' | 'offline'

interface ConnectionState {
  status: ConnectionStatus
  setStatus: (status: ConnectionStatus) => void
  checkConnection: () => Promise<void>
}

export const useConnectionStore = create<ConnectionState>((set) => ({
  status: 'connecting',
  setStatus: (status) => set({ status }),
  checkConnection: async () => {
    set({ status: 'connecting' })
    const isConnected = await googleSheetsService.checkConnection()
    set({ status: isConnected ? 'online' : 'offline' })
  },
}))
