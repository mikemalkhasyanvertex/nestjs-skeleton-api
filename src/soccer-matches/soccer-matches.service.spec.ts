import { Test, TestingModule } from '@nestjs/testing';
import { SoccerMatchesService } from './soccer-matches.service';

describe('SoccerMatchesService', () => {
  let service: SoccerMatchesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SoccerMatchesService],
    }).compile();

    service = module.get<SoccerMatchesService>(SoccerMatchesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
