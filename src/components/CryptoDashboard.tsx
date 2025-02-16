import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { useToast } from './ui/use-toast'
import { ArrowDown, ArrowUp, Bitcoin, DollarSign } from 'lucide-react'
import { motion } from 'framer-motion'

const CryptoDashboard = () => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null)
  const [priceChange, setPriceChange] = useState<number>(0)
  const { toast } = useToast()

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true'
        )
        const data = await response.json()
        const newPrice = data.bitcoin.usd
        if (btcPrice !== null) {
          setPriceChange(newPrice - btcPrice)
        }
        setBtcPrice(newPrice)
      } catch (error) {
        toast({
          title: 'Error fetching BTC price',
          description: 'Could not fetch the latest BTC price. Please try again later.',
          variant: 'destructive',
        })
      }
    }

    fetchBTCPrice()
    const interval = setInterval(fetchBTCPrice, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [toast, btcPrice])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="space-y-6"
      >
        <motion.div variants={item}>
          <h1 className="text-3xl font-bold">Market Overview</h1>
          <p className="text-muted-foreground">Track real-time cryptocurrency prices and market trends</p>
        </motion.div>

        <motion.div variants={item}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bitcoin Price</CardTitle>
                <Bitcoin className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {btcPrice ? `$${btcPrice.toLocaleString()}` : 'Loading...'}
                </div>
                {priceChange !== 0 && (
                  <div className={`flex items-center text-sm ${priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {priceChange > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                    ${Math.abs(priceChange).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Market Cap</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {btcPrice ? `$${(btcPrice * 19500000).toLocaleString()}` : 'Loading...'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on circulating supply
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div variants={item} className="grid gap-4 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>BTC/USD Chart</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full h-[400px] rounded-lg overflow-hidden">
                <iframe
                  src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76683&symbol=BTCUSD&interval=D&hidesidetoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=exchange"
                  style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                  }}
                  allowtransparency="true"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Market Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fear & Greed Index</span>
                  <span className="text-yellow-500 font-bold">75</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Current market sentiment is showing strong greed levels
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CryptoDashboard