import { SidebarTrigger } from '@/components/ui/sidebar'
import { NotificationCenter } from '@/components/layout/NotificationCenter'
import { GlobalSearch } from '@/components/layout/GlobalSearch'
import { Button } from '@/components/ui/button'
import { Settings } from 'lucide-react'
import { useState } from 'react'
import { SettingsModal } from '@/components/layout/SettingsModal'

export function Header() {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 shadow-sm md:px-6">
      <SidebarTrigger className="-ml-2" />

      <div className="flex-1 flex items-center gap-4 md:ml-4">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-2">
        <NotificationCenter />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSettingsOpen(true)}
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  )
}
