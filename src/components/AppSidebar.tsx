import { useLocation, Link, useNavigate } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { useAuth } from '@/hooks/use-auth'
import { LogOut, LayoutDashboard, Radio, Settings, Users } from 'lucide-react'
import { toast } from 'sonner'

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const { setOpenMobile, setOpen, isMobile } = useSidebar()

  const items = [
    {
      title: 'Lives',
      url: '/lives',
      icon: Radio,
    },
    {
      title: 'CRM',
      url: '/crm',
      icon: Users,
    },
    {
      title: 'Ajustes',
      url: '/settings',
      icon: Settings,
    },
  ]

  const handleLogout = async () => {
    try {
      await signOut()
      toast.success('Você saiu do sistema')
      navigate('/login')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error('Erro ao sair')
    }
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setOpenMobile(false)
    } else {
      setOpen(false)
    }
  }

  return (
    <Sidebar
      className="border-r border-[#333333] z-40 bg-[#0C0C0D]"
      collapsible="offcanvas"
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center gap-3">
          <div className="size-9 shrink-0 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 bg-[#D9B979] text-[#0C0C0D]">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div className="flex flex-col overflow-hidden transition-all duration-300">
            <h1 className="text-[15px] font-bold tracking-tight truncate font-display text-white">
              Performance
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-wider truncate text-[#D9B979]">
              Analytics Suite
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-4 py-2">
        <SidebarMenu className="space-y-1">
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url === '/lives' && pathname === '/')
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    'w-full justify-start rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[#D9B979]/10 text-[#D9B979]'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white',
                  )}
                  onClick={handleLinkClick}
                >
                  <Link to={item.url} className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="text-[14px] truncate">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t border-[#333333]">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-white/5">
            <div className="size-8 shrink-0 rounded-full flex items-center justify-center bg-[#333333] text-white">
              <span className="font-medium text-xs">
                {user?.email?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden">
              <p className="text-[13px] font-medium truncate text-white">
                {user?.user_metadata?.name || 'Usuário'}
              </p>
              <p className="text-[11px] truncate text-gray-400">
                {user?.email || 'Carregando...'}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-500/10 transition-colors w-full"
          >
            <LogOut size={14} className="shrink-0" />
            <span className="truncate">Sair do sistema</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
