import { useState, type FormEvent } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'
import { Gem, Loader2, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/lives'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      toast.error('Campos obrigatórios', {
        description: 'Por favor, preencha todos os campos para continuar.',
        style: {
          backgroundColor: '#1A1A1A',
          borderColor: '#FF5C5C',
          color: '#F5F5F7',
        },
      })
      return
    }

    setIsLoading(true)

    try {
      const { error } = await signIn(email, password)

      if (error) {
        toast.error('Falha na autenticação', {
          description: 'Verifique suas credenciais e tente novamente.',
          style: {
            backgroundColor: '#1A1A1A',
            borderColor: '#FF5C5C',
            color: '#F5F5F7',
          },
        })
      } else {
        toast.success('Login realizado', {
          description: 'Acesso concedido ao sistema.',
          style: {
            backgroundColor: '#1A1A1A',
            borderColor: '#D9B979',
            color: '#F5F5F7',
          },
        })
        navigate(from, { replace: true })
      }
    } catch (error) {
      console.error(error)
      toast.error('Erro inesperado', {
        description: 'Ocorreu um erro ao tentar fazer login.',
        style: {
          backgroundColor: '#1A1A1A',
          borderColor: '#FF5C5C',
          color: '#F5F5F7',
        },
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#0C0C0D] to-[#191919] font-body text-foreground overflow-hidden">
      {/* Background Ambience - optional subtle glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#D9B979]/5 rounded-full blur-[100px]" />
      </div>

      {/* Login Card */}
      <div className="w-full max-w-[400px] relative z-10 animate-fade-in-up">
        <div className="group relative rounded-2xl border border-[#D9B979] bg-gradient-to-br from-[#2C2C2E] to-[#1E1E20] p-1 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,185,121,0.15)]">
          {/* Inner Card Content */}
          <div className="rounded-xl bg-[#151516]/80 p-8 flex flex-col items-center space-y-8 h-full w-full relative overflow-hidden">
            {/* Decorative top sheen */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D9B979]/30 to-transparent" />

            {/* Header */}
            <div className="text-center space-y-5 flex flex-col items-center w-full">
              <div className="relative">
                <div className="h-14 w-14 rounded-2xl bg-[#D9B979]/10 flex items-center justify-center border border-[#D9B979]/30 shadow-[0_0_15px_rgba(217,185,121,0.2)] transform transition-transform group-hover:scale-105 duration-500">
                  <Gem className="h-7 w-7 text-[#D9B979]" />
                </div>
              </div>
              <h1 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-[#D9B979] text-glow">
                Acesso ao Sistema
              </h1>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="w-full space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-xs font-medium uppercase tracking-widest text-gray-500 ml-1 font-sans"
                >
                  Email
                </label>
                <div className="relative group/input">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={cn(
                      'w-full h-12 rounded-lg bg-[#1A1A1A] border border-[#333333] px-4 text-white placeholder-gray-700 outline-none transition-all duration-300 font-sans',
                      'focus:border-[#D9B979] focus:ring-1 focus:ring-[#D9B979] focus:shadow-[0_0_10px_rgba(217,185,121,0.15)]',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      'group-hover/input:border-[#444444]',
                    )}
                    placeholder="nome@exemplo.com"
                    disabled={isLoading}
                    autoComplete="email"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-xs font-medium uppercase tracking-widest text-gray-500 ml-1 font-sans"
                >
                  Senha
                </label>
                <div className="relative group/input">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={cn(
                      'w-full h-12 rounded-lg bg-[#1A1A1A] border border-[#333333] px-4 text-white placeholder-gray-700 outline-none transition-all duration-300 font-sans',
                      'focus:border-[#D9B979] focus:ring-1 focus:ring-[#D9B979] focus:shadow-[0_0_10px_rgba(217,185,121,0.15)]',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      'pr-10',
                      'group-hover/input:border-[#444444]',
                    )}
                    placeholder="••••••••"
                    disabled={isLoading}
                    autoComplete="current-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#D9B979] transition-colors p-1"
                    disabled={isLoading}
                    aria-label={
                      showPassword ? 'Ocultar senha' : 'Mostrar senha'
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full h-12 rounded-lg bg-[#D9B979] text-[#0C0C0D] font-bold uppercase tracking-widest text-sm font-display',
                    'hover:brightness-110 active:scale-[0.98] transition-all duration-200 shadow-lg',
                    'disabled:opacity-70 disabled:cursor-not-allowed disabled:active:scale-100',
                    'flex items-center justify-center gap-2',
                    'focus:outline-none focus:ring-2 focus:ring-[#D9B979]/50 focus:ring-offset-2 focus:ring-offset-[#1E1E20]',
                  )}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Autenticando...</span>
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer info */}
        <p className="mt-6 text-center text-xs text-gray-600 font-medium tracking-wide">
          Gestão de Vendas &copy; {new Date().getFullYear()}
        </p>
      </div>

      {/* Footer Decoration */}
      <div className="fixed bottom-8 left-0 right-0 flex items-center justify-center gap-4 opacity-20 pointer-events-none">
        <div className="h-px w-16 bg-gradient-to-r from-transparent via-[#D9B979] to-[#D9B979]" />
        <ShieldCheck className="h-5 w-5 text-[#D9B979]" />
        <div className="h-px w-16 bg-gradient-to-r from-[#D9B979] via-[#D9B979] to-transparent" />
      </div>
    </div>
  )
}
