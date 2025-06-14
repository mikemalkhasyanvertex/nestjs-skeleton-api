import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {validate} from "./common/environment/env.validation";
import { SoccerMatchesModule } from './soccer-matches/soccer-matches.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./environment/.env.${process.env.NODE_ENV}`,
      validate,
    }),
    SoccerMatchesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
