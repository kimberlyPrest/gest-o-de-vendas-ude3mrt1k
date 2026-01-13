import { useEffect } from 'react'
import { useCRMStore } from '@/stores/crmStore'
import { CRMFilters } from '@/components/crm/CRMFilters'
import { CRMMetrics } from '@/components/crm/CRMMetrics'
import { CRMBoard } from '@/components/crm/CRMBoard'
import { ExportButton } from '@/components/common/ExportButton'
import { formatLeadsForExport } from '@/utils/exportUtils'

// Apple-style CSS
const appleStyles = `
  .apple-bg { background-color: #F5F5F7; }
  .apple-card {
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid #E5E5E7;
    border-radius: 20px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .apple-card:hover {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
    border-color: #D2D2D7;
  }
  .apple-btn-primary {
    background: linear-gradient(180deg, #0077ED 0%, #006EDF 100%);
    border-radius: 12px;
    box-shadow: 0 2px 4px rgba(0, 113, 227, 0.2);
  }
`

export default function CRM() {
  const { fetchLeads, loading, error, leads, filteredLeads } = useCRMStore()

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  if (error) {
    return (
      <>
        <style>{appleStyles}</style>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <div
          className="flex h-full flex-col items-center justify-center gap-4"
          style={{ backgroundColor: '#F5F5F7' }}
        >
          <span
            className="material-symbols-outlined text-[48px]"
            style={{ color: '#FF9500' }}
          >
            error
          </span>
          <h2 className="text-xl font-semibold" style={{ color: '#1D1D1F' }}>
            Erro ao carregar CRM
          </h2>
          <button
            onClick={() => fetchLeads(true)}
            className="apple-btn-primary hover:opacity-90 text-white px-5 py-2.5 text-[14px] font-medium flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">
              refresh
            </span>
            Tentar Novamente
          </button>
        </div>
      </>
    )
  }

  return (
    <>
      <style>{appleStyles}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />

      <div
        className="flex h-full flex-col transition-colors"
        style={{
          backgroundColor: '#F5F5F7',
          fontFamily:
            '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {/* Header */}
        <header className="flex flex-wrap justify-between items-end gap-4 px-10 py-8">
          <div>
            <h2
              className="text-[32px] font-semibold tracking-tight"
              style={{ color: '#1D1D1F' }}
            >
              CRM - Pipeline de Vendas
            </h2>
            <p
              className="text-[15px] mt-1 flex items-center gap-2"
              style={{ color: '#86868B' }}
            >
              Gerencie seus leads e acompanhe o funil de vendas.
              {loading && (
                <span
                  className="flex items-center text-[13px]"
                  style={{ color: '#0071E3' }}
                >
                  <span className="material-symbols-outlined text-[16px] animate-spin mr-1">
                    progress_activity
                  </span>
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
              <button className="apple-btn-primary hover:opacity-90 text-white px-5 py-2.5 text-[14px] font-medium flex items-center gap-2 transition-all">
                <span className="material-symbols-outlined text-[20px]">
                  download
                </span>
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
              <span
                className="material-symbols-outlined text-[48px] animate-spin"
                style={{ color: '#0071E3' }}
              >
                progress_activity
              </span>
            </div>
          ) : (
            <CRMBoard />
          )}
        </div>
      </div>
    </>
  )
}
