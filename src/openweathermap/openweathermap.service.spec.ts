import { Test, TestingModule } from '@nestjs/testing';
import { OpenweathermapService } from './openweathermap.service';

describe('OpenweathermapService', () => {
  let service: OpenweathermapService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpenweathermapService],
    }).compile();

    service = module.get<OpenweathermapService>(OpenweathermapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
