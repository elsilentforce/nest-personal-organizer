import { Test, TestingModule } from '@nestjs/testing';
import { OpenweathermapService } from './openweathermap.service';
import { RedisService } from '../redis/redis.service';
import { mockRedisService } from '../../test/shared/mocks/redis.service.mock';
import { env } from 'process';

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
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const mockWeatherData = { message: 'Mock weather data', temp: 25 };

    beforeEach(() => {
      env.OPENWEATHERMAP_API_KEY = apiKey;
    });

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

    describe('when there is no cached data', () => {
      beforeEach(() => {
        mockRedisService.get.mockResolvedValue(null) // No cache
      });

      const mockOkResponse = {
        ok: true,
        status: 200,
        statusText: 'OK',
        json: jest.fn().mockResolvedValue(mockWeatherData)
      } as unknown as Response;

      it('fetches data from external API', async () => {
        mockFetch.mockResolvedValue(mockOkResponse);
        const result = await service.getCurrentWeather(lat, lon);

        expect(mockFetch).toHaveBeenCalledWith(apiUrl);
        expect(mockOkResponse.json).toHaveBeenCalled();
        expect(result).toEqual(mockWeatherData);
      });

      it('caches the API response for 1 hour', async () => {
        mockFetch.mockResolvedValue(mockOkResponse);
        await service.getCurrentWeather(lat, lon);
        expect(mockRedisService.setKey).toHaveBeenCalledWith(
          `currentWeather_${lat}:${lon}`,
          JSON.stringify(mockWeatherData),
          3600
        );
      });
    });
  });
});
