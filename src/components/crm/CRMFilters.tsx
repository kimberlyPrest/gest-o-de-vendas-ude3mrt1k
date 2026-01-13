import { useState, useEffect } from 'react'
import { Search, X, Calendar as CalendarIcon, Filter } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { Badge } from '@/components/ui/badge'
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
    <div className="flex flex-col gap-4 border-b bg-white p-4 lg:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Origin Filter */}
            <Select
              value={filters.origin}
              onValueChange={(val) => setFilter('origin', val)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Origens</SelectItem>
                <SelectItem value="Planilha">Planilha</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Site">Site</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    'w-[240px] justify-start text-left font-normal',
                    !filters.dateRange && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
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
                    <span>Data de Captura</span>
                  )}
                </Button>
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

            {/* Value Range Filter */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed">
                  <Filter className="mr-2 h-4 w-4" />
                  Valor Potencial
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">
                      Valor Potencial
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Filtre por valor estimado (Assentos * R$500)
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="grid gap-2">
                      <label htmlFor="min" className="text-xs">
                        Mínimo
                      </label>
                      <Input
                        id="min"
                        type="number"
                        placeholder="0"
                        value={filters.valueRange.min}
                        onChange={(e) =>
                          setFilter('valueRange', {
                            ...filters.valueRange,
                            min: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <label htmlFor="max" className="text-xs">
                        Máximo
                      </label>
                      <Input
                        id="max"
                        type="number"
                        placeholder="10000"
                        value={filters.valueRange.max}
                        onChange={(e) =>
                          setFilter('valueRange', {
                            ...filters.valueRange,
                            max: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Active Filters Badge/Clear */}
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="h-8 px-2 text-xs"
              >
                Limpar
                <X className="ml-2 h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {filteredLeads.length} Leads Encontrados
          </Badge>
        </div>
      </div>
    </div>
  )
}
