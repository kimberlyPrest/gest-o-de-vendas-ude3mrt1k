import { useEffect } from 'react'
import { useCRMStore } from '@/stores/crmStore'
import { CRMFilters } from '@/components/crm/CRMFilters'
import { CRMMetrics } from '@/components/crm/CRMMetrics'
import { CRMBoard } from '@/components/crm/CRMBoard'
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ExportButton } from '@/components/common/ExportButton'
import { formatLeadsForExport } from '@/utils/exportUtils'

export default function CRM() {
  const { fetchLeads, loading, error, leads, filteredLeads } = useCRMStore()

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-gray-50 dark:bg-background">
        <AlertCircle className="h-12 w-12 text-yellow-500" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Erro ao carregar CRM
        </h2>
        <Button onClick={() => fetchLeads(true)}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Tentar Novamente
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-[#F3F4F6] dark:bg-background transition-colors">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white dark:bg-card px-6 py-4 shadow-sm animate-fade-in-down">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-bold text-[#1F2937] dark:text-white md:text-2xl">
            🎯 CRM - Pipeline de Vendas
          </h1>
          {loading && (
            <div className="flex items-center text-sm text-gray-500">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sincronizando...
            </div>
          )}
        </div>
        <ExportButton
          data={filteredLeads}
          filename="crm_leads"
          formatData={formatLeadsForExport}
          label="Exportar Leads"
        />
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden animate-fade-in">
        <CRMMetrics />
        <CRMFilters />

        {loading && leads.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <CRMBoard />
        )}
      </div>
    </div>
  )
}
