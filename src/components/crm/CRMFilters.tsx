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
    <div className="cyber-card p-5 mb-8 flex flex-wrap items-center gap-8">
      {/* Search */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[250px]">
        <label className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500">
          Buscar Lead
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-gray-500" />
          <input
            type="text"
            placeholder="Nome, email ou telefone..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full text-[13px] font-medium pl-10 pr-3 py-2 border border-[#333333] rounded-lg bg-[#1A1A1A] text-white focus:ring-1 focus:ring-[#D9B979] focus:outline-none"
          />
        </div>
      </div>

      {/* Origin Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500">
          Origem
        </label>
        <select
          value={filters.origin}
          onChange={(e) => setFilter('origin', e.target.value)}
          className="text-[13px] font-medium px-3 py-2 border border-[#333333] rounded-lg bg-[#1A1A1A] text-white focus:ring-1 focus:ring-[#D9B979] min-w-[160px] outline-none"
        >
          <option value="all">Todas Origens</option>
          <option value="Planilha">Planilha</option>
          <option value="Manual">Manual</option>
          <option value="Site">Site</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500">
          Data de Captura
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'flex items-center gap-3 px-3 py-2 border border-[#333333] rounded-lg cursor-pointer text-left min-w-[220px] bg-[#1A1A1A]',
              )}
            >
              <span
                className="text-[13px] font-medium"
                style={{
                  color: filters.dateRange?.from ? 'white' : '#6B7280',
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
              <CalendarIcon className="h-[18px] w-[18px] ml-auto text-gray-500" />
            </button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0 bg-[#1A1A1A] border-[#333333]"
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
              className="bg-[#1A1A1A] text-white"
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Value Range Filter */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500">
          Valor Potencial
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 py-2 border border-[#333333] rounded-lg cursor-pointer bg-[#1A1A1A]"
              style={{
                borderColor:
                  filters.valueRange.min || filters.valueRange.max
                    ? '#D9B979'
                    : '#333333',
              }}
            >
              <Filter className="h-[18px] w-[18px] text-gray-500" />
              <span
                className="text-[13px] font-medium"
                style={{
                  color:
                    filters.valueRange.min || filters.valueRange.max
                      ? '#D9B979'
                      : 'white',
                }}
              >
                {filters.valueRange.min || filters.valueRange.max
                  ? `R$ ${filters.valueRange.min || '0'} - R$ ${filters.valueRange.max || '∞'}`
                  : 'Filtrar valor'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 bg-[#1A1A1A] border-[#333333] rounded-2xl">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-white">
                  Valor Potencial
                </h4>
                <p className="text-sm text-gray-500">
                  Filtre pelo valor total estimado do lead
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label className="text-xs font-medium text-gray-500">
                    Mínimo
                  </label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={filters.valueRange.min}
                    onChange={(e) =>
                      setFilter('valueRange', {
                        ...filters.valueRange,
                        min: e.target.value,
                      })
                    }
                    className="rounded-lg bg-[#0C0C0D] border-[#333333] text-white"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-xs font-medium text-gray-500">
                    Máximo
                  </label>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={filters.valueRange.max}
                    onChange={(e) =>
                      setFilter('valueRange', {
                        ...filters.valueRange,
                        max: e.target.value,
                      })
                    }
                    className="rounded-lg bg-[#0C0C0D] border-[#333333] text-white"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Clear Filters & Count */}
      <div className="flex flex-col gap-1.5 ml-auto">
        <label className="text-[11px] font-semibold uppercase tracking-wider ml-1 text-gray-500">
          Resultados
        </label>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl text-[13px] font-semibold bg-[#D9B979]/10 text-[#D9B979]">
            {filteredLeads.length} Leads
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors text-gray-400 hover:bg-white/5 hover:text-white"
            >
              Limpar
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
