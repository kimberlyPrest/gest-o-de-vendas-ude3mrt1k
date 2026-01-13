import { memo } from 'react'
import { CRMLead } from '@/stores/crmStore'
import { cn } from '@/lib/utils'
import { differenceInHours, differenceInDays } from 'date-fns'
import { Mail, Phone, Bell, User } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface CRMCardProps {
  lead: CRMLead
  onDragStart: (e: React.DragEvent<HTMLDivElement>, leadId: string) => void
}

export const CRMCard = memo(({ lead, onDragStart }: CRMCardProps) => {
  const lastInteraction = new Date(lead.lastInteraction)
  const now = new Date()
  const hoursSinceInteraction = differenceInHours(now, lastInteraction)
  const daysSinceInteraction = differenceInDays(now, lastInteraction)

  // Border Color Logic
  let borderColorClass = 'border-l-green-500'
  if (hoursSinceInteraction > 72) {
    borderColorClass = 'border-l-red-500'
  } else if (hoursSinceInteraction > 24) {
    borderColorClass = 'border-l-yellow-500'
  }

  const isInactive = daysSinceInteraction > 3

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, lead.id)}
      className="cursor-grab active:cursor-grabbing touch-none"
    >
      <Card
        className={cn(
          'mb-3 overflow-hidden border-l-4 transition-all hover:shadow-md',
          borderColorClass,
        )}
      >
        <CardContent className="p-3">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-sm font-semibold text-gray-900">
                {lead.nomeCompleto}
              </h4>
            </div>
            {isInactive && (
              <Bell className="h-4 w-4 shrink-0 text-red-500 animate-pulse" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Mail className="h-3 w-3" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Phone className="h-3 w-3" />
              <span>{lead.telefone}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <Badge variant="outline" className="text-[10px] font-normal">
              {lead.origem}
            </Badge>
            <div className="flex items-center gap-1">
              <User className="h-3 w-3 text-gray-400" />
              <span className="text-xs font-medium text-gray-600">
                {lead.assentosAdicionais} assentos
              </span>
            </div>
          </div>

          <div className="mt-2 text-[10px] text-gray-400 text-right">
            {hoursSinceInteraction}h sem interação
          </div>
        </CardContent>
      </Card>
    </div>
  )
})

CRMCard.displayName = 'CRMCard'
