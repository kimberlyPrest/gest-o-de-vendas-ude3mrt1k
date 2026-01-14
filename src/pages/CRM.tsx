import { useEffect } from 'react'
import { useCRMStore } from '@/stores/crmStore'
import { CRMFilters } from '@/components/crm/CRMFilters'
import { CRMMetrics } from '@/components/crm/CRMMetrics'
import { CRMBoard } from '@/components/crm/CRMBoard'
import { ExportButton } from '@/components/common/ExportButton'
import { formatLeadsForExport } from '@/utils/exportUtils'
import { Loader2, Download } from 'lucide-react'

export default function CRM() {
  const { fetchLeads, loading, error, leads, filteredLeads } = useCRMStore()

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 bg-background">
        <span className="material-symbols-outlined text-[48px] text-[#FF453A]">
          error
        </span>
        <h2 className="text-xl font-bold font-display text-white">
          Erro ao carregar CRM
        </h2>
        <button
          onClick={() => fetchLeads(true)}
          className="bg-[#D9B979] hover:bg-[#D9B979]/90 text-black px-5 py-2.5 rounded-lg text-[14px] font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(217,185,121,0.2)]"
        >
          <span className="material-symbols-outlined text-[20px]">refresh</span>
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
          <p className="text-[15px] mt-1 flex items-center gap-2 text-gray-400">
            Gerencie seus leads e acompanhe o funil de vendas.
            {loading && (
              <span className="flex items-center text-[13px] text-[#D9B979]">
                <Loader2 className="h-4 w-4 animate-spin mr-1" />
                Sincronizando...
              </span>
            )}
          </p>
        </div>
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
