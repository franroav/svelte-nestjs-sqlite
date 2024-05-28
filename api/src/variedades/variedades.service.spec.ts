import { Test, TestingModule } from '@nestjs/testing';
import { VariedadesService } from './variedades.service';

describe('VariedadesService', () => {
  let service: VariedadesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VariedadesService],
    }).compile();

    service = module.get<VariedadesService>(VariedadesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
