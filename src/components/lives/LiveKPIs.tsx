import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Percent,
  CalendarCheck,
  Video,
  BarChart3,
  Users,
  Trophy,
  Award,
  ArrowUpIcon,
  ArrowDownIcon,
  Minus,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LiveData } from '@/services/googleSheetsService'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface LiveKPIsProps {
  currentData: LiveData[]
  previousData: LiveData[]
  comparisonEnabled: boolean
  loading: boolean
}

interface KPIItem {
  id: string
  title: string
  icon: React.ElementType
  value: string | number
  subValue?: string
  trend?: number
  variant?: 'default' | 'accent' | 'primary'
}

export function LiveKPIs({
  currentData,
  previousData,
  comparisonEnabled,
  loading,
}: LiveKPIsProps) {
  // Helper for summing
  const sum = (data: LiveData[], key: keyof LiveData) =>
    data.reduce((acc, curr) => acc + (curr[key] as number), 0)

  // Helper for averaging
  const avg = (data: LiveData[], key: keyof LiveData) =>
    data.length ? sum(data, key) / data.length : 0

  // Calculate Metrics
  const totalRevenue = sum(currentData, 'revenue')
  const totalSales = sum(currentData, 'sales')
  const totalLives = currentData.length
  const avgRevPerLive = totalLives ? totalRevenue / totalLives : 0
  const avgConversion = avg(currentData, 'conversionRate')
  const avgSalesPerLive = totalLives ? totalSales / totalLives : 0
  const avgRetention = avg(currentData, 'retentionRate')

  // Best Day (Highest Avg Conversion)
  const daysMap = currentData.reduce(
    (acc, curr) => {
      if (!acc[curr.weekday]) acc[curr.weekday] = { sum: 0, count: 0 }
      acc[curr.weekday].sum += curr.conversionRate
      acc[curr.weekday].count += 1
      return acc
    },
    {} as Record<string, { sum: number; count: number }>,
  )

  let bestDay = 'N/A'
  let bestDayAvg = 0
  Object.entries(daysMap).forEach(([day, stats]) => {
    const avgVal = stats.sum / stats.count
    if (avgVal > bestDayAvg) {
      bestDayAvg = avgVal
      bestDay = day
    }
  })

  // Records
  const maxSalesRecord = currentData.reduce(
    (max, curr) => (curr.sales > max.sales ? curr : max),
    { sales: 0 } as any,
  )
  const maxConvRecord = currentData.reduce(
    (max, curr) => (curr.conversionRate > max.conversionRate ? curr : max),
    { conversionRate: 0 } as any,
  )

  // Comparison Metrics
  const getTrend = (current: number, previous: number) => {
    if (!comparisonEnabled || !previous) return undefined
    return ((current - previous) / previous) * 100
  }

  const prevRevenue = sum(previousData, 'revenue')
  const prevSales = sum(previousData, 'sales')
  const prevLives = previousData.length
  const prevAvgRev = prevLives ? prevRevenue / prevLives : 0
  const prevAvgConv = avg(previousData, 'conversionRate')
  const prevAvgSales = prevLives ? prevSales / prevLives : 0
  const prevAvgRet = avg(previousData, 'retentionRate')

  // Formatting helpers
  const fmtMoney = (v: number) =>
    `R$ ${v.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}`
  const fmtNum = (v: number) => v.toLocaleString('pt-BR')
  const fmtPct = (v: number) => `${v.toFixed(1)}%`

  const items: KPIItem[] = [
    {
      id: 'total-revenue',
      title: 'Faturamento Total',
      icon: DollarSign,
      value: fmtMoney(totalRevenue),
      trend: getTrend(totalRevenue, prevRevenue),
      variant: 'primary',
    },
    {
      id: 'total-sales',
      title: 'Total de Vendas',
      icon: ShoppingCart,
      value: fmtNum(totalSales),
      trend: getTrend(totalSales, prevSales),
    },
    {
      id: 'avg-rev',
      title: 'Fat. Médio por Live',
      icon: TrendingUp,
      value: fmtMoney(avgRevPerLive),
      trend: getTrend(avgRevPerLive, prevAvgRev),
    },
    {
      id: 'avg-conv',
      title: 'Conversão Média',
      icon: Percent,
      value: fmtPct(avgConversion),
      trend: getTrend(avgConversion, prevAvgConv),
    },
    {
      id: 'best-day',
      title: 'Melhor Dia',
      icon: CalendarCheck,
      value: bestDay,
      subValue: `Conv. média: ${fmtPct(bestDayAvg)}`,
    },
    {
      id: 'total-lives',
      title: 'Total de Lives',
      icon: Video,
      value: totalLives,
      trend: getTrend(totalLives, prevLives),
    },
    {
      id: 'avg-sales',
      title: 'Média Vendas/Live',
      icon: BarChart3,
      value: fmtNum(Math.round(avgSalesPerLive)),
      trend: getTrend(avgSalesPerLive, prevAvgSales),
    },
    {
      id: 'avg-ret',
      title: 'Retenção Média',
      icon: Users,
      value: fmtPct(avgRetention),
      trend: getTrend(avgRetention, prevAvgRet),
    },
    {
      id: 'rec-sales',
      title: 'Recorde Vendas',
      icon: Trophy,
      value: fmtNum(maxSalesRecord.sales || 0),
      subValue: maxSalesRecord.presenter
        ? `${maxSalesRecord.presenter} • ${format(new Date(maxSalesRecord.date), 'dd/MM')}`
        : '-',
      variant: 'accent',
    },
    {
      id: 'rec-conv',
      title: 'Recorde Conversão',
      icon: Award,
      value: fmtPct(maxSalesRecord.sales ? maxConvRecord.conversionRate : 0),
      subValue: maxConvRecord.presenter
        ? `${maxConvRecord.presenter} • ${format(new Date(maxConvRecord.date), 'dd/MM')}`
        : '-',
      variant: 'accent',
    },
  ]

  // Mock Quarterly Goal Progress
  const goalTarget = 2000000 // Mock: 2 million
  const goalProgress = Math.min((totalRevenue / goalTarget) * 100, 100)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <Card
          key={item.id}
          className={cn(
            'overflow-hidden transition-all hover:shadow-md relative',
            item.variant === 'primary' &&
              'border-blue-200 bg-blue-50/50 dark:bg-blue-950/20',
            item.variant === 'accent' &&
              'border-amber-200 bg-amber-50/50 dark:bg-amber-950/20',
          )}
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {item.title}
            </CardTitle>
            <item.icon
              className={cn(
                'h-4 w-4',
                item.variant === 'primary'
                  ? 'text-blue-600'
                  : item.variant === 'accent'
                    ? 'text-amber-600'
                    : 'text-gray-500',
              )}
            />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            {loading ? (
              <div className="space-y-2">
                <Skeleton className="h-7 w-20" />
                <Skeleton className="h-3 w-12" />
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold tracking-tight">
                  {item.value}
                </div>

                {item.subValue && (
                  <p
                    className="text-xs text-muted-foreground mt-1 truncate"
                    title={item.subValue}
                  >
                    {item.subValue}
                  </p>
                )}

                {item.trend !== undefined && (
                  <div className="flex items-center mt-1">
                    <span
                      className={cn(
                        'flex items-center text-xs font-medium',
                        item.trend > 0
                          ? 'text-emerald-600'
                          : item.trend < 0
                            ? 'text-red-600'
                            : 'text-gray-500',
                      )}
                    >
                      {item.trend > 0 ? (
                        <ArrowUpIcon className="mr-0.5 h-3 w-3" />
                      ) : item.trend < 0 ? (
                        <ArrowDownIcon className="mr-0.5 h-3 w-3" />
                      ) : (
                        <Minus className="mr-0.5 h-3 w-3" />
                      )}
                      {Math.abs(item.trend).toFixed(1)}%
                    </span>
                    <span className="text-[10px] text-muted-foreground ml-1.5">
                      vs anterior
                    </span>
                  </div>
                )}
              </>
            )}
          </CardContent>

          {/* Goal Progress Bar for Revenue only */}
          {item.id === 'total-revenue' && !loading && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-100">
              <div
                className="h-full bg-blue-500 transition-all duration-1000"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          )}
        </Card>
      ))}
    </div>
  )
}
