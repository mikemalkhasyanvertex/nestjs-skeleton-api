import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ISoccerMatchesAggregatedResult,
  ISoccerMatchesResult,
} from './interfaces/soccer-matches';
import { firstValueFrom } from 'rxjs';
import { exceptionHandler } from '../common/utils/request-exception-filter';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SoccerMatchesService {
  private readonly matchesInEndpoint2000: string;
  private readonly matchesInEndpoint2001: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.matchesInEndpoint2000 = this.configService.get(
      'MATCHES_IN_2000_ENDPOINT',
    ) as string;

    this.matchesInEndpoint2001 = this.configService.get(
      'MATCHES_IN_2001_ENDPOINT',
    ) as string;
  }

  /**
   * Make GET HTTP request to fetch data
   * @param endpoint
   */
  async getMatchesResults(endpoint: string): Promise<ISoccerMatchesResult[]> {
    try {
      const { data } = await firstValueFrom(this.httpService.get(endpoint));

      return data;
    } catch (e) {
      exceptionHandler(e);
      return [];
    }
  }

  /**
   * Return all soccer matches results from 2000 & 2001
   */
  async getAllMatchesResult(): Promise<Awaited<ISoccerMatchesResult[]>[]> {
    const matches2000Req = this.getMatchesResults(this.matchesInEndpoint2000);
    const matches2001Req = this.getMatchesResults(this.matchesInEndpoint2001);

    return Promise.all([matches2000Req, matches2001Req]);
  }

  /**
   * Build the aggregated result of the soccer matches
   * @param matchesResults
   */
  calculateTotalWins(
    matchesResults: ISoccerMatchesResult[],
  ): ISoccerMatchesAggregatedResult {
    // Initialize variables to store aggregated results
    const teamStats: {
      [teamName: string]: {
        gamesCount: number;
        scoredCount: number;
        receivedCount: number;
        winsCount: number;
      };
    } = {};

    // Process each match and collect stats by team
    for (let match of matchesResults) {
      const { homeTeam, awayTeam, homeScore, awayScore } = match;

      // Collect stats for the home team
      if (!teamStats[homeTeam]) {
        teamStats[homeTeam] = {
          winsCount: 0,
          scoredCount: 0,
          receivedCount: 0,
          gamesCount: 0,
        };
      }
      teamStats[homeTeam].gamesCount++;
      teamStats[homeTeam].scoredCount += homeScore;
      teamStats[homeTeam].receivedCount += awayScore;
      if (homeScore > awayScore) {
        teamStats[homeTeam].winsCount++;
      }

      // Collect stats for the away team
      if (!teamStats[awayTeam]) {
        teamStats[awayTeam] = {
          winsCount: 0,
          scoredCount: 0,
          receivedCount: 0,
          gamesCount: 0,
        };
      }
      teamStats[awayTeam].gamesCount++;
      teamStats[awayTeam].scoredCount += awayScore;
      teamStats[awayTeam].receivedCount += homeScore;
      if (awayScore > homeScore) {
        teamStats[awayTeam].winsCount++;
      }
    }

    // Define default state results
    let mostWin = { team: '', amount: 0 };
    let mostScoredPerGame = { team: '', amount: 0 };
    let lessReceivedPerGame = { team: '', amount: Infinity };

    // Calculate results
    for (let [team, stats] of Object.entries(teamStats)) {
      const scoredPerGame = stats.scoredCount / stats.gamesCount;
      const receivedPerGame = stats.receivedCount / stats.gamesCount;

      if (stats.winsCount > mostWin.amount) {
        mostWin = { team, amount: stats.winsCount };
      }
      if (scoredPerGame > mostScoredPerGame.amount) {
        mostScoredPerGame = { team, amount: scoredPerGame };
      }
      if (receivedPerGame < lessReceivedPerGame.amount) {
        lessReceivedPerGame = { team, amount: receivedPerGame };
      }
    }

    return {
      mostWin,
      mostScoredPerGame,
      lessReceivedPerGame,
    };
  }
}
