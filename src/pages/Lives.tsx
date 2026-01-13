import { useEffect, useState, useMemo } from 'react'
import { LiveData } from '@/services/googleSheetsService'
import { useToast } from '@/hooks/use-toast'
import { useLivesStore } from '@/stores/livesStore'
import { Button } from '@/components/ui/button'
import { RefreshCw, AlertCircle } from 'lucide-react'
import { LiveFilters, FilterState } from '@/components/lives/LiveFilters'
import { LiveKPIs } from '@/components/lives/LiveKPIs'
import { LiveChart } from '@/components/lives/LiveChart'
import { LiveComparative } from '@/components/lives/LiveComparative'
import { AddLiveModal } from '@/components/lives/AddLiveModal'
import { InsightsCard } from '@/components/lives/InsightsCard'
import { ExportButton } from '@/components/common/ExportButton'
import { formatLiveForExport } from '@/utils/exportUtils'
import {
  differenceInDays,
  subDays,
  startOfDay,
  isWithinInterval,
} from 'date-fns'

export default function Lives() {
  const { toast } = useToast()
  const { allData, loading, error, fetchData } = useLivesStore()

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

  useEffect(() => {
    // Only fetch if empty to respect global state (avoid double fetch if already loaded)
    if (allData.length === 0) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleApplyFilters = async (filters: FilterState) => {
    // Mock loading delay for UX
    setActiveFilters(filters)
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
    fetchData()
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-background p-4 text-center">
        <AlertCircle className="h-12 w-12 text-[#F59E0B]" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Erro ao carregar dados
        </h2>
        <Button onClick={fetchData} className="bg-[#3B82F6] hover:bg-[#2563EB]">
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col bg-[#F9FAFB] dark:bg-background transition-colors duration-300">
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white dark:bg-card dark:border-border px-4 py-4 shadow-sm md:px-8 md:py-6 animate-fade-in-down">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#1F2937] dark:text-white md:text-2xl">
            📊 Dashboard de Lives
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ExportButton
            data={filteredData}
            filename="lives_report"
            formatData={formatLiveForExport}
          />
          <AddLiveModal
            presenters={uniquePresenters}
            onSuccess={handleLiveAdded}
          />
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4 md:p-8 animate-fade-in">
        <InsightsCard />

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
