import { useMemo } from 'react'
import { Crown, TrendingDown, Share2, Download } from 'lucide-react'
import { LiveData } from '@/services/googleSheetsService'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HostComparisonProps {
  data: LiveData[]
  presenters: string[]
}

interface HostStats {
  id: string
  name: string
  lives: number
  revenue: number
  sales: number
  conversion: number
  retention: number
  avgRevPerLive: number
}

export function HostComparison({ data, presenters }: HostComparisonProps) {
  const stats = useMemo(() => {
    return presenters.map((p) => {
      const hostData = data.filter((d) => d.presenter === p)
      const count = hostData.length
      const totalRevenue = hostData.reduce((acc, curr) => acc + curr.revenue, 0)
      const totalSales = hostData.reduce((acc, curr) => acc + curr.sales, 0)

      const avgConversion = count
        ? hostData.reduce((acc, curr) => acc + curr.conversionRate, 0) / count
        : 0
      const avgRetention = count
        ? hostData.reduce((acc, curr) => acc + curr.retentionRate, 0) / count
        : 0

      return {
        id: p,
        name: p,
        lives: count,
        revenue: totalRevenue,
        sales: totalSales,
        conversion: avgConversion,
        retention: avgRetention,
        avgRevPerLive: count ? totalRevenue / count : 0,
      } as HostStats
    })
  }, [data, presenters])

  if (presenters.length < 2 || presenters.length > 4) {
    return null
  }

  const renderMetricRow = (
    label: string,
    getValue: (host: HostStats) => number,
    formatValue: (val: number) => string,
    prefix?: string,
  ) => {
    const values = stats.map(getValue)
    const maxVal = Math.max(...values)
    const minVal = Math.min(...values)
    const hasData = maxVal > 0

    return (
      // Reduced vertical spacing (py-2)
      <div className="py-2 px-6 border-b border-[#333333] last:border-0 hover:bg-white/5 transition-colors">
        <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold text-center mb-1">
          {label}
        </h4>
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((host) => {
            const val = getValue(host)
            const isBest = val === maxVal && hasData
            const isWorst =
              val === minVal && hasData && values.length > 1 && val !== maxVal
            const percentage = hasData ? (val / maxVal) * 100 : 0

            return (
              <div key={host.id} className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {isBest && (
                    <Crown className="h-3.5 w-3.5 text-[#D9B979] fill-[#D9B979]" />
                  )}
                  {isWorst && (
                    <TrendingDown className="h-3.5 w-3.5 text-[#FF453A]" />
                  )}
                  <span
                    className={cn(
                      'text-base font-medium tracking-tight font-display',
                      isBest ? 'text-[#D9B979] font-semibold' : 'text-gray-300',
                      isWorst && 'text-[#FF453A]',
                    )}
                  >
                    {prefix && (
                      <span className="text-xs text-gray-600 mr-1">
                        {prefix}
                      </span>
                    )}
                    {formatValue(val)}
                  </span>
                </div>

                <div className="w-full h-1 bg-[#333333] rounded-full overflow-hidden max-w-[140px]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-1000 ease-out',
                      isBest
                        ? 'bg-[#D9B979] shadow-[0_0_10px_rgba(217,185,121,0.5)]'
                        : 'bg-gray-600',
                    )}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // Dynamic alignment check
  const isTwoHosts = stats.length === 2

  return (
    <div className="bg-[#1A1A1A]/80 backdrop-blur-md">
      {/* Hosts Header - Clean Identity */}
      <div className="relative pt-6 pb-6 px-6">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((host) => (
            <div
              key={host.id}
              className="flex flex-col relative items-center text-center"
            >
              <h3 className="text-xl font-bold text-white leading-tight tracking-tight font-display">
                {host.name}
              </h3>
            </div>
          ))}
        </div>

        {/* VS Badge - Only visible for exactly 2 hosts */}
        {isTwoHosts && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="h-8 w-8 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-sm border border-[#333333] text-[10px] font-bold text-gray-500">
              VS
            </div>
          </div>
        )}
      </div>

      {/* Metrics Body */}
      <div className="pb-4">
        {renderMetricRow(
          'Total de Lives',
          (h) => h.lives,
          (v) => v.toString(),
        )}
        {renderMetricRow(
          'Faturamento Total',
          (h) => h.revenue,
          (v) =>
            v.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          'R$',
        )}
        {renderMetricRow(
          'Total de Vendas',
          (h) => h.sales,
          (v) => v.toString(),
        )}
        {renderMetricRow(
          'Conversão Média',
          (h) => h.conversion,
          (v) => `${v.toFixed(1)}%`,
        )}
        {renderMetricRow(
          'Retenção Média',
          (h) => h.retention,
          (v) => `${v.toFixed(1)}%`,
        )}
        {renderMetricRow(
          'Fat. Médio por Live',
          (h) => h.avgRevPerLive,
          (v) =>
            v.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }),
          'R$',
        )}
      </div>

      {/* Footer Actions */}
      <div className="bg-[#0C0C0D]/50 border-t border-[#333333] px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-gray-500 text-center sm:text-left">
          Análise comparativa gerada automaticamente.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[10px] gap-1.5 bg-transparent border-[#333333] text-gray-300 hover:text-white hover:bg-white/5 px-3"
          >
            <Share2 className="w-3 h-3" />
            Compartilhar
          </Button>
          <Button
            size="sm"
            className="h-7 text-[10px] gap-1.5 bg-[#D9B979] text-black hover:bg-[#D9B979]/90 px-3"
          >
            <Download className="w-3 h-3" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
