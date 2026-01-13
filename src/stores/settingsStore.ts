import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SettingsState {
  theme: 'light' | 'dark' | 'system'
  syncFrequency: 1 | 5 | 10 | 30 // minutes
  notifications: {
    inactiveLeads: boolean
    followUps: boolean
    newLeads: boolean
    goals: boolean
  }
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setSyncFrequency: (freq: 1 | 5 | 10 | 30) => void
  toggleNotification: (key: keyof SettingsState['notifications']) => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      syncFrequency: 5,
      notifications: {
        inactiveLeads: true,
        followUps: true,
        newLeads: true,
        goals: true,
      },
      setTheme: (theme) => set({ theme }),
      setSyncFrequency: (syncFrequency) => set({ syncFrequency }),
      toggleNotification: (key) =>
        set((state) => ({
          notifications: {
            ...state.notifications,
            [key]: !state.notifications[key],
          },
        })),
    }),
    {
      name: 'app-settings-v1',
    },
  ),
)
