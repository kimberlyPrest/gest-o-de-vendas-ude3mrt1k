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
  filters,
  onFilterChange,
  loading,
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
    <section className="bg-[#1A1A1A] border border-[#333333] rounded-xl p-2 mb-8 flex items-center gap-2 overflow-x-auto no-scrollbar shadow-lg">
      <div className="flex items-center gap-2 px-3 text-gray-400 shrink-0 border-r border-[#333333] pr-4 mr-2">
        <Filter className="w-5 h-5 text-[#D9B979]" />
        <span className="text-sm font-medium">Filtros:</span>
      </div>

      {/* Preset Selector */}
      <Select value={selectedPreset} onValueChange={handlePresetChange}>
        <SelectTrigger className="h-10 w-[140px] border-[#333333] bg-[#0C0C0D] text-gray-200 shrink-0 focus:ring-[#D9B979]/50">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent className="bg-[#1A1A1A] border-[#333333] text-gray-200">
          {DATE_PRESETS.map((preset) => (
            <SelectItem
              key={preset.value}
              value={preset.value}
              className="focus:bg-[#333333] focus:text-white"
            >
              {preset.label}
            </SelectItem>
          ))}
          <SelectItem
            value="custom"
            className="focus:bg-[#333333] focus:text-white"
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
              'h-10 justify-start text-left font-normal shrink-0 bg-[#0C0C0D] border-[#333333] text-gray-200 hover:bg-[#333333] hover:text-white',
              !filters.dateRange && 'text-muted-foreground',
            )}
            onClick={() => setSelectedPreset('custom')}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
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
          className="w-auto p-0 border-[#333333] bg-[#1A1A1A]"
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
            className="bg-[#1A1A1A] text-white"
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
            className="h-10 justify-between shrink-0 min-w-[150px] bg-[#0C0C0D] border-[#333333] text-gray-200 hover:bg-[#333333] hover:text-white"
          >
            <span className="truncate">
              {filters.presenters.length === 0
                ? 'Todos os Hosts'
                : `${filters.presenters.length} selecionado(s)`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0 border-[#333333] bg-[#1A1A1A]">
          <Command className="bg-[#1A1A1A] text-white">
            <CommandInput
              placeholder="Buscar apresentador..."
              className="border-[#333333]"
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
                  className="data-[selected=true]:bg-[#333333] data-[selected=true]:text-white"
                >
                  <div
                    className={cn(
                      'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                      filters.presenters.length === presenters.length &&
                        presenters.length > 0
                        ? 'bg-[#D9B979] text-black border-[#D9B979]'
                        : 'opacity-50 [&_svg]:invisible',
                    )}
                  >
                    <Check className={cn('h-4 w-4')} />
                  </div>
                  <span>Selecionar Todos</span>
                </CommandItem>
                <CommandSeparator className="my-1 bg-[#333333]" />
                {presenters.map((presenter) => (
                  <CommandItem
                    key={presenter}
                    value={presenter}
                    onSelect={() => togglePresenter(presenter)}
                    className="data-[selected=true]:bg-[#333333] data-[selected=true]:text-white"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        filters.presenters.includes(presenter)
                          ? 'bg-[#D9B979] text-black border-[#D9B979]'
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

      {/* Weekdays - Dropdown */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="h-10 justify-between shrink-0 min-w-[150px] bg-[#0C0C0D] border-[#333333] text-gray-200 hover:bg-[#333333] hover:text-white"
          >
            <span className="truncate">
              {filters.weekdays.length === 0
                ? 'Dia da Semana'
                : `${filters.weekdays.length} dia(s)`}
            </span>
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0 border-[#333333] bg-[#1A1A1A]">
          <Command className="bg-[#1A1A1A] text-white">
            <CommandList>
              <CommandGroup>
                {WEEKDAYS.map((day) => (
                  <CommandItem
                    key={day.value}
                    value={day.value}
                    onSelect={() => toggleWeekday(day.value)}
                    className="data-[selected=true]:bg-[#333333] data-[selected=true]:text-white"
                  >
                    <div
                      className={cn(
                        'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                        filters.weekdays.includes(day.value)
                          ? 'bg-[#D9B979] text-black border-[#D9B979]'
                          : 'opacity-50 [&_svg]:invisible',
                      )}
                    >
                      <Check className={cn('h-4 w-4')} />
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
      <div
        className="flex items-center gap-3 shrink-0 cursor-pointer group px-2"
        onClick={() =>
          onFilterChange({
            ...filters,
            comparisonEnabled: !filters.comparisonEnabled,
          })
        }
      >
        <Switch
          checked={filters.comparisonEnabled}
          onCheckedChange={(checked) =>
            onFilterChange({ ...filters, comparisonEnabled: checked })
          }
          disabled={!filters.dateRange?.from || !filters.dateRange?.to}
          className="data-[state=checked]:bg-[#D9B979]"
        />
        <div className="flex items-center gap-1.5 text-gray-400 group-hover:text-white transition-colors">
          <ArrowRightLeft className="w-4 h-4" />
          <span className="text-xs font-medium">Comparar</span>
        </div>
      </div>

      <div className="flex-1"></div>

      {/* Clear Filters - Conditional */}
      {hasActiveFilters && (
        <button
          onClick={handleClear}
          className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-[#FF453A] hover:bg-[#FF453A]/10 rounded-lg transition-all shrink-0"
        >
          <FilterX className="w-4 h-4" />
          <span className="text-xs font-medium">Limpar Filtros</span>
        </button>
      )}
    </section>
  )
}
