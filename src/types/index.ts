export type EligibilityStatus = 'VALID SQUAD' | 'IN PROGRESS' | 'INVALID';

export interface Squad {
  batsmen: number;
  bowlers: number;
  wicketKeepers: number;
  allRounders: number;
  uncapped: number;
}

export interface House {
  id: string;
  name: string;
  logoUrl: string;
  initialBudget: number;
  moneySpent: number;
  eligibilityStatus: EligibilityStatus;
  totalPoints: number;
  rank: number;
  squad: Squad;
}

export type HouseDataForRanker = Omit<House, "id" | "logoUrl" | "initialBudget" | "squad"> & {
  budgetUsedPercent: number;
}
export interface RankAdjustmentSuggestion {
  houseName: string;
  suggestedRank: number;
  reason: string;
}
