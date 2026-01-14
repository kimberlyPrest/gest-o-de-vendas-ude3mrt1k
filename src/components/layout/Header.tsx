import { SidebarToggle } from '@/components/layout/SidebarToggle'
import { GlobalSearch } from '@/components/layout/GlobalSearch'

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-[#333333] bg-[#0C0C0D]/80 px-4 shadow-sm backdrop-blur-md md:px-6 transition-all">
      <SidebarToggle className="-ml-2 text-gray-200 hover:text-white" />

      <div className="flex-1 flex items-center gap-4 md:ml-4">
        <GlobalSearch />
      </div>
    </header>
  )
}
