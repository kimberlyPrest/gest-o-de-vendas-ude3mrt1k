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

export const googleSheetsService = {
  async checkConnection(): Promise<boolean> {
    try {
      await delay(1500) // Simulate network check
      // Simulate 90% success rate
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
      return [
        {
          date: '2023-10-27',
          weekday: 'Sexta',
          peakViewers: 1500,
          retainedViewers: 1200,
          sales: 45,
          presenter: 'Ana',
          conversionRate: 3.0,
          retentionRate: 80.0,
          revenue: 4500.0,
          additionalSeats: 5,
        },
      ]
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
