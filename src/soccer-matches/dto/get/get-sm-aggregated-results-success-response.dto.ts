import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { SOCCER_MATCHES_ACTION_STATUS } from '../../messages/soccer-matches-action-status.enum';
import { ISoccerMatchesAggregatedResult } from '../../interfaces/soccer-matches';

export class GetSmAggregatedResultsSuccessResponseDto {
  @ApiProperty({
    example: HttpStatus.OK,
  })
  status: number;
  @ApiProperty({
    example: SOCCER_MATCHES_ACTION_STATUS.GET_SM_AGGREGATED_RESULTS_SUCCESS,
  })
  message: string;
  @ApiProperty({
    example: {
      mostWin: {
        team: 'Togo',
        amount: 18,
        score: 10,
      },
      mostScoredPerGame: {
        team: 'Nigeria',
        amount: 10,
      },
      lessReceivedPerGame: {
        team: 'Egypt',
        amount: 3,
      },
    },
  })
  data: ISoccerMatchesAggregatedResult;
  @ApiProperty({ example: null, nullable: true })
  error: string;
}
