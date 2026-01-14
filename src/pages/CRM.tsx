import { useEffect } from 'react'
import { useCRMStore } from '@/stores/crmStore'
import { CRMFilters } from '@/components/crm/CRMFilters'
import { CRMMetrics } from '@/components/crm/CRMMetrics'
import { CRMBoard } from '@/components/crm/CRMBoard'
import { ExportButton } from '@/components/common/ExportButton'
import { formatLeadsForExport } from '@/utils/exportUtils'
import { Loader2, Download, RefreshCw, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CRM() {
  const { fetchLeads, loading, error, leads, filteredLeads } = useCRMStore()

  useEffect(() => {
    // Fetches data on mount (cached or fresh from DB)
    fetchLeads()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-background animate-fade-in">
        <div className="rounded-full bg-destructive/10 p-6 mb-2">
          <AlertTriangle className="h-12 w-12 text-[#FF453A]" />
        </div>
        <h2 className="text-xl font-bold font-display text-white">
          Erro ao carregar CRM
        </h2>
        <p className="text-gray-400 text-sm max-w-[300px] text-center">
          Não foi possível recuperar os dados dos leads. Verifique sua conexão e
          tente novamente.
        </p>
        <button
          onClick={() => fetchLeads(true)}
          className="bg-[#D9B979] hover:bg-[#D9B979]/90 text-black px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,185,121,0.2)] mt-2"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar Novamente
        </button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col transition-colors bg-background">
      {/* Header */}
      <header className="flex flex-wrap justify-between items-end gap-4 px-10 py-8">
        <div>
          <h2 className="text-[32px] font-bold tracking-tight font-display text-white">
            CRM - Pipeline de Vendas
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-[15px] text-gray-400">
              Gerencie seus leads e acompanhe o funil de vendas.
            </p>
            {loading && (
              <span className="flex items-center text-[12px] text-[#D9B979] bg-[#D9B979]/10 px-2 py-0.5 rounded-full animate-pulse border border-[#D9B979]/20">
                <Loader2 className="h-3 w-3 animate-spin mr-1.5" />
                Sincronizando...
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchLeads(true)}
            disabled={loading}
            className="border-[#333333] text-gray-300 hover:text-white hover:bg-white/5 gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <ExportButton
            data={filteredLeads}
            filename="crm_leads"
            formatData={formatLeadsForExport}
            label="Exportar Leads"
            customButton={
              <button className="bg-[#D9B979] hover:bg-[#D9B979]/90 text-black px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,185,121,0.2)]">
                <Download className="h-5 w-5" />
                Exportar Leads
              </button>
            }
          />
        </div>
      </header>

      {/* Content */}
      <div className="flex flex-1 flex-col overflow-hidden px-10">
        <CRMMetrics />
        <CRMFilters />

        {loading && leads.length === 0 ? (
          <div className="flex flex-1 items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-[#D9B979]" />
          </div>
        ) : (
          <CRMBoard />
        )}
      </div>
    </div>
  )
}
