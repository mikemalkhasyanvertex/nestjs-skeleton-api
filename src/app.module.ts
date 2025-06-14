import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/environment/env.validation';
import { SoccerMatchesModule } from './soccer-matches/soccer-matches.module';
import { LoggerModule } from './logger/logger.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./environment/.env.${process.env.NODE_ENV}`,
      validate,
    }),
    SoccerMatchesModule,
    LoggerModule,
    HealthModule,
  ],
  providers: [],
})
export class AppModule {}
