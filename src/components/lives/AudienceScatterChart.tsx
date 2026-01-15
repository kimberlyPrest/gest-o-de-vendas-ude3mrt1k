import { useMemo } from 'react'
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { LiveData } from '@/services/googleSheetsService'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, HelpCircle } from 'lucide-react'
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface AudienceScatterChartProps {
  data: LiveData[]
  loading: boolean
}

export function AudienceScatterChart({
  data,
  loading,
}: AudienceScatterChartProps) {
  const chartData = useMemo(() => {
    return data.map((live) => ({
      peakViewers: live.peakViewers,
      sales: live.sales,
      revenue: live.revenue,
      date: live.date,
      presenter: live.presenter,
    }))
  }, [data])

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border border-border bg-popover p-3 shadow-xl text-sm">
          <p className="font-semibold mb-2 text-foreground font-display">
            {data.presenter}
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            {new Date(data.date).toLocaleDateString('pt-BR')}
          </p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Pico de Audiência:</span>
              <span className="font-medium text-primary">
                {data.peakViewers}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Vendas:</span>
              <span className="font-medium text-foreground">{data.sales}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Faturamento:</span>
              <span className="font-bold text-chart-2">
                R$ {data.revenue.toLocaleString('pt-BR')}
              </span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading)
    return <Skeleton className="h-[350px] w-full rounded-xl bg-card" />

  return (
    <div className="h-[350px] w-full p-4 cyber-card relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" aria-hidden="true" />
          <h3 className="text-lg font-bold text-foreground font-display">
            Audiência vs Vendas
          </h3>
        </div>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger aria-label="Informações sobre o gráfico">
              <HelpCircle
                className="w-4 h-4 text-muted-foreground hover:text-foreground"
                aria-hidden="true"
              />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] bg-popover border-border text-popover-foreground">
              <p>
                Cada ponto representa uma live. <br />
                <strong>Horizontal:</strong> Pico de audiência <br />
                <strong>Vertical:</strong> Número de vendas <br />
                <strong>Tamanho:</strong> Faturamento. <br />
                Pontos no canto superior direito indicam lives com alta
                audiência e muitas vendas.
              </p>
            </TooltipContent>
          </UITooltip>
        </TooltipProvider>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <ScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
          accessibilityLayer
          role="graphics-document"
          aria-label="Gráfico de dispersão relacionando audiência e vendas"
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
            type="number"
            dataKey="peakViewers"
            name="Audiência"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            label={{
              value: 'Pico de Pessoas',
              position: 'bottom',
              offset: 0,
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
            }}
          />
          <YAxis
            type="number"
            dataKey="sales"
            name="Vendas"
            tickLine={false}
            axisLine={false}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            label={{
              value: 'Vendas',
              angle: -90,
              position: 'insideLeft',
              fill: 'hsl(var(--muted-foreground))',
              fontSize: 12,
            }}
          />
          <ZAxis
            type="number"
            dataKey="revenue"
            range={[60, 400]}
            name="Faturamento"
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: '3 3' }}
          />
          <Scatter
            name="Lives"
            data={chartData}
            fill="hsl(var(--primary))"
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
