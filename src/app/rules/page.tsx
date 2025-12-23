import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel } from 'lucide-react';

export default function RulesPage() {
  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-8">
      <h1 className="mb-8 text-center text-3xl font-extrabold tracking-tight font-headline md:text-5xl">
        Official Rulebook
      </h1>

      <Card className="shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Gavel className="h-8 w-8 text-primary" />
            <CardTitle className="text-2xl">IPL Auction Showdown Rules</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full aspect-[4/3]">
            <iframe
              src="https://docs.google.com/document/d/e/2PACX-1vTFSTB6Dmt7qAZ_cizkhmIk537kvuRBeBPHGkZodVXUvg_728GOjTy4yM_QRCUCftfmLPLm3HqFWFVf/pub?embedded=true"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
