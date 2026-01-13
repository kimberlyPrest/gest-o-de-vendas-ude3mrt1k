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
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b bg-white/80 dark:bg-card/80 px-4 shadow-sm backdrop-blur-md md:px-6 transition-all">
      <SidebarTrigger className="-ml-2 h-9 w-9 hover:bg-gray-100 dark:hover:bg-gray-800" />

      <div className="flex-1 flex items-center gap-4 md:ml-4">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-1 sm:gap-2">
        <NotificationCenter />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSettingsOpen(true)}
          className="text-gray-500 hover:bg-transparent hover:text-gray-800"
        >
          <Settings className="h-5 w-5" />
        </Button>
      </div>

      <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
    </header>
  )
}
