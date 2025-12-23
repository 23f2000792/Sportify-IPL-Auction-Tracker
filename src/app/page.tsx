import AuctionDashboard from '@/components/auction/AuctionDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-primary">
          IPL Auction Command Center
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Live Dashboard & Rulebook Portal for the Sportify IPL Auction
        </p>
      </div>

      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Rocket className="h-6 w-6 text-primary" />
            <CardTitle className="text-2xl font-bold">Live Standings</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <AuctionDashboard />
        </CardContent>
      </Card>
    </div>
  );
}
