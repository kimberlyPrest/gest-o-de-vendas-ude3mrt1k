import { format, subMonths, startOfMonth, subDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Calendar as CalendarIcon,
  Check,
  ChevronsUpDown,
  FilterX,
  Filter,
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
import { useState } from 'react'

export interface FilterState {
  dateRange: DateRange | undefined
  presenters: string[]
  weekdays: string[]
  comparisonEnabled: boolean
}

interface LiveFiltersProps {
  presenters: string[]
  filters: FilterState
  onFilterChange: (filters: FilterState) => void
  loading: boolean
  dateBounds?: { min: Date; max: Date }
  comparisonRange?: { from: Date; to: Date }
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
  { label: 'Período Total', value: 'allTime' },
]

export function LiveFilters({
  presenters,
  filters,
  onFilterChange,
  loading,
  dateBounds,
  comparisonRange,
}: LiveFiltersProps) {
  const [openPresenters, setOpenPresenters] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<string>('30days')

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
        to = today
        break
      case 'allTime':
        if (dateBounds) {
          from = dateBounds.min
          to = dateBounds.max
        }
        break
      default:
        return
    }

    if (from && to) {
      onFilterChange({ ...filters, dateRange: { from, to } })
    }
  }

  const handleClear = () => {
    setSelectedPreset('30days')
    onFilterChange({
      dateRange: { from: subDays(new Date(), 30), to: new Date() },
      presenters: [],
      weekdays: [],
      comparisonEnabled: false,
    })
  }

  const togglePresenter = (presenter: string) => {
    const current = filters.presenters
    const newPresenters = current.includes(presenter)
      ? current.filter((p) => p !== presenter)
      : [...current, presenter]

    onFilterChange({ ...filters, presenters: newPresenters })
  }

  const toggleWeekday = (value: string) => {
    const current = filters.weekdays
    const newWeekdays = current.includes(value)
      ? current.filter((d) => d !== value)
      : [...current, value]

    onFilterChange({ ...filters, weekdays: newWeekdays })
  }

  const hasActiveFilters =
    filters.presenters.length > 0 ||
    filters.weekdays.length > 0 ||
    filters.comparisonEnabled

  return (
    <div className="bg-card border border-border rounded-xl p-2 mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-lg">
      <div className="flex items-center gap-2 px-3 text-muted-foreground shrink-0 border-r border-border pr-4 mr-2">
        <Filter className="w-5 h-5 text-primary" aria-hidden="true" />
        <span className="text-sm font-medium font-sans">Filtros:</span>
      </div>

      {/* Preset Selector */}
      <Select value={selectedPreset} onValueChange={handlePresetChange}>
        <SelectTrigger
          className="h-10 w-[140px] border-border bg-background text-foreground shrink-0 focus:ring-primary/50 font-sans"
          aria-label="Selecionar período pré-definido"
        >
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent className="bg-popover border-border text-popover-foreground">
          {DATE_PRESETS.map((preset) => (
            <SelectItem
              key={preset.value}
              value={preset.value}
              disabled={preset.value === 'allTime' && !dateBounds}
              className="focus:bg-primary focus:text-primary-foreground font-sans data-[state=checked]:bg-primary/20 data-[state=checked]:text-primary"
            >
              {preset.label}
            </SelectItem>
          ))}
          <SelectItem
            value="custom"
            className="focus:bg-primary focus:text-primary-foreground font-sans"
          >
            Personalizado
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'h-10 justify-start text-left font-normal shrink-0 bg-background border-border text-foreground hover:bg-white/5 hover:text-foreground font-sans',
              !filters.dateRange && 'text-muted-foreground',
            )}
            onClick={() => setSelectedPreset('custom')}
            aria-label="Selecionar intervalo de datas personalizado"
          >
            <CalendarIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            {filters.dateRange?.from ? (
              filters.dateRange.to ? (
                <>
                  {format(filters.dateRange.from, 'dd/MM/yy')} -{' '}
                  {format(filters.dateRange.to, 'dd/MM/yy')}
                </>
              ) : (
                format(filters.dateRange.from, 'dd/MM/yy')
              )
            ) : (
              <span>Selecione datas</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto p-0 border-border bg-popover"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={filters.dateRange?.from}
            selected={filters.dateRange}
            onSelect={(range) => {
              onFilterChange({ ...filters, dateRange: range })
              setSelectedPreset('custom')
            }}
            numberOfMonths={2}
            locale={ptBR}
            className="bg-popover text-popover-foreground"
          />
        </PopoverContent>
      </Popover>

      {/* Presenters */}
      <Popover open={openPresenters} onOpenChange={setOpenPresenters}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openPresenters}
            aria-label="Filtrar por apresentador"
            className="h-10 justify-between shrink-0 min-w-[150px] bg-background border-border text-foreground hover:bg-white/5 hover:text-foreground font-sans"
          >
            <span className="truncate">
              {filters.presenters.length === 0
                ? 'Todos os Hosts'
                : `${filters.presenters.length} selecionado(s)`}
            </span>
            <ChevronsUpDown
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0 border-border bg-popover">
          <Command className="bg-popover text-popover-foreground">
            <CommandInput
              placeholder="Buscar apresentador..."
              className="border-border"
            />
            <CommandList>
              <CommandEmpty>Nenhum apresentador.</CommandEmpty>
              <CommandGroup>
                <CommandItem
                  onSelect={() => {
                    if (filters.presenters.length === presenters.length) {
                      onFilterChange({ ...filters, presenters: [] })
                    } else {
                      onFilterChange({
                        ...filters,
                        presenters: [...presenters],
                      })
                    }
                  }}
                  className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground font-sans"
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      filters.presenters.length === presenters.length &&
                        presenters.length > 0
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    <Check className={cn('h-4 w-4')} aria-hidden="true" />
                  </div>
                  <span>Selecionar Todos</span>
                </CommandItem>
                <CommandSeparator className="my-1 bg-border" />
                {presenters.map((presenter) => (
                  <CommandItem
                    key={presenter}
                    value={presenter}
                    onSelect={() => togglePresenter(presenter)}
                    className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground font-sans"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        filters.presenters.includes(presenter)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={cn('h-4 w-4')} aria-hidden="true" />
                    </div>
                    <span>{presenter}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Weekdays - Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-label="Filtrar por dia da semana"
            className="h-10 justify-between shrink-0 min-w-[150px] bg-background border-border text-foreground hover:bg-white/5 hover:text-foreground font-sans"
          >
            <span className="truncate">
              {filters.weekdays.length === 0
                ? 'Dia da Semana'
                : `${filters.weekdays.length} dia(s)`}
            </span>
            <ChevronsUpDown
              className="ml-2 h-4 w-4 shrink-0 opacity-50"
              aria-hidden="true"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 border-border bg-popover">
          <Command className="bg-popover text-popover-foreground">
            <CommandList>
              <CommandGroup>
                {WEEKDAYS.map((day) => (
                  <CommandItem
                    key={day.value}
                    value={day.value}
                    onSelect={() => toggleWeekday(day.value)}
                    className="data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground font-sans"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        filters.weekdays.includes(day.value)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={cn('h-4 w-4')} aria-hidden="true" />
                    </div>
                    <span>{day.value}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Comparison Toggle */}
      <label
        className="flex items-center gap-3 shrink-0 cursor-pointer group px-2"
        onClick={(e) => {
          e.preventDefault()
          onFilterChange({
            ...filters,
            comparisonEnabled: !filters.comparisonEnabled,
          })
        }}
      >
        <Switch
          checked={filters.comparisonEnabled}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, comparisonEnabled: checked })
          }
          disabled={!filters.dateRange?.from || !filters.dateRange?.to}
          className="data-[state=checked]:bg-primary"
          aria-label="Ativar comparação de períodos"
        />
        <div className="flex items-center gap-1.5 text-muted-foreground group-hover:text-foreground transition-colors font-sans">
          <ArrowRightLeft className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-medium">Comparar</span>
        </div>
      </label>

      {/* Comparison Badges */}
      {filters.comparisonEnabled &&
        filters.dateRange?.from &&
        filters.dateRange?.to &&
        comparisonRange && (
          <div className="flex items-center gap-2 animate-fade-in pl-2 border-l border-border">
            {/* Current Period Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 border border-border rounded-lg hover:border-primary/50 transition-colors group cursor-default shadow-sm">
              <span className="font-display font-semibold text-primary text-xs uppercase tracking-wide">
                Atual:
              </span>
              <span className="font-sans text-xs text-foreground">
                {format(filters.dateRange.from, 'dd/MM')} -{' '}
                {format(filters.dateRange.to, 'dd/MM')}
              </span>
            </div>

            {/* Comparison Period Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/50 border border-border rounded-lg hover:border-gray-500 transition-colors group cursor-default shadow-sm">
              <span className="font-display font-semibold text-muted-foreground text-xs uppercase tracking-wide">
                vs.
              </span>
              <span className="font-sans text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                {format(comparisonRange.from, 'dd/MM')} -{' '}
                {format(comparisonRange.to, 'dd/MM')}
              </span>
            </div>
          </div>
        )}

      <div className="flex-1"></div>

      {/* Clear Filters - Conditional */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          aria-label="Limpar todos os filtros"
          className="flex items-center gap-1.5 px-3 py-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all shrink-0 font-sans"
        >
          <FilterX className="w-4 h-4" aria-hidden="true" />
          <span className="text-xs font-medium">Limpar Filtros</span>
        </button>
      )}
    </div>
  )
}
