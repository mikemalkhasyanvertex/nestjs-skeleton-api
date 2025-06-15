import { Module } from '@nestjs/common';
import { SoccerMatchesService } from './soccer-matches.service';
import { SoccerMatchesController } from './soccer-matches.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [SoccerMatchesController],
  providers: [SoccerMatchesService],
})
export class SoccerMatchesModule {}
