import { LiveData } from '@/services/googleSheetsService'
import { CRMLead } from '@/stores/crmStore'

export const exportToCSV = (
  data: any[],
  filename: string,
  headers?: string[],
) => {
  if (!data.length) return

  const headerRow = headers ? headers.join(',') : Object.keys(data[0]).join(',')
  const rows = data.map((row) =>
    Object.values(row)
      .map((val) => `"${val}"`)
      .join(','),
  )

  const csvContent = [headerRow, ...rows].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `${filename}.csv`)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const formatLiveForExport = (data: LiveData[]) => {
  return data.map((item) => ({
    Data: new Date(item.date).toLocaleDateString('pt-BR'),
    Dia: item.weekday,
    Apresentador: item.presenter,
    'Vendas Totais': item.sales,
    Faturamento: item.revenue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }),
    'Taxa Conversão': `${item.conversionRate}%`,
    'Espectadores Pico': item.peakViewers,
  }))
}

export const formatLeadsForExport = (data: CRMLead[]) => {
  return data.map((lead) => ({
    Nome: lead.nomeCompleto,
    Email: lead.email,
    Telefone: lead.telefone,
    Status: lead.status,
    Origem: lead.origem,
    Assentos: lead.assentosAdicionais,
    'Data Captação': new Date(lead.dataCaptacao).toLocaleDateString('pt-BR'),
    'Última Interação': new Date(lead.lastInteraction).toLocaleString('pt-BR'),
  }))
}
