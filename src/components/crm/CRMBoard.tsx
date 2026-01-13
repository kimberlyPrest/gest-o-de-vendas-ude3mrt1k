import { useState } from 'react'
import { useCRMStore, COLUMNS, CRMColumnId, CRMLead } from '@/stores/crmStore'
import { CRMColumn } from './CRMColumn'
import { LeadDetailsModal } from './LeadDetailsModal'
import { toast } from 'sonner'
import { useIsMobile } from '@/hooks/use-mobile'

export function CRMBoard() {
  const { filteredLeads, moveLead } = useCRMStore()
  const isMobile = useIsMobile()
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState(COLUMNS[0].id)

  const handleDropLead = (leadId: string, newStatus: CRMColumnId) => {
    try {
      moveLead(leadId, newStatus)
      toast.success('Lead movido com sucesso', {
        description: `Novo status: ${newStatus}`,
      })
    } catch (error) {
      toast.error('Erro ao mover lead', {
        description: 'Tente novamente.',
      })
    }
  }

  const handleCardClick = (lead: CRMLead) => {
    setSelectedLead(lead)
    setModalOpen(true)
  }

  return (
    <>
      {isMobile ? (
        <div className="flex-1 pb-4">
          {/* Mobile Tabs */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2">
            {COLUMNS.map((col) => {
              const count = filteredLeads.filter(
                (l) => l.status === col.id,
              ).length
              const isActive = activeTab === col.id
              return (
                <button
                  key={col.id}
                  onClick={() => setActiveTab(col.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all text-[13px] font-medium"
                  style={{
                    backgroundColor: isActive ? '#0071E3' : 'white',
                    color: isActive ? 'white' : '#1D1D1F',
                    border: isActive ? 'none' : '1px solid #E5E5E7',
                  }}
                >
                  {col.label}
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isActive
                        ? 'rgba(255,255,255,0.2)'
                        : 'rgba(0,0,0,0.05)',
                    }}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Mobile Content */}
          <div className="h-[calc(100vh-380px)]">
            {COLUMNS.filter((col) => col.id === activeTab).map((col) => (
              <CRMColumn
                key={col.id}
                id={col.id}
                label={col.label}
                color={col.color}
                leads={filteredLeads.filter((l) => l.status === col.id)}
                onDropLead={handleDropLead}
                onCardClick={handleCardClick}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-full flex-1 gap-4 overflow-x-auto pb-4">
          {COLUMNS.map((col) => (
            <CRMColumn
              key={col.id}
              id={col.id}
              label={col.label}
              color={col.color}
              leads={filteredLeads.filter((l) => l.status === col.id)}
              onDropLead={handleDropLead}
              onCardClick={handleCardClick}
            />
          ))}
        </div>
      )}

      <LeadDetailsModal
        lead={selectedLead}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  )
}
