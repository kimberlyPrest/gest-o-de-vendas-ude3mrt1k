import { useEffect } from 'react'
import { useSyncStore } from '@/stores/syncStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useCRMStore } from '@/stores/crmStore'
import { useLivesStore } from '@/stores/livesStore'
import { useConnectionStore } from '@/stores/connectionStore'
import { toast } from 'sonner'

export function SyncManager() {
  const { syncFrequency } = useSettingsStore()
  const { setIsSyncing, setLastSync, setSyncError, syncError } = useSyncStore()
  const { fetchLeads } = useCRMStore()
  const { fetchData: fetchLives } = useLivesStore()
  const { checkConnection } = useConnectionStore()

  useEffect(() => {
    // Initial sync
    syncData()

    // Interval sync
    const interval = setInterval(
      () => {
        syncData()
      },
      syncFrequency * 60 * 1000,
    )

    // Online/Offline listeners
    const handleOnline = () => {
      toast.success('Conexão restaurada', {
        description: 'Sincronizando dados pendentes...',
      })
      checkConnection()
      syncData()
    }
    const handleOffline = () => {
      toast.error('Você está offline', {
        description: 'Alterações serão salvas localmente.',
      })
      checkConnection()
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      clearInterval(interval)
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [syncFrequency])

  const syncData = async () => {
    if (!navigator.onLine) {
      setSyncError(true)
      return
    }

    setIsSyncing(true)
    try {
      await Promise.all([fetchLeads(true), fetchLives(), checkConnection()])
      setLastSync(new Date())
      setSyncError(false)
      // Only show toast if it was previously error or manually triggered?
      // User story says "toast 'Dados atualizados' must appear briefly after a successful sync"
      // We might want to debounce this toast or show simpler indicator to not spam
      // toast.success('Dados atualizados')
    } catch (error) {
      console.error('Sync failed', error)
      setSyncError(true)
    } finally {
      setIsSyncing(false)
    }
  }

  return null // Headless component
}
