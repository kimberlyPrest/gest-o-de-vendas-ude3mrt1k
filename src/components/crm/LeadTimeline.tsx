import { CRMLead } from '@/stores/crmStore'
import {
  MessageSquare,
  ArrowRightLeft,
  CalendarClock,
  CheckCircle2,
  StickyNote,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'

interface LeadTimelineProps {
  lead: CRMLead
}

export function LeadTimeline({ lead }: LeadTimelineProps) {
  // Sort history by date descending (reverse chronological)
  const history = [...(lead.history || [])].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  const getIcon = (type: string) => {
    switch (type) {
      case 'interaction':
        return <MessageSquare className="h-4 w-4 text-blue-600" />
      case 'status_change':
        return <ArrowRightLeft className="h-4 w-4 text-orange-600" />
      case 'follow_up_set':
        return <CalendarClock className="h-4 w-4 text-purple-600" />
      case 'note_added':
        return <StickyNote className="h-4 w-4 text-yellow-600" />
      default:
        return <CheckCircle2 className="h-4 w-4 text-gray-600" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case 'interaction':
        return 'bg-blue-100'
      case 'status_change':
        return 'bg-orange-100'
      case 'follow_up_set':
        return 'bg-purple-100'
      case 'note_added':
        return 'bg-yellow-100'
      default:
        return 'bg-gray-100'
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Histórico de Atividade
      </h3>

      <div className="rounded-xl border border-gray-200/60 bg-white p-6 shadow-sm">
        {history.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">
            Nenhuma atividade registrada
          </div>
        ) : (
          <div className="relative space-y-8 pl-1">
            {/* Vertical Line */}
            <div className="absolute bottom-2 left-[20px] top-2 w-px -translate-x-1/2 bg-gray-200" />

            {history.map((item) => (
              <div key={item.id} className="relative flex gap-4">
                <div
                  className={cn(
                    'relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white shadow-sm ring-4 ring-white',
                    getBgColor(item.type),
                  )}
                >
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 space-y-1 py-1">
                  <p className="text-sm font-medium leading-none text-gray-900">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>
                      {format(new Date(item.date), "d 'de' MMMM 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-gray-600">
                      {item.author}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
