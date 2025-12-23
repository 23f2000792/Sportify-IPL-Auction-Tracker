'use server';

/**
 * @fileOverview An AI-powered tool that suggests potential ranking adjustments based on eligibility, point totals, and moderator input.
 *
 * - suggestRankAdjustments - A function that takes house data and moderator input to suggest ranking adjustments.
 * - SuggestRankAdjustmentsInput - The input type for the suggestRankAdjustments function.
 * - SuggestRankAdjustmentsOutput - The return type for the suggestRankAdjustments function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRankAdjustmentsInputSchema = z.object({
  houses: z.array(
    z.object({
      name: z.string().describe('The name of the house.'),
      eligibilityStatus: z
        .string()
        .describe(
          'The eligibility status of the house (e.g., VALID SQUAD, IN PROGRESS, INVALID).'
        ),
      totalPoints: z.number().describe('The total points of the house.'),
      rank: z.number().describe('The current rank of the house.'),
      budgetUsedPercent: z
        .number()
        .describe('The percentage of the budget used by the house'),
    })
  ).describe('An array of house data containing their name, eligibility, points, and current rank.'),
  moderatorInput: z
    .string()
    .describe(
      'Any additional input from the moderator regarding the houses or their rankings.'
    ),
});
export type SuggestRankAdjustmentsInput = z.infer<
  typeof SuggestRankAdjustmentsInputSchema
>;

const SuggestRankAdjustmentsOutputSchema = z.array(
  z.object({
    houseName: z.string().describe('The name of the house.'),
    suggestedRank: z
      .number()
      .describe('The suggested rank adjustment for the house.'),
    reason: z.string().describe('The reasoning behind the suggested adjustment.'),
  })
);
export type SuggestRankAdjustmentsOutput = z.infer<
  typeof SuggestRankAdjustmentsOutputSchema
>;

export async function suggestRankAdjustments(
  input: SuggestRankAdjustmentsInput
): Promise<SuggestRankAdjustmentsOutput> {
  return suggestRankAdjustmentsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRankAdjustmentsPrompt',
  input: {schema: SuggestRankAdjustmentsInputSchema},
  output: {schema: SuggestRankAdjustmentsOutputSchema},
  prompt: `You are an AI assistant that suggests rank adjustments for houses in a competition based on their eligibility, points, current rank and moderator input.

  Analyze the following house data and moderator input to suggest potential ranking adjustments. Provide a suggested rank adjustment and a reason for each house.

  Houses Data:
  {{#each houses}}
  - House Name: {{this.name}}
    - Eligibility Status: {{this.eligibilityStatus}}
    - Total Points: {{this.totalPoints}}
    - Current Rank: {{this.rank}}
    - Budget Used: {{this.budgetUsedPercent}}%
  {{/each}}

  Moderator Input: {{{moderatorInput}}}

  Based on the above information, suggest rank adjustments for each house. Consider factors such as eligibility, point totals, and any specific instructions from the moderator.

  Output format: array of JSON objects, each representing a house and its suggested rank adjustment.
  {
    houseName: string, // The name of the house
    suggestedRank: number, // The suggested rank adjustment for the house
    reason: string // The reasoning behind the suggested adjustment
  }
`,
});

const suggestRankAdjustmentsFlow = ai.defineFlow(
  {
    name: 'suggestRankAdjustmentsFlow',
    inputSchema: SuggestRankAdjustmentsInputSchema,
    outputSchema: SuggestRankAdjustmentsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
