import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  FilterX,
  Search,
} from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useToast } from '@/hooks/use-toast'

export interface FilterState {
  dateRange: DateRange | undefined
  presenters: string[]
  weekdays: number[]
}

interface LiveFiltersProps {
  presenters: string[]
  onApply: (filters: FilterState) => void
  onClear: () => void
  loading: boolean
}

const WEEKDAYS = [
  { label: 'S', name: 'Domingo', value: 0 },
  { label: 'S', name: 'Segunda', value: 1 },
  { label: 'T', name: 'Terça', value: 2 },
  { label: 'Q', name: 'Quarta', value: 3 },
  { label: 'Q', name: 'Quinta', value: 4 },
  { label: 'S', name: 'Sexta', value: 5 },
  { label: 'S', name: 'Sábado', value: 6 },
]

export function LiveFilters({
  presenters,
  onApply,
  onClear,
  loading,
}: LiveFiltersProps) {
  const { toast } = useToast()
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })
  const [selectedPresenters, setSelectedPresenters] = useState<string[]>([])
  const [selectedWeekdays, setSelectedWeekdays] = useState<number[]>([])
  const [openPresenters, setOpenPresenters] = useState(false)

  const handleApply = () => {
    if (date?.from && date?.to && date.from > date.to) {
      toast({
        title: 'Erro de Validação',
        description: 'A data inicial não pode ser maior que a data final.',
        variant: 'destructive',
        className: 'bg-[#EF4444] text-white border-none',
      })
      return
    }

    onApply({
      dateRange: date,
      presenters: selectedPresenters,
      weekdays: selectedWeekdays,
    })
  }

  const handleClear = () => {
    setDate({ from: subDays(new Date(), 30), to: new Date() })
    setSelectedPresenters([])
    setSelectedWeekdays([])
    onClear()
  }

  const togglePresenter = (presenter: string) => {
    setSelectedPresenters((prev) =>
      prev.includes(presenter)
        ? prev.filter((p) => p !== presenter)
        : [...prev, presenter],
    )
  }

  const toggleWeekday = (value: number) => {
    setSelectedWeekdays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    )
  }

  return (
    <div className="mb-6 grid gap-4 rounded-lg bg-white p-4 shadow-sm md:grid-cols-2 lg:grid-cols-4">
      {/* Date Range Picker */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Período</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, 'dd/MM/yyyy')} -{' '}
                    {format(date.to, 'dd/MM/yyyy')}
                  </>
                ) : (
                  format(date.from, 'dd/MM/yyyy')
                )
              ) : (
                <span>Selecione um período</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Presenter Multi-Select */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Apresentadores
        </label>
        <Popover open={openPresenters} onOpenChange={setOpenPresenters}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openPresenters}
              className="w-full justify-between"
            >
              <span className="truncate">
                {selectedPresenters.length === 0
                  ? 'Todos os apresentadores'
                  : `${selectedPresenters.length} selecionado(s)`}
              </span>
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Buscar..." />
              <CommandList>
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup>
                  <CommandItem
                    onSelect={() => {
                      if (selectedPresenters.length === presenters.length) {
                        setSelectedPresenters([])
                      } else {
                        setSelectedPresenters([...presenters])
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        selectedPresenters.length === presenters.length
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={cn('h-4 w-4')} />
                    </div>
                    <span>Selecionar Todos</span>
                  </CommandItem>
                  <CommandSeparator className="my-1" />
                  {presenters.map((presenter) => (
                    <CommandItem
                      key={presenter}
                      value={presenter}
                      onSelect={() => togglePresenter(presenter)}
                    >
                      <div
                        className={cn(
                          'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                          selectedPresenters.includes(presenter)
                            ? 'bg-primary text-primary-foreground'
                            : 'opacity-50 [&_svg]:invisible',
                        )}
                      >
                        <Check className={cn('h-4 w-4')} />
                      </div>
                      <span>{presenter}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Weekday Filter */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Dias da Semana
        </label>
        <div className="flex justify-between gap-1">
          {WEEKDAYS.map((day, idx) => {
            const isSelected = selectedWeekdays.includes(day.value)
            // Use index to map 0=Sunday (Dom) to 6=Saturday correctly based on date-fns/js day
            // WEEKDAYS array order: Sun(0), Mon(1)...
            return (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => toggleWeekday(day.value)}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-md border text-xs font-medium transition-colors',
                      isSelected
                        ? 'bg-[#3B82F6] text-white border-[#3B82F6]'
                        : 'bg-white text-gray-600 hover:bg-gray-100',
                    )}
                  >
                    {day.label}
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{day.name}</p>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col justify-end gap-2 sm:flex-row lg:flex-col lg:justify-end">
        <Button
          onClick={handleApply}
          disabled={loading || (date?.from && date?.to && date.from > date.to)}
          className="w-full bg-[#3B82F6] hover:bg-[#2563EB]"
        >
          {loading ? (
            <Search className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Search className="mr-2 h-4 w-4" />
          )}
          Aplicar Filtros
        </Button>
        <Button
          onClick={handleClear}
          variant="ghost"
          disabled={loading}
          className="w-full text-gray-500 hover:text-gray-900"
        >
          <FilterX className="mr-2 h-4 w-4" />
          Limpar
        </Button>
      </div>
    </div>
  )
}
