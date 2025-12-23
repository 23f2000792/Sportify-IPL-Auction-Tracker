export type EligibilityStatus = 'VALID SQUAD' | 'IN PROGRESS' | 'INVALID';

export type BudgetStatus = 'UNDER' | 'OVER' | 'FULL';

export interface Squad {
  batsmen: number;
  bowlers: number;
  wicketKeepers: number;
  allRounders: number;
  uncapped: number;
  total: number;
}

export interface House {
  id: string;
  name: string;
  logoUrl: string;
  initialBudget: number;
  moneySpent: number;
  eligibilityStatus: EligibilityStatus;
  budgetStatus: BudgetStatus;
  totalPoints: number;
  rank: number;
  squad: Squad;
}

export type HouseDataForRanker = Omit<House, "id" | "logoUrl" | "initialBudget" | "squad" | "budgetStatus"> & {
  budgetUsedPercent: number;
}
export interface RankAdjustmentSuggestion {
  houseName: string;
  suggestedRank: number;
  reason: string;
}
