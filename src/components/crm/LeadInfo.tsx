import { CRMLead, COLUMNS } from '@/stores/crmStore'
import {
  Mail,
  Phone,
  Calendar,
  DollarSign,
  User,
  AlertCircle,
  CheckCircle2,
  Clock,
  Bell,
} from 'lucide-react'
import { format, differenceInHours, differenceInDays } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface LeadInfoProps {
  lead: CRMLead
}

export function LeadInfo({ lead }: LeadInfoProps) {
  const potentialValue = lead.assentosAdicionais * 500
  const statusColor =
    COLUMNS.find((c) => c.id === lead.status)?.color || '#6B7280'
  const initials = lead.nomeCompleto
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const lastInteractionDate = new Date(lead.lastInteraction)
  const now = new Date()
  const hoursDiff = differenceInHours(now, lastInteractionDate)
  const daysDiff = differenceInDays(now, lastInteractionDate)

  let statusStatus = 'success'
  let statusText = `Última interação: Há ${hoursDiff} horas`

  if (hoursDiff > 72) {
    statusStatus = 'urgent'
    statusText = `Urgente - Sem interação há: ${daysDiff} dias`
  } else if (hoursDiff > 24) {
    statusStatus = 'warning'
    statusText = `Atenção - Última interação: Há ${daysDiff} dias`
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header Profile */}
      <div className="flex items-start gap-4">
        <Avatar className="h-16 w-16 border-2 border-white shadow-lg">
          <AvatarImage
            src={`https://img.usecurling.com/ppl/medium?seed=${lead.id}`}
          />
          <AvatarFallback className="bg-primary text-primary-foreground text-xl">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">
            {lead.nomeCompleto}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              className="px-2 py-0.5 text-xs font-medium text-white"
              style={{ backgroundColor: statusColor }}
            >
              {lead.status}
            </Badge>
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              Capturado em: {format(new Date(lead.dataCaptacao), 'dd/MM/yyyy')}
            </span>
          </div>
        </div>
      </div>

      {/* Interaction Status Card */}
      <Card
        className={cn(
          'border-l-4 shadow-sm',
          statusStatus === 'success' && 'border-l-green-500 bg-green-50/50',
          statusStatus === 'warning' && 'border-l-yellow-500 bg-yellow-50/50',
          statusStatus === 'urgent' && 'border-l-red-500 bg-red-50/50',
        )}
      >
        <CardContent className="flex items-center gap-3 p-4">
          {statusStatus === 'success' && (
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          )}
          {statusStatus === 'warning' && (
            <Clock className="h-5 w-5 text-yellow-600" />
          )}
          {statusStatus === 'urgent' && (
            <Bell className="h-5 w-5 text-red-600 animate-pulse" />
          )}
          <span
            className={cn(
              'text-sm font-medium',
              statusStatus === 'success' && 'text-green-700',
              statusStatus === 'warning' && 'text-yellow-700',
              statusStatus === 'urgent' && 'text-red-700',
            )}
          >
            {statusText}
          </span>
        </CardContent>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <User className="h-4 w-4" /> Contato
          </h3>
          <div className="space-y-3">
            <a
              href={`mailto:${lead.email}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <Mail className="h-4 w-4 text-gray-500" />
              {lead.email}
            </a>
            <a
              href={`tel:${lead.telefone}`}
              className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
            >
              <Phone className="h-4 w-4 text-gray-500" />
              {lead.telefone}
            </a>
          </div>
        </div>

        <div className="space-y-4 rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <DollarSign className="h-4 w-4" /> Negócio
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-500">Valor Potencial</span>
              <p className="font-medium text-green-700">
                {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(potentialValue)}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Assentos</span>
              <p className="font-medium text-gray-900">
                {lead.assentosAdicionais}
              </p>
            </div>
            <div>
              <span className="text-xs text-gray-500">Origem</span>
              <p className="text-sm font-medium text-gray-900">{lead.origem}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
