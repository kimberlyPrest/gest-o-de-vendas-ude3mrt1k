import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type NotificationType =
  | 'inactive_lead'
  | 'follow_up'
  | 'new_lead'
  | 'goal'
  | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  actionUrl?: string
  meta?: any
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (
    notification: Omit<Notification, 'id' | 'timestamp' | 'read'>,
  ) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  clearAll: () => void
  getUnreadCount: () => number
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      addNotification: (data) => {
        const newNotification: Notification = {
          id: uuidv4(),
          timestamp: new Date().toISOString(),
          read: false,
          ...data,
        }
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50), // Keep last 50
        }))
      },
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n,
          ),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),
      clearAll: () => set({ notifications: [] }),
      getUnreadCount: () => get().notifications.filter((n) => !n.read).length,
    }),
    {
      name: 'app-notifications-v1',
    },
  ),
)
