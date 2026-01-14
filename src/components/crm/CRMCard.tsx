import React, { memo } from 'react'
import { CRMLead, calculateLeadValue } from '@/stores/crmStore'
import { cn } from '@/lib/utils'
import { differenceInHours, differenceInDays } from 'date-fns'

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
  let borderColor = '#34C759' // Green - recent
  let statusBg = '#ECFDF5'
  if (hoursSinceInteraction > 72) {
    borderColor = '#FF3B30' // Red - urgent
    statusBg = '#FEF2F2'
  } else if (hoursSinceInteraction > 24) {
    borderColor = '#FF9500' // Orange - warning
    statusBg = '#FFF7ED'
  }

  const isInactive = daysSinceInteraction > 3

  const potentialValue = lead.valorEstimado ?? calculateLeadValue(lead)

  return (
    <div
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
    >
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]',
        )}
        style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          border: '1px solid #E5E5E7',
          borderLeft: `4px solid ${borderColor}`,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
        }}
      >
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 overflow-hidden">
              <h4
                className="truncate text-[14px] font-semibold"
                style={{ color: '#1D1D1F' }}
              >
                {lead.nomeCompleto}
              </h4>
            </div>
            {isInactive && (
              <span
                className="material-symbols-outlined text-[18px] animate-pulse"
                style={{ color: '#FF3B30' }}
              >
                notification_important
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 mb-3">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ color: '#86868B' }}
              >
                mail
              </span>
              <span
                className="truncate text-[12px]"
                style={{ color: '#86868B' }}
              >
                {lead.email}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ color: '#86868B' }}
              >
                phone
              </span>
              <span className="text-[12px]" style={{ color: '#86868B' }}>
                {lead.telefone}
              </span>
            </div>
          </div>

          {/* Footer */}
          <div
            className="flex items-center justify-between pt-3"
            style={{ borderTop: '1px solid #F5F5F7' }}
          >
            <div
              className="px-2 py-1 rounded-md text-[10px] font-medium"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.03)',
                color: '#86868B',
              }}
            >
              {lead.origem}
            </div>
            <div className="flex items-center gap-1">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ color: '#34C759' }}
              >
                payments
              </span>
              <span
                className="text-[12px] font-semibold"
                style={{ color: '#34C759' }}
              >
                R$ {potentialValue.toLocaleString('pt-BR')}
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
    </div>
  )
})

CRMCard.displayName = 'CRMCard'
