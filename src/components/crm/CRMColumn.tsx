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
        isOver && 'ring-2 ring-[#D9B979] ring-offset-2 ring-offset-black',
      )}
      style={{
        backgroundColor: isOver
          ? 'rgba(217, 185, 121, 0.05)'
          : 'rgba(26, 26, 26, 0.6)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        border: isOver ? '2px dashed #D9B979' : '1px solid #333333',
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 rounded-t-2xl bg-[#1A1A1A]/80 border-b border-[#333333]"
        style={{
          borderTop: `4px solid ${color}`,
        }}
      >
        <h3 className="font-bold text-[14px] font-display text-white">
          {label}
        </h3>
        <div className="px-2.5 py-1 rounded-full text-[12px] font-semibold bg-white/5 text-gray-300">
          {leads.length}
        </div>
      </div>

      {/* Content with Virtualization */}
      <div className="flex-1 p-3 overflow-hidden">
        {leads.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#333333] bg-white/5">
            <span className="material-symbols-outlined text-[32px] mb-2 text-gray-600">
              folder_open
            </span>
            <p className="text-[13px] font-medium text-gray-500">Nenhum lead</p>
          </div>
        ) : (
          <VirtualList
            items={leads}
            height="100%"
            itemHeight={170}
            className="scrollbar-thin scrollbar-thumb-[#333333]"
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
