import { toast } from '@/hooks/use-toast'

export interface Lead {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
  assentosAdicionais: number
  origem: string
  status: string
  dataCaptacao: string
}

export interface LiveData {
  date: string
  weekday: string
  peakViewers: number
  retainedViewers: number
  sales: number
  presenter: string
  conversionRate: number
  retentionRate: number
  revenue: number
  additionalSeats: number
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const generateMockLivesData = (): LiveData[] => {
  const presenters = ['Ana', 'Carlos', 'Beatriz', 'João', 'Sofia']
  const data: LiveData[] = []
  const today = new Date()
  const startDate = new Date(today.getFullYear(), today.getMonth() - 5, 1)

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    if (Math.random() > 0.3) {
      const sales = Math.floor(Math.random() * 150) + 10
      const ticket = Math.floor(Math.random() * 50) + 40
      data.push({
        date: d.toISOString().split('T')[0],
        weekday: d.toLocaleDateString('pt-BR', { weekday: 'long' }),
        peakViewers: Math.floor(Math.random() * 3000) + 500,
        retainedViewers: Math.floor(Math.random() * 2000) + 300,
        sales: sales,
        presenter: presenters[Math.floor(Math.random() * presenters.length)],
        conversionRate: parseFloat((Math.random() * 5 + 1).toFixed(1)),
        retentionRate: parseFloat((Math.random() * 40 + 50).toFixed(1)),
        revenue: sales * ticket,
        additionalSeats: Math.floor(Math.random() * 15),
      })
    }
  }
  return data.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )
}

export const googleSheetsService = {
  async checkConnection(): Promise<boolean> {
    try {
      await delay(1500)
      const isSuccess = Math.random() > 0.1
      if (!isSuccess) {
        throw new Error('Falha na conexão')
      }
      return true
    } catch (error) {
      console.error('Connection check failed:', error)
      return false
    }
  },

  async fetchLeads(): Promise<Lead[]> {
    try {
      await delay(1000)
      return [
        {
          id: '1',
          nomeCompleto: 'João Silva',
          email: 'joao.silva@email.com',
          telefone: '(11) 99999-9999',
          assentosAdicionais: 1,
          origem: 'Planilha',
          status: 'Capturado',
          dataCaptacao: new Date().toISOString(),
        },
        {
          id: '2',
          nomeCompleto: 'Maria Oliveira',
          email: 'maria.o@email.com',
          telefone: '(21) 98888-8888',
          assentosAdicionais: 0,
          origem: 'Planilha',
          status: 'Capturado',
          dataCaptacao: new Date().toISOString(),
        },
      ]
    } catch (error) {
      console.error('Error fetching leads:', error)
      throw error
    }
  },

  async fetchLivesData(): Promise<LiveData[]> {
    try {
      await delay(1200)
      // Return generated mock data
      return generateMockLivesData()
    } catch (error) {
      console.error('Error fetching lives data:', error)
      throw error
    }
  },

  async addLiveToSheet(data: Partial<LiveData>): Promise<void> {
    await delay(800)
    console.log('Adding data to sheet:', data)
    toast({
      title: 'Sucesso',
      description: 'Dados adicionados à planilha com sucesso.',
      className: 'bg-[#10B981] text-white border-none',
    })
  },
}
