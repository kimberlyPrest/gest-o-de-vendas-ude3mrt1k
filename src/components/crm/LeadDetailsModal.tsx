import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  ChevronLeft,
  CalendarClock,
  MessageSquarePlus,
  Edit,
} from 'lucide-react'
import { CRMLead } from '@/stores/crmStore'
import { LeadInfo } from './LeadInfo'
import { LeadTimeline } from './LeadTimeline'
import { LeadNotes } from './LeadNotes'
import { LeadInteractionModal } from './LeadInteractionModal'
import { LeadFollowUpModal } from './LeadFollowUpModal'
import { LeadEditModal } from './LeadEditModal'

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
  const [editOpen, setEditOpen] = useState(false)

  if (!lead) return null

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex h-[100dvh] max-w-[800px] flex-col gap-0 overflow-hidden border-0 bg-[#F2F2F7] p-0 shadow-2xl outline-none focus:outline-none md:h-[90vh] md:max-h-[850px] md:rounded-[24px] [&>button]:hidden">
          {/* iOS Style Sticky Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200/50 bg-white/80 px-4 py-3 backdrop-blur-xl">
            <Button
              variant="ghost"
              className="h-auto gap-1 p-0 pl-1 text-base font-normal text-[#007AFF] hover:bg-transparent hover:opacity-70"
              onClick={() => onOpenChange(false)}
            >
              <ChevronLeft className="-ml-2 h-6 w-6" />
              Voltar
            </Button>

            <DialogTitle className="text-base font-semibold text-gray-900">
              Perfil do Lead
            </DialogTitle>

            <Button
              variant="ghost"
              className="h-auto p-0 pr-1 text-base font-normal text-[#007AFF] hover:bg-transparent hover:opacity-70"
              onClick={() => setEditOpen(true)}
            >
              Editar
            </Button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-8 p-4 pb-24 md:p-8 md:pb-32">
              <LeadInfo lead={lead} />

              <div className="flex flex-col gap-6">
                {/* Timeline is now seamlessly integrated */}
                <LeadTimeline lead={lead} />
                <LeadNotes lead={lead} />
              </div>
            </div>
          </div>

          {/* Sticky Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-20 border-t border-gray-200/50 bg-white/80 p-4 pb-6 backdrop-blur-xl md:pb-4">
            <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-gray-200 bg-white font-semibold text-gray-900 shadow-sm hover:bg-gray-50 active:scale-95 transition-transform"
                  onClick={() => setFollowUpOpen(true)}
                >
                  <CalendarClock className="mr-2 h-5 w-5" />
                  Agendar Follow-up
                </Button>
                <Button
                  className="h-12 rounded-xl bg-[#007AFF] font-semibold text-white shadow-sm hover:bg-[#0062CC] active:scale-95 transition-transform"
                  onClick={() => setInteractionOpen(true)}
                >
                  <MessageSquarePlus className="mr-2 h-5 w-5" />
                  Registrar Interação
                </Button>
              </div>
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

      <LeadEditModal lead={lead} open={editOpen} onOpenChange={setEditOpen} />
    </>
  )
}
