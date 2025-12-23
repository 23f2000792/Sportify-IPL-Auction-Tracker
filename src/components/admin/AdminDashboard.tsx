'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useFirestoreCollection } from '@/lib/hooks';
import { useAuth } from '@/components/auth/AuthProvider';
import { House } from '@/types';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { Edit, LogOut, BrainCircuit } from 'lucide-react';

const LoadingSkeleton = () => (
  <TableBody>
    {Array.from({ length: 5 }).map((_, i) => (
      <TableRow key={i}>
        <TableCell>
          <Skeleton className="h-5 w-24" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-5 w-12" />
        </TableCell>
        <TableCell>
          <Skeleton className="h-8 w-20" />
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { data: houses, loading, error } = useFirestoreCollection<House>('houses', 'rank');

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline">Admin Control Panel</h1>
          <p className="text-muted-foreground">
            {user ? `Logged in as ${user.email}` : 'Manage auction data'}
          </p>
        </div>
        <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href="/admin/rank-adjuster">
                <BrainCircuit className="mr-2 h-4 w-4" />
                AI Rank Adjuster
              </Link>
            </Button>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>House</TableHead>
              <TableHead className="text-right">Rank</TableHead>
              <TableHead className="text-right">Points</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={4} className="text-center text-destructive">
                  Error: {error.message}
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {houses.map((house) => (
                <TableRow key={house.id}>
                  <TableCell className="font-medium">{house.name}</TableCell>
                  <TableCell className="text-right">{house.rank}</TableCell>
                  <TableCell className="text-right">{house.totalPoints}</TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm">
                      <Link href={`/admin/edit/${house.id}`}>
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
}
