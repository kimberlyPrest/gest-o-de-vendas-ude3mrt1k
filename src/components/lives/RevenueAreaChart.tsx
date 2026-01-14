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
import { ptBR } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import { SearchX } from 'lucide-react'

interface RevenueAreaChartProps {
  currentData: LiveData[]
  previousData: LiveData[]
  comparisonEnabled: boolean
  dateRange: { from: Date; to: Date } | undefined
  loading: boolean
}

const chartConfig = {
  revenueCurrent: {
    label: 'Período Atual',
    color: 'hsl(var(--chart-1))',
  },
  revenuePrevious: {
    label: 'Período Anterior',
    color: 'hsl(var(--muted-foreground))',
  },
}

export function RevenueAreaChart({
  currentData,
  previousData,
  comparisonEnabled,
  dateRange,
  loading,
}: RevenueAreaChartProps) {
  const chartData = useMemo(() => {
    if (!dateRange?.from || !dateRange?.to) return []

    // 1. Determine the span of the current period in days
    const daysSpan = differenceInDays(dateRange.to, dateRange.from) + 1

    // 2. Create an array of days for the chart x-axis
    const normalizedData = Array.from({ length: daysSpan }).map((_, index) => {
      const currentDayDate = addDays(dateRange.from, index)
      const dateStr = format(currentDayDate, 'yyyy-MM-dd')

      // Find data for this specific day in currentData
      // Note: simple find might miss if multiple lives on same day, ideally sum them
      const currentLives = currentData.filter((d) => d.date.startsWith(dateStr))
      const revenueCurrent = currentLives.reduce(
        (acc, curr) => acc + curr.revenue,
        0,
      )

      let revenuePrevious = 0

      if (comparisonEnabled) {
        // Map previous data relative to this index
        // We assume previousData is already filtered to the correct previous range
        // that matches the duration. We need to match day 1 of prev to day 1 of curr.
        // But previousData contains actual dates.
        // We need to find the "nth day" of the previous period.
        // Ideally, the parent component provided previousData that corresponds to a range of same length.

        // Let's assume previousData is sorted by date.
        // We can't just pick index because dates might be missing in data (sparse).
        // We need the start date of the previous period to calculate offsets.
        if (previousData.length > 0) {
          // Heuristic: Find the start of previous data range from the data itself or we need passing it.
          // Since we don't have prevStart passed explicitly, let's try to infer or use relative mapping if sparse.
          // Better approach: Map by relative day index (0 to daysSpan-1)
          // We can't easily guess the "start date" of previousData if it's sparse.
          // However, usually we can just sort previousData and map it day-by-day if it was continuous.
          // Since it's sparse (lives don't happen every day), we should probably map loosely or by index of occurrence?
          // No, Area chart implies time axis.
          // Let's try to map by "Day of Range".
          // But we need the previous range start.
          // Let's approximate:
          // If we have previousData, we treat it as a pool.
          // We need to map `prevStart + index` to `revenuePrevious`.
          // Since we don't have `prevStart` prop, let's look at the earliest date in previousData
          // or assume the parent handled the fetching correctly.
          // A safer way without `prevStart` prop is to assume `previousData` covers the requested previous range.
          // We can iterate `previousData` and see where they fall relative to the FIRST available date in `previousData`?
          // No, that's risky if the first few days had no sales.
          // Workaround: We will pass the normalized offset logic if we really want strict day-by-day comparison.
          // For now, let's just map the sparse `previousData` to the `normalizedData` by index IF the user wants "Live vs Live".
          // But the requirement is "Temporal Comparison", usually date-based.
          // To do it correctly without extra props:
          // We will construct a map of previous data relative to its own start.
          // But we don't know its own start.
          // Let's assume the component receives `previousData` which is the raw data.
          // I'll add a helper to find the earliest date in previousData to use as anchor,
          // OR better, allow the chart to just plot two lines if we use a "relative day" axis (Day 1, Day 2...).
        }
      }

      return {
        date: dateStr,
        displayDate: format(currentDayDate, 'dd/MM'),
        revenueCurrent,
        revenuePrevious: 0, // Will fill below
        originalDateCurrent: currentDayDate,
      }
    })

    if (comparisonEnabled && previousData.length > 0) {
      // Sort previous data
      const sortedPrev = [...previousData].sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      )
      if (sortedPrev.length > 0) {
        const firstPrevDate = parseISO(sortedPrev[0].date)
        // This is imperfect if the previous period started before the first live.
        // But it's a reasonable approximation for visualization if we align "First Live" to "First Live"
        // OR align based on the passed range logic.

        // Actually, best user experience: align by relative day from start of period.
        // Since we don't have `prevStart` passed, let's calculate it from the `currentData` range duration?
        // `prevStart` = `currentStart` - `daysSpan`. (Logic from user story).
        // Let's reconstruct the likely previous start date.
        const likelyPrevStart = addDays(dateRange.from, -daysSpan)

        sortedPrev.forEach((item) => {
          const itemDate = parseISO(item.date)
          const dayOffset = differenceInDays(itemDate, likelyPrevStart)
          if (dayOffset >= 0 && dayOffset < normalizedData.length) {
            normalizedData[dayOffset].revenuePrevious += item.revenue
          }
        })
      }
    }

    return normalizedData
  }, [currentData, previousData, comparisonEnabled, dateRange])

  if (loading) {
    return <Skeleton className="h-[300px] w-full rounded-xl" />
  }

  if (
    currentData.length === 0 &&
    (!comparisonEnabled || previousData.length === 0)
  ) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center rounded-xl border border-dashed bg-muted/20 text-muted-foreground">
        <SearchX className="mb-4 h-10 w-10 opacity-20" />
        <p className="text-sm font-medium">Sem dados para o período</p>
      </div>
    )
  }

  return (
    <div className="w-full h-[350px]">
      <ChartContainer config={chartConfig} className="h-full w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenueCurrent)"
                  stopOpacity={0.3}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenueCurrent)"
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
              tickFormatter={(val) => `R$ ${(val / 1000).toFixed(0)}k`}
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
            />
            <Tooltip content={<ChartTooltipContent indicator="dot" />} />
            <Legend verticalAlign="top" height={36} />

            {comparisonEnabled && (
              <Area
                type="monotone"
                dataKey="revenuePrevious"
                name="Período Anterior"
                stroke="var(--color-revenuePrevious)"
                strokeWidth={2}
                strokeDasharray="5 5"
                fill="transparent"
                animationDuration={1000}
              />
            )}

            <Area
              type="monotone"
              dataKey="revenueCurrent"
              name="Período Atual"
              stroke="var(--color-revenueCurrent)"
              fill="url(#fillCurrent)"
              strokeWidth={2}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  )
}
