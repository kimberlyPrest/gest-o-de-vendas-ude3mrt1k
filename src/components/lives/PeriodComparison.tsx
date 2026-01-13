import { useState, useMemo } from 'react'
import { LiveData } from '@/services/googleSheetsService'
import { DateRange } from 'react-day-picker'
import {
  format,
  isWithinInterval,
  startOfDay,
  subDays,
  subMonths,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Calendar as CalendarIcon,
  Minus,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface PeriodComparisonProps {
  allData: LiveData[]
}

export function PeriodComparison({ allData }: PeriodComparisonProps) {
  const [period1, setPeriod1] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 2),
    to: subMonths(new Date(), 1),
  })
  const [period2, setPeriod2] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  const getMetrics = (range: DateRange | undefined) => {
    if (!range?.from || !range?.to) return null
    const filtered = allData.filter((item) => {
      const itemDate = startOfDay(new Date(item.date))
      return isWithinInterval(itemDate, {
        start: startOfDay(range.from!),
        end: startOfDay(range.to!),
      })
    })

    const totalSales = filtered.reduce((acc, curr) => acc + curr.sales, 0)
    const totalRevenue = filtered.reduce((acc, curr) => acc + curr.revenue, 0)
    const avgConversion = filtered.length
      ? filtered.reduce((acc, curr) => acc + curr.conversionRate, 0) /
        filtered.length
      : 0
    const avgRetention = filtered.length
      ? filtered.reduce((acc, curr) => acc + curr.retentionRate, 0) /
        filtered.length
      : 0

    return {
      lives: filtered.length,
      sales: totalSales,
      revenue: totalRevenue,
      conversion: avgConversion,
      retention: avgRetention,
    }
  }

  const metrics1 = useMemo(() => getMetrics(period1), [allData, period1])
  const metrics2 = useMemo(() => getMetrics(period2), [allData, period2])

  const calculateVariation = (v1: number, v2: number) => {
    if (!v1) return 0
    return ((v2 - v1) / v1) * 100
  }

  const VariationCell = ({ v1, v2 }: { v1: number; v2: number }) => {
    const variation = calculateVariation(v1, v2)
    const isPositive = variation > 0
    const isNegative = variation < 0

    return (
      <div
        className={cn(
          'flex items-center justify-center gap-1 font-medium',
          isPositive
            ? 'text-green-600'
            : isNegative
              ? 'text-red-600'
              : 'text-gray-500',
        )}
      >
        {isPositive && <ArrowUpIcon className="h-3 w-3" />}
        {isNegative && <ArrowDownIcon className="h-3 w-3" />}
        {Math.abs(variation).toFixed(1)}%
      </div>
    )
  }

  const DatePickerButton = ({
    date,
    setDate,
    label,
  }: {
    date: DateRange | undefined
    setDate: (d: DateRange | undefined) => void
    label: string
  }) => (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'dd/MM/yyyy')} -{' '}
                  {format(date.to, 'dd/MM/yyyy')}
                </>
              ) : (
                format(date.from, 'dd/MM/yyyy')
              )
            ) : (
              <span>Selecione</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  )

  return (
    <div className="space-y-6 p-4">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Período 1 (Referência)</CardTitle>
          </CardHeader>
          <CardContent>
            <DatePickerButton
              date={period1}
              setDate={setPeriod1}
              label="Selecione o intervalo"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Período 2 (Comparação)</CardTitle>
          </CardHeader>
          <CardContent>
            <DatePickerButton
              date={period2}
              setDate={setPeriod2}
              label="Selecione o intervalo"
            />
          </CardContent>
        </Card>
      </div>

      {metrics1 && metrics2 ? (
        <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="w-[200px]">Métrica</TableHead>
                <TableHead className="text-center">
                  Período 1<br />
                  <span className="text-xs font-normal text-muted-foreground">
                    (Ref)
                  </span>
                </TableHead>
                <TableHead className="text-center">
                  Período 2<br />
                  <span className="text-xs font-normal text-muted-foreground">
                    (Atual)
                  </span>
                </TableHead>
                <TableHead className="text-center">Variação (%)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Total de Lives</TableCell>
                <TableCell className="text-center">{metrics1.lives}</TableCell>
                <TableCell className="text-center">{metrics2.lives}</TableCell>
                <TableCell className="text-center">
                  <VariationCell v1={metrics1.lives} v2={metrics2.lives} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Vendas Totais</TableCell>
                <TableCell className="text-center">{metrics1.sales}</TableCell>
                <TableCell className="text-center">{metrics2.sales}</TableCell>
                <TableCell className="text-center">
                  <VariationCell v1={metrics1.sales} v2={metrics2.sales} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Faturamento Total</TableCell>
                <TableCell className="text-center">
                  R$ {metrics1.revenue.toLocaleString('pt-BR')}
                </TableCell>
                <TableCell className="text-center">
                  R$ {metrics2.revenue.toLocaleString('pt-BR')}
                </TableCell>
                <TableCell className="text-center">
                  <VariationCell v1={metrics1.revenue} v2={metrics2.revenue} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Conversão Média</TableCell>
                <TableCell className="text-center">
                  {metrics1.conversion.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {metrics2.conversion.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  <VariationCell
                    v1={metrics1.conversion}
                    v2={metrics2.conversion}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Retenção Média</TableCell>
                <TableCell className="text-center">
                  {metrics1.retention.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  {metrics2.retention.toFixed(1)}%
                </TableCell>
                <TableCell className="text-center">
                  <VariationCell
                    v1={metrics1.retention}
                    v2={metrics2.retention}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed bg-gray-50 text-gray-500">
          Selecione ambos os períodos para ver a comparação
        </div>
      )}
    </div>
  )
}
