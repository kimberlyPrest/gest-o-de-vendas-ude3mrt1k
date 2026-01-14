import React, { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CRMLead, useCRMStore } from '@/stores/crmStore'
import { Loader2 } from 'lucide-react'

interface LeadEditModalProps {
  lead: CRMLead
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LeadEditModal({
  lead,
  open,
  onOpenChange,
}: LeadEditModalProps) {
  const updateLead = useCRMStore((state) => state.updateLead)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    nomeCompleto: '',
    email: '',
    telefone: '',
    assentosAdicionais: 0,
    origem: '',
    valorEstimado: 0,
  })

  // Initialize form when lead changes or modal opens
  useEffect(() => {
    if (lead) {
      let initialValor = lead.valorEstimado
      if (initialValor === undefined) {
        // Fallback if not yet set in store
        initialValor =
          lead.origem === 'Planilha'
            ? 2999 + lead.assentosAdicionais * 699
            : lead.assentosAdicionais * 500
      }

      setFormData({
        nomeCompleto: lead.nomeCompleto,
        email: lead.email,
        telefone: lead.telefone,
        assentosAdicionais: lead.assentosAdicionais,
        origem: lead.origem,
        valorEstimado: initialValor,
      })
    }
  }, [lead, open])

  // Auto-calculation logic
  useEffect(() => {
    if (formData.origem === 'Planilha') {
      const calculated = 2999 + formData.assentosAdicionais * 699
      // Ideally we check if it was manually touched, but for now we follow the rule:
      // "sempre que for origem Planilha... automaticamente..."
      setFormData((prev) => ({ ...prev, valorEstimado: calculated }))
    }
  }, [formData.origem, formData.assentosAdicionais])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      updateLead(lead.id, {
        nomeCompleto: formData.nomeCompleto,
        email: formData.email,
        telefone: formData.telefone,
        assentosAdicionais: formData.assentosAdicionais,
        origem: formData.origem,
        valorEstimado: formData.valorEstimado,
      })

      onOpenChange(false)
    } catch (error) {
      console.error('Failed to update lead', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Lead</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome Completo</Label>
            <Input
              id="name"
              value={formData.nomeCompleto}
              onChange={(e) =>
                setFormData({ ...formData, nomeCompleto: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              value={formData.telefone}
              onChange={(e) =>
                setFormData({ ...formData, telefone: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="seats">Assentos Adicionais</Label>
            <Input
              id="seats"
              type="number"
              min="0"
              value={formData.assentosAdicionais}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assentosAdicionais: parseInt(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="estimatedValue">Valor Estimado (R$)</Label>
            <Input
              id="estimatedValue"
              type="number"
              min="0"
              step="0.01"
              value={formData.valorEstimado}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  valorEstimado: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="origin">Origem</Label>
            <Select
              value={formData.origem}
              onValueChange={(val) => setFormData({ ...formData, origem: val })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione a origem" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Planilha">Planilha</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
                <SelectItem value="Site">Site</SelectItem>
                <SelectItem value="Indicação">Indicação</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
