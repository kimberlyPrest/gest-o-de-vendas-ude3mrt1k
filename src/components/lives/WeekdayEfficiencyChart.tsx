import { useMemo } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts'
import { LiveData } from '@/services/googleSheetsService'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar } from 'lucide-react'

interface WeekdayEfficiencyChartProps {
  data: LiveData[]
  loading: boolean
}

const WEEKDAYS_ORDER = [
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
  'Domingo',
]

const normalizeWeekday = (w: string) => {
  const lower = w.toLowerCase()
  if (lower.includes('segunda')) return 'Segunda-feira'
  if (lower.includes('terça')) return 'Terça-feira'
  if (lower.includes('quarta')) return 'Quarta-feira'
  if (lower.includes('quinta')) return 'Quinta-feira'
  if (lower.includes('sexta')) return 'Sexta-feira'
  if (lower.includes('sábado')) return 'Sábado'
  if (lower.includes('domingo')) return 'Domingo'
  return w
}

export function WeekdayEfficiencyChart({
  data,
  loading,
}: WeekdayEfficiencyChartProps) {
  const chartData = useMemo(() => {
    const grouped = data.reduce<
      Record<
        string,
        {
          name: string
          totalConversion: number
          count: number
        }
      >
    >((acc, curr) => {
      const day = normalizeWeekday(curr.weekday)
      if (!acc[day]) {
        acc[day] = {
          name: day,
          totalConversion: 0,
          count: 0,
        }
      }
      acc[day].totalConversion += curr.conversionRate
      acc[day].count += 1
      return acc
    }, {})

    return WEEKDAYS_ORDER.map((day) => {
      const stats = grouped[day]
      if (!stats) return null
      return {
        name: day.replace('-feira', ''),
        fullName: day,
        avgConversion: stats.totalConversion / stats.count,
        count: stats.count,
      }
    }).filter((d): d is NonNullable<typeof d> => d !== null)
  }, [data])

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border border-border bg-popover p-3 shadow-xl text-sm">
          <p className="font-semibold mb-2 text-foreground font-display">
            {data.fullName}
          </p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Conversão Média:</span>
              <span className="font-bold text-chart-2">
                {data.avgConversion.toFixed(1)}%
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-muted-foreground">Total de Lives:</span>
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
        <Calendar className="w-5 h-5 text-chart-2" aria-hidden="true" />
        <h3 className="text-lg font-bold text-foreground font-display">
          Eficiência por Dia
        </h3>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={chartData}
          accessibilityLayer
          role="graphics-document"
          aria-label="Gráfico de barras mostrando a eficiência por dia da semana"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="hsl(var(--border))"
          />
          <XAxis
            dataKey="name"
            axisLine={false}
            tickLine={false}
            dy={10}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value.toFixed(0)}%`}
            tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'hsl(var(--muted))', opacity: 0.4 }}
          />
          <defs>
            <linearGradient id="jadeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="hsl(var(--chart-2))"
                stopOpacity={1}
              />
              <stop offset="100%" stopColor="#10B981" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="avgConversion"
            fill="url(#jadeGradient)"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
