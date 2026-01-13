import { useState } from 'react'
import { CRMLead, useCRMStore } from '@/stores/crmStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowUp, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface LeadNotesProps {
  lead: CRMLead
}

export function LeadNotes({ lead }: LeadNotesProps) {
  const { addNote } = useCRMStore()
  const [noteContent, setNoteContent] = useState('')

  const handleAddNote = () => {
    if (!noteContent.trim()) return
    addNote(lead.id, noteContent)
    setNoteContent('')
    toast.success('Nota adicionada')
  }

  const handleDeleteMock = () => {
    toast.success('Nota removida')
  }

  const notes = [...(lead.notes || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  )

  return (
    <div className="space-y-4">
      <h3 className="pl-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Notas Recentes
      </h3>

      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="rounded-xl border border-gray-200/60 bg-white p-8 text-center text-sm italic text-gray-400">
            Sem notas recentes.
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="group rounded-xl border border-gray-200/60 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex w-full items-start gap-3">
                  <Avatar className="mt-1 h-8 w-8">
                    <AvatarImage
                      src={`https://img.usecurling.com/ppl/thumbnail?seed=${note.author}`}
                    />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-900">
                        {note.author}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {formatDistanceToNow(new Date(note.createdAt), {
                          addSuffix: true,
                          locale: ptBR,
                        })}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {note.content}
                    </p>
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="-mr-1 -mt-1 h-6 w-6 text-gray-400 opacity-0 transition-opacity hover:text-red-500 group-hover:opacity-100"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Excluir nota?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta ação é irreversível.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteMock}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Excluir
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div className="mt-2 flex items-center gap-2 rounded-full border border-gray-300 bg-white p-2 shadow-sm transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
        <Input
          className="h-10 flex-1 border-0 bg-transparent px-4 text-sm shadow-none focus-visible:ring-0"
          placeholder="Adicionar uma nota..."
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
        />
        <Button
          size="icon"
          className={cn(
            'h-8 w-8 shrink-0 rounded-full transition-all',
            noteContent.trim()
              ? 'bg-[#007AFF] hover:bg-blue-600'
              : 'cursor-not-allowed bg-gray-200 text-gray-400',
          )}
          onClick={handleAddNote}
          disabled={!noteContent.trim()}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
