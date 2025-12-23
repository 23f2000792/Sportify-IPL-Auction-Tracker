'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useFirestoreCollection } from '@/lib/hooks';
import { House, RankAdjustmentSuggestion, HouseDataForRanker } from '@/types';
import { suggestRankAdjustments } from '@/ai/flows/live-rank-adjustment-tool';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, BrainCircuit, Bot, Lightbulb, Loader2 } from 'lucide-react';

export default function RankAdjuster() {
  const { data: houses, loading: housesLoading, error: housesError } = useFirestoreCollection<House>('houses');
  const [moderatorInput, setModeratorInput] = useState('');
  const [suggestions, setSuggestions] = useState<RankAdjustmentSuggestion[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState<string | null>(null);

  const handleSuggest = async () => {
    if (!houses || houses.length === 0) return;

    setLoadingSuggestions(true);
    setSuggestionError(null);
    setSuggestions([]);

    try {
      const housesForRanker: HouseDataForRanker[] = houses.map(h => ({
        name: h.name,
        eligibilityStatus: h.eligibilityStatus,
        totalPoints: h.totalPoints,
        rank: h.rank,
        budgetUsedPercent: (h.moneySpent / h.initialBudget) * 100,
      }));

      const result = await suggestRankAdjustments({
        houses: housesForRanker,
        moderatorInput,
      });
      setSuggestions(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
      setSuggestionError(message);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="outline" size="icon">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold font-headline">AI Rank Adjustment Tool</h1>
          <p className="text-muted-foreground">Get AI-powered suggestions for rank adjustments.</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Current House Data</h3>
              {housesLoading && <Skeleton className="h-20 w-full" />}
              {housesError && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{housesError.message}</AlertDescription></Alert>}
              {houses && (
                <div className="max-h-60 overflow-y-auto rounded-md border p-2 text-sm bg-muted">
                    <pre className="whitespace-pre-wrap">{JSON.stringify(houses.map(h => ({name: h.name, rank: h.rank, points: h.totalPoints, eligibility: h.eligibilityStatus})), null, 2)}</pre>
                </div>
              )}
            </div>
            <div>
              <label htmlFor="moderator-input" className="font-semibold mb-2 block">Moderator Input</label>
              <Textarea
                id="moderator-input"
                placeholder="e.g., 'Consider boosting teams with strong uncapped players.' or 'Penalize teams exceeding budget.'"
                value={moderatorInput}
                onChange={(e) => setModeratorInput(e.target.value)}
                className="min-h-[120px]"
              />
            </div>
            <Button onClick={handleSuggest} disabled={housesLoading || loadingSuggestions}>
              {loadingSuggestions ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <BrainCircuit className="mr-2 h-4 w-4" />}
              Suggest Adjustments
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot className="h-6 w-6 text-primary"/> AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingSuggestions && (
                <div className="space-y-2">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-8 w-full" />
                </div>
            )}
            {suggestionError && <Alert variant="destructive"><AlertTitle>Error</AlertTitle><AlertDescription>{suggestionError}</AlertDescription></Alert>}
            {!loadingSuggestions && suggestions.length === 0 && !suggestionError && (
                <div className="text-center text-muted-foreground py-10">
                    <Lightbulb className="mx-auto h-12 w-12 mb-4" />
                    <p>Suggestions will appear here after analysis.</p>
                </div>
            )}
            {suggestions.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>House</TableHead>
                    <TableHead>Suggested Rank</TableHead>
                    <TableHead>Reason</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suggestions.map((s, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">{s.houseName}</TableCell>
                      <TableCell className="font-bold text-lg text-primary">{s.suggestedRank}</TableCell>
                      <TableCell className="text-sm">{s.reason}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
