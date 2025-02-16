import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from './ui/use-toast';

const CryptoDashboard = () => {
  const [btcPrice, setBtcPrice] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBTCPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        setBtcPrice(data.bitcoin.usd);
      } catch (error) {
        toast({
          title: "Error fetching BTC price",
          description: "Could not fetch the latest BTC price. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchBTCPrice();
    const interval = setInterval(fetchBTCPrice, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [toast]);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-6">Crypto Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Bitcoin Price (USD)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {btcPrice ? `$${btcPrice.toLocaleString()}` : 'Loading...'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>BTC/USD Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[400px]">
              <iframe
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76683&symbol=BTCUSD&interval=D&hidesidetoolbar=1&symboledit=1"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                }}
                allowTransparency
                allowFullScreen
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CryptoDashboard;