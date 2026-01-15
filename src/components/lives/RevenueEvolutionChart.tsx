import { useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
import { LiveData } from '@/services/googleSheetsService'
import { format, differenceInDays, addDays, parseISO } from 'date-fns'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchX, TrendingUp } from 'lucide-react'

interface RevenueEvolutionChartProps {
  currentData: LiveData[]
  previousData: LiveData[]
  comparisonEnabled: boolean
  dateRange: { from: Date; to: Date } | undefined
  loading: boolean
}

const chartConfig = {
  revenueCurrent: {
    label: 'Período Atual',
    color: 'hsl(var(--primary))',
  },
  revenuePrevious: {
    label: 'Período Anterior',
    color: 'hsl(var(--muted-foreground))',
  },
}

export function RevenueEvolutionChart({
  currentData,
  previousData,
  comparisonEnabled,
  dateRange,
  loading,
}: RevenueEvolutionChartProps) {
  const chartData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return []

    const daysSpan = differenceInDays(dateRange.to, dateRange.from) + 1

    const normalizedData = Array.from({ length: daysSpan }).map((_, index) => {
      const currentDayDate = addDays(dateRange.from, index)
      const dateStr = format(currentDayDate, 'yyyy-MM-dd')

      const currentLives = currentData.filter((d) => d.date.startsWith(dateStr))
      const revenueCurrent = currentLives.reduce(
        (acc, curr) => acc + curr.revenue,
        0,
      )

      return {
        date: dateStr,
        displayDate: format(currentDayDate, 'dd/MM'),
        revenueCurrent,
        revenuePrevious: 0,
      }
    })

    if (comparisonEnabled && previousData.length > 0) {
      const likelyPrevStart = addDays(dateRange.from, -daysSpan)

      previousData.forEach((item) => {
        const itemDate = parseISO(item.date)
        const dayOffset = differenceInDays(itemDate, likelyPrevStart)
        if (dayOffset >= 0 && dayOffset < normalizedData.length) {
          normalizedData[dayOffset].revenuePrevious += item.revenue
        }
      })
    }

    return normalizedData
  }, [currentData, previousData, comparisonEnabled, dateRange])

  if (loading)
    return <Skeleton className="h-[350px] w-full rounded-xl bg-card" />

  if (
    currentData.length === 0 &&
    (!comparisonEnabled || previousData.length === 0)
  ) {
    return (
      <div className="flex h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card text-muted-foreground">
        <SearchX className="mb-4 h-10 w-10 opacity-20" aria-hidden="true" />
        <p className="text-sm font-medium">Sem dados para o período</p>
      </div>
    )
  }

  return (
    <div className="h-[350px] w-full p-4 cyber-card">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="w-5 h-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-bold text-foreground font-display">
          Evolução de Faturamento
        </h3>
      </div>
      <ChartContainer config={chartConfig} className="h-[85%] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            accessibilityLayer
            role="graphics-document"
            aria-label="Gráfico de área mostrando a evolução do faturamento"
          >
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="hsl(var(--primary))"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="hsl(var(--border))"
            />
            <XAxis
              dataKey="displayDate"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              dy={10}
              minTickGap={30}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(val) =>
                val >= 1000 ? `R$ ${(val / 1000).toFixed(0)}k` : `R$ ${val}`
              }
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip
              content={
                <ChartTooltipContent
                  indicator="dot"
                  className="bg-popover border-border text-foreground"
                />
              }
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />

            {comparisonEnabled && (
              <Area
                type="monotone"
                dataKey="revenuePrevious"
                name="Período Anterior"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
                animationDuration={1000}
                connectNulls
              />
            )}
            <Area
              type="monotone"
              dataKey="revenueCurrent"
              name="Período Atual"
              stroke="hsl(var(--primary))"
              fill="url(#goldGradient)"
              strokeWidth={2}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
