import React, { memo } from 'react'
import { CRMLead, calculateLeadValue } from '@/stores/crmStore'
import { cn } from '@/lib/utils'
import { differenceInHours, differenceInDays } from 'date-fns'
import { Mail, Phone, DollarSign, AlertCircle } from 'lucide-react'

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
  let borderColor = 'hsl(var(--chart-2))' // Jade
  if (hoursSinceInteraction > 72) {
    borderColor = 'hsl(var(--destructive))' // Coral
  } else if (hoursSinceInteraction > 24) {
    borderColor = 'hsl(var(--chart-5))' // Purple/Warning substitute or custom
    // Fallback if chart-5 is not suitable
    if (hoursSinceInteraction > 24) borderColor = '#FF9F0A'
  }

  const isInactive = daysSinceInteraction > 3
  const potentialValue = lead.valorEstimado ?? calculateLeadValue(lead)

  return (
    <article
      draggable
      onDragStart={(e) => {
        e.currentTarget.style.transform = 'rotate(-2deg)'
        e.currentTarget.style.opacity = '0.8'
        onDragStart(e, lead.id)
      }}
      onDragEnd={(e) => {
        e.currentTarget.style.transform = 'none'
        e.currentTarget.style.opacity = '1'
      }}
      onClick={() => onClick?.(lead)}
      className="cursor-grab active:cursor-grabbing touch-none select-none pb-3 transform transition-all duration-200"
      aria-label={`Lead: ${lead.nomeCompleto}`}
    >
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 hover:-translate-y-1 active:scale-[0.98] shadow-lg',
        )}
        style={{
          background:
            'linear-gradient(145deg, hsl(var(--card)) 0%, hsl(var(--background)) 100%)',
          borderRadius: '16px',
          border: '1px solid hsl(var(--border))',
          borderLeft: `4px solid ${borderColor}`,
        }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 overflow-hidden">
              <h4 className="truncate text-[14px] font-bold text-foreground font-display">
                {lead.nomeCompleto}
              </h4>
            </div>
            {isInactive && (
              <AlertCircle
                className="h-4 w-4 text-destructive animate-pulse"
                aria-hidden="true"
              />
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <Mail
                className="h-3.5 w-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="truncate text-[12px] text-muted-foreground">
                {lead.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Phone
                className="h-3.5 w-3.5 text-muted-foreground"
                aria-hidden="true"
              />
              <span className="text-[12px] text-muted-foreground">
                {lead.telefone}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="px-2 py-1 rounded-md text-[10px] font-medium bg-border text-muted-foreground">
              {lead.origem}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign
                className="h-3.5 w-3.5 text-primary"
                aria-hidden="true"
              />
              <span className="text-[12px] font-bold text-primary">
                {potentialValue.toLocaleString('pt-BR')}
              </span>
            </div>
          </div>

          {/* Time indicator */}
          <div
            className="mt-2 text-right text-[10px]"
            style={{ color: borderColor }}
          >
            {hoursSinceInteraction < 1
              ? 'Agora mesmo'
              : hoursSinceInteraction < 24
                ? `${hoursSinceInteraction}h sem interação`
                : `${daysSinceInteraction}d sem interação`}
          </div>
        </div>
      </div>
    </article>
  )
})

CRMCard.displayName = 'CRMCard'
