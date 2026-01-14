import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ThemeProvider } from 'next-themes'
import Layout from './components/Layout'
import Index from './pages/Index'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import { Loader2 } from 'lucide-react'
import { AuthProvider } from '@/hooks/use-auth'
import { AuthGuard } from '@/components/auth/AuthGuard'

// Lazy Loading
const Lives = React.lazy(() => import('./pages/Lives'))
const CRM = React.lazy(() => import('./pages/CRM'))

const LoadingFallback = () => (
  <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-background">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-muted-foreground animate-pulse">Carregando...</p>
    </div>
  </div>
)

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <BrowserRouter
      future={{ v7_startTransition: false, v7_relativeSplatPath: false }}
    >
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                element={
                  <AuthGuard>
                    <Layout />
                  </AuthGuard>
                }
              >
                <Route path="/" element={<Index />} />
                <Route path="/lives" element={<Lives />} />
                <Route path="/crm" element={<CRM />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
)

export default App
