import { useEffect } from 'react'
import { useSyncStore } from '@/stores/syncStore'
import { useSettingsStore } from '@/stores/settingsStore'
import { useCRMStore } from '@/stores/crmStore'
import { useLivesStore } from '@/stores/livesStore'
import { useConnectionStore } from '@/stores/connectionStore'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export function SyncManager() {
  const { syncFrequency } = useSettingsStore()
  const {
    setIsSyncing,
    setLastSync,
    setSyncError,
    failCount,
    incrementFailCount,
    resetFailCount,
    processQueue,
  } = useSyncStore()
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
      resetFailCount()
      processQueue()
      syncData()
    }
    const handleOffline = () => {
      toast.error('Modo Offline', {
        description: 'Alterações serão salvas localmente.',
      })
      setSyncError(true)
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

    // Show syncing toast if it takes time
    const toastId = setTimeout(() => {
      toast('Sincronizando...', {
        icon: <Loader2 className="h-4 w-4 animate-spin text-blue-500" />,
        duration: 2000,
      })
    }, 1000)

    try {
      await Promise.all([fetchLeads(true), fetchLives(), checkConnection()])

      clearTimeout(toastId)
      setLastSync(new Date())
      resetFailCount()

      toast.success('Dados atualizados', {
        duration: 2000,
      })
    } catch (error) {
      console.error('Sync failed', error)
      incrementFailCount()
      if (failCount >= 2) {
        // On 3rd try (0, 1, 2)
        setSyncError(true)
        toast.error('Falha na sincronização', {
          description: 'O sistema entrará em modo offline.',
        })
      }
    } finally {
      setIsSyncing(false)
    }
  }

  return null // Headless component
}
