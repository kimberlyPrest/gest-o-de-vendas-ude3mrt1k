import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import {
  Bell,
  Check,
  Clock,
  AlertCircle,
  Info,
  TrendingUp,
  Sparkles,
} from 'lucide-react'
import {
  useNotificationStore,
  NotificationType,
} from '@/stores/notificationStore'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useNavigate } from 'react-router-dom'

export function NotificationCenter() {
  const { notifications, getUnreadCount, markAsRead, markAllAsRead } =
    useNotificationStore()
  const unreadCount = getUnreadCount()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'inactive_lead':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'follow_up':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'new_lead':
        return <Info className="h-4 w-4 text-blue-500" />
      case 'goal':
        return <Sparkles className="h-4 w-4 text-emerald-500" />
      case 'high_performance':
        return <TrendingUp className="h-4 w-4 text-purple-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const getBgColor = (type: NotificationType) => {
    switch (type) {
      case 'inactive_lead':
        return 'bg-red-50'
      case 'follow_up':
        return 'bg-yellow-50'
      case 'new_lead':
        return 'bg-blue-50'
      case 'goal':
        return 'bg-emerald-50'
      case 'high_performance':
        return 'bg-purple-50'
      default:
        return 'bg-gray-50'
    }
  }

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id)
    setOpen(false)
    if (actionUrl) {
      navigate(actionUrl)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative hover:bg-transparent"
        >
          <Bell
            className={cn(
              'h-5 w-5 transition-colors',
              unreadCount > 0 ? 'text-gray-800' : 'text-gray-500',
            )}
          />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 flex h-2.5 w-2.5 translate-x-1/2 -translate-y-1/2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white"></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[320px] sm:w-[380px] p-0 overflow-hidden shadow-xl border-gray-100"
      >
        <DropdownMenuLabel className="flex items-center justify-between p-4 bg-gray-50/50">
          <span className="font-semibold text-gray-900">Notificações</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              onClick={markAllAsRead}
            >
              Marcar lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="bg-gray-100 p-3 rounded-full mb-3">
                <Bell className="h-6 w-6 text-gray-400" />
              </div>
              <p className="text-sm font-medium text-gray-900">Tudo limpo!</p>
              <p className="text-xs text-muted-foreground mt-1">
                Nenhuma notificação recente.
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex cursor-pointer items-start gap-3 border-b border-gray-50 p-4 transition-colors last:border-0 focus:bg-gray-50',
                  !notification.read ? 'bg-white' : 'bg-gray-50/50 opacity-70',
                )}
                onClick={() =>
                  handleNotificationClick(
                    notification.id,
                    notification.actionUrl,
                  )
                }
              >
                <div
                  className={cn(
                    'mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
                    getBgColor(notification.type),
                  )}
                >
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <p
                      className={cn(
                        'text-sm font-medium leading-none',
                        !notification.read ? 'text-gray-900' : 'text-gray-600',
                      )}
                    >
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="block h-2 w-2 rounded-full bg-blue-500 shadow-sm" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                    {notification.message}
                  </p>
                  <p className="text-[10px] text-gray-400 pt-1">
                    {formatDistanceToNow(new Date(notification.timestamp), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
