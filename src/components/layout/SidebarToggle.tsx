import { Button } from '@/components/ui/button'
import { useSidebar } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

export function SidebarToggle({ className }: { className?: string }) {
  const { toggleSidebar, open } = useSidebar()

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'h-9 w-9 hover:bg-accent hover:text-accent-foreground',
        className,
      )}
      onClick={toggleSidebar}
      title={open ? 'Recolher menu' : 'Expandir menu'}
      aria-label={open ? 'Recolher menu lateral' : 'Expandir menu lateral'}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <path d="M9 3v18" />
      </svg>
    </Button>
  )
}
