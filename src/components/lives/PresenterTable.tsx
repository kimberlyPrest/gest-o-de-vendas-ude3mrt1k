import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Trophy,
  ArrowUpDown,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { LiveData } from '@/services/googleSheetsService'
import { cn } from '@/lib/utils'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { Skeleton } from '@/components/ui/skeleton'

interface PresenterTableProps {
  data: LiveData[]
  loading: boolean
}

type SortField =
  | 'presenter'
  | 'lives'
  | 'sales'
  | 'revenue'
  | 'conversion'
  | 'retention'
type SortOrder = 'asc' | 'desc' | 'default'

interface PresenterMetrics {
  presenter: string
  lives: number
  sales: number
  revenue: number
  conversion: number // average
  retention: number // average
  raw: LiveData[]
}

export function PresenterTable({ data, loading }: PresenterTableProps) {
  const [sortField, setSortField] = useState<SortField>('sales')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)

  const presenterData = useMemo(() => {
    const grouped = data.reduce<Record<string, PresenterMetrics>>(
      (acc, curr) => {
        if (!acc[curr.presenter]) {
          acc[curr.presenter] = {
            presenter: curr.presenter,
            lives: 0,
            sales: 0,
            revenue: 0,
            conversion: 0,
            retention: 0,
            raw: [],
          }
        }
        acc[curr.presenter].lives += 1
        acc[curr.presenter].sales += curr.sales
        acc[curr.presenter].revenue += curr.revenue
        acc[curr.presenter].conversion += curr.conversionRate
        acc[curr.presenter].retention += curr.retentionRate
        acc[curr.presenter].raw.push(curr)
        return acc
      },
      {},
    )

    return Object.values(grouped).map((p) => ({
      ...p,
      conversion: p.lives ? p.conversion / p.lives : 0,
      retention: p.lives ? p.retention / p.lives : 0,
      // Sort raw data by date for sparkline
      raw: p.raw.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
      ),
    }))
  }, [data])

  const sortedData = useMemo(() => {
    if (sortOrder === 'default') return presenterData

    return [...presenterData].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }

      return sortOrder === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number)
    })
  }, [presenterData, sortField, sortOrder])

  // Identify Best and Worst (by total sales)
  const maxSales = Math.max(...presenterData.map((d) => d.sales))
  const minSales = Math.min(...presenterData.map((d) => d.sales))

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) =>
        prev === 'default' ? 'desc' : prev === 'desc' ? 'asc' : 'default',
      )
    } else {
      setSortField(field)
      setSortOrder('desc')
    }
  }

  const toggleExpand = (presenter: string) => {
    setExpandedRow(expandedRow === presenter ? null : presenter)
  }

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
      </div>
    )
  }

  if (sortedData.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Nenhum dado disponível para exibir na tabela.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead
              className="w-[200px] cursor-pointer hover:text-primary"
              onClick={() => handleSort('presenter')}
            >
              Apresentador{' '}
              {sortField === 'presenter' && sortOrder !== 'default' && (
                <ArrowUpDown className="ml-1 inline h-3 w-3" />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center hover:text-primary"
              onClick={() => handleSort('lives')}
            >
              Lives{' '}
              {sortField === 'lives' && sortOrder !== 'default' && (
                <ArrowUpDown className="ml-1 inline h-3 w-3" />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-right hover:text-primary"
              onClick={() => handleSort('sales')}
            >
              Vendas{' '}
              {sortField === 'sales' && sortOrder !== 'default' && (
                <ArrowUpDown className="ml-1 inline h-3 w-3" />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-right hover:text-primary"
              onClick={() => handleSort('revenue')}
            >
              Faturamento{' '}
              {sortField === 'revenue' && sortOrder !== 'default' && (
                <ArrowUpDown className="ml-1 inline h-3 w-3" />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center hover:text-primary"
              onClick={() => handleSort('conversion')}
            >
              Conversão{' '}
              {sortField === 'conversion' && sortOrder !== 'default' && (
                <ArrowUpDown className="ml-1 inline h-3 w-3" />
              )}
            </TableHead>
            <TableHead
              className="cursor-pointer text-center hover:text-primary"
              onClick={() => handleSort('retention')}
            >
              Retenção{' '}
              {sortField === 'retention' && sortOrder !== 'default' && (
                <ArrowUpDown className="ml-1 inline h-3 w-3" />
              )}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((row) => {
            const isBest = row.sales === maxSales && maxSales > 0
            const isWorst = row.sales === minSales && presenterData.length > 1
            const isExpanded = expandedRow === row.presenter

            return (
              <>
                <TableRow
                  key={row.presenter}
                  className={cn(
                    'cursor-pointer transition-colors even:bg-slate-50 hover:bg-slate-100',
                    isBest && 'bg-[#D1FAE5] hover:bg-[#A7F3D0]',
                    isWorst && 'border-l-4 border-l-red-500 bg-red-50',
                  )}
                  onClick={() => toggleExpand(row.presenter)}
                >
                  <TableCell>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-500" />
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {row.presenter}
                      {isBest && <Trophy className="h-4 w-4 text-yellow-600" />}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{row.lives}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {row.sales}
                  </TableCell>
                  <TableCell className="text-right">
                    R$ {row.revenue.toLocaleString('pt-BR')}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        row.conversion >= 5
                          ? 'bg-green-100 text-green-700'
                          : row.conversion >= 3
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700',
                      )}
                    >
                      {row.conversion.toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-medium',
                        row.retention >= 60
                          ? 'bg-green-100 text-green-700'
                          : row.retention >= 40
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700',
                      )}
                    >
                      {row.retention.toFixed(1)}%
                    </span>
                  </TableCell>
                </TableRow>
                {/* Expanded Row Analytics */}
                {isExpanded && (
                  <TableRow className="bg-white hover:bg-white">
                    <TableCell colSpan={7} className="p-4">
                      <div className="flex flex-col gap-4 rounded-lg border bg-slate-50 p-4 sm:flex-row">
                        <div className="flex-1">
                          <h4 className="mb-2 flex items-center text-sm font-semibold text-gray-700">
                            <TrendingUp className="mr-2 h-4 w-4" />
                            Evolução de Vendas ({row.presenter})
                          </h4>
                          <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={row.raw}>
                                <XAxis
                                  dataKey="date"
                                  tickFormatter={(v) =>
                                    new Date(v).toLocaleDateString('pt-BR', {
                                      day: '2-digit',
                                      month: '2-digit',
                                    })
                                  }
                                  stroke="#888888"
                                  fontSize={12}
                                />
                                <YAxis stroke="#888888" fontSize={12} />
                                <Tooltip
                                  contentStyle={{
                                    borderRadius: '8px',
                                    border: 'none',
                                    boxShadow:
                                      '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                  }}
                                />
                                <Line
                                  type="monotone"
                                  dataKey="sales"
                                  stroke="#3B82F6"
                                  strokeWidth={2}
                                  dot={{ r: 4 }}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                        <div className="flex flex-col justify-center space-y-4 border-l pl-4 sm:w-48">
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Melhor Venda
                            </p>
                            <p className="text-lg font-bold text-green-600">
                              {Math.max(...row.raw.map((r) => r.sales))}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">
                              Média por Live
                            </p>
                            <p className="text-lg font-bold text-blue-600">
                              {(row.sales / row.lives).toFixed(0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
