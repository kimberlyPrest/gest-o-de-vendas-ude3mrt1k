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
    <>
      <style>{`
        .glass-sidebar {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .nav-item-active {
          background: rgba(0, 113, 227, 0.08);
          color: #0071E3 !important;
        }
      `}</style>
      <Sidebar
        className="glass-sidebar border-r border-gray-200/50 z-40"
        collapsible="offcanvas"
      >
        <SidebarHeader className="p-6">
          <div className="flex items-center gap-3">
            <div
              className="size-9 shrink-0 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
              }}
            >
              <LayoutDashboard className="text-white h-5 w-5" />
            </div>
            <div className="flex flex-col overflow-hidden transition-all duration-300">
              <h1
                className="text-[15px] font-semibold tracking-tight truncate"
                style={{ color: '#1D1D1F' }}
              >
                Performance
              </h1>
              <p
                className="text-[10px] font-medium uppercase tracking-wider truncate"
                style={{ color: '#86868B' }}
              >
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
                      isActive ? 'nav-item-active' : 'hover:bg-black/5',
                    )}
                    style={{
                      color: isActive ? '#0071E3' : '#86868B',
                    }}
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
        <SidebarFooter className="p-6 border-t border-gray-100/50">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 p-2 rounded-xl transition-colors hover:bg-black/5">
              <div
                className="size-8 shrink-0 rounded-full flex items-center justify-center"
                style={{ backgroundColor: '#E5E5E7', color: '#86868B' }}
              >
                <span className="font-medium text-xs">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex flex-col min-w-0 overflow-hidden">
                <p
                  className="text-[13px] font-medium truncate"
                  style={{ color: '#1D1D1F' }}
                >
                  {user?.user_metadata?.name || 'Usuário'}
                </p>
                <p
                  className="text-[11px] truncate"
                  style={{ color: '#86868B' }}
                >
                  {user?.email || 'Carregando...'}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 p-2 rounded-xl text-xs font-medium text-red-500 hover:bg-red-50 transition-colors w-full"
            >
              <LogOut size={14} className="shrink-0" />
              <span className="truncate">Sair do sistema</span>
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
