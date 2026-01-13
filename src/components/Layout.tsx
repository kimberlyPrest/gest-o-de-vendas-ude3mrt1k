import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/AppSidebar'
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'
import { ConnectionStatus } from '@/components/ConnectionStatus'

export default function Layout() {
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '240px',
          '--sidebar-background': '#1F2937',
          '--sidebar-foreground': '#FFFFFF',
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="bg-[#F3F4F6]">
        {/* Mobile Header Trigger */}
        <header className="flex h-14 items-center gap-2 border-b bg-white px-4 lg:hidden">
          <SidebarTrigger className="-ml-2" />
          <span className="font-semibold">Menu</span>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        <ConnectionStatus />
      </SidebarInset>
    </SidebarProvider>
  )
}
