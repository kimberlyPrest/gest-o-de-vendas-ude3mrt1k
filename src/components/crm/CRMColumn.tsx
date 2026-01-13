import { useState } from 'react'
import { CRMLead, CRMColumnId } from '@/stores/crmStore'
import { CRMCard } from './CRMCard'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { FolderOpen } from 'lucide-react'
import { VirtualList } from '@/components/ui/virtual-list'
import { EmptyState } from '@/components/ui/empty-state'

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
        'flex h-full min-w-[280px] w-[280px] flex-col rounded-lg border bg-gray-50/50 dark:bg-gray-900/50 transition-colors',
        isOver &&
          'bg-blue-50 dark:bg-blue-900/20 border-blue-300 border-dashed',
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b p-3 bg-background/50 rounded-t-lg backdrop-blur-sm"
        style={{ borderTop: `4px solid ${color}` }}
      >
        <h3 className="font-semibold text-gray-700 dark:text-gray-200">
          {label}
        </h3>
        <Badge
          variant="secondary"
          className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 shadow-sm"
        >
          {leads.length}
        </Badge>
      </div>

      {/* Content with Virtualization */}
      <div className="flex-1 p-2">
        {leads.length === 0 ? (
          <EmptyState icon={FolderOpen} title="Vazio" className="h-full" />
        ) : (
          <VirtualList
            items={leads}
            height="100%"
            itemHeight={160} // Approximate height of CRMCard + margin
            className="scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700"
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
