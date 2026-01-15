import { SidebarToggle } from '@/components/layout/SidebarToggle'
import { GlobalSearch } from '@/components/layout/GlobalSearch'

export function Header() {
  return (
    <header
      className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/80 px-4 shadow-sm backdrop-blur-md md:px-6 transition-all"
      role="banner"
      aria-label="Navegação Superior"
    >
      <SidebarToggle className="-ml-2 text-muted-foreground hover:text-foreground" />

      <div className="flex-1 flex items-center gap-4 md:ml-4">
        <GlobalSearch />
      </div>
    </header>
  )
}
