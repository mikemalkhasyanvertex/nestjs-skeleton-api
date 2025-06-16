import { TOURNAMENTS } from '../dto/get/get-sm-aggregated-results-by-query-params.dto';

export interface IAggregatedValues {
  team: string;
  amount: number;
  score?: number
}

export interface ISoccerMatchesAggregatedResult {
  mostWin: IAggregatedValues;
  mostScoredPerGame: IAggregatedValues;
  lessReceivedPerGame: IAggregatedValues;
}

export interface ISoccerMatchesResult {
  date?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  tournament: TOURNAMENTS;
  city: string;
  country: string;
}
