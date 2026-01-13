import { type ReactNode } from 'react'
import { CRMLead, COLUMNS } from '@/stores/crmStore'
import {
  Mail,
  Phone,
  Activity,
  Globe,
  Users,
  DollarSign,
  Hash,
  MessageCircle,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface LeadInfoProps {
  lead: CRMLead
}

export function LeadInfo({ lead }: LeadInfoProps) {
  const initials = lead.nomeCompleto
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()

  const potentialValue = lead.assentosAdicionais * 500
  const statusColor =
    COLUMNS.find((c) => c.id === lead.status)?.color || '#6B7280'

  // Mock data for display purposes
  const role = 'Estrategista de Marketing'
  const location = 'São Paulo, BR'
  const probability = 92

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Profile Header */}
      <div className="flex flex-col items-center space-y-4 pt-2 text-center">
        <div className="relative">
          <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
            <AvatarImage
              src={`https://img.usecurling.com/ppl/medium?seed=${lead.id}`}
            />
            <AvatarFallback className="bg-gray-200 text-2xl text-gray-500">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              {lead.nomeCompleto}
            </h2>
            <Badge className="rounded-full border-0 bg-orange-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-orange-600 hover:bg-orange-200">
              HOT LEAD ({probability}%)
            </Badge>
          </div>
          <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500">
            {role} <span className="text-gray-300">•</span> {location}
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex w-full max-w-xs items-center justify-center gap-8 pt-4">
          <ActionButton
            icon={<Phone className="h-6 w-6" />}
            label="Ligar"
            color="bg-[#007AFF] shadow-blue-200"
            onClick={() => window.open(`tel:${lead.telefone}`)}
          />
          <ActionButton
            icon={<Mail className="h-6 w-6" />}
            label="E-mail"
            color="bg-[#5856D6] shadow-indigo-200"
            onClick={() => window.open(`mailto:${lead.email}`)}
          />
          <ActionButton
            icon={<MessageCircle className="h-6 w-6" />}
            label="WhatsApp"
            color="bg-[#34C759] shadow-green-200"
            onClick={() =>
              window.open(`https://wa.me/55${lead.telefone.replace(/\D/g, '')}`)
            }
          />
        </div>
      </div>

      {/* Grouped Info Sections */}
      <div className="space-y-6">
        {/* Personal Info */}
        <div className="space-y-2">
          <h3 className="pl-4 text-[13px] font-semibold uppercase tracking-wider text-[#8E8E93]">
            Informações Pessoais
          </h3>
          <div className="ios-group-container">
            <InfoRow
              icon={<Mail className="h-5 w-5 text-[#007AFF]" />}
              label="E-mail"
              value={lead.email}
            />
            <InfoRow
              icon={<Phone className="h-5 w-5 text-[#34C759]" />}
              label="Telefone"
              value={lead.telefone}
            />
            <InfoRow
              icon={<Activity className="h-5 w-5 text-[#FF9500]" />}
              label="Status"
              value={
                <div className="flex items-center gap-2">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  />
                  <span className="font-medium text-[#007AFF]">
                    {lead.status}
                  </span>
                </div>
              }
            />
            <InfoRow
              icon={<Globe className="h-5 w-5 text-[#5856D6]" />}
              label="Origem"
              value={lead.origem}
              isLast
            />
          </div>
        </div>

        {/* Sales Data */}
        <div className="space-y-2">
          <h3 className="pl-4 text-[13px] font-semibold uppercase tracking-wider text-[#8E8E93]">
            Dados da Venda
          </h3>
          <div className="ios-group-container">
            <InfoRow
              icon={<Users className="h-5 w-5 text-gray-500" />}
              label="Assentos Adicionais"
              value={
                <Badge
                  variant="secondary"
                  className="bg-gray-100 font-normal text-gray-700 hover:bg-gray-200"
                >
                  {lead.assentosAdicionais} Unidades
                </Badge>
              }
            />
            <InfoRow
              icon={<DollarSign className="h-5 w-5 text-gray-500" />}
              label="Valor Estimado"
              value={new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(potentialValue)}
            />
            <InfoRow
              icon={<Hash className="h-5 w-5 text-gray-500" />}
              label="Probabilidade"
              value={`${probability}%`}
              isLast
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function ActionButton({
  icon,
  label,
  color,
  onClick,
}: {
  icon: ReactNode
  label: string
  color: string
  onClick?: () => void
}) {
  return (
    <div
      className="group flex cursor-pointer flex-col items-center gap-2"
      onClick={onClick}
    >
      <div
        className={cn(
          'flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-all duration-200 group-hover:scale-105 active:scale-95',
          color,
        )}
      >
        {icon}
      </div>
      <span className="text-[11px] font-medium text-[#007AFF] group-hover:opacity-80">
        {label}
      </span>
    </div>
  )
}

function InfoRow({
  icon,
  label,
  value,
  isLast,
}: {
  icon: ReactNode
  label: string
  value: ReactNode
  isLast?: boolean
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between bg-white px-4 py-3.5',
        !isLast && 'border-b border-gray-100 ml-4 pl-0',
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-[15px] text-gray-900">{label}</span>
      </div>
      <div className="text-[15px] text-gray-500">{value}</div>
    </div>
  )
}
