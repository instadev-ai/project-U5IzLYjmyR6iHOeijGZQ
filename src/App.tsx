import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster'
import CryptoDashboard from './components/CryptoDashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter } from 'react-router-dom'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <CryptoDashboard />
              </main>
            </div>
          </div>
          <Toaster />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App