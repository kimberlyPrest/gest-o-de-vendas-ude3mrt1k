import { useState } from 'react'
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  TooltipProps,
} from 'recharts'
import { ChartContainer } from '@/components/ui/chart'
import { Button } from '@/components/ui/button'
import { LiveData } from '@/services/googleSheetsService'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Skeleton } from '@/components/ui/skeleton'
import { RefreshCcw, SearchX } from 'lucide-react'

interface LiveChartProps {
  data: LiveData[]
  loading: boolean
}

const chartConfig = {
  sales: {
    label: 'Vendas',
    color: '#0071E3',
  },
  revenue: {
    label: 'Faturamento',
    color: '#34C759',
  },
}

export function LiveChart({ data, loading }: LiveChartProps) {
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null)
  const [left, setLeft] = useState<string | number>('dataMin')
  const [right, setRight] = useState<string | number>('dataMax')

  const zoom = () => {
    if (refAreaLeft === refAreaRight || refAreaRight === null) {
      setRefAreaLeft(null)
      setRefAreaRight(null)
      return
    }

    // Ensure left is always smaller than right
    let newLeft = refAreaLeft
    let newRight = refAreaRight
    if (newLeft && newRight && newLeft > newRight) {
      ;[newLeft, newRight] = [newRight, newLeft]
    }

    setRefAreaLeft(null)
    setRefAreaRight(null)
    setLeft(newLeft!)
    setRight(newRight!)
  }

  const zoomOut = () => {
    setLeft('dataMin')
    setRight('dataMax')
  }

  // Custom tooltip to show extra data
  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as LiveData
      return (
        <div className="rounded-lg border bg-white/95 backdrop-blur-md p-3 shadow-xl text-sm border-gray-100">
          <p className="font-semibold mb-2 text-gray-900">
            {format(new Date(item.date), "dd 'de' MMMM, yyyy", {
              locale: ptBR,
            })}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
            <span className="text-gray-500">Dia:</span>
            <span className="font-medium text-gray-900">{item.weekday}</span>
            <span className="text-gray-500">Apresentador:</span>
            <span className="font-medium text-gray-900">{item.presenter}</span>
            <span className="text-[#0071E3] font-medium">Vendas:</span>
            <span className="font-bold text-[#0071E3]">{item.sales}</span>
            <span className="text-[#34C759] font-medium">Faturamento:</span>
            <span className="font-bold text-[#34C759]">
              R$ {item.revenue.toLocaleString('pt-BR')}
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return <Skeleton className="h-[320px] w-full rounded-xl" />
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[320px] flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 text-gray-500">
        <SearchX className="mb-4 h-12 w-12 opacity-20" />
        <p className="text-lg font-medium">
          Nenhum dado no período selecionado
        </p>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      {left !== 'dataMin' && (
        <Button
          variant="secondary"
          size="sm"
          onClick={zoomOut}
          className="absolute right-0 -top-12 z-10 h-7 text-xs bg-[#E5E5E7] hover:bg-[#D1D1D6] text-[#1D1D1F] border-none"
        >
          <RefreshCcw className="mr-2 h-3 w-3" />
          Resetar Zoom
        </Button>
      )}

      <div className="h-[320px] w-full select-none">
        <ChartContainer config={chartConfig} className="h-full w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              onMouseDown={(e) => e && setRefAreaLeft(e.activeLabel ?? null)}
              onMouseMove={(e) =>
                refAreaLeft && setRefAreaRight(e.activeLabel ?? null)
              }
              onMouseUp={zoom}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0071E3" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#0071E3" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#34C759" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#34C759" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#E5E5E7"
              />
              <XAxis
                dataKey="date"
                tickFormatter={(val) => format(new Date(val), 'dd/MM')}
                domain={[left, right]}
                type="category"
                allowDataOverflow
                tick={{ fill: '#86868B', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="#0071E3"
                tick={{ fill: '#0071E3', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dx={-10}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#34C759"
                tickFormatter={(val) => `R$${val / 1000}k`}
                tick={{ fill: '#34C759', fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                dx={10}
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: '#F5F5F7', opacity: 0.5 }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                iconType="circle"
                wrapperStyle={{
                  paddingBottom: '20px',
                  fontSize: '12px',
                  fontWeight: 500,
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name="Vendas"
                stroke="#0071E3"
                strokeWidth={2}
                dot={{ r: 3, fill: '#0071E3', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={500}
                fill="url(#colorSales)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                name="Faturamento"
                stroke="#34C759"
                strokeWidth={2}
                dot={{ r: 3, fill: '#34C759', strokeWidth: 0 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={500}
                fill="url(#colorRevenue)"
              />

              {refAreaLeft && refAreaRight ? (
                <ReferenceArea
                  yAxisId="left"
                  x1={refAreaLeft}
                  x2={refAreaRight}
                  strokeOpacity={0.3}
                  fill="#0071E3"
                  fillOpacity={0.1}
                />
              ) : null}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  )
}
