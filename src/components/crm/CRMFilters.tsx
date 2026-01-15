import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { useCRMStore } from '@/stores/crmStore'
import { Search, Calendar as CalendarIcon, Filter, X } from 'lucide-react'

export function CRMFilters() {
  const { filters, setFilter, clearFilters, filteredLeads } = useCRMStore()
  const [searchValue, setSearchValue] = useState(filters.search)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilter('search', searchValue)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchValue, setFilter])

  // Sync internal state with store (for clear functionality)
  useEffect(() => {
    setSearchValue(filters.search)
  }, [filters.search])

  const activeFiltersCount = [
    filters.search,
    filters.origin !== 'all',
    filters.dateRange,
    filters.valueRange.min || filters.valueRange.max,
  ].filter(Boolean).length

  return (
    <div className="cyber-card p-5 mb-8 flex flex-wrap items-center gap-8 bg-card border border-border">
      {/* Search */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[250px]">
        <label
          htmlFor="crm-search"
          className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-muted-foreground"
        >
          Buscar Lead
        </label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="crm-search"
            type="text"
            placeholder="Nome, email ou telefone..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full text-[13px] font-medium pl-10 pr-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-1 focus:ring-primary focus:outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Origin Filter */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="crm-origin"
          className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-muted-foreground"
        >
          Origem
        </label>
        <select
          id="crm-origin"
          value={filters.origin}
          onChange={(e) => setFilter('origin', e.target.value)}
          className="text-[13px] font-medium px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:ring-1 focus:ring-primary min-w-[160px] outline-none"
        >
          <option value="all">Todas Origens</option>
          <option value="Planilha">Planilha</option>
          <option value="Manual">Manual</option>
          <option value="Site">Site</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col gap-1.5">
        <span
          id="crm-date-label"
          className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-muted-foreground"
        >
          Data de Captura
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <button
              aria-labelledby="crm-date-label"
              className={cn(
                'flex items-center gap-3 px-3 py-2 border border-border rounded-lg cursor-pointer text-left min-w-[220px] bg-input',
              )}
            >
              <span
                className="text-[13px] font-medium"
                style={{
                  color: filters.dateRange?.from
                    ? 'hsl(var(--foreground))'
                    : 'hsl(var(--muted-foreground))',
                }}
              >
                {filters.dateRange?.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, 'dd/MM/yyyy')} -{' '}
                      {format(filters.dateRange.to, 'dd/MM/yyyy')}
                    </>
                  ) : (
                    format(filters.dateRange.from, 'dd/MM/yyyy')
                  )
                ) : (
                  'Selecione...'
                )}
              </span>
              <CalendarIcon
                className="h-[18px] w-[18px] ml-auto text-muted-foreground"
                aria-hidden="true"
              />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-popover border-border"
            align="start"
          >
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) => setFilter('dateRange', range)}
              numberOfMonths={2}
              locale={ptBR}
              className="bg-popover text-popover-foreground"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Value Range Filter */}
      <div className="flex flex-col gap-1.5">
        <span
          id="crm-value-label"
          className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-muted-foreground"
        >
          Valor Potencial
        </span>
        <Popover>
          <PopoverTrigger asChild>
            <button
              aria-labelledby="crm-value-label"
              className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg cursor-pointer bg-input"
              style={{
                borderColor:
                  filters.valueRange.min || filters.valueRange.max
                    ? 'hsl(var(--primary))'
                    : 'hsl(var(--border))',
              }}
            >
              <Filter
                className="h-[18px] w-[18px] text-muted-foreground"
                aria-hidden="true"
              />
              <span
                className="text-[13px] font-medium"
                style={{
                  color:
                    filters.valueRange.min || filters.valueRange.max
                      ? 'hsl(var(--primary))'
                      : 'hsl(var(--foreground))',
                }}
              >
                {filters.valueRange.min || filters.valueRange.max
                  ? `R$ ${filters.valueRange.min || '0'} - R$ ${filters.valueRange.max || '∞'}`
                  : 'Filtrar valor'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-popover border-border rounded-2xl">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-popover-foreground">
                  Valor Potencial
                </h4>
                <p className="text-sm text-muted-foreground">
                  Filtre pelo valor total estimado do lead
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label
                    htmlFor="min-value"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Mínimo
                  </label>
                  <Input
                    id="min-value"
                    type="number"
                    placeholder="0"
                    value={filters.valueRange.min}
                    onChange={(e) =>
                      setFilter('valueRange', {
                        ...filters.valueRange,
                        min: e.target.value,
                      })
                    }
                    className="rounded-lg bg-input border-border text-foreground"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    htmlFor="max-value"
                    className="text-xs font-medium text-muted-foreground"
                  >
                    Máximo
                  </label>
                  <Input
                    id="max-value"
                    type="number"
                    placeholder="10000"
                    value={filters.valueRange.max}
                    onChange={(e) =>
                      setFilter('valueRange', {
                        ...filters.valueRange,
                        max: e.target.value,
                      })
                    }
                    className="rounded-lg bg-input border-border text-foreground"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Clear Filters & Count */}
      <div className="flex flex-col gap-1.5 ml-auto">
        <span className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-muted-foreground">
          Resultados
        </span>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl text-[13px] font-semibold bg-primary/10 text-primary">
            {filteredLeads.length} Leads
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              aria-label="Limpar todos os filtros"
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              Limpar
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
