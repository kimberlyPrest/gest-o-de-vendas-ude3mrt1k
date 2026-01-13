import { useEffect, useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { useCRMStore } from '@/stores/crmStore'
import { useLivesStore } from '@/stores/livesStore'
import { useNavigate } from 'react-router-dom'
import { User, Video, Calendar } from 'lucide-react'
import { format } from 'date-fns'

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { leads, fetchLeads } = useCRMStore()
  const { allData: lives, fetchData: fetchLives } = useLivesStore()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener('keydown', down)

    // Prefetch data if not loaded
    if (leads.length === 0) fetchLeads()
    if (lives.length === 0) fetchLives()

    return () => document.removeEventListener('keydown', down)
  }, [fetchLeads, fetchLives, leads.length, lives.length])

  const runCommand = (command: () => void) => {
    setOpen(false)
    command()
  }

  return (
    <>
      <div
        className="relative hidden w-full cursor-pointer items-center justify-between rounded-md border bg-muted/50 px-4 py-2 text-sm text-muted-foreground lg:flex lg:w-64"
        onClick={() => setOpen(true)}
      >
        <span>Buscar...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Digite para buscar..." />
        <CommandList>
          <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>

          <CommandGroup heading="Leads">
            {leads.slice(0, 5).map((lead) => (
              <CommandItem
                key={lead.id}
                onSelect={() => {
                  runCommand(() => navigate('/crm'))
                  // In a real app we would navigate to detail or open modal
                }}
              >
                <User className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{lead.nomeCompleto}</span>
                  <span className="text-xs text-muted-foreground">
                    {lead.email}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Lives">
            {lives.slice(0, 5).map((live) => (
              <CommandItem
                key={`${live.date}-${live.presenter}`}
                onSelect={() => {
                  runCommand(() => navigate('/lives'))
                }}
              >
                <Video className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>Live: {live.presenter}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(live.date), 'dd/MM/yyyy')}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>

          <CommandSeparator />

          <CommandGroup heading="Ações">
            <CommandItem onSelect={() => runCommand(() => navigate('/lives'))}>
              <Calendar className="mr-2 h-4 w-4" /> Ir para Dashboard
            </CommandItem>
            <CommandItem onSelect={() => runCommand(() => navigate('/crm'))}>
              <User className="mr-2 h-4 w-4" /> Ir para CRM
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
