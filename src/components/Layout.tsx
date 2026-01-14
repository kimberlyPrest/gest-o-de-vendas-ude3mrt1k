import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import { ConnectionStatus } from '@/components/ConnectionStatus'
import { SyncManager } from '@/components/layout/SyncManager'

export default function Layout() {
  return (
    <SidebarProvider
      defaultOpen={true}
      style={
        {
          '--sidebar-width': '260px',
          '--sidebar-background': 'rgba(255, 255, 255, 0.7)',
          '--sidebar-foreground': '#1D1D1F',
        } as React.CSSProperties
      }
    >
      <SyncManager />
      <AppSidebar />
      <SidebarInset
        className="transition-all duration-300 ease-in-out"
        style={{ backgroundColor: '#F5F5F7' }}
      >
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        <ConnectionStatus />
      </SidebarInset>
    </SidebarProvider>
  )
}
