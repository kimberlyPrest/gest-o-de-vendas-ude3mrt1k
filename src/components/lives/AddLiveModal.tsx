import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Loader2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'
import { googleSheetsService } from '@/services/googleSheetsService'
import { useToast } from '@/hooks/use-toast'
import { CalendarIcon } from 'lucide-react'

const formSchema = z
  .object({
    date: z.date({ required_error: 'Data é obrigatória' }),
    presenter: z.string().min(1, 'Apresentador é obrigatório'),
    customPresenter: z.string().optional(),
    peakViewers: z.coerce.number().min(1, 'Mínimo 1 espectador'),
    retainedViewers: z.coerce.number().min(0),
    sales: z.coerce.number().min(0),
    revenue: z.string().min(1, 'Faturamento é obrigatório'), // Handling as string for masking
    additionalSeats: z.coerce.number().min(0),
  })
  .refine((data) => data.retainedViewers <= data.peakViewers, {
    message: 'Retidos não pode ser maior que o pico',
    path: ['retainedViewers'],
  })

interface AddLiveModalProps {
  presenters: string[]
  onSuccess: () => void
}

export function AddLiveModal({ presenters, onSuccess }: AddLiveModalProps) {
  const { toast } = useToast()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [calculatedMetrics, setCalculatedMetrics] = useState({
    conversion: 0,
    retention: 0,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      peakViewers: 0,
      retainedViewers: 0,
      sales: 0,
      revenue: '',
      additionalSeats: 0,
    },
  })

  // Watch values for real-time calculations
  const values = form.watch()

  useEffect(() => {
    const peak = Number(values.peakViewers) || 0
    const retained = Number(values.retainedViewers) || 0
    const sales = Number(values.sales) || 0

    const conversion = peak > 0 ? (sales / peak) * 100 : 0
    const retention = peak > 0 ? (retained / peak) * 100 : 0

    setCalculatedMetrics({
      conversion: parseFloat(conversion.toFixed(2)),
      retention: parseFloat(retention.toFixed(2)),
    })
  }, [values.peakViewers, values.retainedViewers, values.sales])

  // Format revenue input
  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '')
    const numberValue = Number(value) / 100
    const formatted = new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
    }).format(numberValue)
    form.setValue('revenue', formatted)
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    try {
      const presenterName =
        data.presenter === 'other' ? data.customPresenter : data.presenter

      if (!presenterName) {
        form.setError('customPresenter', {
          message: 'Nome do apresentador é obrigatório',
        })
        setIsSubmitting(false)
        return
      }

      const revenueValue =
        Number(data.revenue.replace(/\./g, '').replace(',', '.')) || 0

      await googleSheetsService.addLiveToSheet({
        date: data.date.toISOString().split('T')[0],
        weekday: format(data.date, 'EEEE', { locale: ptBR }),
        presenter: presenterName,
        peakViewers: data.peakViewers,
        retainedViewers: data.retainedViewers,
        sales: data.sales,
        revenue: revenueValue,
        additionalSeats: data.additionalSeats,
        conversionRate: calculatedMetrics.conversion,
        retentionRate: calculatedMetrics.retention,
      })

      toast({
        title: 'Sucesso',
        description: 'Live adicionada com sucesso!',
        className: 'bg-[#10B981] text-white border-none',
      })
      setOpen(false)
      form.reset()
      onSuccess()
    } catch (error) {
      console.error(error)
      toast({
        title: 'Erro',
        description: 'Erro ao salvar live. Tente novamente.',
        variant: 'destructive',
        className: 'bg-[#EF4444] text-white border-none',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedDate = form.watch('date')
  const weekday = selectedDate
    ? format(selectedDate, 'EEEE', { locale: ptBR })
    : ''

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-12 w-12 rounded-full bg-[#10B981] p-0 hover:bg-[#059669] md:h-10 md:w-auto md:rounded-md md:px-4">
          <Plus className="h-6 w-6 md:mr-2 md:h-4 md:w-4" />
          <span className="hidden md:inline">Adicionar Live Exponencial</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Live</DialogTitle>
          <DialogDescription>
            Insira os dados da live manualmente para atualizar o dashboard.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Date Field */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={'outline'}
                            className={cn(
                              'w-full pl-3 text-left font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd/MM/yyyy')
                            ) : (
                              <span>Selecione a data</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date('1900-01-01')
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Weekday Read-only */}
              <div className="flex flex-col space-y-2">
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-3">
                  Dia da Semana
                </span>
                <Input
                  value={
                    weekday
                      ? weekday.charAt(0).toUpperCase() + weekday.slice(1)
                      : '-'
                  }
                  disabled
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Presenter Selection */}
              <FormField
                control={form.control}
                name="presenter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apresentador *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {presenters.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Outro (Novo)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Custom Presenter Input */}
              {form.watch('presenter') === 'other' && (
                <FormField
                  control={form.control}
                  name="customPresenter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Apresentador *</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="peakViewers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pico de Espectadores *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="retainedViewers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Espectadores Retidos *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sales"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nº de Vendas *</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="additionalSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assentos Adicionais</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faturamento (R$) *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        handleRevenueChange(e)
                        field.onChange(e)
                      }}
                      placeholder="0,00"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Live Calculations Card */}
            <div className="rounded-lg border border-blue-100 bg-blue-50 p-4">
              <h4 className="mb-2 text-sm font-semibold text-blue-900">
                Cálculos em Tempo Real
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-blue-700">Conversão</span>
                  <p className="text-lg font-bold text-blue-900">
                    {calculatedMetrics.conversion}%
                  </p>
                </div>
                <div>
                  <span className="text-xs text-blue-700">Retenção</span>
                  <p className="text-lg font-bold text-blue-900">
                    {calculatedMetrics.retention}%
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSubmitting ? 'Salvando...' : 'Salvar Live'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
