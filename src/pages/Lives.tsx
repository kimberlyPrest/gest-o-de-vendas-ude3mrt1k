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
import { Video, RefreshCw, AlertTriangle, CheckCircle2 } from 'lucide-react'
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
    // Fetch if empty or just to ensure freshness on mount
    fetchData()
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
        <div className="rounded-full bg-destructive/20 p-4 text-destructive">
          <AlertTriangle size={48} aria-hidden="true" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">
          Erro ao carregar dados
        </h2>
        <p className="text-muted-foreground">
          Não foi possível conectar ao banco de dados.
        </p>
        <Button
          onClick={fetchData}
          variant="outline"
          className="border-border text-muted-foreground hover:bg-white/5 hover:text-foreground"
        >
          <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
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
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
              Dashboard de Lives
            </h1>
            {loading ? (
              <span className="flex items-center text-[12px] text-chart-2 bg-chart-2/10 px-2 py-0.5 rounded-full animate-pulse border border-chart-2/20">
                <RefreshCw
                  className="h-3 w-3 animate-spin mr-1.5"
                  aria-hidden="true"
                />
                Sincronizando...
              </span>
            ) : (
              <span className="flex items-center text-[12px] text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full border border-border">
                <CheckCircle2
                  className="h-3 w-3 mr-1.5 text-green-500"
                  aria-hidden="true"
                />
                Atualizado
              </span>
            )}
          </div>
          <p className="text-muted-foreground mt-1">
            Acompanhe a performance, compare períodos e analise KPIs em tempo
            real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={fetchData}
            disabled={loading}
            aria-label="Atualizar dados"
            className="text-muted-foreground hover:text-foreground"
          >
            <RefreshCw
              className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`}
              aria-hidden="true"
            />
          </Button>
          <AddLiveModal
            presenters={uniquePresenters}
            onSuccess={handleLiveAdded}
          />
        </div>
      </header>

      {/* Filters */}
      <section aria-label="Filtros">
        <LiveFilters
          presenters={uniquePresenters}
          filters={filters}
          onFilterChange={setFilters}
          loading={loading}
          dateBounds={dateBounds}
          comparisonRange={comparisonRange}
        />
      </section>

      {/* KPI Dashboard */}
      <section aria-label="Indicadores de Performance">
        <LiveKPIs
          currentData={currentData}
          previousData={previousData}
          comparisonEnabled={filters.comparisonEnabled}
          loading={loading}
        />
      </section>

      {/* Comparative Analysis Section (Tabs) */}
      <section aria-label="Análise Comparativa">
        <LiveComparative
          data={currentData}
          allData={allData}
          loading={loading}
          presenters={filters.presenters}
        />
      </section>

      {/* Main Content Area */}
      {currentData.length === 0 && !loading ? (
        <EmptyState
          icon={Video}
          title="Nenhuma live encontrada"
          description="Tente ajustar os filtros ou selecionar um período diferente."
          className="text-muted-foreground"
        />
      ) : (
        <div className="space-y-8">
          {/* Charts Grid - 2 Col on Desktop */}
          <section aria-label="Gráficos Detalhados">
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
          </section>

          {/* History Table */}
          <section aria-label="Histórico de Lives">
            <StreamTable data={currentData} />
          </section>
        </div>
      )}
    </div>
  )
}
