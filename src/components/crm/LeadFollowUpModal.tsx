import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useCRMStore } from '@/stores/crmStore'
import { toast } from 'sonner'
import { isBefore, parseISO } from 'date-fns'

interface LeadFollowUpModalProps {
  leadId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadFollowUpModal({
  leadId,
  open,
  onOpenChange,
}: LeadFollowUpModalProps) {
  const { scheduleFollowUp } = useCRMStore()
  const [date, setDate] = useState('')

  const handleSave = () => {
    if (!date) {
      toast.error('Selecione uma data e hora')
      return
    }

    const selectedDate = parseISO(date)
    if (isBefore(selectedDate, new Date())) {
      toast.error('A data deve ser futura')
      return
    }

    scheduleFollowUp(leadId, date)
    toast.success('Follow-up agendado com sucesso')
    onOpenChange(false)
    setDate('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agendar Follow-up</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="date">Data e Hora</Label>
            <Input
              id="date"
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave}>Confirmar Agendamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
