import { useState, useMemo } from 'react'
import { LiveData } from '@/services/googleSheetsService'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface StreamTableProps {
  data: LiveData[]
}

const ITEMS_PER_PAGE = 10

export function StreamTable({ data }: StreamTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const sortedData = useMemo(() => {
    // Sort descending by date
    return [...data].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )
  }, [data])

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sortedData.length)
  const currentData = sortedData.slice(startIndex, endIndex)

  const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1))
  const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

  if (data.length === 0) return null

  return (
    <div className="cyber-card overflow-hidden">
      <div className="p-4 border-b border-border">
        <h3 className="font-bold text-foreground font-display">
          Histórico de Lives
        </h3>
      </div>
      <Table>
        <TableHeader className="bg-muted">
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="w-[120px] text-muted-foreground font-medium">
              Data
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              Apresentador
            </TableHead>
            <TableHead className="text-muted-foreground font-medium">
              Dia
            </TableHead>
            <TableHead className="text-right text-primary font-medium">
              Vendas
            </TableHead>
            <TableHead className="text-right text-chart-2 font-medium">
              Faturamento
            </TableHead>
            <TableHead className="text-right text-blue-400 font-medium">
              Conversão
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((live, idx) => (
            <TableRow
              key={idx}
              className="border-border hover:bg-white/5 transition-colors"
            >
              <TableCell className="font-medium text-foreground">
                {format(parseISO(live.date), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell className="text-gray-300">{live.presenter}</TableCell>
              <TableCell className="text-muted-foreground text-xs uppercase">
                {live.weekday}
              </TableCell>
              <TableCell className="text-right text-primary font-semibold">
                {live.sales}
              </TableCell>
              <TableCell className="text-right text-chart-2 font-medium">
                R$ {live.revenue.toLocaleString('pt-BR')}
              </TableCell>
              <TableCell className="text-right text-blue-400 font-medium">
                {live.conversionRate.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between p-4 border-t border-border bg-card">
        <span className="text-sm text-muted-foreground">
          Mostrando {startIndex + 1}-{endIndex} de {sortedData.length}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={currentPage === 1}
            aria-label="Página anterior"
            className="h-8 w-8 p-0 border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          </Button>
          <span className="text-sm font-medium text-gray-300">
            {currentPage}/{totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            aria-label="Próxima página"
            className="h-8 w-8 p-0 border-border bg-transparent text-muted-foreground hover:text-foreground hover:bg-white/5"
          >
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  )
}
