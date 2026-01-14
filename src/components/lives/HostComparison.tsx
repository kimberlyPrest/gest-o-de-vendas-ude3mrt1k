import React, { useMemo } from 'react'
import { Crown, TrendingDown, Info, Share2, Download } from 'lucide-react'
import { LiveData } from '@/services/googleSheetsService'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface HostComparisonProps {
  data: LiveData[]
  presenters: string[]
}

interface HostStats {
  id: string
  name: string
  role: string
  avatar: string
  lives: number
  revenue: number
  sales: number
  conversion: number
  retention: number
  avgRevPerLive: number
}

export function HostComparison({ data, presenters }: HostComparisonProps) {
  const stats = useMemo(() => {
    return presenters.map((p, index) => {
      const hostData = data.filter((d) => d.presenter === p)
      const count = hostData.length
      const totalRevenue = hostData.reduce((acc, curr) => acc + curr.revenue, 0)
      const totalSales = hostData.reduce((acc, curr) => acc + curr.sales, 0)
      // Weighted averages
      const avgConversion = count
        ? hostData.reduce((acc, curr) => acc + curr.conversionRate, 0) / count
        : 0
      const avgRetention = count
        ? hostData.reduce((acc, curr) => acc + curr.retentionRate, 0) / count
        : 0

      const seed = p
        .split('')
        .reduce((acc, char) => acc + char.charCodeAt(0), 0)

      return {
        id: p,
        name: p,
        role: index === 0 ? 'Host Principal' : 'Co-Host',
        avatar: `https://img.usecurling.com/ppl/thumbnail?gender=male&seed=${seed}`,
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
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50/50 rounded-xl border border-dashed border-gray-200 m-4">
        <div className="rounded-full bg-blue-50 p-3 mb-4">
          <Info className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-1">
          Modo de Comparação Indisponível
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Selecione entre 2 a 4 apresentadores no filtro acima para visualizar a
          comparação lado a lado.
        </p>
      </div>
    )
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
      <div className="py-6 border-b border-[#E5E5E7] last:border-0">
        <h4 className="text-[11px] uppercase tracking-widest text-[#86868B] font-semibold text-center mb-4">
          {label}
        </h4>
        <div
          className="grid gap-8 px-4 md:px-8"
          style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((host) => {
            const val = getValue(host)
            const isBest = val === maxVal && hasData
            const isWorst =
              val === minVal && hasData && values.length > 1 && val !== maxVal
            const percentage = hasData ? (val / maxVal) * 100 : 0

            return (
              <div key={host.id} className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 mb-1">
                  {isBest && (
                    <Crown className="h-4 w-4 text-[#F5A623] fill-[#F5A623]" />
                  )}
                  {isWorst && (
                    <TrendingDown className="h-4 w-4 text-[#86868B]/60" />
                  )}
                  <span
                    className={cn(
                      'text-lg font-medium tracking-tight',
                      isBest
                        ? 'text-[#1D1D1F] font-semibold'
                        : 'text-[#1D1D1F]/80',
                      isWorst && 'text-[#86868B]',
                    )}
                  >
                    {prefix && (
                      <span className="text-sm text-gray-500 mr-1">
                        {prefix}
                      </span>
                    )}
                    {formatValue(val)}
                  </span>
                </div>

                <div className="w-full h-1.5 bg-[#E5E5E7]/60 rounded-full overflow-hidden max-w-[180px]">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-1000 ease-out',
                      isBest ? 'bg-[#C49B3B]' : 'bg-[#E5E5E7]', // Gold-ish for best, grey for others
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

  return (
    <div className="bg-white/80 backdrop-blur-md">
      {/* Hosts Header */}
      <div className="relative pt-8 pb-8 px-8">
        <div
          className="grid gap-8"
          style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}
        >
          {stats.map((host, i) => (
            <div
              key={host.id}
              className="flex items-center gap-4 bg-[#FBFBFD] p-4 rounded-2xl border border-[#E5E5E7]/50 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300"
            >
              <Avatar className="h-14 w-14 border-2 border-white shadow-sm">
                <AvatarImage src={host.avatar} />
                <AvatarFallback>{host.name.substring(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-[#86868B] uppercase tracking-wider mb-0.5">
                  {host.role}
                </p>
                <h3 className="text-base font-bold text-[#1D1D1F] truncate leading-tight">
                  {host.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* VS Badge - Only visible for exactly 2 hosts */}
        {stats.length === 2 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-subtle border border-[#E5E5E7] text-xs font-bold text-[#86868B]">
              VS
            </div>
          </div>
        )}
      </div>

      {/* Metrics Body */}
      <div className="pb-8">
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
      <div className="bg-[#F5F5F7]/50 border-t border-[#E5E5E7] px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#86868B] text-center sm:text-left">
          Análise comparativa gerada automaticamente. Dados atualizados há 5
          min.
        </p>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-2 bg-white hover:bg-gray-50"
          >
            <Share2 className="w-3.5 h-3.5" />
            Compartilhar
          </Button>
          <Button
            size="sm"
            className="h-8 text-xs gap-2 bg-[#1D1D1F] text-white hover:bg-[#1D1D1F]/90"
          >
            <Download className="w-3.5 h-3.5" />
            Exportar PDF
          </Button>
        </div>
      </div>
    </div>
  )
}
