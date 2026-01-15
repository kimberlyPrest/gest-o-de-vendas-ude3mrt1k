import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  TooltipProps,
} from 'recharts'
import { LiveData } from '@/services/googleSheetsService'
import { Skeleton } from '@/components/ui/skeleton'
import { Trophy } from 'lucide-react'

interface HostPerformanceChartProps {
  data: LiveData[]
  loading: boolean
}

export function HostPerformanceChart({
  data,
  loading,
}: HostPerformanceChartProps) {
  const chartData = useMemo(() => {
    const grouped = data.reduce<
      Record<
        string,
        {
          presenter: string
          totalConversion: number
          count: number
          totalRevenue: number
        }
      >
    >((acc, curr) => {
      if (!acc[curr.presenter]) {
        acc[curr.presenter] = {
          presenter: curr.presenter,
          totalConversion: 0,
          count: 0,
          totalRevenue: 0,
        }
      }
      acc[curr.presenter].totalConversion += curr.conversionRate
      acc[curr.presenter].totalRevenue += curr.revenue
      acc[curr.presenter].count += 1
      return acc
    }, {})

    return Object.values(grouped)
      .map((item) => ({
        presenter: item.presenter,
        avgConversion: item.totalConversion / item.count,
        totalRevenue: item.totalRevenue,
        count: item.count,
      }))
      .sort((a, b) => b.avgConversion - a.avgConversion)
  }, [data])

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border border-border bg-popover p-3 shadow-xl text-sm">
          <p className="font-semibold mb-2 text-foreground font-display">
            {data.presenter}
          </p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Conversão Média:</span>
              <span className="font-bold text-primary">
                {data.avgConversion.toFixed(1)}%
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Faturamento Total:</span>
              <span className="font-medium text-foreground">
                R$ {data.totalRevenue.toLocaleString('pt-BR')}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Lives Realizadas:</span>
              <span className="font-medium text-foreground">{data.count}</span>
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
    <div className="h-[350px] w-full p-4 cyber-card">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-5 h-5 text-primary" aria-hidden="true" />
        <h3 className="text-lg font-bold text-foreground font-display">
          Ranking de Conversão
        </h3>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ left: 10 }}
          accessibilityLayer
          role="graphics-document"
          aria-label="Gráfico de barras mostrando o ranking de conversão por apresentador"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis type="number" hide />
          <YAxis
            dataKey="presenter"
            type="category"
            axisLine={false}
            tickLine={false}
            width={100}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
          />
          <Bar dataKey="avgConversion" radius={[0, 4, 4, 0]} barSize={32}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill="hsl(var(--primary))"
                fillOpacity={1 - index * 0.15}
                style={{
                  filter: `brightness(${1 - index * 0.05})`,
                }}
                stroke="none"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
