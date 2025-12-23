import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export default function PlayersPage() {
  return (
    <div className="container mx-auto max-w-7xl p-4 md:p-8">
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight font-headline md:text-5xl">
        Main Player Sheet
      </h1>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">Player List</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full aspect-video">
            <iframe
              src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSG0vAJ870WfhdjQAFJepO76r_JubLbJC3oSWA518KWniDQHs1cpBaBzVuMNnOAKoLaT-mxW39slJDL/pubhtml?gid=444812202&single=true&widget=true&headers=false"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
