import { useEffect } from 'react'
import { cn } from '@/lib/utils'
import { useConnectionStore } from '@/stores/connectionStore'
import { useToast } from '@/hooks/use-toast'
import { RefreshCw } from 'lucide-react'

export function ConnectionStatus() {
  const { status, checkConnection } = useConnectionStore()
  const { toast } = useToast()

  useEffect(() => {
    checkConnection()
  }, [checkConnection])

  useEffect(() => {
    if (status === 'offline') {
      toast({
        title: 'Erro de Conexão',
        description: 'Erro ao conectar com planilhas',
        variant: 'destructive',
        className: 'bg-[#EF4444] text-white border-none',
      })
    }
  }, [status, toast])

  const handleRetry = () => {
    if (status === 'offline') {
      checkConnection()
    }
  }

  return (
    <div
      onClick={handleRetry}
      className={cn(
        'fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300',
        status === 'offline' && 'cursor-pointer hover:opacity-90',
        {
          'bg-[#F59E0B]': status === 'connecting',
          'bg-[#10B981]': status === 'online',
          'bg-[#EF4444]': status === 'offline',
        },
      )}
    >
      {status === 'connecting' && (
        <>
          <RefreshCw className="h-4 w-4 animate-spin" />
          <span>Conectando...</span>
        </>
      )}
      {status === 'online' && (
        <>
          <div className="h-2 w-2 rounded-full bg-white" />
          <span>Online</span>
        </>
      )}
      {status === 'offline' && (
        <>
          <div className="h-2 w-2 rounded-full bg-white" />
          <span>Offline</span>
        </>
      )}
    </div>
  )
}
