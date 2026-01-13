import { useCRMStore } from '@/stores/crmStore'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Users, DollarSign, Activity, Clock, CheckCircle2 } from 'lucide-react'
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
    // Assuming lastInteraction is the finish date for simplicity in this context
    // Ideally we would have a 'finishedAt' timestamp
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

  // 4. Pipeline Value: Sum of seats * 500 for active pipeline
  const pipelineValue = filteredLeads
    .filter((l) => pipelineColumns.includes(l.status))
    .reduce((acc, l) => acc + l.assentosAdicionais * 500, 0)

  // 5. Converted Value
  const convertedValue = filteredLeads
    .filter((l) => l.status === 'Comprou')
    .reduce((acc, l) => acc + l.assentosAdicionais * 500, 0)

  const formatCurrency = (val: number) =>
    new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(val)

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 p-6 pb-0">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-28 w-full rounded-xl" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-4 p-4 md:grid-cols-2 lg:grid-cols-5 lg:p-6 lg:pb-0">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Taxa de Conversão
          </CardTitle>
          <Activity className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <span
              className={
                conversionRate >= 5
                  ? 'text-green-600'
                  : conversionRate >= 3
                    ? 'text-yellow-600'
                    : 'text-red-600'
              }
            >
              {conversionRate.toFixed(1)}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {boughtLeads} de {totalLeads} leads
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{avgTime.toFixed(1)} dias</div>
          <p className="text-xs text-muted-foreground">Ciclo de vendas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Leads no Pipeline
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pipelineCount}</div>
          <p className="text-xs text-muted-foreground">Em andamento</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valor em Pipeline
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(pipelineValue)}
          </div>
          <p className="text-xs text-muted-foreground">Potencial ativo</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valor Convertido
          </CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(convertedValue)}
          </div>
          <p className="text-xs text-muted-foreground">Vendas realizadas</p>
        </CardContent>
      </Card>
    </div>
  )
}
