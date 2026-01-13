import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { exportToCSV } from '@/utils/exportUtils'

interface ExportButtonProps {
  data: any[]
  filename?: string
  label?: string
  formatData?: (data: any[]) => any[]
  customButton?: React.ReactNode
}

export function ExportButton({
  data,
  filename = 'export',
  label = 'Exportar',
  formatData,
  customButton,
}: ExportButtonProps) {
  const handleExportCSV = () => {
    const dataToExport = formatData ? formatData(data) : data
    exportToCSV(dataToExport, filename)
  }

  const handleExportPDF = () => {
    window.print()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {customButton || (
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{label}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" style={{ borderRadius: '12px' }}>
        <DropdownMenuItem onClick={handleExportCSV} className="cursor-pointer">
          <span className="material-symbols-outlined text-[16px] mr-2" style={{ color: '#34C759' }}>table_chart</span>
          Exportar CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF} className="cursor-pointer">
          <span className="material-symbols-outlined text-[16px] mr-2" style={{ color: '#0071E3' }}>print</span>
          Imprimir / PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
