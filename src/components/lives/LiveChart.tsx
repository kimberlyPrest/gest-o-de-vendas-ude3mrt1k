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
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart'
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
    color: 'hsl(var(--chart-1))',
  },
  revenue: {
    label: 'Faturamento',
    color: 'hsl(var(--chart-2))',
  },
}

export function LiveChart({ data, loading }: LiveChartProps) {
  const [refAreaLeft, setRefAreaLeft] = useState<string | null>(null)
  const [refAreaRight, setRefAreaRight] = useState<string | null>(null)
  const [left, setLeft] = useState<string | number>('dataMin')
  const [right, setRight] = useState<string | number>('dataMax')
  const [top, setTop] = useState<string | number>('auto')
  const [bottom, setBottom] = useState<string | number>('auto')

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
    setTop('auto')
    setBottom('auto')
  }

  // Custom tooltip to show extra data
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload as LiveData
      return (
        <div className="rounded-lg border bg-white p-3 shadow-md text-sm">
          <p className="font-semibold mb-2">
            {format(new Date(item.date), "dd 'de' MMMM, yyyy", {
              locale: ptBR,
            })}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span className="text-gray-500">Dia:</span>
            <span className="font-medium">{item.weekday}</span>
            <span className="text-gray-500">Apresentador:</span>
            <span className="font-medium">{item.presenter}</span>
            <span className="text-blue-600">Vendas:</span>
            <span className="font-medium">{item.sales}</span>
            <span className="text-emerald-600">Faturamento:</span>
            <span className="font-medium">
              R$ {item.revenue.toLocaleString('pt-BR')}
            </span>
            <span className="text-gray-500">Conversão:</span>
            <span className="font-medium">{item.conversionRate}%</span>
            <span className="text-gray-500">Pico:</span>
            <span className="font-medium">{item.peakViewers}</span>
          </div>
        </div>
      )
    }
    return null
  }

  if (loading) {
    return <Skeleton className="h-[400px] w-full rounded-xl" />
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center rounded-xl border border-dashed bg-gray-50 text-gray-500">
        <SearchX className="mb-4 h-12 w-12 opacity-20" />
        <p className="text-lg font-medium">
          Nenhum dado no período selecionado
        </p>
        <p className="text-sm">Tente ajustar os filtros</p>
      </div>
    )
  }

  return (
    <div className="relative rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Evolução de Vendas e Faturamento
        </h3>
        {left !== 'dataMin' && (
          <Button
            variant="outline"
            size="sm"
            onClick={zoomOut}
            className="text-xs"
          >
            <RefreshCcw className="mr-2 h-3 w-3" />
            Resetar Zoom
          </Button>
        )}
      </div>

      <div className="h-[400px] w-full select-none">
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
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis
                dataKey="date"
                tickFormatter={(val) => format(new Date(val), 'dd/MM')}
                domain={[left, right]}
                type="category"
                allowDataOverflow
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-1))"
                label={{
                  value: 'Vendas',
                  angle: -90,
                  position: 'insideLeft',
                  style: { fill: 'hsl(var(--chart-1))' },
                }}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--chart-2))"
                tickFormatter={(val) => `R$${val / 1000}k`}
                label={{
                  value: 'Faturamento',
                  angle: 90,
                  position: 'insideRight',
                  style: { fill: 'hsl(var(--chart-2))' },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="top" height={36} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sales"
                name="Vendas"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                animationDuration={300}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="revenue"
                name="Faturamento"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 5 }}
                animationDuration={300}
              />

              {refAreaLeft && refAreaRight ? (
                <ReferenceArea
                  yAxisId="left"
                  x1={refAreaLeft}
                  x2={refAreaRight}
                  strokeOpacity={0.3}
                  fill="#8884d8"
                  fillOpacity={0.1}
                />
              ) : null}
            </ComposedChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <p className="mt-4 text-center text-xs text-muted-foreground">
        Clique e arraste no gráfico para dar zoom em um período específico
      </p>
    </div>
  )
}
