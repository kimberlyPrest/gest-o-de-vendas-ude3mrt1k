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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useCRMStore } from '@/stores/crmStore'
import { toast } from 'sonner'

interface LeadInteractionModalProps {
  leadId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadInteractionModal({
  leadId,
  open,
  onOpenChange,
}: LeadInteractionModalProps) {
  const { addInteraction } = useCRMStore()
  const [type, setType] = useState<string>('')
  const [details, setDetails] = useState('')

  const handleSave = () => {
    if (!type) {
      toast.error('Selecione o tipo de interação')
      return
    }
    addInteraction(leadId, type, details)
    toast.success('Interação registrada com sucesso')
    onOpenChange(false)
    setType('')
    setDetails('')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Registrar Interação</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="type">Tipo de Interação</Label>
            <Select onValueChange={setType} value={type}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Ligação">Ligação</SelectItem>
                <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="Reunião">Reunião</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Detalhes (Opcional)</Label>
            <Textarea
              id="details"
              placeholder="Resumo da conversa..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleSave}>Salvar Interação</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
