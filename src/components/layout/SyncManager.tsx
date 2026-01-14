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
  } = useSyncStore()
  const { fetchLeads } = useCRMStore()
  const { fetchData: fetchLives } = useLivesStore()
  const { checkConnection } = useConnectionStore()

  const syncData = async () => {
    if (!navigator.onLine) {
      setSyncError(true)
      return
    }

    setIsSyncing(true)
    const toastId = toast.loading('Sincronizando dados...', {
      description: 'Verificando novos registros...',
    })

    try {
      // Force sync on leads
      await Promise.all([fetchLeads(true), fetchLives(), checkConnection()])

      toast.dismiss(toastId)
      setLastSync(new Date())
      resetFailCount()

      // Success toast is handled in fetchLeads if new data found
    } catch (error) {
      console.error('Sync failed', error)
      toast.dismiss(toastId)
      incrementFailCount()
      if (failCount >= 2) {
        setSyncError(true)
        toast.error('Falha na sincronização', {
          description: 'O sistema entrará em modo offline.',
        })
      }
    } finally {
      setIsSyncing(false)
    }
  }

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

    const handleOnline = () => {
      toast.success('Conexão restaurada', {
        description: 'Sincronizando dados pendentes...',
      })
      checkConnection()
      resetFailCount()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncFrequency])

  return null
}
