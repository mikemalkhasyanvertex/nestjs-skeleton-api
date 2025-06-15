import { Controller, Get } from '@nestjs/common';
import { SoccerMatchesService } from './soccer-matches.service';

@Controller('soccer-matches')
export class SoccerMatchesController {
  constructor(private readonly soccerMatchesService: SoccerMatchesService) {}
}
