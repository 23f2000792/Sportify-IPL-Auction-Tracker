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
