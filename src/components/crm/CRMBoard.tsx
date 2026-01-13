import { useState } from 'react'
import { useCRMStore, COLUMNS, CRMColumnId, CRMLead } from '@/stores/crmStore'
import { CRMColumn } from './CRMColumn'
import { LeadDetailsModal } from './LeadDetailsModal'
import { toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useIsMobile } from '@/hooks/use-mobile'

export function CRMBoard() {
  const { filteredLeads, moveLead } = useCRMStore()
  const isMobile = useIsMobile()
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

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
        <div className="flex-1 p-4">
          <Tabs defaultValue={COLUMNS[0].id} className="h-full flex flex-col">
            <TabsList className="w-full flex overflow-x-auto justify-start no-scrollbar mb-4 bg-transparent p-0 gap-2">
              {COLUMNS.map((col) => (
                <TabsTrigger
                  key={col.id}
                  value={col.id}
                  className="rounded-full border bg-white px-4 data-[state=active]:bg-primary data-[state=active]:text-white whitespace-nowrap"
                >
                  {col.label}
                  <span className="ml-2 text-xs opacity-70">
                    ({filteredLeads.filter((l) => l.status === col.id).length})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
            {COLUMNS.map((col) => (
              <TabsContent key={col.id} value={col.id} className="flex-1 mt-0">
                <div className="h-[calc(100vh-280px)]">
                  <CRMColumn
                    id={col.id}
                    label={col.label}
                    color={col.color}
                    leads={filteredLeads.filter((l) => l.status === col.id)}
                    onDropLead={handleDropLead}
                    onCardClick={handleCardClick}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      ) : (
        <div className="flex h-full flex-1 gap-4 overflow-x-auto p-6 pb-2">
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
