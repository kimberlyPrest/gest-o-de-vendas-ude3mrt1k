import { useMemo } from 'react'
import { LiveData } from '@/services/googleSheetsService'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Crown, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HostComparisonProps {
    data: LiveData[]
    presenters: string[]
}

interface HostMetrics {
    presenter: string
    totalLives: number
    totalRevenue: number
    totalSales: number
    avgConversion: number
    avgRetention: number
    avgRevenuePerLive: number
}

export function HostComparison({ data, presenters }: HostComparisonProps) {
    const metrics = useMemo(() => {
        // Only process for selected presenters
        return presenters.map(p => {
            const hostData = data.filter(d => d.presenter === p)
            const count = hostData.length
            if (count === 0) return {
                presenter: p,
                totalLives: 0,
                totalRevenue: 0,
                totalSales: 0,
                avgConversion: 0,
                avgRetention: 0,
                avgRevenuePerLive: 0
            }

            const totalRevenue = hostData.reduce((acc, curr) => acc + curr.revenue, 0)
            const totalSales = hostData.reduce((acc, curr) => acc + curr.sales, 0)
            const avgConversion = hostData.reduce((acc, curr) => acc + curr.conversionRate, 0) / count
            const avgRetention = hostData.reduce((acc, curr) => acc + curr.retentionRate, 0) / count

            return {
                presenter: p,
                totalLives: count,
                totalRevenue,
                totalSales,
                avgConversion,
                avgRetention,
                avgRevenuePerLive: totalRevenue / count
            }
        })
    }, [data, presenters])

    // Helper to find max for progress bars and "best" tagging
    const getMax = (key: keyof HostMetrics) => Math.max(...metrics.map(m => m[key] as number))
    const getMin = (key: keyof HostMetrics) => Math.min(...metrics.map(m => m[key] as number))

    const renderMetricRow = (label: string, key: keyof HostMetrics, formatFn?: (v: number) => string) => {
        const maxVal = getMax(key)
        const minVal = getMin(key)

        return (
            <div className="mb-6 last:mb-0">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</h4>
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${metrics.length}, minmax(0, 1fr))` }}>
                    {metrics.map((m) => {
                        const val = m[key] as number
                        const isBest = val === maxVal && val > 0
                        const isWorst = val === minVal && val < maxVal // strict worse
                        const displayVal = formatFn ? formatFn(val) : val.toLocaleString('pt-BR')

                        return (
                            <div key={m.presenter} className="bg-gray-50 rounded-lg p-3 relative border border-gray-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className={cn("text-lg font-bold", isBest ? "text-yellow-600" : "text-gray-900")}>
                                        {displayVal}
                                    </span>
                                    {isBest && <Crown className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                                    {isWorst && <TrendingDown className="w-4 h-4 text-gray-400 opacity-50" />}
                                </div>
                                {/* Progress bar normalized to max */}
                                <Progress value={maxVal > 0 ? (val / maxVal) * 100 : 0} className="h-1.5" indicatorClassName={isBest ? 'bg-yellow-500' : 'bg-gray-400'} />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }

    if (presenters.length < 2 || presenters.length > 4) return null

    return (
        <Card className="border shadow-sm rounded-xl overflow-hidden mt-8">
            <CardHeader className="bg-gray-50 border-b px-6 py-4">
                <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-600" />
                    <CardTitle className="text-lg font-bold text-gray-900">Comparativo de Performance</CardTitle>
                </div>
                <div className="flex gap-4 mt-2">
                    {metrics.map(m => (
                        <div key={m.presenter} className="flex-1 font-medium text-center bg-white border rounded-md py-1 text-sm text-gray-700 shadow-sm">
                            {m.presenter}
                        </div>
                    ))}
                </div>
            </CardHeader>
            <CardContent className="p-6">
                {renderMetricRow('Total de Lives', 'totalLives')}
                {renderMetricRow('Faturamento Total', 'totalRevenue', (v) => `R$ ${v.toLocaleString('pt-BR')}`)}
                {renderMetricRow('Total de Vendas', 'totalSales')}
                {renderMetricRow('Conversão Média', 'avgConversion', (v) => `${v.toFixed(2)}%`)}
                {renderMetricRow('Retenção Média', 'avgRetention', (v) => `${v.toFixed(2)}%`)}
                {renderMetricRow('Ticket Médio por Live', 'avgRevenuePerLive', (v) => `R$ ${v.toLocaleString('pt-BR')}`)}
            </CardContent>
        </Card>
    )
}
