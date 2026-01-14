import { useCRMStore, calculateLeadValue } from '@/stores/crmStore'
import { differenceInDays } from 'date-fns'

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
          <div key={i} className="apple-card p-6 animate-pulse">
            <div className="flex justify-between items-start mb-4">
              <div className="size-10 rounded-xl bg-gray-200"></div>
              <div className="h-4 w-12 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 w-24 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 w-20 bg-gray-200 rounded"></div>
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
      icon: 'trending_up',
      iconBg: '#EFF6FF',
      iconColor: '#0071E3',
      trending:
        conversionRate >= 5 ? 'up' : conversionRate >= 3 ? 'neutral' : 'down',
    },
    {
      title: 'Tempo Médio',
      value: `${avgTime.toFixed(1)} dias`,
      subtitle: 'Ciclo de vendas',
      icon: 'schedule',
      iconBg: '#FFF7ED',
      iconColor: '#F97316',
      trending: 'neutral',
    },
    {
      title: 'Leads no Pipeline',
      value: pipelineCount.toString(),
      subtitle: 'Em andamento',
      icon: 'groups',
      iconBg: '#F5F3FF',
      iconColor: '#9333EA',
      trending: 'neutral',
    },
    {
      title: 'Valor em Pipeline',
      value: formatCurrency(pipelineValue),
      subtitle: 'Potencial ativo',
      icon: 'payments',
      iconBg: '#FEF3C7',
      iconColor: '#D97706',
      trending: 'neutral',
    },
    {
      title: 'Valor Convertido',
      value: formatCurrency(convertedValue),
      subtitle: 'Vendas realizadas',
      icon: 'check_circle',
      iconBg: '#ECFDF5',
      iconColor: '#34C759',
      trending: 'up',
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
      {metrics.map((metric, index) => (
        <div key={index} className="apple-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div
              className="size-10 rounded-xl flex items-center justify-center"
              style={{
                backgroundColor: metric.iconBg,
                color: metric.iconColor,
              }}
            >
              <span className="material-symbols-outlined">{metric.icon}</span>
            </div>
            {metric.trending === 'up' && (
              <span
                className="text-[12px] font-bold flex items-center"
                style={{ color: '#34C759' }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  arrow_upward
                </span>
              </span>
            )}
            {metric.trending === 'down' && (
              <span
                className="text-[12px] font-bold flex items-center"
                style={{ color: '#FF3B30' }}
              >
                <span className="material-symbols-outlined text-[14px]">
                  arrow_downward
                </span>
              </span>
            )}
          </div>
          <p
            className="text-[12px] font-semibold uppercase tracking-wider"
            style={{ color: '#86868B' }}
          >
            {metric.title}
          </p>
          <h3
            className="text-[28px] font-bold tracking-tight mt-1"
            style={{
              color:
                metric.title === 'Valor Convertido'
                  ? '#34C759'
                  : metric.title === 'Taxa de Conversão' && conversionRate < 3
                    ? '#FF3B30'
                    : metric.title === 'Taxa de Conversão' && conversionRate < 5
                      ? '#FF9500'
                      : '#1D1D1F',
            }}
          >
            {metric.value}
          </h3>
          <p className="text-[12px] mt-1" style={{ color: '#86868B' }}>
            {metric.subtitle}
          </p>
        </div>
      ))}
    </div>
  )
}
