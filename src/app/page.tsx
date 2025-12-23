import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center h-[calc(100vh-10rem)]">
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-headline text-primary">
          IPL Auction Command Center
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Rulebook Portal & Player Directory for the Sportify IPL Auction
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild size="lg">
          <Link href="/players">
            <Users className="mr-2" /> View Player Sheet
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/rules">
            <Shield className="mr-2" /> Read the Rulebook
          </Link>
        </Button>
      </div>
    </div>
  );
}
