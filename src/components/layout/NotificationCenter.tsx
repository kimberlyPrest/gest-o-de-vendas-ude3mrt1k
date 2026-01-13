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
import { Bell, Check, Clock, AlertCircle, Info } from 'lucide-react'
import {
  useNotificationStore,
  NotificationType,
} from '@/stores/notificationStore'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function NotificationCenter() {
  const { notifications, getUnreadCount, markAsRead, markAllAsRead } =
    useNotificationStore()
  const unreadCount = getUnreadCount()
  const [open, setOpen] = useState(false)

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'inactive_lead':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case 'follow_up':
        return <Clock className="h-4 w-4 text-yellow-500" />
      case 'new_lead':
        return <Info className="h-4 w-4 text-green-500" />
      case 'goal':
        return <Check className="h-4 w-4 text-emerald-500" />
      default:
        return <Bell className="h-4 w-4 text-gray-500" />
    }
  }

  const handleNotificationClick = (id: string, actionUrl?: string) => {
    markAsRead(id)
    if (actionUrl) {
      // Navigate or handle action
      console.log('Navigating to', actionUrl)
    }
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute right-1 top-1 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500"></span>
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notificações</span>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto px-2 text-xs text-muted-foreground"
              onClick={markAllAsRead}
            >
              Marcar lidas
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Nenhuma notificação recente.
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={cn(
                  'flex cursor-pointer flex-col items-start gap-1 p-3',
                  !notification.read && 'bg-accent/50',
                )}
                onClick={() =>
                  handleNotificationClick(
                    notification.id,
                    notification.actionUrl,
                  )
                }
              >
                <div className="flex w-full items-start gap-2">
                  <div className="mt-0.5">{getIcon(notification.type)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium leading-none">
                      {notification.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <span className="ml-6 text-[10px] text-muted-foreground">
                  {formatDistanceToNow(new Date(notification.timestamp), {
                    addSuffix: true,
                    locale: ptBR,
                  })}
                </span>
              </DropdownMenuItem>
            ))
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
