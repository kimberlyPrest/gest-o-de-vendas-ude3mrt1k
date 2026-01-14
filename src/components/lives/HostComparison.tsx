import React, { useMemo } from 'react';
import { Scale, Crown, TrendingDown, User } from 'lucide-react';
import { LiveData } from '@/services/googleSheetsService';

interface MetricRowProps {
  label: string;
  data: { id: string; rawValue: number; displayValue: string | number }[];
  higherIsBetter?: boolean;
}

const MetricRow: React.FC<MetricRowProps> = ({ label, data, higherIsBetter = true }) => {
  const values = data.map(d => d.rawValue);
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  
  const getBestValue = () => higherIsBetter ? maxValue : minValue;
  const getWorstValue = () => higherIsBetter ? minValue : maxValue;

  return (
    <div className="py-5 border-b border-[#E5E5E7] last:border-0 hover:bg-[#FBFBFD]/50 transition-colors px-6 md:px-8">
      <p className="text-[11px] uppercase tracking-widest text-[#86868B] font-semibold mb-3">
        {label}
      </p>
      <div className="grid gap-8" style={{ gridTemplateColumns: `repeat(${data.length}, 1fr)` }}>
        {data.map((item) => {
          const isBest = item.rawValue === getBestValue() && maxValue !== minValue;
          const isWorst = item.rawValue === getWorstValue() && maxValue !== minValue;
          const percentage = maxValue > 0 ? (item.rawValue / maxValue) * 100 : 0;
          
          return (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center gap-2">
                {isBest && (
                  <Crown className="h-4 w-4 text-[#F5A623] fill-[#F5A623]" />
                )}
                {isWorst && data.length > 1 && (
                  <TrendingDown className="h-4 w-4 text-[#86868B]/60" />
                )}
                <span 
                  className={`font-semibold text-[15px] tracking-tight ${
                    isBest ? 'text-[#1D1D1F]' : 
                    isWorst ? 'text-[#86868B]' : 'text-[#1D1D1F]'
                  }`}
                >
                  {item.displayValue}
                </span>
              </div>
              
              {/* Apple-style Progress Bar */}
              <div className="h-1.5 bg-[#E5E5E7]/60 rounded-full overflow-hidden w-full max-w-[200px]">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ease-out ${
                    isBest ? 'bg-[#0071E3]' : 'bg-[#86868B]/40'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface HostComparisonProps {
  data: LiveData[];
  presenters: string[];
}

export const HostComparison: React.FC<HostComparisonProps> = ({ data, presenters }) => {
  // Logic to aggregate data per presenter
  const hostStats = useMemo(() => {
    return presenters.map(p => {
      const hostData = data.filter(d => d.presenter === p);
      const count = hostData.length;
      
      if (count === 0) return {
        id: p,
        name: p,
        lives: 0,
        revenue: 0,
        sales: 0,
        conversion: 0,
        retention: 0
      };

      const totalRevenue = hostData.reduce((acc, curr) => acc + curr.revenue, 0);
      const totalSales = hostData.reduce((acc, curr) => acc + curr.sales, 0);
      const avgConversion = hostData.reduce((acc, curr) => acc + curr.conversionRate, 0) / count;
      const avgRetention = hostData.reduce((acc, curr) => acc + curr.retentionRate, 0) / count;

      return {
        id: p,
        name: p,
        lives: count,
        revenue: totalRevenue,
        sales: totalSales,
        conversion: avgConversion,
        retention: avgRetention
      };
    });
  }, [data, presenters]);

  // Requirements: 2 to 4 hosts
  if (presenters.length < 2 || presenters.length > 4) return null;

  const metrics = [
    {
      label: "Total de Lives",
      data: hostStats.map(h => ({ id: h.id, rawValue: h.lives, displayValue: h.lives })),
    },
    {
      label: "Faturamento Total",
      data: hostStats.map(h => ({ 
        id: h.id, 
        rawValue: h.revenue, 
        displayValue: h.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
      })),
    },
    {
      label: "Total de Vendas",
      data: hostStats.map(h => ({ id: h.id, rawValue: h.sales, displayValue: h.sales })),
    },
    {
      label: "Conversão Média",
      data: hostStats.map(h => ({ 
        id: h.id, 
        rawValue: h.conversion, 
        displayValue: `${h.conversion.toFixed(1)}%` 
      })),
    },
    {
      label: "Retenção Média",
      data: hostStats.map(h => ({ 
        id: h.id, 
        rawValue: h.retention, 
        displayValue: `${h.retention.toFixed(1)}%` 
      })),
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-md border border-[#E5E5E7] rounded-[20px] shadow-sm mb-8 overflow-hidden">
      {/* Header */}
      <div className="px-8 pt-8 pb-6 border-b border-[#E5E5E7]">
        <div className="flex justify-between items-start mb-6">
          <div className="flex items-center gap-4">
            <div className="size-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F]">Comparativo de Hosts</h3>
              <p className="text-sm text-[#86868B] mt-0.5">Análise lado a lado dos top performers</p>
            </div>
          </div>
          <span className="text-xs font-medium px-3 py-1 bg-[#F5F5F7] rounded-full text-[#86868B] border border-[#E5E5E7]">
            {presenters.length} hosts selecionados
          </span>
        </div>

        {/* Host Headers */}
        <div className="grid gap-8 pl-0" style={{ gridTemplateColumns: `repeat(${presenters.length}, 1fr)` }}>
          {hostStats.map((host) => (
            <div key={host.id} className="flex items-center gap-3">
              <div className="size-10 rounded-full bg-gray-100 flex items-center justify-center text-[#86868B] border border-[#E5E5E7]">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1D1D1F] truncate max-w-[120px]">{host.name}</p>
                <p className="text-[11px] text-[#86868B]">Apresentador</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics Body */}
      <div>
        {metrics.map((metric) => (
          <MetricRow 
            key={metric.label}
            label={metric.label}
            data={metric.data}
          />
        ))}
      </div>
    </div>
  );
};

