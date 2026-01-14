import { useEffect, useState, useMemo } from 'react'
import { LiveData } from '@/services/googleSheetsService'
import { useToast } from '@/hooks/use-toast'
import { useLivesStore } from '@/stores/livesStore'
import { AddLiveModal } from '@/components/lives/AddLiveModal'
import { LiveChart } from '@/components/lives/LiveChart'
import {
  differenceInDays,
  subDays,
  startOfDay,
  isWithinInterval,
  format,
  parseISO,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

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
  .material-symbols-outlined {
    font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
  }
`

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

interface WeekdayMetrics {
  weekday: string
  dayValue: number
  lives: number
  sales: number
  revenue: number
  avgConversion: number
}

type AnalysisTab = 'presenter' | 'weekday'

export default function Lives() {
  const { toast } = useToast()
  const { allData, loading, error, fetchData } = useLivesStore()

  // Filter state
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [selectedPresenter, setSelectedPresenter] = useState<string>('')
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])
  const [analysisTab, setAnalysisTab] = useState<AnalysisTab>('presenter')
  const [datePickerOpen, setDatePickerOpen] = useState(false)

  // Apply filters to data
  const filteredData = useMemo(() => {
    if (!allData.length) return []

    return allData.filter((item) => {
      const itemDate = startOfDay(parseISO(item.date))

      // Date Range Filter
      if (dateRange.from) {
        if (dateRange.to) {
          if (
            !isWithinInterval(itemDate, {
              start: startOfDay(dateRange.from),
              end: startOfDay(dateRange.to),
            })
          ) {
            return false
          }
        } else if (
          itemDate.getTime() !== startOfDay(dateRange.from).getTime()
        ) {
          return false
        }
      }

      // Presenter Filter
      if (selectedPresenter && item.presenter !== selectedPresenter) {
        return false
      }

      // Weekday Filter
      if (selectedWeekdays.length > 0) {
        const dayOfWeek = itemDate.getDay()
        if (!selectedWeekdays.includes(dayOfWeek)) {
          return false
        }
      }

      return true
    })
  }, [allData, dateRange, selectedPresenter, selectedWeekdays])

  // Get unique presenters
  const uniquePresenters = useMemo(() => {
    return Array.from(new Set(allData.map((d) => d.presenter))).sort()
  }, [allData])

  // Calculate presenter metrics
  const presenterMetrics = useMemo(() => {
    const grouped = filteredData.reduce<Record<string, PresenterMetrics>>(
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

    return Object.values(grouped)
      .map((p) => ({
        ...p,
        conversion: p.lives ? p.conversion / p.lives : 0,
        retention: p.lives ? p.retention / p.lives : 0,
      }))
      .sort((a, b) => b.sales - a.sales)
  }, [filteredData])

  // Calculate weekday metrics
  const weekdayMetrics = useMemo(() => {
    const dayNames = [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado',
    ]
    const grouped = filteredData.reduce<Record<number, WeekdayMetrics>>(
      (acc, curr) => {
        const dayValue = new Date(curr.date).getDay()
        if (!acc[dayValue]) {
          acc[dayValue] = {
            weekday: dayNames[dayValue],
            dayValue,
            lives: 0,
            sales: 0,
            revenue: 0,
            avgConversion: 0,
          }
        }
        acc[dayValue].lives += 1
        acc[dayValue].sales += curr.sales
        acc[dayValue].revenue += curr.revenue
        acc[dayValue].avgConversion += curr.conversionRate
        return acc
      },
      {},
    )

    return Object.values(grouped)
      .map((d) => ({
        ...d,
        avgConversion: d.lives ? d.avgConversion / d.lives : 0,
      }))
      .sort((a, b) => b.sales - a.sales)
  }, [filteredData])

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

  // Calculate KPIs
  const kpis = useMemo(() => {
    const sum = (dataset: LiveData[], key: keyof LiveData) =>
      dataset.reduce((acc, curr) => acc + (curr[key] as number), 0)

    const avg = (dataset: LiveData[], key: keyof LiveData) =>
      dataset.length ? sum(dataset, key) / dataset.length : 0

    const currentSales = sum(filteredData, 'sales')
    const currentRevenue = sum(filteredData, 'revenue')
    const currentConversion = avg(filteredData, 'conversionRate')
    const currentPeak = Math.max(...filteredData.map((d) => d.peakViewers), 0)

    return {
      sales: { value: currentSales },
      revenue: { value: currentRevenue },
      conversion: { value: currentConversion },
      peak: { value: currentPeak },
    }
  }, [filteredData])

  useEffect(() => {
    if (allData.length === 0) fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLiveAdded = () => {
    fetchData()
  }

  const toggleWeekday = (value: number) => {
    setSelectedWeekdays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    )
  }

  const formatCurrency = (value: number) => {
    if (value >= 1000) {
      return `R$ ${Math.round(value / 1000)}k`
    }
    return `R$ ${value.toLocaleString('pt-BR')}`
  }

  const formatFullCurrency = (value: number) => {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const dateRangeText =
    dateRange.from && dateRange.to
      ? `${format(dateRange.from, 'dd MMM, yyyy', { locale: ptBR })} - ${format(dateRange.to, 'dd MMM, yyyy', { locale: ptBR })}`
      : dateRange.from
        ? format(dateRange.from, 'dd MMM, yyyy', { locale: ptBR })
        : 'Selecione a data'

  if (error) {
    return (
      <>
        <style>{appleStyles}</style>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
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
            <span className="material-symbols-outlined text-[20px]">
              refresh
            </span>
            Tentar Novamente
          </button>
        </div>
      </>
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
        className="flex-1 p-10 max-w-[1600px] mx-auto w-full"
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
          {/* Date Range Picker */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#86868B' }}
            >
              Período
            </label>
            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <button
                  className="flex items-center gap-3 px-3 py-2 border rounded-lg cursor-pointer"
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
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={{
                    from: dateRange.from,
                    to: dateRange.to,
                  }}
                  onSelect={(range) => {
                    if (range?.from && range?.to) {
                      setDateRange({ from: range.from, to: range.to })
                      setDatePickerOpen(false)
                    } else if (range?.from) {
                      setDateRange({ from: range.from, to: range.from })
                    } else {
                      // Handle reset or empty selection if needed
                    }
                  }}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Presenter Filter */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#86868B' }}
            >
              Apresentador
            </label>
            <select
              className="text-[13px] font-medium px-3 py-2 border rounded-lg focus:ring-0 min-w-[200px]"
              style={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderColor: '#E5E5E7',
                color: '#1D1D1F',
              }}
              value={selectedPresenter}
              onChange={(e) => setSelectedPresenter(e.target.value)}
            >
              <option value="">Todos os Apresentadores</option>
              {uniquePresenters.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          {/* Weekday Quick Filter */}
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

          {/* Results count */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] font-semibold uppercase tracking-wider ml-1"
              style={{ color: '#86868B' }}
            >
              Resultados
            </label>
            <div
              className="px-4 py-2 rounded-xl text-[13px] font-semibold"
              style={{
                backgroundColor: 'rgba(0, 113, 227, 0.08)',
                color: '#0071E3',
              }}
            >
              {filteredData.length} Lives
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
            </div>
            <p
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: '#86868B' }}
            >
              Conversão Média
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
            </div>
            <p
              className="text-[12px] font-semibold uppercase tracking-wider"
              style={{ color: '#86868B' }}
            >
              Pico Máximo
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3
                className="text-[20px] font-semibold tracking-tight"
                style={{ color: '#1D1D1F' }}
              >
                Performance
              </h3>
              <p className="text-[14px]" style={{ color: '#86868B' }}>
                Faturamento e Retenção por dia
              </p>
            </div>
            <div className="flex gap-6">{/* Legend moved to LiveChart */}</div>
          </div>

          <LiveChart data={filteredData} loading={loading} />

          <div className="flex justify-between mt-6 px-1">
            {dateRange.from && (
              <span
                className="text-[11px] font-semibold uppercase"
                style={{ color: '#86868B' }}
              >
                {format(dateRange.from, 'dd MMM', { locale: ptBR })}
              </span>
            )}
            {dateRange.to && (
              <span
                className="text-[11px] font-semibold uppercase"
                style={{ color: '#86868B' }}
              >
                {format(dateRange.to, 'dd MMM', { locale: ptBR })}
              </span>
            )}
          </div>
        </section>

        {/* Analysis Section - Tabs */}
        <section className="apple-card overflow-hidden mb-8">
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
                onClick={() => setAnalysisTab('presenter')}
                className="pb-3 border-b-2 text-[14px] font-semibold transition-all"
                style={{
                  borderColor:
                    analysisTab === 'presenter' ? '#0071E3' : 'transparent',
                  color: analysisTab === 'presenter' ? '#1D1D1F' : '#86868B',
                }}
              >
                Por Palestrante
              </button>
              <button
                onClick={() => setAnalysisTab('weekday')}
                className="pb-3 border-b-2 text-[14px] font-medium transition-all"
                style={{
                  borderColor:
                    analysisTab === 'weekday' ? '#0071E3' : 'transparent',
                  color: analysisTab === 'weekday' ? '#1D1D1F' : '#86868B',
                }}
              >
                Por Dia
              </button>
            </div>
          </div>

          {/* Presenter Tab */}
          {analysisTab === 'presenter' && (
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
                    presenterMetrics.map((row) => (
                      <tr
                        key={row.presenter}
                        className="hover:bg-black/[0.01] transition-colors"
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
          )}

          {/* Weekday Tab */}
          {analysisTab === 'weekday' && (
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
                    <th className="px-8 py-5">Dia da Semana</th>
                    <th className="px-6 py-5">Lives</th>
                    <th className="px-6 py-5">Vendas</th>
                    <th className="px-6 py-5">Faturamento</th>
                    <th className="px-8 py-5 text-right">Conversão Média</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: '#E5E5E7' }}>
                  {weekdayMetrics.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-8 py-12 text-center"
                        style={{ color: '#86868B' }}
                      >
                        Nenhum dado disponível
                      </td>
                    </tr>
                  ) : (
                    weekdayMetrics.map((row, idx) => (
                      <tr
                        key={row.dayValue}
                        className="hover:bg-black/[0.01] transition-colors"
                        style={{ borderColor: '#E5E5E7' }}
                      >
                        <td className="px-8 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="size-9 rounded-full flex items-center justify-center"
                              style={{
                                backgroundColor:
                                  idx === 0 ? '#ECFDF5' : '#F5F5F7',
                                color: idx === 0 ? '#34C759' : '#86868B',
                              }}
                            >
                              <span className="material-symbols-outlined text-[18px]">
                                calendar_today
                              </span>
                            </div>
                            <span
                              className="text-[14px] font-medium"
                              style={{ color: '#1D1D1F' }}
                            >
                              {row.weekday}
                            </span>
                            {idx === 0 && (
                              <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-semibold"
                                style={{
                                  backgroundColor: '#ECFDF5',
                                  color: '#34C759',
                                }}
                              >
                                Melhor dia
                              </span>
                            )}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 text-[14px]"
                          style={{ color: '#1D1D1F' }}
                        >
                          {row.lives}
                        </td>
                        <td
                          className="px-6 py-4 text-[14px]"
                          style={{ color: '#1D1D1F' }}
                        >
                          {row.sales}
                        </td>
                        <td
                          className="px-6 py-4 text-[14px]"
                          style={{ color: '#1D1D1F' }}
                        >
                          {formatFullCurrency(row.revenue)}
                        </td>
                        <td
                          className="px-8 py-4 text-[14px] text-right"
                          style={{ color: '#1D1D1F' }}
                        >
                          {row.avgConversion.toFixed(1)}%
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Complete Lives List */}
        <section className="apple-card overflow-hidden">
          <div className="px-8 pt-8 pb-4">
            <h3
              className="text-[18px] font-semibold tracking-tight mb-2"
              style={{ color: '#1D1D1F' }}
            >
              Lista Completa de Lives
            </h3>
            <p className="text-[14px]" style={{ color: '#86868B' }}>
              Todas as lives do período selecionado com métricas detalhadas
            </p>
          </div>

          <div className="overflow-x-auto">
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
                  <th className="px-6 py-4">Data</th>
                  <th className="px-4 py-4">Dia da Semana</th>
                  <th className="px-4 py-4">Apresentador</th>
                  <th className="px-4 py-4 text-right">Pico</th>
                  <th className="px-4 py-4 text-right">Retidos</th>
                  <th className="px-4 py-4 text-right">Vendas</th>
                  <th className="px-4 py-4 text-right">Conversão</th>
                  <th className="px-4 py-4 text-right">Retenção</th>
                  <th className="px-4 py-4 text-right">Faturamento</th>
                  <th className="px-6 py-4 text-right">Assentos Adic.</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: '#E5E5E7' }}>
                {loading ? (
                  [...Array(10)].map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {[...Array(10)].map((_, j) => (
                        <td key={j} className="px-4 py-3">
                          <div className="h-4 bg-gray-200 rounded w-16"></div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td
                      colSpan={10}
                      className="px-8 py-12 text-center"
                      style={{ color: '#86868B' }}
                    >
                      Nenhuma live encontrada para o período selecionado
                    </td>
                  </tr>
                ) : (
                  [...filteredData].reverse().map((live, idx) => (
                    <tr
                      key={`${live.date}-${idx}`}
                      className="hover:bg-black/[0.01] transition-colors"
                      style={{ borderColor: '#E5E5E7' }}
                    >
                      <td
                        className="px-6 py-3 text-[13px] font-medium"
                        style={{ color: '#1D1D1F' }}
                      >
                        {format(parseISO(live.date), 'dd/MM/yyyy')}
                      </td>
                      <td
                        className="px-4 py-3 text-[13px]"
                        style={{ color: '#86868B' }}
                      >
                        {live.weekday}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className="text-[12px] px-2 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: 'rgba(0, 113, 227, 0.08)',
                            color: '#0071E3',
                          }}
                        >
                          {live.presenter}
                        </span>
                      </td>
                      <td
                        className="px-4 py-3 text-[13px] text-right"
                        style={{ color: '#1D1D1F' }}
                      >
                        {live.peakViewers.toLocaleString('pt-BR')}
                      </td>
                      <td
                        className="px-4 py-3 text-[13px] text-right"
                        style={{ color: '#1D1D1F' }}
                      >
                        {live.retainedViewers.toLocaleString('pt-BR')}
                      </td>
                      <td
                        className="px-4 py-3 text-[13px] text-right font-semibold"
                        style={{ color: '#1D1D1F' }}
                      >
                        {live.sales}
                      </td>
                      <td
                        className="px-4 py-3 text-[13px] text-right"
                        style={{
                          color:
                            live.conversionRate >= 3 ? '#34C759' : '#FF9500',
                        }}
                      >
                        {live.conversionRate.toFixed(1)}%
                      </td>
                      <td
                        className="px-4 py-3 text-[13px] text-right"
                        style={{
                          color:
                            live.retentionRate >= 60 ? '#34C759' : '#FF9500',
                        }}
                      >
                        {live.retentionRate.toFixed(1)}%
                      </td>
                      <td
                        className="px-4 py-3 text-[13px] text-right font-semibold"
                        style={{ color: '#34C759' }}
                      >
                        {formatFullCurrency(live.revenue)}
                      </td>
                      <td
                        className="px-6 py-3 text-[13px] text-right"
                        style={{ color: '#1D1D1F' }}
                      >
                        {live.additionalSeats}
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
              Mostrando {filteredData.length} lives
            </span>
          </div>
        </section>
      </div>
    </>
  )
}
