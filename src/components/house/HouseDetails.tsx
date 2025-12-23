'use client';
import Image from 'next/image';
import { useFirestoreDocument } from '@/lib/hooks';
import { House, Squad } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import {
  Banknote,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  Users,
  Target,
} from 'lucide-react';

const formatCurrency = (value: number) => `₹${value.toFixed(2)} Cr`;

const LoadingSkeleton = () => (
  <div>
    <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
      <Skeleton className="h-32 w-32 rounded-full" />
      <div className="text-center md:text-left">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-8 w-48" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-5 w-full" />
        </CardContent>
      </Card>
    </div>
  </div>
);

const ValidityStatus = ({ status }: { status: House['eligibilityStatus'] }) => {
  const Icon = status === 'VALID SQUAD' ? ShieldCheck : status === 'INVALID' ? ShieldX : ShieldAlert;
  const color = status === 'VALID SQUAD' ? 'text-green-600' : status === 'INVALID' ? 'text-red-600' : 'text-yellow-600';
  
  return (
    <div className="flex items-center gap-2">
      <Icon className={cn('h-8 w-8', color)} />
      <span className={cn('text-xl font-semibold', color)}>{status}</span>
    </div>
  );
};

export default function HouseDetails({ houseId }: { houseId: string }) {
  const { data: house, loading, error } = useFirestoreDocument<House>(`houses/${houseId}`);

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-destructive">Error: {error.message}</p>;
  if (!house) return <p>House not found.</p>;

  const moneyRemaining = house.initialBudget - house.moneySpent;
  const budgetUsedPercent = (house.moneySpent / house.initialBudget) * 100;

  const squadRoles = [
    { name: 'Batsmen', count: house.squad.batsmen, icon: <Target className="h-5 w-5 text-primary" /> },
    { name: 'Bowlers', count: house.squad.bowlers, icon: <Target className="h-5 w-5 text-primary" /> },
    { name: 'Wicket Keepers', count: house.squad.wicketKeepers, icon: <Target className="h-5 w-5 text-primary" /> },
    { name: 'All-Rounders', count: house.squad.allRounders, icon: <Target className="h-5 w-5 text-primary" /> },
    { name: 'Uncapped', count: house.squad.uncapped, icon: <Users className="h-5 w-5 text-primary" /> },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-lg bg-card p-6 shadow-md">
        <div className="flex items-center gap-6">
          <Image
            src={house.logoUrl}
            alt={`${house.name} Logo`}
            width={100}
            height={100}
            className="rounded-full border-4 border-primary"
            data-ai-hint="logo"
          />
          <div>
            <h1 className="text-4xl font-extrabold font-headline tracking-tight">{house.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-muted-foreground">
              <Badge variant="outline">Rank: <span className="font-bold ml-1">{house.rank}</span></Badge>
              <Badge variant="outline">Points: <span className="font-bold ml-1">{house.totalPoints}</span></Badge>
            </div>
          </div>
        </div>
        <ValidityStatus status={house.eligibilityStatus} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-6 w-6 text-primary" />
              Budget Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-muted-foreground mb-1">
                <span>Spent</span>
                <span>Initial</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>{formatCurrency(house.moneySpent)}</span>
                <span>{formatCurrency(house.initialBudget)}</span>
              </div>
            </div>
            <Progress value={budgetUsedPercent} />
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="font-bold text-2xl text-green-600">
                {formatCurrency(moneyRemaining)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Squad Composition
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {squadRoles.map((role) => (
                <div key={role.name} className="flex items-center gap-3 bg-muted/50 p-3 rounded-md">
                  {role.icon}
                  <div>
                    <p className="text-sm text-muted-foreground">{role.name}</p>
                    <p className="text-xl font-bold">{role.count}</p>
                  </div>
                </div>
              ))}
               <div className="flex items-center gap-3 bg-primary/10 p-3 rounded-md col-span-2 md:col-span-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-primary/80">Total Players</p>
                    <p className="text-xl font-bold text-primary">{house.squad.total}</p>
                  </div>
                </div>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <p>Remaining Requirements: [Data from backend]</p>
              <p>Playing XI Feasibility: [Data from backend]</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
