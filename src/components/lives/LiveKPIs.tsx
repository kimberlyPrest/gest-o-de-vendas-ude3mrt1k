import {
  ArrowDownIcon,
  ArrowUpIcon,
  DollarSign,
  Users,
  Activity,
  TrendingUp,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { LiveData } from '@/services/googleSheetsService'
import { cn } from '@/lib/utils'

interface LiveKPIsProps {
  data: LiveData[]
  previousData: LiveData[]
  loading: boolean
}

interface KPIProps {
  title: string
  value: string
  icon: React.ElementType
  trend?: number
  loading: boolean
  prefix?: string
  suffix?: string
}

const KPICard = ({
  title,
  value,
  icon: Icon,
  trend,
  loading,
  prefix = '',
  suffix = '',
}: KPIProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="rounded-full bg-primary/10 p-2">
          <Icon className="h-4 w-4 text-primary" />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-16" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">
              {prefix}
              {value}
              {suffix}
            </div>
            {trend !== undefined && !isNaN(trend) && (
              <p className="flex items-center text-xs text-muted-foreground mt-1">
                <span
                  className={cn(
                    'flex items-center font-medium mr-1',
                    trend > 0
                      ? 'text-emerald-500'
                      : trend < 0
                        ? 'text-red-500'
                        : 'text-gray-500',
                  )}
                >
                  {trend > 0 ? (
                    <ArrowUpIcon className="mr-1 h-3 w-3" />
                  ) : trend < 0 ? (
                    <ArrowDownIcon className="mr-1 h-3 w-3" />
                  ) : null}
                  {Math.abs(trend).toFixed(1)}%
                </span>
                vs. período anterior
              </p>
            )}
            {(trend === undefined || isNaN(trend)) && (
              <p className="text-xs text-muted-foreground mt-1">
                Sem dados anteriores
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}

export function LiveKPIs({ data, previousData, loading }: LiveKPIsProps) {
  // Helpers
  const sum = (dataset: LiveData[], key: keyof LiveData) =>
    dataset.reduce((acc, curr) => acc + (curr[key] as number), 0)

  const avg = (dataset: LiveData[], key: keyof LiveData) =>
    dataset.length ? sum(dataset, key) / dataset.length : 0

  // Metrics
  const metrics = {
    sales: {
      current: sum(data, 'sales'),
      prev: sum(previousData, 'sales'),
    },
    revenue: {
      current: sum(data, 'revenue'),
      prev: sum(previousData, 'revenue'),
    },
    conversion: {
      current: avg(data, 'conversionRate'),
      prev: avg(previousData, 'conversionRate'),
    },
    peak: {
      current: avg(data, 'peakViewers'),
      prev: avg(previousData, 'peakViewers'),
    },
  }

  const calculateTrend = (curr: number, prev: number) => {
    if (!prev) return undefined
    return ((curr - prev) / prev) * 100
  }

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
      <KPICard
        title="Vendas Totais"
        value={metrics.sales.current.toLocaleString('pt-BR')}
        icon={TrendingUp}
        trend={calculateTrend(metrics.sales.current, metrics.sales.prev)}
        loading={loading}
      />
      <KPICard
        title="Faturamento Total"
        value={formatCurrency(metrics.revenue.current)}
        prefix="R$ "
        icon={DollarSign}
        trend={calculateTrend(metrics.revenue.current, metrics.revenue.prev)}
        loading={loading}
      />
      <KPICard
        title="Taxa de Conversão"
        value={metrics.conversion.current.toFixed(1)}
        suffix="%"
        icon={Activity}
        trend={calculateTrend(
          metrics.conversion.current,
          metrics.conversion.prev,
        )}
        loading={loading}
      />
      <KPICard
        title="Pico Médio"
        value={Math.round(metrics.peak.current).toLocaleString('pt-BR')}
        icon={Users}
        trend={calculateTrend(metrics.peak.current, metrics.peak.prev)}
        loading={loading}
      />
    </div>
  )
}
