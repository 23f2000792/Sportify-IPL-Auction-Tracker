import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gavel, Shield, Star, Users } from 'lucide-react';

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
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Squad Composition Rules
                </div>
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none text-muted-foreground">
                <p>
                  Each team must maintain a squad of a specific size, with a minimum and maximum number of players. The composition must include a set number of Batsmen, Bowlers, Wicket Keepers, All-Rounders, and Uncapped Players as defined by the tournament committee.
                </p>
                <ul>
                  <li>Minimum 18 players, Maximum 25 players.</li>
                  <li>Maximum 8 overseas players.</li>
                  <li>At least 3 batsmen, 3 bowlers, and 1 wicket-keeper must be in the playing XI.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Gavel className="h-5 w-5" />
                  Bidding Rules & Increment Slabs
                </div>
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none text-muted-foreground">
                <p>
                  Bidding for each player starts at their base price. Bids must follow the official increment slabs. The auctioneer's decision is final in all bidding matters.
                </p>
                <p>
                  Increment Slabs:
                </p>
                <ul>
                  <li>Up to 1 Cr: 5 Lakh increments.</li>
                  <li>From 1 Cr to 2 Cr: 10 Lakh increments.</li>
                  <li>Above 2 Cr: 20 Lakh increments.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Points System Explanation
                </div>
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none text-muted-foreground">
                <p>
                  Points are awarded based on various factors including squad balance, player value, and strategic acquisitions. The final point calculation formula will be shared by the moderators. Key performance indicators (KPIs) include budget utilization and squad validity.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="text-lg font-semibold">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Penalties & Dispute Resolution
                </div>
              </AccordionTrigger>
              <AccordionContent className="prose max-w-none text-muted-foreground">
                <p>
                  Failure to adhere to squad composition rules or budget limits will result in penalties, including point deductions. All disputes must be raised with the auction moderators, whose decision will be final and binding. The Sportify Society holds the ultimate authority on all auction-related matters.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
