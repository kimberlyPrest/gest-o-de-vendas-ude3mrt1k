import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useSettingsStore } from '@/stores/settingsStore'
import { useTheme } from 'next-themes'
import { Moon, Sun, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { syncFrequency, setSyncFrequency, notifications, toggleNotification } =
    useSettingsStore()
  const { setTheme, theme } = useTheme()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Configurações</DialogTitle>
          <DialogDescription>
            Personalize sua experiência no sistema.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Theme */}
          <div className="space-y-3">
            <h4 className="font-medium">Aparência</h4>
            <div className="flex gap-2">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={() => setTheme('light')}
                className="flex-1"
              >
                <Sun className="mr-2 h-4 w-4" /> Claro
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setTheme('dark')}
                className="flex-1"
              >
                <Moon className="mr-2 h-4 w-4" /> Escuro
              </Button>
              <Button
                variant={theme === 'system' ? 'default' : 'outline'}
                onClick={() => setTheme('system')}
                className="flex-1"
              >
                <Monitor className="mr-2 h-4 w-4" /> Sistema
              </Button>
            </div>
          </div>

          {/* Sync */}
          <div className="space-y-3">
            <h4 className="font-medium">Sincronização</h4>
            <div className="flex items-center justify-between">
              <Label>Frequência de atualização</Label>
              <Select
                value={String(syncFrequency)}
                onValueChange={(v) => setSyncFrequency(Number(v) as any)}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minuto</SelectItem>
                  <SelectItem value="5">5 minutos</SelectItem>
                  <SelectItem value="10">10 minutos</SelectItem>
                  <SelectItem value="30">30 minutos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-3">
            <h4 className="font-medium">Notificações</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="inactive">Leads Inativos</Label>
                <Switch
                  id="inactive"
                  checked={notifications.inactiveLeads}
                  onCheckedChange={() => toggleNotification('inactiveLeads')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="follow">Follow-ups Próximos</Label>
                <Switch
                  id="follow"
                  checked={notifications.followUps}
                  onCheckedChange={() => toggleNotification('followUps')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="goals">Metas de Conversão</Label>
                <Switch
                  id="goals"
                  checked={notifications.goals}
                  onCheckedChange={() => toggleNotification('goals')}
                />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
