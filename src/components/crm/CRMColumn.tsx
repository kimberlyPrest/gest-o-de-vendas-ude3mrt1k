import React, { useState } from 'react'
import { CRMLead, CRMColumnId } from '@/stores/crmStore'
import { CRMCard } from './CRMCard'
import { cn } from '@/lib/utils'
import { VirtualList } from '@/components/ui/virtual-list'

interface CRMColumnProps {
  id: CRMColumnId
  label: string
  color: string
  leads: CRMLead[]
  onDropLead: (leadId: string, status: CRMColumnId) => void
  onCardClick?: (lead: CRMLead) => void
}

export function CRMColumn({
  id,
  label,
  color,
  leads,
  onDropLead,
  onCardClick,
}: CRMColumnProps) {
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(true)
  }

  const handleDragLeave = () => {
    setIsOver(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsOver(false)
    const leadId = e.dataTransfer.getData('leadId')
    if (leadId) {
      onDropLead(leadId, id)
    }
  }

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    leadId: string,
  ) => {
    e.dataTransfer.setData('leadId', leadId)
    e.dataTransfer.effectAllowed = 'move'
  }

  return (
    <div
      className={cn(
        'flex h-full min-w-[300px] w-[300px] flex-col rounded-2xl transition-all',
        isOver && 'ring-2 ring-blue-400 ring-offset-2',
      )}
      style={{
        backgroundColor: isOver
          ? 'rgba(0, 113, 227, 0.05)'
          : 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: isOver ? '2px dashed #0071E3' : '1px solid #E5E5E7',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 rounded-t-2xl"
        style={{
          borderBottom: '1px solid #E5E5E7',
          borderTop: `4px solid ${color}`,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
        }}
      >
        <h3 className="font-semibold text-[14px]" style={{ color: '#1D1D1F' }}>
          {label}
        </h3>
        <div
          className="px-2.5 py-1 rounded-full text-[12px] font-semibold"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.05)',
            color: '#1D1D1F',
          }}
        >
          {leads.length}
        </div>
      </div>

      {/* Content with Virtualization */}
      <div className="flex-1 p-3 overflow-hidden">
        {leads.length === 0 ? (
          <div
            className="h-full flex flex-col items-center justify-center rounded-xl"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.02)',
              border: '2px dashed #E5E5E7',
            }}
          >
            <span
              className="material-symbols-outlined text-[32px] mb-2"
              style={{ color: '#C7C7CC' }}
            >
              folder_open
            </span>
            <p className="text-[13px] font-medium" style={{ color: '#86868B' }}>
              Nenhum lead
            </p>
          </div>
        ) : (
          <VirtualList
            items={leads}
            height="100%"
            itemHeight={170}
            className="scrollbar-thin scrollbar-thumb-gray-200"
            renderItem={(lead) => (
              <CRMCard
                key={lead.id}
                lead={lead}
                onDragStart={handleDragStart}
                onClick={onCardClick}
              />
            )}
          />
        )}
      </div>
    </div>
  )
}
