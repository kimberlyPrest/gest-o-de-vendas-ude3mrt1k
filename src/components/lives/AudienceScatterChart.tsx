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
        <div className="rounded-lg border border-[#333333] bg-[#1A1A1A] p-3 shadow-xl text-sm">
          <p className="font-semibold mb-2 text-white font-display">
            {data.presenter}
          </p>
          <p className="text-xs text-gray-400 mb-2">
            {new Date(data.date).toLocaleDateString('pt-BR')}
          </p>
          <div className="space-y-1">
            <p className="flex justify-between gap-4">
              <span className="text-gray-400">Pico de Audiência:</span>
              <span className="font-medium text-[#D9B979]">
                {data.peakViewers}
              </span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-400">Vendas:</span>
              <span className="font-medium text-white">{data.sales}</span>
            </p>
            <p className="flex justify-between gap-4">
              <span className="text-gray-400">Faturamento:</span>
              <span className="font-bold text-[#27E39F]">
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
    return <Skeleton className="h-[350px] w-full rounded-xl bg-[#333333]" />

  return (
    <div className="h-[350px] w-full p-4 cyber-card relative">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#D9B979]" />
          <h3 className="text-lg font-bold text-white font-display">
            Audiência vs Vendas
          </h3>
        </div>
        <TooltipProvider>
          <UITooltip>
            <TooltipTrigger>
              <HelpCircle className="w-4 h-4 text-gray-500 hover:text-gray-300" />
            </TooltipTrigger>
            <TooltipContent className="max-w-[300px] bg-[#1A1A1A] border-[#333333] text-gray-300">
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
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis
            type="number"
            dataKey="peakViewers"
            name="Audiência"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#A1A1AA', fontSize: 12 }}
            label={{
              value: 'Pico de Pessoas',
              position: 'bottom',
              offset: 0,
              fill: '#71717A',
              fontSize: 12,
            }}
          />
          <YAxis
            type="number"
            dataKey="sales"
            name="Vendas"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#A1A1AA', fontSize: 12 }}
            label={{
              value: 'Vendas',
              angle: -90,
              position: 'insideLeft',
              fill: '#71717A',
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
            fill="#D9B979"
            fillOpacity={0.6}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  )
}
