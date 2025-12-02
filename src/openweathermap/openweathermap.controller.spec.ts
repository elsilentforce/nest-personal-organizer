import { Test, TestingModule } from '@nestjs/testing';
import { OpenweathermapController } from './openweathermap.controller';
import { OpenweathermapService } from './openweathermap.service';
import { RedisService } from '../redis/redis.service';
import { mockRedisService } from '../../test/shared/mocks/redis.service.mock';

describe('OpenweathermapController', () => {
  let controller: OpenweathermapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenweathermapController],
      providers: [
        OpenweathermapService,
        {
          provide: RedisService,
          useValue: mockRedisService,
        },
      ],
    }).compile();

    controller = module.get<OpenweathermapController>(OpenweathermapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
