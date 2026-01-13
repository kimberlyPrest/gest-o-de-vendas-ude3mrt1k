import { useLocation, Link } from 'react-router-dom'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function AppSidebar() {
  const location = useLocation()
  const pathname = location.pathname

  const items = [
    {
      title: '📊 Lives',
      url: '/lives',
    },
    {
      title: '🎯 CRM',
      url: '/crm',
    },
  ]

  return (
    <Sidebar
      className="border-r-0 bg-[#1F2937] text-white"
      collapsible="offcanvas"
    >
      <SidebarHeader className="p-6">
        <h1 className="text-lg font-bold text-white">Sistema de Vendas</h1>
      </SidebarHeader>
      <SidebarContent className="px-4">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={cn(
                    'w-full justify-start rounded-md px-6 py-3 text-sm font-normal text-white transition-all duration-200 hover:bg-[#374151] hover:text-white',
                    isActive && 'bg-[#3B82F6] font-medium hover:bg-[#3B82F6]',
                  )}
                >
                  <Link to={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
