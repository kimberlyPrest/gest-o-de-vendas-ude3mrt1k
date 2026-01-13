import { useEffect, useState } from 'react'
import { googleSheetsService } from '@/services/googleSheetsService'
import { useToast } from '@/hooks/use-toast'
import { useConnectionStore } from '@/stores/connectionStore'
import { Button } from '@/components/ui/button'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Lives() {
  const { toast } = useToast()
  const { status, checkConnection } = useConnectionStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const loadData = async () => {
    setLoading(true)
    setError(false)
    try {
      await googleSheetsService.fetchLivesData()
      // Ensure connection status is updated if it was offline
      if (status === 'offline') checkConnection()
    } catch (err) {
      console.error(err)
      setError(true)
      toast({
        title: 'Erro',
        description: 'Erro ao carregar dados de Lives',
        variant: 'destructive',
        className: 'bg-[#EF4444] text-white border-none',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-full flex-col">
      <header className="sticky top-0 z-10 flex items-center border-b bg-white px-8 py-6 shadow-[0_2px_4px_rgba(0,0,0,0.1)]">
        <h1 className="text-2xl font-bold text-[#1F2937]">
          📊 Dashboard de Lives
        </h1>
      </header>

      <div
        className="flex flex-1 flex-col p-8"
        style={{ backgroundColor: '#F9FAFB' }}
      >
        {loading ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#3B82F6] border-t-transparent"></div>
          </div>
        ) : error ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-[#F59E0B]" />
            <p className="text-lg font-medium text-[#1F2937]">
              Erro ao carregar
            </p>
            <Button
              onClick={loadData}
              className="bg-[#3B82F6] hover:bg-[#2563EB]"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Recarregar
            </Button>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-gray-300 p-12">
            <span className="text-lg font-medium text-[#6B7280]">
              Dashboard de Lives - Em Construção
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
