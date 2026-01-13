import { CRMLead } from '@/stores/crmStore'
import {
  Circle,
  MessageSquare,
  ArrowRightLeft,
  CalendarClock,
  CheckCircle2,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ScrollArea } from '@/components/ui/scroll-area'

interface LeadTimelineProps {
  lead: CRMLead
}

export function LeadTimeline({ lead }: LeadTimelineProps) {
  const history = lead.history || []

  const getIcon = (type: string) => {
    switch (type) {
      case 'interaction':
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case 'status_change':
        return <ArrowRightLeft className="h-4 w-4 text-purple-500" />
      case 'follow_up_set':
        return <CalendarClock className="h-4 w-4 text-orange-500" />
      case 'note_added':
        return <Circle className="h-4 w-4 text-gray-500" />
      default:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[500px]">
      <h3 className="mb-4 font-semibold text-gray-900">
        Histórico de Atividades
      </h3>
      <ScrollArea className="flex-1 pr-4">
        <div className="space-y-6 border-l-2 border-gray-100 ml-2 pl-6 pb-2">
          {history.length === 0 && (
            <p className="text-sm text-gray-400 italic">
              Nenhuma atividade registrada.
            </p>
          )}
          {history.map((item) => (
            <div key={item.id} className="relative">
              <span className="absolute -left-[33px] top-1 flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 shadow-sm">
                {getIcon(item.type)}
              </span>
              <div className="flex flex-col gap-1">
                <span className="text-xs text-gray-500">
                  {format(new Date(item.date), "d 'de' MMM, HH:mm", {
                    locale: ptBR,
                  })}
                </span>
                <p className="text-sm text-gray-700">{item.description}</p>
                <span className="text-[10px] font-medium text-gray-400">
                  {item.author}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
