import { useEffect, useState, useMemo } from 'react'
import { LiveData } from '@/services/googleSheetsService'
import { useToast } from '@/hooks/use-toast'
import { useLivesStore } from '@/stores/livesStore'
import { AddLiveModal } from '@/components/lives/AddLiveModal'
import {
  differenceInDays,
  subDays,
  startOfDay,
  isWithinInterval,
  format,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'

// Apple-style CSS variables
const appleStyles = `
  .apple-bg { background-color: #F5F5F7; }
  .apple-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid #E5E5E7;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .apple-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    border-color: #D2D2D7;
  }
  .apple-btn-primary {
    background: linear-gradient(180deg, #0077ED 0%, #006EDF 100%);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 113, 227, 0.2);
  }
  .zebra-table tr:nth-child(even) {
    background-color: #FBFBFD;
  }
  .top-performer-cell {
    color: #248a3d;
    font-weight: 600;
  }
  .top-performer-bg {
    background-color: #EBF9EE !important;
  }
`

export interface FilterState {
  dateRange: { from: Date; to: Date } | undefined
  presenters: string[]
  weekdays: number[]
}

const WEEKDAYS = [
  { label: 'S', name: 'Segunda', value: 1 },
  { label: 'T', name: 'Terça', value: 2 },
  { label: 'Q', name: 'Quarta', value: 3 },
  { label: 'Q', name: 'Quinta', value: 4 },
  { label: 'S', name: 'Sexta', value: 5 },
  { label: 'S', name: 'Sábado', value: 6 },
  { label: 'D', name: 'Domingo', value: 0 },
]

interface PresenterMetrics {
  presenter: string
  lives: number
  sales: number
  revenue: number
  conversion: number
  retention: number
}

export default function Lives() {
  const { toast } = useToast()
  const { allData, loading, error, fetchData } = useLivesStore()

  const [activeFilters, setActiveFilters] = useState<FilterState>({
    dateRange: {
      from: subDays(new Date(), 30),
      to: new Date(),
    },
    presenters: [],
    weekdays: [],
  })

  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])
  const [selectedPresenter, setSelectedPresenter] = useState<string>('')

  const {
    filteredData,
    previousPeriodData,
    uniquePresenters,
    presenterMetrics,
  } = useMemo(() => {
    if (!allData.length)
      return {
        filteredData: [],
        previousPeriodData: [],
        uniquePresenters: [],
        presenterMetrics: [],
      }

    const presenters = Array.from(
      new Set(allData.map((d) => d.presenter)),
    ).sort()

    const filtered = allData.filter((item) => {
      const itemDate = startOfDay(new Date(item.date))

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

      if (
        activeFilters.presenters.length > 0 &&
        !activeFilters.presenters.includes(item.presenter)
      ) {
        return false
      }

      if (activeFilters.weekdays.length > 0) {
        const dayOfWeek = itemDate.getDay()
        if (!activeFilters.weekdays.includes(dayOfWeek)) {
          return false
        }
      }

      return true
    })

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
    }

    // Calculate presenter metrics
    const grouped = filtered.reduce<Record<string, PresenterMetrics>>(
      (acc, curr) => {
        if (!acc[curr.presenter]) {
          acc[curr.presenter] = {
            presenter: curr.presenter,
            lives: 0,
            sales: 0,
            revenue: 0,
            conversion: 0,
            retention: 0,
          }
        }
        acc[curr.presenter].lives += 1
        acc[curr.presenter].sales += curr.sales
        acc[curr.presenter].revenue += curr.revenue
        acc[curr.presenter].conversion += curr.conversionRate
        acc[curr.presenter].retention += curr.retentionRate
        return acc
      },
      {},
    )

    const metrics = Object.values(grouped)
      .map((p) => ({
        ...p,
        conversion: p.lives ? p.conversion / p.lives : 0,
        retention: p.lives ? p.retention / p.lives : 0,
      }))
      .sort((a, b) => b.sales - a.sales)

    return {
      filteredData: filtered,
      previousPeriodData: prevPeriodData,
      uniquePresenters: presenters,
      presenterMetrics: metrics,
    }
  }, [allData, activeFilters])

  // Calculate KPIs
  const kpis = useMemo(() => {
    const sum = (dataset: LiveData[], key: keyof LiveData) =>
      dataset.reduce((acc, curr) => acc + (curr[key] as number), 0)

    const avg = (dataset: LiveData[], key: keyof LiveData) =>
      dataset.length ? sum(dataset, key) / dataset.length : 0

    const currentSales = sum(filteredData, 'sales')
    const prevSales = sum(previousPeriodData, 'sales')
    const currentRevenue = sum(filteredData, 'revenue')
    const prevRevenue = sum(previousPeriodData, 'revenue')
    const currentConversion = avg(filteredData, 'conversionRate')
    const prevConversion = avg(previousPeriodData, 'conversionRate')
    const currentPeak = Math.max(...filteredData.map((d) => d.peakViewers), 0)
    const prevPeak = Math.max(
      ...previousPeriodData.map((d) => d.peakViewers),
      0,
    )

    const calcTrend = (curr: number, prev: number) =>
      prev ? ((curr - prev) / prev) * 100 : 0

    return {
      sales: { value: currentSales, trend: calcTrend(currentSales, prevSales) },
      revenue: {
        value: currentRevenue,
        trend: calcTrend(currentRevenue, prevRevenue),
      },
      conversion: {
        value: currentConversion,
        trend: calcTrend(currentConversion, prevConversion),
      },
      peak: { value: currentPeak, trend: calcTrend(currentPeak, prevPeak) },
    }
  }, [filteredData, previousPeriodData])

  // Find top performers
  const topPerformers = useMemo(() => {
    if (presenterMetrics.length === 0)
      return {
        lives: '',
        sales: '',
        revenue: '',
        conversion: '',
        retention: '',
      }

    const topLives = presenterMetrics.reduce(
      (max, p) => (p.lives > max.lives ? p : max),
      presenterMetrics[0],
    )
    const topSales = presenterMetrics.reduce(
      (max, p) => (p.sales > max.sales ? p : max),
      presenterMetrics[0],
    )
    const topRevenue = presenterMetrics.reduce(
      (max, p) => (p.revenue > max.revenue ? p : max),
      presenterMetrics[0],
    )
    const topConversion = presenterMetrics.reduce(
      (max, p) => (p.conversion > max.conversion ? p : max),
      presenterMetrics[0],
    )
    const topRetention = presenterMetrics.reduce(
      (max, p) => (p.retention > max.retention ? p : max),
      presenterMetrics[0],
    )

    return {
      lives: topLives.presenter,
      sales: topSales.presenter,
      revenue: topRevenue.presenter,
      conversion: topConversion.presenter,
      retention: topRetention.presenter,
    }
  }, [presenterMetrics])

  useEffect(() => {
    if (allData.length === 0) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLiveAdded = () => {
    fetchData()
  }

  const toggleWeekday = (value: number) => {
    const newWeekdays = selectedWeekdays.includes(value)
      ? selectedWeekdays.filter((d) => d !== value)
      : [...selectedWeekdays, value]
    setSelectedWeekdays(newWeekdays)
    setActiveFilters((prev) => ({ ...prev, weekdays: newWeekdays }))
  }

  const dateRangeText = activeFilters.dateRange
    ? `${format(activeFilters.dateRange.from, 'dd MMM, yyyy', { locale: ptBR })} - ${format(activeFilters.dateRange.to, 'dd MMM, yyyy', { locale: ptBR })}`
    : 'Selecione um período'

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `R$ ${Math.round(value / 1000)}k`
    }
    return `R$ ${value.toLocaleString('pt-BR')}`
  }

  const formatFullCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  if (error) {
    return (
      <div
        className="flex h-screen flex-col items-center justify-center gap-4 p-4 text-center"
        style={{ backgroundColor: '#F5F5F7' }}
      >
        <span className="material-symbols-outlined text-[48px] text-orange-500">
          error
        </span>
        <h2 className="text-xl font-semibold" style={{ color: '#1D1D1F' }}>
          Erro ao carregar dados
        </h2>
        <button
          onClick={fetchData}
          className="apple-btn-primary hover:opacity-90 text-white px-5 py-2.5 text-[14px] font-medium flex items-center gap-2 transition-all"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
          Tentar Novamente
        </button>
      </div>
    )
  }

  return (
    <>
      <style>{appleStyles}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div
        className="flex-1 p-10 max-w-[1400px] mx-auto w-full"
        style={{
          backgroundColor: '#F5F5F7',
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Header */}
        <header className="flex flex-wrap justify-between items-end gap-4 mb-10">
          <div>
            <h2
              className="text-[32px] font-semibold tracking-tight"
              style={{ color: '#1D1D1F' }}
            >
              Dashboard de Lives
            </h2>
            <p className="text-[15px] mt-1" style={{ color: '#86868B' }}>
              Visão geral do desempenho em tempo real.
            </p>
          </div>
          <AddLiveModal
            presenters={uniquePresenters}
            onSuccess={handleLiveAdded}
            customTrigger={
              <button className="apple-btn-primary hover:opacity-90 text-white px-5 py-2.5 text-[14px] font-medium flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  add_circle
                </span>
                Adicionar Live Exponencial
              </button>
            }
          />
        </header>

        {/* Filters Card */}
        <section className="apple-card p-5 mb-8 flex flex-wrap items-center gap-8">
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#86868B' }}
            >
              Período
            </label>
            <div
              className="flex items-center gap-3 px-3 py-1.5 border rounded-lg cursor-pointer"
              style={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderColor: '#E5E5E7',
              }}
            >
              <span
                className="text-[13px] font-medium"
                style={{ color: '#1D1D1F' }}
              >
                {dateRangeText}
              </span>
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ color: '#86868B' }}
              >
                calendar_month
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#86868B' }}
            >
              Apresentador
            </label>
            <select
              className="text-[13px] font-medium px-3 py-1.5 border rounded-lg focus:ring-0 min-w-[200px]"
              style={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderColor: '#E5E5E7',
                color: '#1D1D1F',
              }}
              value={selectedPresenter}
              onChange={(e) => {
                setSelectedPresenter(e.target.value)
                setActiveFilters((prev) => ({
                  ...prev,
                  presenters: e.target.value ? [e.target.value] : [],
                }))
              }}
            >
              <option value="">Todos os Apresentadores</option>
              {uniquePresenters.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5 ml-auto">
            <label
              className="text-[11px] font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#86868B' }}
            >
              Filtro Rápido
            </label>
            <div
              className="flex gap-1 p-1 rounded-xl border"
              style={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderColor: '#E5E5E7',
              }}
            >
              {WEEKDAYS.map((day) => {
                const isSelected = selectedWeekdays.includes(day.value)
                return (
                  <button
                    key={day.value}
                    onClick={() => toggleWeekday(day.value)}
                    className="size-8 rounded-lg text-[12px] font-semibold transition-all"
                    style={{
                      backgroundColor: isSelected ? 'white' : 'transparent',
                      boxShadow: isSelected
                        ? '0 1px 3px rgba(0,0,0,0.1)'
                        : 'none',
                      color: isSelected ? '#1D1D1F' : '#86868B',
                    }}
                    title={day.name}
                  >
                    {day.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        {/* KPIs Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Sales KPI */}
          <div className="apple-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div
                className="size-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#EFF6FF', color: '#0071E3' }}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
              </div>
              <span
                className="text-[12px] font-bold flex items-center"
                style={{ color: kpis.sales.trend >= 0 ? '#34C759' : '#FF3B30' }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {kpis.sales.trend >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {Math.abs(kpis.sales.trend).toFixed(0)}%
              </span>
            </div>
            <p
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: '#86868B' }}
            >
              Vendas Totais
            </p>
            <h3
              className="text-[28px] font-bold tracking-tight mt-1"
              style={{ color: '#1D1D1F' }}
            >
              {kpis.sales.value.toLocaleString('pt-BR')}
            </h3>
          </div>

          {/* Revenue KPI */}
          <div className="apple-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div
                className="size-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#ECFDF5', color: '#34C759' }}
              >
                <span className="material-symbols-outlined">payments</span>
              </div>
              <span
                className="text-[12px] font-bold flex items-center"
                style={{
                  color: kpis.revenue.trend >= 0 ? '#34C759' : '#FF3B30',
                }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {kpis.revenue.trend >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {Math.abs(kpis.revenue.trend).toFixed(1)}%
              </span>
            </div>
            <p
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: '#86868B' }}
            >
              Faturamento
            </p>
            <h3
              className="text-[28px] font-bold tracking-tight mt-1"
              style={{ color: '#1D1D1F' }}
            >
              {formatCurrency(kpis.revenue.value)}
            </h3>
          </div>

          {/* Conversion KPI */}
          <div className="apple-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div
                className="size-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#FFF7ED', color: '#F97316' }}
              >
                <span className="material-symbols-outlined">percent</span>
              </div>
              <span
                className="text-[12px] font-bold flex items-center"
                style={{
                  color: kpis.conversion.trend >= 0 ? '#34C759' : '#FF3B30',
                }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {kpis.conversion.trend >= 0
                    ? 'arrow_upward'
                    : 'arrow_downward'}
                </span>
                {Math.abs(kpis.conversion.trend).toFixed(1)}%
              </span>
            </div>
            <p
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: '#86868B' }}
            >
              Conversão
            </p>
            <h3
              className="text-[28px] font-bold tracking-tight mt-1"
              style={{ color: '#1D1D1F' }}
            >
              {kpis.conversion.value.toFixed(1)}%
            </h3>
          </div>

          {/* Peak Views KPI */}
          <div className="apple-card p-6">
            <div className="flex justify-between items-start mb-4">
              <div
                className="size-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: '#F5F3FF', color: '#9333EA' }}
              >
                <span className="material-symbols-outlined">groups</span>
              </div>
              <span
                className="text-[12px] font-bold flex items-center"
                style={{ color: kpis.peak.trend >= 0 ? '#34C759' : '#FF3B30' }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  {kpis.peak.trend >= 0 ? 'arrow_upward' : 'arrow_downward'}
                </span>
                {Math.abs(kpis.peak.trend).toFixed(0)}%
              </span>
            </div>
            <p
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: '#86868B' }}
            >
              Pico Views
            </p>
            <h3
              className="text-[28px] font-bold tracking-tight mt-1"
              style={{ color: '#1D1D1F' }}
            >
              {kpis.peak.value.toLocaleString('pt-BR')}
            </h3>
          </div>
        </section>

        {/* Chart Section */}
        <section className="apple-card p-8 mb-8">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3
                className="text-[20px] font-semibold tracking-tight"
                style={{ color: '#1D1D1F' }}
              >
                Evolução de Performance
              </h3>
              <p className="text-[14px]" style={{ color: '#86868B' }}>
                Vendas e Faturamento por dia
              </p>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: '#0071E3' }}
                ></div>
                <span
                  className="text-[12px] font-medium"
                  style={{ color: '#86868B' }}
                >
                  Vendas
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="size-2 rounded-full"
                  style={{ backgroundColor: '#34C759' }}
                ></div>
                <span
                  className="text-[12px] font-medium"
                  style={{ color: '#86868B' }}
                >
                  Faturamento
                </span>
              </div>
            </div>
          </div>

          <div className="h-[320px] w-full relative">
            {/* Grid lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-50">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="border-b w-full h-0"
                  style={{ borderColor: '#E5E5E7' }}
                ></div>
              ))}
            </div>

            {/* SVG Chart */}
            <svg
              className="absolute inset-0 w-full h-full overflow-visible"
              preserveAspectRatio="none"
              viewBox="0 0 1000 300"
            >
              <defs>
                <linearGradient id="blueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#0071E3"
                    stopOpacity="0.15"
                  ></stop>
                  <stop
                    offset="100%"
                    stopColor="#0071E3"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
                <linearGradient id="greenGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop
                    offset="0%"
                    stopColor="#34C759"
                    stopOpacity="0.15"
                  ></stop>
                  <stop
                    offset="100%"
                    stopColor="#34C759"
                    stopOpacity="0"
                  ></stop>
                </linearGradient>
              </defs>
              <path
                d="M0 250 Q 150 120, 300 180 T 600 80 T 1000 100 V 300 H 0 Z"
                fill="url(#blueGradient)"
              ></path>
              <path
                d="M0 280 Q 150 200, 300 240 T 600 140 T 1000 160 V 300 H 0 Z"
                fill="url(#greenGradient)"
              ></path>
              <path
                d="M0 250 Q 150 120, 300 180 T 600 80 T 1000 100"
                fill="none"
                stroke="#0071E3"
                strokeWidth="1.5"
              ></path>
              <path
                d="M0 280 Q 150 200, 300 240 T 600 140 T 1000 160"
                fill="none"
                stroke="#34C759"
                strokeWidth="1.5"
              ></path>
            </svg>
          </div>

          <div className="flex justify-between mt-6 px-1">
            {activeFilters.dateRange && (
              <>
                <span
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: '#86868B' }}
                >
                  {format(activeFilters.dateRange.from, 'dd MMM', {
                    locale: ptBR,
                  })}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: '#86868B' }}
                >
                  {format(
                    new Date(
                      (activeFilters.dateRange.from.getTime() +
                        activeFilters.dateRange.to.getTime()) /
                        3,
                    ),
                    'dd MMM',
                    { locale: ptBR },
                  )}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: '#86868B' }}
                >
                  {format(
                    new Date(
                      ((activeFilters.dateRange.from.getTime() +
                        activeFilters.dateRange.to.getTime()) *
                        2) /
                        3,
                    ),
                    'dd MMM',
                    { locale: ptBR },
                  )}
                </span>
                <span
                  className="text-[11px] font-semibold uppercase"
                  style={{ color: '#86868B' }}
                >
                  {format(activeFilters.dateRange.to, 'dd MMM', {
                    locale: ptBR,
                  })}
                </span>
              </>
            )}
          </div>
        </section>

        {/* Table Section */}
        <section className="apple-card overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <h3
              className="text-[18px] font-semibold tracking-tight mb-6"
              style={{ color: '#1D1D1F' }}
            >
              Análise de Performance
            </h3>
            <div
              className="flex gap-10 border-b"
              style={{ borderColor: '#E5E5E7' }}
            >
              <button
                className="pb-3 border-b-2 text-[14px] font-semibold transition-all"
                style={{ borderColor: '#0071E3', color: '#1D1D1F' }}
              >
                Por Palestrante
              </button>
              <button
                className="pb-3 border-b-2 border-transparent text-[14px] font-medium transition-all hover:opacity-80"
                style={{ color: '#86868B' }}
              >
                Por Dia
              </button>
              <button
                className="pb-3 border-b-2 border-transparent text-[14px] font-medium transition-all hover:opacity-80"
                style={{ color: '#86868B' }}
              >
                Por Período
              </button>
            </div>
          </div>

          <div className="p-0 overflow-x-auto">
            <table className="w-full text-left zebra-table">
              <thead>
                <tr
                  className="text-[11px] font-semibold uppercase tracking-widest border-b"
                  style={{
                    color: '#86868B',
                    borderColor: '#E5E5E7',
                    backgroundColor: 'rgba(251,251,253,0.5)',
                  }}
                >
                  <th className="px-8 py-5">Apresentador</th>
                  <th className="px-6 py-5">Lives</th>
                  <th className="px-6 py-5">Vendas</th>
                  <th className="px-6 py-5">Faturamento</th>
                  <th className="px-6 py-5">Conversão</th>
                  <th className="px-8 py-5 text-right">Retenção</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#E5E5E7' }}>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-8 py-4">
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-8"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-24"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 bg-gray-200 rounded w-12"></div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="h-4 bg-gray-200 rounded w-12 ml-auto"></div>
                      </td>
                    </tr>
                  ))
                ) : presenterMetrics.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-12 text-center"
                      style={{ color: '#86868B' }}
                    >
                      Nenhum dado disponível para o período selecionado
                    </td>
                  </tr>
                ) : (
                  presenterMetrics.slice(0, 5).map((row, index) => (
                    <tr
                      key={row.presenter}
                      className="hover:bg-black/[0.01] transition-colors group"
                      style={{ borderColor: '#E5E5E7' }}
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-9 rounded-full bg-center bg-cover border flex items-center justify-center"
                            style={{
                              borderColor: '#E5E5E7',
                              backgroundColor: '#E5E7EB',
                              color: '#86868B',
                            }}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              person
                            </span>
                          </div>
                          <span
                            className="text-[14px] font-medium"
                            style={{ color: '#1D1D1F' }}
                          >
                            {row.presenter}
                          </span>
                        </div>
                      </td>
                      <td
                        className={`px-6 py-4 text-[14px] ${topPerformers.lives === row.presenter ? 'top-performer-bg' : ''}`}
                        style={{ color: '#1D1D1F' }}
                      >
                        <span
                          className={
                            topPerformers.lives === row.presenter
                              ? 'top-performer-cell'
                              : ''
                          }
                        >
                          {row.lives.toString().padStart(2, '0')}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-[14px] ${topPerformers.sales === row.presenter ? 'top-performer-bg' : ''}`}
                        style={{ color: '#1D1D1F' }}
                      >
                        <span
                          className={
                            topPerformers.sales === row.presenter
                              ? 'top-performer-cell'
                              : ''
                          }
                        >
                          {row.sales}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-[14px] ${topPerformers.revenue === row.presenter ? 'top-performer-bg' : ''}`}
                        style={{ color: '#1D1D1F' }}
                      >
                        <span
                          className={
                            topPerformers.revenue === row.presenter
                              ? 'top-performer-cell'
                              : ''
                          }
                        >
                          {formatFullCurrency(row.revenue)}
                        </span>
                      </td>
                      <td
                        className={`px-6 py-4 text-[14px] ${topPerformers.conversion === row.presenter ? 'top-performer-bg' : ''}`}
                        style={{ color: '#1D1D1F' }}
                      >
                        <span
                          className={
                            topPerformers.conversion === row.presenter
                              ? 'top-performer-cell'
                              : ''
                          }
                        >
                          {row.conversion.toFixed(1)}%
                        </span>
                      </td>
                      <td
                        className={`px-8 py-4 text-[14px] text-right ${topPerformers.retention === row.presenter ? 'top-performer-bg' : ''}`}
                        style={{ color: '#1D1D1F' }}
                      >
                        <span
                          className={
                            topPerformers.retention === row.presenter
                              ? 'top-performer-cell'
                              : ''
                          }
                        >
                          {row.retention.toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div
            className="px-8 py-5 border-t flex justify-between items-center"
            style={{ backgroundColor: '#FBFBFD', borderColor: '#E5E5E7' }}
          >
            <span
              className="text-[12px] font-medium"
              style={{ color: '#86868B' }}
            >
              Mostrando {Math.min(5, presenterMetrics.length)} de{' '}
              {presenterMetrics.length} apresentadores
            </span>
            <div className="flex gap-2">
              <button
                className="p-1.5 rounded-lg border bg-white hover:bg-gray-50 disabled:opacity-30"
                style={{ borderColor: '#E5E5E7' }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: '#1D1D1F' }}
                >
                  chevron_left
                </span>
              </button>
              <button
                className="p-1.5 rounded-lg border bg-white hover:bg-gray-50"
                style={{ borderColor: '#E5E5E7' }}
              >
                <span
                  className="material-symbols-outlined text-[18px]"
                  style={{ color: '#1D1D1F' }}
                >
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
