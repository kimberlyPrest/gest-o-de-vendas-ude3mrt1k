import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CalendarClock, MessageSquarePlus } from 'lucide-react'
import { CRMLead } from '@/stores/crmStore'
import { LeadInfo } from './LeadInfo'
import { LeadTimeline } from './LeadTimeline'
import { LeadNotes } from './LeadNotes'
import { LeadInteractionModal } from './LeadInteractionModal'
import { LeadFollowUpModal } from './LeadFollowUpModal'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface LeadDetailsModalProps {
  lead: CRMLead | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadDetailsModal({
  lead,
  open,
  onOpenChange,
}: LeadDetailsModalProps) {
  const [interactionOpen, setInteractionOpen] = useState(false)
  const [followUpOpen, setFollowUpOpen] = useState(false)

  if (!lead) return null

  const hasFutureFollowUp =
    lead.followUp && new Date(lead.followUp) > new Date()

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl h-[90vh] md:h-auto md:max-h-[90vh] flex flex-col p-0 gap-0 overflow-hidden">
          <DialogHeader className="px-6 py-4 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <DialogTitle>Detalhes do Lead</DialogTitle>
              {hasFutureFollowUp && (
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200 gap-1"
                >
                  <CalendarClock className="h-3 w-3" />
                  Follow-up:{' '}
                  {format(new Date(lead.followUp!), 'd MMM, HH:mm', {
                    locale: ptBR,
                  })}
                </Badge>
              )}
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto bg-gray-50/50">
            <div className="p-6 pb-0">
              <LeadInfo lead={lead} />

              <div className="flex gap-2 mt-6">
                <Button
                  className="flex-1"
                  onClick={() => setInteractionOpen(true)}
                >
                  <MessageSquarePlus className="mr-2 h-4 w-4" />
                  Registrar Interação
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setFollowUpOpen(true)}
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Agendar Follow-up
                </Button>
              </div>
            </div>

            <div className="p-6">
              <Tabs defaultValue="history" className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent gap-6">
                  <TabsTrigger
                    value="history"
                    className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Histórico
                  </TabsTrigger>
                  <TabsTrigger
                    value="notes"
                    className="rounded-none border-b-2 border-transparent px-0 py-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                  >
                    Notas e Observações
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-6">
                  <LeadTimeline lead={lead} />
                </TabsContent>
                <TabsContent value="notes" className="mt-6">
                  <LeadNotes lead={lead} />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <LeadInteractionModal
        leadId={lead.id}
        open={interactionOpen}
        onOpenChange={setInteractionOpen}
      />

      <LeadFollowUpModal
        leadId={lead.id}
        open={followUpOpen}
        onOpenChange={setFollowUpOpen}
      />
    </>
  )
}
