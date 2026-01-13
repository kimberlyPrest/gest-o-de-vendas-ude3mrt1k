import { useEffect, useState, useMemo } from 'react'
import { googleSheetsService, LiveData } from '@/services/googleSheetsService'
import { useToast } from '@/hooks/use-toast'
import { useConnectionStore } from '@/stores/connectionStore'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { LiveFilters, FilterState } from '@/components/lives/LiveFilters'
import { LiveKPIs } from '@/components/lives/LiveKPIs'
import { LiveChart } from '@/components/lives/LiveChart'
import { LiveComparative } from '@/components/lives/LiveComparative'
import { AddLiveModal } from '@/components/lives/AddLiveModal'
import {
  differenceInDays,
  subDays,
  startOfDay,
  isWithinInterval,
} from 'date-fns'

export default function Lives() {
  const { toast } = useToast()
  const { status, checkConnection } = useConnectionStore()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Raw Data
  const [allData, setAllData] = useState<LiveData[]>([])

  // Filter State
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
    presenters: [],
    weekdays: [],
  })

  // Derived Data (Filtered)
  const { filteredData, previousPeriodData, uniquePresenters } = useMemo(() => {
    if (!allData.length)
      return { filteredData: [], previousPeriodData: [], uniquePresenters: [] }

    // 1. Get Unique Presenters for Filter Dropdown
    const presenters = Array.from(
      new Set(allData.map((d) => d.presenter)),
    ).sort()

    // 2. Apply Filters
    const filtered = allData.filter((item) => {
      const itemDate = startOfDay(new Date(item.date))

      // Date Range Filter
      if (activeFilters.dateRange?.from && activeFilters.dateRange?.to) {
        if (
          !isWithinInterval(itemDate, {
            start: startOfDay(activeFilters.dateRange.from),
            end: startOfDay(activeFilters.dateRange.to),
          })
        ) {
          return false
        }
      }

      // Presenter Filter
      if (
        activeFilters.presenters.length > 0 &&
        !activeFilters.presenters.includes(item.presenter)
      ) {
        return false
      }

      // Weekday Filter
      if (activeFilters.weekdays.length > 0) {
        const dayOfWeek = itemDate.getDay() // 0-6
        if (!activeFilters.weekdays.includes(dayOfWeek)) {
          return false
        }
      }

      return true
    })

    // 3. Get Previous Period Data for Comparison
    let prevPeriodData: LiveData[] = []
    if (activeFilters.dateRange?.from && activeFilters.dateRange?.to) {
      const daysDiff = differenceInDays(
        activeFilters.dateRange.to,
        activeFilters.dateRange.from,
      )
      const prevEnd = subDays(activeFilters.dateRange.from, 1)
      const prevStart = subDays(prevEnd, daysDiff)

      prevPeriodData = allData.filter((item) => {
        const itemDate = startOfDay(new Date(item.date))
        return isWithinInterval(itemDate, {
          start: startOfDay(prevStart),
          end: startOfDay(prevEnd),
        })
      })

      // Apply other filters to prev period
      prevPeriodData = prevPeriodData.filter((item) => {
        if (
          activeFilters.presenters.length > 0 &&
          !activeFilters.presenters.includes(item.presenter)
        ) {
          return false
        }
        if (activeFilters.weekdays.length > 0) {
          const dayOfWeek = new Date(item.date).getDay()
          if (!activeFilters.weekdays.includes(dayOfWeek)) {
            return false
          }
        }
        return true
      })
    }

    return {
      filteredData: filtered,
      previousPeriodData: prevPeriodData,
      uniquePresenters: presenters,
    }
  }, [allData, activeFilters])

  const loadData = async () => {
    setLoading(true)
    setError(false)
    try {
      const data = await googleSheetsService.fetchLivesData()
      setAllData(data)
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

  const handleApplyFilters = async (filters: FilterState) => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 600))
    setActiveFilters(filters)
    setLoading(false)
    toast({
      title: 'Filtros aplicados',
      description: 'Dados atualizados com sucesso.',
      className: 'bg-[#10B981] text-white border-none',
    })
  }

  const handleClearFilters = () => {
    setActiveFilters({
      dateRange: {
        from: subDays(new Date(), 30),
        to: new Date(),
      },
      presenters: [],
      weekdays: [],
    })
    toast({
      title: 'Filtros removidos',
      description: 'Visualização padrão restaurada.',
      className: 'bg-[#3B82F6] text-white border-none',
    })
  }

  const handleLiveAdded = () => {
    loadData()
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 p-4 text-center">
        <AlertCircle className="h-12 w-12 text-[#F59E0B]" />
        <h2 className="text-xl font-semibold text-gray-900">
          Erro ao carregar dados
        </h2>
        <p className="text-gray-500">
          Não foi possível conectar à planilha. Verifique sua conexão.
        </p>
        <Button onClick={loadData} className="bg-[#3B82F6] hover:bg-[#2563EB]">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col bg-[#F9FAFB]">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-4 shadow-sm md:px-8 md:py-6">
        <h1 className="text-xl font-bold text-[#1F2937] md:text-2xl">
          📊 Dashboard de Lives
        </h1>
        <AddLiveModal
          presenters={uniquePresenters}
          onSuccess={handleLiveAdded}
        />
      </header>

      <main className="flex-1 space-y-6 p-4 md:p-8">
        <LiveFilters
          presenters={uniquePresenters}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          loading={loading}
        />

        <LiveKPIs
          data={filteredData}
          previousData={previousPeriodData}
          loading={loading}
        />

        <LiveChart data={filteredData} loading={loading} />

        <LiveComparative
          data={filteredData}
          allData={allData}
          loading={loading}
        />
      </main>
    </div>
  )
}
