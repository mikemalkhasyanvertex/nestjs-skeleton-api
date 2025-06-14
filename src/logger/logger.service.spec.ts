import { Test, TestingModule } from '@nestjs/testing';
import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let provider: LoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoggerService],
    }).compile();

    provider = module.get<LoggerService>(LoggerService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
