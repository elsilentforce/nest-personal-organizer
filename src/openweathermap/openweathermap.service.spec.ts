import { Test, TestingModule } from '@nestjs/testing';
import { OpenweathermapService } from './openweathermap.service';
import { RedisService } from 'src/redis/redis.service';
import { mockRedisService } from 'test/shared/mocks/redis.service.mock';

// Define the fetch mock with proper typing
const mockFetch = jest.fn() as jest.MockedFunction<typeof fetch>;
global.fetch = mockFetch;

describe('OpenweathermapService', () => {
  let service: OpenweathermapService;

  beforeEach(async () => {
    // clear all mocks before each test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OpenweathermapService,
        {
          provide: RedisService,
          useValue: mockRedisService
        }
      ],
    }).compile();

    service = module.get<OpenweathermapService>(OpenweathermapService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentWeather', () => {
    const lat: number = -12.345;
    const lon: number = 12.345;
    const apiKey: string = 'fooapi';
    // const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const mockWeatherData = { message: 'Mock weather data', temp: 25 };

    describe('when there is cached data', () => {
      it('returns cached data without calling fetch', async () => {
        const cachedData = JSON.stringify(mockWeatherData);
        mockRedisService.get.mockResolvedValue(cachedData);

        const result = await service.getCurrentWeather(lat, lon);
        expect(mockRedisService.get).toHaveBeenCalledWith(`currentWeather_${lat}:${lon}`);
        expect(mockFetch).not.toHaveBeenCalled();
        expect(result).toEqual(mockWeatherData);
      });
    });
  });
});
