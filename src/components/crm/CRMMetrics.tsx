import { useCRMStore, calculateLeadValue } from '@/stores/crmStore'
import { differenceInDays } from 'date-fns'
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  DollarSign,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Minus,
} from 'lucide-react'

export function CRMMetrics() {
  const { filteredLeads, loading } = useCRMStore()

  // 1. Conversion Rate: (Comprou / Total) * 100
  const boughtLeads = filteredLeads.filter((l) => l.status === 'Comprou').length
  const totalLeads = filteredLeads.length
  const conversionRate = totalLeads ? (boughtLeads / totalLeads) * 100 : 0

  // 2. Average Time: Capturado -> Comprou/Não Comprou
  const finishedLeads = filteredLeads.filter((l) =>
    ['Comprou', 'Não Comprou'].includes(l.status),
  )
  const totalDays = finishedLeads.reduce((acc, lead) => {
    return (
      acc +
      differenceInDays(
        new Date(lead.lastInteraction),
        new Date(lead.dataCaptacao),
      )
    )
  }, 0)
  const avgTime = finishedLeads.length ? totalDays / finishedLeads.length : 0

  // 3. Pipeline Count: First 4 columns
  const pipelineColumns = [
    'Capturado',
    'Em Contato',
    'Agendado',
    'Aguardando Cliente',
  ]
  const pipelineCount = filteredLeads.filter((l) =>
    pipelineColumns.includes(l.status),
  ).length

  // 4. Pipeline Value: Sum of active pipeline values
  const pipelineValue = filteredLeads
    .filter((l) => pipelineColumns.includes(l.status))
    .reduce((acc, l) => acc + (l.valorEstimado ?? calculateLeadValue(l)), 0)

  // 5. Converted Value
  const convertedValue = filteredLeads
    .filter((l) => l.status === 'Comprou')
    .reduce((acc, l) => acc + (l.valorEstimado ?? calculateLeadValue(l)), 0)

  const formatCurrency = (val: number) => {
    if (val >= 1000) {
      return `R$ ${(val / 1000).toFixed(1)}k`
    }
    return `R$ ${val.toLocaleString('pt-BR')}`
  }

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="cyber-card p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-xl bg-[#333333]"></div>
              <div className="h-4 w-12 bg-[#333333] rounded"></div>
            </div>
            <div className="h-3 w-24 bg-[#333333] rounded mb-2"></div>
            <div className="h-8 w-20 bg-[#333333] rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const metrics = [
    {
      title: 'Taxa de Conversão',
      value: `${conversionRate.toFixed(1)}%`,
      subtitle: `${boughtLeads} de ${totalLeads} leads`,
      icon: TrendingUp,
      iconBg: '#1A1A1A',
      iconColor: '#D9B979',
      trending:
        conversionRate >= 5 ? 'up' : conversionRate >= 3 ? 'neutral' : 'down',
    },
    {
      title: 'Tempo Médio',
      value: `${avgTime.toFixed(1)} dias`,
      subtitle: 'Ciclo de vendas',
      icon: Clock,
      iconBg: '#1A1A1A',
      iconColor: '#A3A3A3',
      trending: 'neutral',
    },
    {
      title: 'Leads no Pipeline',
      value: pipelineCount.toString(),
      subtitle: 'Em andamento',
      icon: Users,
      iconBg: '#1A1A1A',
      iconColor: '#D9B979',
      trending: 'neutral',
    },
    {
      title: 'Valor em Pipeline',
      value: formatCurrency(pipelineValue),
      subtitle: 'Potencial ativo',
      icon: DollarSign,
      iconBg: '#1A1A1A',
      iconColor: '#D9B979',
      trending: 'neutral',
    },
    {
      title: 'Valor Convertido',
      value: formatCurrency(convertedValue),
      subtitle: 'Vendas realizadas',
      icon: CheckCircle,
      iconBg: '#1A1A1A',
      iconColor: '#27E39F',
      trending: 'up',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="cyber-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className="size-10 rounded-xl flex items-center justify-center border border-[#333333]"
              style={{
                backgroundColor: metric.iconBg,
                color: metric.iconColor,
              }}
            >
              <metric.icon className="h-5 w-5" />
            </div>
            {metric.trending === 'up' && (
              <span className="text-[12px] font-bold flex items-center text-[#27E39F]">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            )}
            {metric.trending === 'down' && (
              <span className="text-[12px] font-bold flex items-center text-[#FF453A]">
                <ArrowDown className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
          <p className="text-[12px] font-semibold uppercase tracking-wider text-gray-500">
            {metric.title}
          </p>
          <h3
            className="text-[28px] font-bold tracking-tight mt-1 font-display"
            style={{
              color:
                metric.title === 'Valor Convertido'
                  ? '#27E39F'
                  : metric.title === 'Taxa de Conversão' && conversionRate < 3
                    ? '#FF453A'
                    : '#FFFFFF',
            }}
          >
            {metric.value}
          </h3>
          <p className="text-[12px] mt-1 text-gray-400">{metric.subtitle}</p>
        </div>
      ))}
    </div>
  )
}
