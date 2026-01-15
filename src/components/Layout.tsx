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
    <button
      type="button"
      className="fixed inset-0 z-10 bg-black/50 backdrop-blur-[1px] transition-all duration-300 md:block hidden cursor-default"
      onClick={() => setOpen(false)}
      aria-label="Fechar menu lateral"
      tabIndex={-1}
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
        } as React.CSSProperties
      }
    >
      <SyncManager />
      <AppSidebar />
      <SidebarInset className="transition-all duration-300 ease-in-out bg-background">
        <DesktopOverlay />
        <Header />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>

        <ConnectionStatus />
      </SidebarInset>
    </SidebarProvider>
  )
}
