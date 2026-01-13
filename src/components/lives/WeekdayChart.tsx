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

interface WeekdayChartProps {
  data: LiveData[]
  loading: boolean
}

const WEEKDAYS_ORDER = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
]

// Mapping because mock data might use short or different names, but assume consistent from service
// The mock generator uses `d.toLocaleDateString('pt-BR', { weekday: 'long' })` which gives "segunda-feira"
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

export function WeekdayChart({ data, loading }: WeekdayChartProps) {
  const chartData = useMemo(() => {
    const grouped = data.reduce<
      Record<
        string,
        {
          name: string
          totalSales: number
          totalRevenue: number
          count: number
        }
      >
    >((acc, curr) => {
      const day = normalizeWeekday(curr.weekday)
      if (!acc[day]) {
        acc[day] = {
          name: day,
          totalSales: 0,
          totalRevenue: 0,
          count: 0,
        }
      }
      acc[day].totalSales += curr.sales
      acc[day].totalRevenue += curr.revenue
      acc[day].count += 1
      return acc
    }, {})

    // Create array ensuring all weekdays are present (or just existing ones sorted)
    // User story implies we show performance per day, so let's show all days or sorted existing days.
    return WEEKDAYS_ORDER.map((day) => {
      const stats = grouped[day] || {
        name: day,
        totalSales: 0,
        totalRevenue: 0,
        count: 0,
      }
      return {
        name: day.split('-')[0], // Shorten for XAxis
        fullName: day,
        avgSales: stats.count ? Math.round(stats.totalSales / stats.count) : 0,
        avgRevenue: stats.count ? stats.totalRevenue / stats.count : 0,
        count: stats.count,
      }
    }).filter((d) => d.count > 0) // Optional: filter out days with no lives if desired
  }, [data])

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="rounded-lg border bg-white p-3 shadow-md text-sm">
          <p className="font-semibold mb-2 text-gray-900">{data.fullName}</p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-gray-500">Média de Vendas:</span>
              <span className="font-bold text-blue-600">{data.avgSales}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-500">Média de Fat.:</span>
              <span className="font-medium">
                R$ {data.avgRevenue.toLocaleString('pt-BR')}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-500">Total de Lives:</span>
              <span className="font-medium">{data.count}</span>
            </p>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return <Skeleton className="h-[350px] w-full rounded-xl" />
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-[350px] items-center justify-center text-gray-500">
        Dados insuficientes para gerar o gráfico.
      </div>
    )
  }

  return (
    <div className="h-[350px] w-full p-4">
      <h3 className="mb-6 text-lg font-semibold text-gray-800">
        Média de Vendas por Dia da Semana
      </h3>
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" axisLine={false} tickLine={false} dy={10} />
          <YAxis axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F3F4F6' }} />
          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={1} />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <Bar
            dataKey="avgSales"
            fill="url(#blueGradient)"
            radius={[6, 6, 0, 0]}
            barSize={50}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
