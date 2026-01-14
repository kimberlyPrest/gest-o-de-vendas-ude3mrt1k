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
    <div className="apple-card p-5 mb-8 flex flex-wrap items-center gap-8">
      {/* Search */}
      <div className="flex flex-col gap-1.5 flex-1 min-w-[250px]">
        <label
          className="text-[11px] font-semibold uppercase tracking-wider ml-1"
          style={{ color: '#86868B' }}
        >
          Buscar Lead
        </label>
        <div className="relative">
          <span
            className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px]"
            style={{ color: '#86868B' }}
          >
            search
          </span>
          <input
            type="text"
            placeholder="Nome, email ou telefone..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full text-[13px] font-medium pl-10 pr-3 py-2 border rounded-lg focus:ring-0 focus:outline-none"
            style={{
              backgroundColor: 'rgba(0,0,0,0.03)',
              borderColor: '#E5E5E7',
              color: '#1D1D1F',
            }}
          />
        </div>
      </div>

      {/* Origin Filter */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[11px] font-semibold uppercase tracking-wider ml-1"
          style={{ color: '#86868B' }}
        >
          Origem
        </label>
        <select
          value={filters.origin}
          onChange={(e) => setFilter('origin', e.target.value)}
          className="text-[13px] font-medium px-3 py-2 border rounded-lg focus:ring-0 min-w-[160px]"
          style={{
            backgroundColor: 'rgba(0,0,0,0.03)',
            borderColor: '#E5E5E7',
            color: '#1D1D1F',
          }}
        >
          <option value="all">Todas Origens</option>
          <option value="Planilha">Planilha</option>
          <option value="Manual">Manual</option>
          <option value="Site">Site</option>
        </select>
      </div>

      {/* Date Range Filter */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[11px] font-semibold uppercase tracking-wider ml-1"
          style={{ color: '#86868B' }}
        >
          Data de Captura
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                'flex items-center gap-3 px-3 py-2 border rounded-lg cursor-pointer text-left min-w-[220px]',
              )}
              style={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderColor: '#E5E5E7',
              }}
            >
              <span
                className="text-[13px] font-medium"
                style={{
                  color: filters.dateRange?.from ? '#1D1D1F' : '#86868B',
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
              <span
                className="material-symbols-outlined text-[18px] ml-auto"
                style={{ color: '#86868B' }}
              >
                calendar_month
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={(range) => setFilter('dateRange', range)}
              numberOfMonths={2}
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Value Range Filter */}
      <div className="flex flex-col gap-1.5">
        <label
          className="text-[11px] font-semibold uppercase tracking-wider ml-1"
          style={{ color: '#86868B' }}
        >
          Valor Potencial
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex items-center gap-2 px-3 py-2 border rounded-lg cursor-pointer"
              style={{
                backgroundColor: 'rgba(0,0,0,0.03)',
                borderColor:
                  filters.valueRange.min || filters.valueRange.max
                    ? '#0071E3'
                    : '#E5E5E7',
              }}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ color: '#86868B' }}
              >
                filter_list
              </span>
              <span
                className="text-[13px] font-medium"
                style={{
                  color:
                    filters.valueRange.min || filters.valueRange.max
                      ? '#0071E3'
                      : '#1D1D1F',
                }}
              >
                {filters.valueRange.min || filters.valueRange.max
                  ? `R$ ${filters.valueRange.min || '0'} - R$ ${filters.valueRange.max || '∞'}`
                  : 'Filtrar valor'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" style={{ borderRadius: '16px' }}>
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4
                  className="font-medium leading-none"
                  style={{ color: '#1D1D1F' }}
                >
                  Valor Potencial
                </h4>
                <p className="text-sm" style={{ color: '#86868B' }}>
                  Filtre pelo valor total estimado do lead
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="grid gap-2">
                  <label
                    className="text-xs font-medium"
                    style={{ color: '#86868B' }}
                  >
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
                    className="rounded-lg"
                  />
                </div>
                <div className="grid gap-2">
                  <label
                    className="text-xs font-medium"
                    style={{ color: '#86868B' }}
                  >
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
                    className="rounded-lg"
                  />
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {/* Clear Filters & Count */}
      <div className="flex flex-col gap-1.5 ml-auto">
        <label
          className="text-[11px] font-semibold uppercase tracking-wider ml-1"
          style={{ color: '#86868B' }}
        >
          Resultados
        </label>
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-xl text-[13px] font-semibold"
            style={{
              backgroundColor: 'rgba(0, 113, 227, 0.08)',
              color: '#0071E3',
            }}
          >
            {filteredLeads.length} Leads
          </div>
          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-black/5"
              style={{ color: '#86868B' }}
            >
              Limpar
              <span className="material-symbols-outlined text-[16px]">
                close
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
