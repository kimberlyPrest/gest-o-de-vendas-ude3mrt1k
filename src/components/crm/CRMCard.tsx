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
  onClick?: (lead: CRMLead) => void
}

export const CRMCard = memo(({ lead, onDragStart, onClick }: CRMCardProps) => {
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
      onDragStart={(e) => {
        // Rotate -2deg during drag as per requirements
        e.currentTarget.style.transform = 'rotate(-2deg)'
        onDragStart(e, lead.id)
      }}
      onDragEnd={(e) => {
        e.currentTarget.style.transform = 'none'
      }}
      onClick={() => onClick?.(lead)}
      className="cursor-grab active:cursor-grabbing touch-none select-none pb-3"
    >
      <Card
        className={cn(
          'overflow-hidden border-l-4 transition-all duration-200 hover:shadow-md hover:-translate-y-1 active:scale-95',
          borderColorClass,
        )}
      >
        <CardContent className="p-3">
          <div className="mb-2 flex items-start justify-between">
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                {lead.nomeCompleto}
              </h4>
            </div>
            {isInactive && (
              <Bell className="h-4 w-4 shrink-0 text-red-500 animate-pulse" />
            )}
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Mail className="h-3 w-3" />
              <span className="truncate">{lead.email}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
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
              <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
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
