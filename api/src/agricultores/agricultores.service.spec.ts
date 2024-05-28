import { Test, TestingModule } from '@nestjs/testing';
import { AgricultoresService } from './agricultores.service';

describe('AgricultoresService', () => {
  let service: AgricultoresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgricultoresService],
    }).compile();

    service = module.get<AgricultoresService>(AgricultoresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
