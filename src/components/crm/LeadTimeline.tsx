import { CRMLead, HistoryItem } from '@/stores/crmStore'
import {
  MessageSquare,
  ArrowRightLeft,
  CalendarClock,
  CheckCircle2,
  StickyNote,
  Phone,
  Mail,
  Users,
} from 'lucide-react'
import { format, isToday, isYesterday } from 'date-fns'
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

  const formatTimestamp = (dateStr: string) => {
    const date = new Date(dateStr)
    if (isToday(date)) {
      return `Hoje, ${format(date, 'HH:mm')}`
    }
    if (isYesterday(date)) {
      return `Ontem, ${format(date, 'HH:mm')}`
    }
    return format(date, "d 'de' MMM, HH:mm", { locale: ptBR })
  }

  const getEventDetails = (item: HistoryItem) => {
    const desc = item.description || ''

    // Status Change
    if (item.type === 'status_change') {
      const match = desc.match(/para (.+)$/)
      return {
        title: match ? `Movido para ${match[1]}` : 'Alteração de Status',
        description: desc,
        icon: <ArrowRightLeft className="h-4 w-4" />,
        colorClass: 'bg-[#8E8E93]/10 text-[#8E8E93]', // System Gray as requested
      }
    }

    // Interaction
    if (item.type === 'interaction') {
      const parts = desc.split(/[-:]/).map((p) => p.trim())
      // Example: "Interação registrada: WhatsApp - Conversa"
      const type =
        parts.find((p) =>
          ['WhatsApp', 'Ligação', 'Email', 'Reunião'].some((t) =>
            p.includes(t),
          ),
        ) || 'Interação'
      return {
        title: type,
        description: desc
          .replace(`Interação registrada: ${type} - `, '')
          .replace(`Interação registrada: ${type}`, ''),
        icon: type.includes('Ligação') ? (
          <Phone className="h-4 w-4" />
        ) : type.includes('Email') ? (
          <Mail className="h-4 w-4" />
        ) : type.includes('WhatsApp') ? (
          <MessageSquare className="h-4 w-4" />
        ) : (
          <Users className="h-4 w-4" />
        ),
        colorClass: 'bg-[#34C759]/10 text-[#34C759]', // Green as requested
      }
    }

    // Follow Up
    if (item.type === 'follow_up_set') {
      const dateMatch = desc.match(/para (.+)$/)
      return {
        title: 'Follow-up Agendado',
        description: dateMatch ? dateMatch[1] : desc,
        icon: <CalendarClock className="h-4 w-4" />,
        colorClass: 'bg-[#007AFF]/10 text-[#007AFF]', // Blue as requested
      }
    }

    // Note
    if (item.type === 'note_added') {
      return {
        title: 'Nota Adicionada',
        description: 'Nota interna registrada',
        icon: <StickyNote className="h-4 w-4" />,
        colorClass: 'bg-[#FF9500]/10 text-[#FF9500]', // Orange/Yellow for notes
      }
    }

    // Default / System
    return {
      title: desc.includes('capturado')
        ? 'Lead Capturado'
        : 'Evento do Sistema',
      description: desc,
      icon: <CheckCircle2 className="h-4 w-4" />,
      colorClass: 'bg-[#8E8E93]/10 text-[#8E8E93]',
    }
  }

  return (
    <div className="space-y-3">
      <h3 className="pl-4 text-[13px] font-medium uppercase tracking-wider text-[#8E8E93]">
        Histórico de Atividade
      </h3>

      <div className="ios-group-container">
        {history.length === 0 ? (
          <div className="py-8 text-center text-[13px] text-[#8E8E93]">
            Nenhuma atividade registrada
          </div>
        ) : (
          <div className="flex flex-col">
            {history.map((item, index) => {
              const details = getEventDetails(item)
              const isLast = index === history.length - 1

              return (
                <div
                  key={item.id}
                  className="group relative flex gap-4 p-4 transition-colors hover:bg-gray-50/50"
                >
                  {/* Connector Line */}
                  {!isLast && <div className="timeline-connector" />}

                  {/* Icon */}
                  <div
                    className={cn(
                      'relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105',
                      details.colorClass,
                    )}
                  >
                    {details.icon}
                  </div>

                  {/* Content */}
                  <div className="flex min-w-0 flex-1 flex-col gap-1 pt-0.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-bold text-gray-900 truncate">
                        {details.title}
                      </span>
                      <span className="shrink-0 text-[11px] text-[#8E8E93]">
                        {formatTimestamp(item.date)}
                      </span>
                    </div>

                    <p className="text-[13px] leading-relaxed text-[#8E8E93] line-clamp-2">
                      {details.description}
                    </p>

                    <div className="pt-1">
                      <span className="text-[11px] font-medium text-[#007AFF]">
                        {item.author === 'Sistema'
                          ? 'Sistema (Auto)'
                          : `@${item.author.toLowerCase().replace(' ', '.')}`}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
