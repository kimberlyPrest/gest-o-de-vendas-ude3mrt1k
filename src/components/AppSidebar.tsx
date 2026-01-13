import { useLocation, Link } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  const items = [
    {
      title: 'Lives',
      url: '/lives',
      icon: 'live_tv',
    },
    {
      title: 'CRM',
      url: '/crm',
      icon: 'group',
    },
    {
      title: 'Ajustes',
      url: '/settings',
      icon: 'settings',
    },
  ]

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
        }
        .glass-sidebar {
          background: rgba(255, 255, 255, 0.7) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid #E5E5E7 !important;
        }
        .nav-item-active {
          background: rgba(0, 113, 227, 0.08);
          color: #0071E3 !important;
        }
      `}</style>
      <Sidebar
        className="glass-sidebar border-r-0"
        collapsible="offcanvas"
      >
        <SidebarHeader className="p-8">
          <div className="flex items-center gap-3">
            <div
              className="size-9 rounded-xl flex items-center justify-center shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
                boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)'
              }}
            >
              <span className="material-symbols-outlined text-white text-[20px]">analytics</span>
            </div>
            <div>
              <h1 className="text-[15px] font-semibold tracking-tight" style={{ color: '#1D1D1F' }}>Performance</h1>
              <p className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#86868B' }}>Analytics Suite</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-4 py-2">
          <SidebarMenu className="space-y-1">
            {items.map((item) => {
              const isActive = pathname === item.url || (item.url === '/lives' && pathname === '/')
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className={cn(
                      'w-full justify-start rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'nav-item-active'
                        : 'hover:bg-black/5'
                    )}
                    style={{
                      color: isActive ? '#0071E3' : '#86868B',
                    }}
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                      <span className="text-[14px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-6 border-t" style={{ borderColor: '#E5E5E7' }}>
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-black/5 cursor-pointer transition-colors">
            <div
              className="size-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: '#E5E5E7', color: '#86868B' }}
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div className="flex flex-col min-w-0">
              <p className="text-[13px] font-medium truncate" style={{ color: '#1D1D1F' }}>Admin User</p>
              <p className="text-[11px] truncate" style={{ color: '#86868B' }}>admin@icloud.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </>
  )
}
