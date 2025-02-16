import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster'
import CryptoDashboard from './components/CryptoDashboard'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="min-h-screen bg-background">
        <CryptoDashboard />
        <Toaster />
      </main>
    </QueryClientProvider>
  )
}

export default App