import { useState } from 'react'
import { CRMLead, CRMColumnId } from '@/stores/crmStore'
import { CRMCard } from './CRMCard'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { FolderOpen } from 'lucide-react'

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
        'flex h-full min-w-[280px] w-[280px] flex-col rounded-lg border bg-gray-50/50 transition-colors',
        isOver && 'bg-blue-50 border-blue-300 border-dashed',
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b p-3"
        style={{ borderTop: `4px solid ${color}` }}
      >
        <h3 className="font-semibold text-gray-700">{label}</h3>
        <Badge variant="secondary" className="bg-white text-gray-600 shadow-sm">
          {leads.length}
        </Badge>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-gray-200">
        {leads.length === 0 ? (
          <div className="mt-8 flex flex-col items-center justify-center text-gray-400">
            <FolderOpen className="mb-2 h-8 w-8 opacity-20" />
            <p className="text-sm">Vazio</p>
          </div>
        ) : (
          leads.map((lead) => (
            <CRMCard
              key={lead.id}
              lead={lead}
              onDragStart={handleDragStart}
              onClick={onCardClick}
            />
          ))
        )}
      </div>
    </div>
  )
}
