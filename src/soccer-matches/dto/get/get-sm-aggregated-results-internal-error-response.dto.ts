import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';
import { SOCCER_MATCHES_ACTION_STATUS } from '../../messages/soccer-matches-action-status.enum';
import { ISoccerMatchesAggregatedResult } from '../../interfaces/soccer-matches';

export class GetSmAggregatedResultsInternalErrorResponseDto {
  @ApiProperty({
    example: HttpStatus.INTERNAL_SERVER_ERROR,
  })
  status: number;
  @ApiProperty({
    example:
      SOCCER_MATCHES_ACTION_STATUS.GET_SM_AGGREGATED_RESULTS_INTERNAL_ERROR,
  })
  message: string;
  @ApiProperty({
    example: null,
  })
  data: ISoccerMatchesAggregatedResult;
  @ApiProperty({
    example: 'Internal server error',
    nullable: true,
  })
  error: string;
}
