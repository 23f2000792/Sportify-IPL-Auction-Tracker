import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
          <CardTitle className="text-2xl font-bold">House Standings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full aspect-video">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSG0vAJ870WfhdjQAFJepO76r_JubLbJC3oSWA518KWniDQHs1cpBaBzVuMNnOAKoLaT-mxW39slJDL/pubhtml?gid=841946199&single=true&widget=true&headers=false"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
