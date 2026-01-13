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
}

export function ExportButton({
  data,
  filename = 'export',
  label = 'Exportar',
  formatData,
}: ExportButtonProps) {
  const handleExportCSV = () => {
    const dataToExport = formatData ? formatData(data) : data
    exportToCSV(dataToExport, filename)
  }

  // PDF Export is placeholder for now as requested user story mentions "Exportar system",
  // but typically requires a heavier library like jsPDF which isn't in allowlist.
  // We can simulate or just trigger print.
  const handleExportPDF = () => {
    window.print()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportCSV}>
          Exportar CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF}>
          Imprimir / PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
