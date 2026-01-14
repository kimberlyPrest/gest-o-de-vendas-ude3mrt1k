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
        return [...data].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [data])

    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE)
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, sortedData.length)
    const currentData = sortedData.slice(startIndex, endIndex)

    const handlePrev = () => setCurrentPage((p) => Math.max(1, p - 1))
    const handleNext = () => setCurrentPage((p) => Math.min(totalPages, p + 1))

    if (data.length === 0) return null

    return (
        <div className="rounded-xl border shadow-sm bg-white overflow-hidden">
            <div className="p-4 border-b">
                <h3 className="font-semibold text-gray-900">Histórico de Lives</h3>
            </div>
            <Table>
                <TableHeader className="bg-gray-50">
                    <TableRow>
                        <TableHead className="w-[120px] text-gray-600 font-medium">Data</TableHead>
                        <TableHead className="text-gray-600 font-medium">Apresentador</TableHead>
                        <TableHead className="text-gray-400 font-medium">Dia</TableHead>
                        <TableHead className="text-right text-yellow-600 font-medium">Vendas</TableHead>
                        <TableHead className="text-right text-green-600 font-medium">Faturamento</TableHead>
                        <TableHead className="text-right text-blue-600 font-medium">Conversão</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {currentData.map((live, idx) => (
                        <TableRow key={idx} className="hover:bg-gray-50/50">
                            <TableCell className="font-medium text-gray-900">
                                {format(parseISO(live.date), 'dd/MM/yyyy')}
                            </TableCell>
                            <TableCell className="text-gray-700">{live.presenter}</TableCell>
                            <TableCell className="text-gray-400 text-xs uppercase">{live.weekday}</TableCell>
                            <TableCell className="text-right text-yellow-700 font-semibold">{live.sales}</TableCell>
                            <TableCell className="text-right text-green-700 font-medium">
                                R$ {live.revenue.toLocaleString('pt-BR')}
                            </TableCell>
                            <TableCell className="text-right text-blue-600 font-medium">
                                {live.conversionRate.toFixed(2)}%
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between p-4 border-t bg-gray-50/50">
                <span className="text-sm text-gray-500">
                    Mostrando {startIndex + 1}-{endIndex} de {sortedData.length}
                </span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrev}
                        disabled={currentPage === 1}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium text-gray-900">
                        {currentPage}/{totalPages || 1}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className="h-8 w-8 p-0"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
