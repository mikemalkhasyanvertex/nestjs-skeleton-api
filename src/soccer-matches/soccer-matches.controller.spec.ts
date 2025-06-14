import { Test, TestingModule } from '@nestjs/testing';
import { SoccerMatchesController } from './soccer-matches.controller';
import { SoccerMatchesService } from './soccer-matches.service';

describe('SoccerMatchesController', () => {
  let controller: SoccerMatchesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SoccerMatchesController],
      providers: [SoccerMatchesService],
    }).compile();

    controller = module.get<SoccerMatchesController>(SoccerMatchesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
