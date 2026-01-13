import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { ConnectionStatus } from '@/components/ConnectionStatus'
import { Header } from '@/components/layout/Header'
import { SyncManager } from '@/components/layout/SyncManager'

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
      <SyncManager />
      <AppSidebar />
      <SidebarInset className="bg-[#F3F4F6] dark:bg-background">
        <Header />

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        <ConnectionStatus />
      </SidebarInset>
    </SidebarProvider>
  )
}
