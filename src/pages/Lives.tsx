import { useEffect, useState, useMemo } from 'react'
import { useLivesStore } from '@/stores/livesStore'
import { AddLiveModal } from '@/components/lives/AddLiveModal'
import { LiveFilters, FilterState } from '@/components/lives/LiveFilters'
import { LiveKPIs } from '@/components/lives/LiveKPIs'
import { EmptyState } from '@/components/ui/empty-state'
import {
  subDays,
  startOfDay,
  endOfDay,
  isWithinInterval,
  parseISO,
  differenceInDays,
} from 'date-fns'
import { Video, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

// New Charts
import { HostPerformanceChart } from '@/components/lives/HostPerformanceChart'
import { WeekdayEfficiencyChart } from '@/components/lives/WeekdayEfficiencyChart'
import { RevenueEvolutionChart } from '@/components/lives/RevenueEvolutionChart'
import { AudienceScatterChart } from '@/components/lives/AudienceScatterChart'
import { LiveComparative } from '@/components/lives/LiveComparative'
import { StreamTable } from '@/components/lives/StreamTable'

export default function Lives() {
  const { allData, loading, error, fetchData } = useLivesStore()

  // State
  const [filters, setFilters] = useState<FilterState>({
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
    presenters: [],
    weekdays: [],
    comparisonEnabled: false,
  })

  useEffect(() => {
    if (allData.length === 0) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Derived State: Data Bounds for "Período Total"
  const dateBounds = useMemo(() => {
    if (allData.length === 0) return undefined
    const timestamps = allData.map((d) => parseISO(d.date).getTime())
    return {
      min: new Date(Math.min(...timestamps)),
      max: new Date(Math.max(...timestamps)),
    }
  }, [allData])

  // Derived State: Comparison Date Range
  const comparisonRange = useMemo(() => {
    if (
      !filters.comparisonEnabled ||
      !filters.dateRange?.from ||
      !filters.dateRange?.to
    ) {
      return undefined
    }

    const duration = differenceInDays(
      filters.dateRange.to,
      filters.dateRange.from,
    )
    const prevEnd = subDays(filters.dateRange.from, 1)
    const prevStart = subDays(prevEnd, duration)

    return { from: prevStart, to: prevEnd }
  }, [filters.comparisonEnabled, filters.dateRange])

  // Filter Logic
  const filterData = (
    data: typeof allData,
    range: { from: Date; to: Date } | undefined,
  ) => {
    if (!range?.from || !range?.to) return []

    const start = startOfDay(range.from)
    const end = endOfDay(range.to)

    return data.filter((item) => {
      const itemDate = parseISO(item.date)

      // Date Check
      if (!isWithinInterval(itemDate, { start, end })) return false

      // Presenter Check
      if (
        filters.presenters.length > 0 &&
        !filters.presenters.includes(item.presenter)
      )
        return false

      // Weekday Check (Normalized)
      if (filters.weekdays.length > 0) {
        const normalizedItemDay = item.weekday.toLowerCase().split('-')[0] // "segunda"
        const match = filters.weekdays.some((w) =>
          w.toLowerCase().includes(normalizedItemDay),
        )
        if (!match) return false
      }

      return true
    })
  }

  const currentData = useMemo(
    () => filterData(allData, filters.dateRange as { from: Date; to: Date }),
    [allData, filters],
  )

  const previousData = useMemo(
    () => filterData(allData, comparisonRange),
    [allData, comparisonRange, filters.presenters, filters.weekdays],
  )

  // Get unique presenters for filter dropdown
  const uniquePresenters = useMemo(() => {
    return Array.from(new Set(allData.map((d) => d.presenter))).sort()
  }, [allData])

  const handleLiveAdded = () => {
    fetchData()
  }

  if (error) {
    return (
      <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <div className="rounded-full bg-red-900/20 p-4 text-red-500">
          <AlertTriangle size={48} />
        </div>
        <h2 className="text-xl font-semibold text-white">
          Erro ao carregar dados
        </h2>
        <p className="text-gray-400">
          Não foi possível conectar ao Google Sheets.
        </p>
        <Button
          onClick={fetchData}
          variant="outline"
          className="border-gray-700 text-gray-300 hover:bg-white/5 hover:text-white"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 md:p-8 max-w-[1600px] mx-auto w-full space-y-8">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white font-display">
            Dashboard de Lives
          </h1>
          <p className="text-gray-400 mt-1">
            Acompanhe a performance, compare períodos e analise KPIs em tempo
            real.
          </p>
        </div>
        <AddLiveModal
          presenters={uniquePresenters}
          onSuccess={handleLiveAdded}
        />
      </header>

      {/* Filters */}
      <LiveFilters
        presenters={uniquePresenters}
        filters={filters}
        onFilterChange={setFilters}
        loading={loading}
        dateBounds={dateBounds}
        comparisonRange={comparisonRange}
      />

      {/* KPI Dashboard */}
      <section>
        <LiveKPIs
          currentData={currentData}
          previousData={previousData}
          comparisonEnabled={filters.comparisonEnabled}
          loading={loading}
        />
      </section>

      {/* Comparative Analysis Section (Tabs) */}
      <LiveComparative
        data={currentData}
        allData={allData}
        loading={loading}
        presenters={filters.presenters}
      />

      {/* Main Content Area */}
      {currentData.length === 0 && !loading ? (
        <EmptyState
          icon={Video}
          title="Nenhuma live encontrada"
          description="Tente ajustar os filtros ou selecionar um período diferente."
          className="text-gray-400"
        />
      ) : (
        <div className="space-y-8">
          {/* Charts Grid - 2 Col on Desktop */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <HostPerformanceChart data={currentData} loading={loading} />
            <WeekdayEfficiencyChart data={currentData} loading={loading} />
            <RevenueEvolutionChart
              currentData={currentData}
              previousData={previousData}
              comparisonEnabled={filters.comparisonEnabled}
              dateRange={filters.dateRange as { from: Date; to: Date }}
              loading={loading}
            />
            <AudienceScatterChart data={currentData} loading={loading} />
          </div>

          {/* History Table */}
          <StreamTable data={currentData} />
        </div>
      )}
    </div>
  )
}
