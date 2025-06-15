import {
  Controller,
  Get,
  HttpStatus,
  Query,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { SoccerMatchesService } from './soccer-matches.service';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LoggingInterceptor } from '../common/interceptors/logging.interceptor';
import { APICommonResponse } from '../common/interfaces/api-common-response.interface';
import { SOCCER_MATCHES_ACTION_STATUS } from './messages/soccer-matches-action-status.enum';
import { ISoccerMatchesAggregatedResult } from './interfaces/soccer-matches';
import {
  GetSMAggregatedResultsByQueryParams,
  GetSmAggregatedResultsInternalErrorResponseDto,
  GetSmAggregatedResultsSuccessResponseDto
} from "./dto";

@ApiTags('Soccer Matches')
@UseInterceptors(LoggingInterceptor)
@Controller('soccer-matches')
export class SoccerMatchesController {
  constructor(private readonly soccerMatchesService: SoccerMatchesService) {}

  @ApiOkResponse({
    type: GetSmAggregatedResultsSuccessResponseDto,
  })
  @ApiInternalServerErrorResponse({
    type: GetSmAggregatedResultsInternalErrorResponseDto,
  })
  @ApiOperation({
    summary: 'Get Soccer Matches Aggregated result',
  })
  @Get('aggregate/v1')
  async getSMAggregatedResult(
    @Query(new ValidationPipe({ transform: true }))
    queryParams: GetSMAggregatedResultsByQueryParams,
  ): Promise<APICommonResponse<ISoccerMatchesAggregatedResult>> {
    const { tournaments } = queryParams;
    const [matches2000Result, matches2001Result] =
      await this.soccerMatchesService.getAllMatchesResult();

    // All matches result
    let matchesResult = [...matches2000Result, ...matches2001Result];

    // Filter out only matches with tournaments requested by the user
    if (tournaments && tournaments.length) {
      matchesResult = matchesResult.filter((match) =>
        tournaments.includes(match.tournament),
      );
    }

    // Aggregated matches result
    const aggregatedResult =
      this.soccerMatchesService.calculateTotalWins(matchesResult);

    return {
      status: HttpStatus.OK,
      message: SOCCER_MATCHES_ACTION_STATUS.GET_SM_AGGREGATED_RESULTS_SUCCESS,
      data: aggregatedResult,
      error: null,
    };
  }
}
