'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useFirestoreDocument } from '@/lib/hooks';
import { House, EligibilityStatus } from '@/types';
import { updateHouseData } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Loader2 } from 'lucide-react';

const eligibilityStatuses: EligibilityStatus[] = ['VALID SQUAD', 'IN PROGRESS', 'INVALID'];

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  initialBudget: z.coerce.number().min(0),
  moneySpent: z.coerce.number().min(0),
  totalPoints: z.coerce.number().min(0),
  rank: z.coerce.number().min(1),
  eligibilityStatus: z.enum(eligibilityStatuses),
  squad: z.object({
    batsmen: z.coerce.number().min(0),
    bowlers: z.coerce.number().min(0),
    wicketKeepers: z.coerce.number().min(0),
    allRounders: z.coerce.number().min(0),
    uncapped: z.coerce.number().min(0),
  }),
});

const LoadingSkeleton = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-8 w-1/2" />
    </CardHeader>
    <CardContent className="space-y-4">
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-10 w-full" />
    </CardContent>
    <CardFooter>
      <Skeleton className="h-10 w-24" />
    </CardFooter>
  </Card>
);

export default function EditHouseForm({ houseId }: { houseId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: house, loading, error } = useFirestoreDocument<House>(`houses/${houseId}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    if (house) {
      form.reset(house);
    }
  }, [house, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    const result = await updateHouseData(houseId, values);
    if (result.success) {
      router.push('/admin');
    } else {
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: result.message,
      });
    }
    setIsSubmitting(false);
  }

  if (loading) return <LoadingSkeleton />;
  if (error) return <p className="text-destructive">Error: {error.message}</p>;
  if (!house) return <p>House not found.</p>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <Button asChild variant="outline" size="icon">
                <Link href="/admin">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <CardTitle className="text-2xl font-bold font-headline">Edit {house.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>House Name</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="rank" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Rank</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="totalPoints" control={form.control} render={({ field }) => (
                  <FormItem><FormLabel>Total Points</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="eligibilityStatus" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Eligibility</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                    <SelectContent>{eligibilityStatuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="initialBudget" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Initial Budget (Cr)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField name="moneySpent" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Money Spent (Cr)</FormLabel><FormControl><Input type="number" step="0.01" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            
            <Card>
                <CardHeader><CardTitle>Squad Details</CardTitle></CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <FormField name="squad.batsmen" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Batsmen</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField name="squad.bowlers" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Bowlers</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField name="squad.wicketKeepers" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Wicket Keepers</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField name="squad.allRounders" control={form.control} render={({ field }) => ( <FormItem><FormLabel>All-Rounders</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                    <FormField name="squad.uncapped" control={form.control} render={({ field }) => ( <FormItem><FormLabel>Uncapped</FormLabel><FormControl><Input type="number" {...field} /></FormControl><FormMessage /></FormItem> )} />
                </CardContent>
            </Card>

          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
