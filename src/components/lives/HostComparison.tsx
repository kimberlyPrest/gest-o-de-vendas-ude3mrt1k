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
      <div className="py-2 px-6 border-b border-border last:border-0 hover:bg-white/5 transition-colors">
        <h4 className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold text-center mb-1">
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
                    <Crown
                      className="h-3.5 w-3.5 text-primary fill-primary"
                      aria-hidden="true"
                    />
                  )}
                  {isWorst && (
                    <TrendingDown
                      className="h-3.5 w-3.5 text-destructive"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={cn(
                      'text-base font-medium tracking-tight font-display',
                      isBest ? 'text-primary font-semibold' : 'text-gray-300',
                      isWorst && 'text-destructive',
                    )}
                  >
                    {prefix && (
                      <span className="text-xs text-muted-foreground mr-1">
                        {prefix}
                      </span>
                    )}
                    {formatValue(val)}
                  </span>
                </div>

                <div className="w-full h-1 bg-border rounded-full overflow-hidden max-w-[140px]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-1000 ease-out',
                      isBest ? 'bg-primary shadow-glow' : 'bg-muted-foreground',
                    )}
                    style={{ width: `${percentage}%` }}
                    role="progressbar"
                    aria-valuenow={percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Performance de ${host.name} em ${label}`}
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
    <div className="bg-card/80 backdrop-blur-md">
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
              <h3 className="text-xl font-bold text-foreground leading-tight tracking-tight font-display">
                {host.name}
              </h3>
            </div>
          ))}
        </div>

        {/* VS Badge - Only visible for exactly 2 hosts */}
        {isTwoHosts && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <div className="h-8 w-8 bg-card rounded-full flex items-center justify-center shadow-sm border border-border text-[10px] font-bold text-muted-foreground">
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
      <div className="bg-background/50 border-t border-border px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-[10px] text-muted-foreground text-center sm:text-left">
          Análise comparativa gerada automaticamente.
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-7 text-[10px] gap-1.5 bg-transparent border-border text-muted-foreground hover:text-foreground hover:bg-white/5 px-3"
          >
            <Share2 className="w-3 h-3" aria-hidden="true" />
            Compartilhar
          </Button>
          <Button
            size="sm"
            className="h-7 text-[10px] gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 px-3"
          >
            <Download className="w-3 h-3" aria-hidden="true" />
            PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
