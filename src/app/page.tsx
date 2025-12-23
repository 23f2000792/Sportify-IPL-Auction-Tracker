import AuctionDashboard from '@/components/auction/AuctionDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-center font-headline md:text-4xl">
        Live Auction Dashboard
      </h1>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>House Standings</CardTitle>
        </CardHeader>
        <CardContent>
          <AuctionDashboard />
        </CardContent>
      </Card>
    </div>
  );
}
