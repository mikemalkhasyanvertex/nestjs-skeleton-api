import { Test, TestingModule } from '@nestjs/testing';
import { SoccerMatchesService } from './soccer-matches.service';
import {
  ISoccerMatchesAggregatedResult,
  ISoccerMatchesResult,
} from './interfaces/soccer-matches';
import { TOURNAMENTS } from './dto/get/get-sm-aggregated-results-by-query-params.dto';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

// Mock HttpService and ConfigService methods
const mockHttpService = {
  get: jest.fn(),
  post: jest.fn(),
};
const mockConfigService = {
  get: jest.fn(),
};

describe('calculateTotalWins', () => {
  let service: SoccerMatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SoccerMatchesService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SoccerMatchesService>(SoccerMatchesService);
  });

  const testCases: Array<{
    description: string;
    input: ISoccerMatchesResult[];
    expected: ISoccerMatchesAggregatedResult;
  }> = [
    {
      description: 'Test with a single match where home team wins',
      input: [
        {
          date: '2000-01-04',
          country: 'Egypt',
          homeScore: 2,
          awayTeam: 'Togo',
          awayScore: 1,
          city: 'Aswan',
          homeTeam: 'Egypt',
          tournament: 'Friendly' as TOURNAMENTS,
        },
      ],
      expected: {
        mostWin: { team: 'Egypt', amount: 1, score: 2 },
        mostScoredPerGame: { team: 'Egypt', amount: 2 },
        lessReceivedPerGame: { team: 'Egypt', amount: 1 },
      },
    },
    {
      description: 'Test with multiple matches where wins the team who scored the most',
      input: [
        {
          date: '2000-01-07',
          country: 'Tunisia',
          homeScore: 7,
          awayTeam: 'Togo',
          awayScore: 0,
          city: 'Tunis',
          homeTeam: 'Tunisia',
          tournament: 'Friendly' as TOURNAMENTS,
        },
        {
          date: '2000-01-09',
          country: 'Ivory Coast',
          homeScore: 2,
          awayTeam: 'Egypt',
          awayScore: 0,
          city: 'Abidjan',
          homeTeam: 'Ivory Coast',
          tournament: 'Friendly' as TOURNAMENTS,
        },
      ],
      expected: {
        mostWin: { team: 'Tunisia', amount: 1, score: 7 },
        mostScoredPerGame: { team: 'Tunisia', amount: 7 },
        lessReceivedPerGame: { team: 'Tunisia', amount: 0 },
      },
    },
    {
      description: 'Test with a draw match',
      input: [
        {
          date: '2000-01-08',
          country: 'Trinidad and Tobago',
          homeScore: 0,
          awayTeam: 'Canada',
          awayScore: 0,
          city: 'Port of Spain',
          homeTeam: 'Trinidad and Tobago',
          tournament: 'Friendly' as TOURNAMENTS,
        },
      ],
      expected: {
        mostWin: { team: '', amount: 0, score: 0 },
        mostScoredPerGame: { team: '', amount: 0 },
        lessReceivedPerGame: { team: 'Trinidad and Tobago', amount: 0 },
      },
    },
    {
      description: 'Test with no matches',
      input: [],
      expected: {
        mostWin: { team: '', amount: 0, score: 0 },
        mostScoredPerGame: { team: '', amount: 0 },
        lessReceivedPerGame: { team: '', amount: Infinity },
      },
    },
    {
      description: 'Test with one team dominating',
      input: [
        {
          date: '2023-01-01',
          country: 'CountryA',
          homeScore: 5,
          awayTeam: 'TeamB',
          awayScore: 0,
          city: 'CityA',
          homeTeam: 'TeamA',
          tournament: 'Friendly' as TOURNAMENTS,
        },
        {
          date: '2023-01-02',
          country: 'CountryB',
          homeScore: 0,
          awayTeam: 'TeamA',
          awayScore: 4,
          city: 'CityB',
          homeTeam: 'TeamB',
          tournament: 'Friendly' as TOURNAMENTS,
        },
        {
          date: '2023-01-03',
          country: 'CountryC',
          homeScore: 1,
          awayTeam: 'TeamA',
          awayScore: 6,
          city: 'CityC',
          homeTeam: 'TeamC',
          tournament: 'Friendly' as TOURNAMENTS,
        },
      ],
      expected: {
        mostWin: { team: 'TeamA', amount: 3, score: 15 },
        mostScoredPerGame: { team: 'TeamA', amount: 5 },
        lessReceivedPerGame: { team: 'TeamA', amount: 0.3333333333333333 },
      },
    },
  ];

  testCases.forEach(({ description, input, expected }) => {
    test(description, () => {
      const result = service.calculateTotalWins(input);
      expect(result).toEqual(expected);
    });
  });
});
