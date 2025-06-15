import { Module } from '@nestjs/common';
import { SoccerMatchesService } from './soccer-matches.service';
import { SoccerMatchesController } from './soccer-matches.controller';

@Module({
  controllers: [SoccerMatchesController],
  providers: [SoccerMatchesService],
})
export class SoccerMatchesModule {}
