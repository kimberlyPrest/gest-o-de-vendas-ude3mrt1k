import { useState, useEffect } from 'react'
import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  subDays,
  startOfDay,
  endOfDay,
} from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  FilterX,
  Search,
  ArrowRightLeft,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export interface FilterState {
  dateRange: DateRange | undefined
  presenters: string[]
  weekdays: string[]
  comparisonEnabled: boolean
}

interface LiveFiltersProps {
  presenters: string[]
  onApply: (filters: FilterState) => void
  onClear: () => void
  loading: boolean
  initialFilters?: FilterState
}

const WEEKDAYS = [
  { label: 'Seg', value: 'Segunda-feira' },
  { label: 'Ter', value: 'Terça-feira' },
  { label: 'Qua', value: 'Quarta-feira' },
  { label: 'Qui', value: 'Quinta-feira' },
  { label: 'Sex', value: 'Sexta-feira' },
  { label: 'Sáb', value: 'Sábado' },
  { label: 'Dom', value: 'Domingo' },
]

const DATE_PRESETS = [
  { label: 'Últimos 30 Dias', value: '30days' },
  { label: 'Últimos 3 Meses', value: '3months' },
  { label: 'Últimos 6 Meses', value: '6months' },
  { label: 'Mês Atual', value: 'currentMonth' },
]

export function LiveFilters({
  presenters,
  onApply,
  onClear,
  loading,
  initialFilters,
}: LiveFiltersProps) {
  const [date, setDate] = useState<DateRange | undefined>(
    initialFilters?.dateRange,
  )
  const [selectedPresenters, setSelectedPresenters] = useState<string[]>(
    initialFilters?.presenters || [],
  )
  const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>(
    initialFilters?.weekdays || [],
  )
  const [comparisonEnabled, setComparisonEnabled] = useState(
    initialFilters?.comparisonEnabled || false,
  )
  const [openPresenters, setOpenPresenters] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string>('30days')

  // Apply default preset on mount if no initial filters
  useEffect(() => {
    if (!initialFilters) {
      handlePresetChange('30days')
    }
  }, [])

  const handlePresetChange = (value: string) => {
    setSelectedPreset(value)
    const today = new Date()
    let from: Date | undefined
    let to: Date | undefined = today

    switch (value) {
      case '30days':
        from = subDays(today, 30)
        break
      case '3months':
        from = subMonths(today, 3)
        break
      case '6months':
        from = subMonths(today, 6)
        break
      case 'currentMonth':
        from = startOfMonth(today)
        to = endOfMonth(today)
        break
      default:
        return
    }

    if (from && to) {
      setDate({ from, to })
    }
  }

  const handleApply = () => {
    onApply({
      dateRange: date,
      presenters: selectedPresenters,
      weekdays: selectedWeekdays,
      comparisonEnabled: comparisonEnabled && !!date?.from && !!date?.to,
    })
  }

  const handleClear = () => {
    handlePresetChange('30days')
    setSelectedPresenters([])
    setSelectedWeekdays([])
    setComparisonEnabled(false)
    onClear()
  }

  const togglePresenter = (presenter: string) => {
    setSelectedPresenters((prev) =>
      prev.includes(presenter)
        ? prev.filter((p) => p !== presenter)
        : [...prev, presenter],
    )
  }

  const toggleWeekday = (value: string) => {
    setSelectedWeekdays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    )
  }

  return (
    <div className="mb-6 space-y-4 rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-6 md:flex-row md:items-start">
        {/* Main Filters Section */}
        <div className="grid flex-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Preset Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Período Rápido
            </label>
            <Select value={selectedPreset} onValueChange={handlePresetChange}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                {DATE_PRESETS.map((preset) => (
                  <SelectItem key={preset.value} value={preset.value}>
                    {preset.label}
                  </SelectItem>
                ))}
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Range Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Intervalo de Datas
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-full justify-start text-left font-normal truncate',
                    !date && 'text-muted-foreground',
                  )}
                  onClick={() => setSelectedPreset('custom')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 shrink-0" />
                  {date?.from ? (
                    date.to ? (
                      <span className="truncate">
                        {format(date.from, 'dd/MM/yy')} -{' '}
                        {format(date.to, 'dd/MM/yy')}
                      </span>
                    ) : (
                      format(date.from, 'dd/MM/yy')
                    )
                  ) : (
                    <span>Selecione datas</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={(range) => {
                    setDate(range)
                    setSelectedPreset('custom')
                  }}
                  numberOfMonths={2}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Presenter Multi-Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
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
                      ? 'Todos'
                      : `${selectedPresenters.length} selecionado(s)`}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] p-0">
                <Command>
                  <CommandInput placeholder="Buscar apresentador..." />
                  <CommandList>
                    <CommandEmpty>Nenhum apresentador.</CommandEmpty>
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
                            selectedPresenters.length === presenters.length &&
                              presenters.length > 0
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

          {/* Weekdays Filter */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase">
              Dias da Semana
            </label>
            <div className="flex flex-wrap gap-1">
              {WEEKDAYS.map((day) => (
                <button
                  key={day.value}
                  onClick={() => toggleWeekday(day.value)}
                  className={cn(
                    'px-2 py-1 rounded text-[10px] font-medium transition-all border',
                    selectedWeekdays.includes(day.value)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background hover:bg-muted text-muted-foreground border-border',
                  )}
                >
                  {day.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Actions & Comparison Toggle */}
        <div className="flex flex-col gap-4 border-l pl-6 md:w-[240px]">
          <div className="flex items-center justify-between gap-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Comparar Período
            </label>
            <Switch
              checked={comparisonEnabled}
              onCheckedChange={setComparisonEnabled}
              disabled={!date?.from || !date?.to}
            />
          </div>

          <Separator />

          <div className="flex flex-col gap-2">
            <Button
              onClick={handleApply}
              disabled={
                loading || (date?.from && date?.to && date.from > date.to)
              }
              className="w-full"
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
              className="w-full"
            >
              <FilterX className="mr-2 h-4 w-4" />
              Limpar Filtros
            </Button>
          </div>
        </div>
      </div>

      {/* Comparison Badge Info */}
      {comparisonEnabled && date?.from && date?.to && (
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-2 text-sm text-blue-700">
          <ArrowRightLeft className="h-4 w-4" />
          <span>
            Comparando{' '}
            <strong>
              {format(date.from, 'dd/MM')} - {format(date.to, 'dd/MM')}
            </strong>{' '}
            com período anterior equivalente
          </span>
        </div>
      )}
    </div>
  )
}
