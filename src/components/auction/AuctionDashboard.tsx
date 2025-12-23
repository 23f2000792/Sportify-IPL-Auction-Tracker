'use client';
import Link from 'next/link';
import Image from 'next/image';
import { House, EligibilityStatus } from '@/types';
import { useFirestoreCollection } from '@/lib/hooks';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Trophy } from 'lucide-react';

const formatCurrency = (value: number) => `₹${value.toFixed(2)} Cr`;

const EligibilityBadge = ({ status }: { status: EligibilityStatus }) => {
  const variant: 'default' | 'destructive' | 'secondary' =
    status === 'VALID SQUAD'
      ? 'default'
      : status === 'INVALID'
      ? 'destructive'
      : 'secondary';
  const colorClass =
    status === 'VALID SQUAD'
      ? 'bg-green-500/20 text-green-700 border-green-500/50'
      : status === 'INVALID'
      ? 'bg-red-500/20 text-red-700 border-red-500/50'
      : 'bg-yellow-500/20 text-yellow-700 border-yellow-500/50';

  return <Badge className={cn('font-semibold', colorClass)}>{status}</Badge>;
};

const LoadingSkeleton = () => (
  <TableBody>
    {Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-6 w-6 rounded-full" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-20" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-28" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-12" />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default function AuctionDashboard() {
  const { data: houses, loading, error } = useFirestoreCollection<House>('houses', 'rank');

  if (error) {
    return <div className="text-destructive">Error loading data: {error.message}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>House</TableHead>
            <TableHead className="text-right">Spent</TableHead>
            <TableHead className="text-right">Remaining</TableHead>
            <TableHead>Budget Used</TableHead>
            <TableHead>Eligibility</TableHead>
            <TableHead className="text-right">Points</TableHead>
            <TableHead className="text-right">Rank</TableHead>
          </TableRow>
        </TableHeader>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <TableBody>
            {houses.map((house) => {
              const moneyRemaining = house.initialBudget - house.moneySpent;
              const budgetUsedPercent = (house.moneySpent / house.initialBudget) * 100;
              return (
                <TableRow key={house.id} className={cn(house.rank === 1 && 'bg-accent/10')}>
                  <TableCell>
                    <Image
                      src={house.logoUrl}
                      alt={`${house.name} logo`}
                      width={24}
                      height={24}
                      className="rounded-full"
                      data-ai-hint="logo"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/house/${house.id}`} className="hover:text-primary hover:underline">
                      {house.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(house.moneySpent)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(moneyRemaining)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={budgetUsedPercent} className="w-24 h-2" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(budgetUsedPercent)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <EligibilityBadge status={house.eligibilityStatus} />
                  </TableCell>
                  <TableCell className="text-right font-semibold">{house.totalPoints}</TableCell>
                  <TableCell className="text-right font-bold text-lg">
                    <div className="flex items-center justify-end gap-1">
                      {house.rank}
                      {house.rank === 1 && <Trophy className="h-5 w-5 text-amber-500" />}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
