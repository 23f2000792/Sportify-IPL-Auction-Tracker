import AuctionDashboard from '@/components/auction/AuctionDashboard';

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

      <AuctionDashboard />
    </div>
  );
}
