import { Outlet } from 'react-router-dom'
import { AppSidebar } from '@/components/AppSidebar'
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar'
import { ConnectionStatus } from '@/components/ConnectionStatus'
import { SyncManager } from '@/components/layout/SyncManager'
import { Header } from '@/components/layout/Header'

function DesktopOverlay() {
  const { state, setOpen, isMobile } = useSidebar()
  // Only show overlay on desktop when sidebar is expanded
  if (isMobile || state !== 'expanded') return null

  return (
    <div
      className="fixed inset-0 z-[5] bg-black/10 backdrop-blur-[1px] transition-all duration-300 md:block hidden"
      onClick={() => setOpen(false)}
    />
  )
}

export default function Layout() {
  return (
    <SidebarProvider
      defaultOpen={false}
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
        <DesktopOverlay />
        <Header />
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>

        <ConnectionStatus />
      </SidebarInset>
    </SidebarProvider>
  )
}
