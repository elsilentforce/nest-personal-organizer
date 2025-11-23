import { Test, TestingModule } from '@nestjs/testing';
import { OpenweathermapController } from './openweathermap.controller';

describe('OpenweathermapController', () => {
  let controller: OpenweathermapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpenweathermapController],
    }).compile();

    controller = module.get<OpenweathermapController>(OpenweathermapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
