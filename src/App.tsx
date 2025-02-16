import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from './components/ui/toaster'
import CryptoDashboard from './components/CryptoDashboard'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-background">
          <div className="flex h-screen overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<CryptoDashboard />} />
                  <Route path="/markets" element={<div className="p-6">Markets Page (Coming Soon)</div>} />
                  <Route path="/trading" element={<div className="p-6">Trading Page (Coming Soon)</div>} />
                  <Route path="/wallet" element={<div className="p-6">Wallet Page (Coming Soon)</div>} />
                  <Route path="/settings" element={<div className="p-6">Settings Page (Coming Soon)</div>} />
                </Routes>
              </main>
            </div>
          </div>
          <Toaster />
        </div>
      </QueryClientProvider>
    </Router>
  )
}

export default App