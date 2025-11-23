import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';
import { env } from 'process';
import { CurrentWeatherResponse } from './interfaces/current-weater-response.interface';

@Injectable()
export class OpenweathermapService {
  constructor(
    private redisService: RedisService,
  ) { }

  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = env.OPENWEATHERMAP_API_KEY ?? '';

  async getCurrentWeather(lat: number, lon: number): Promise<CurrentWeatherResponse> {
    try {
      const currentWeatherUrl = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
      const cacheKey = `currentWeather_${lat}:${lon}`;

      // Early return if the query is cached
      const cachedData = await this.redisService.get(cacheKey);
      if (cachedData) {
        // console.log(`Cache hit for ${cacheKey}`);
        return JSON.parse(cachedData);
      }

      // Hit external API if response is not cached
      const res = await fetch(currentWeatherUrl);
      if (!res.ok) {
        throw new Error(`OpenWeatherMap API error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      // Write JSON response in cache
      await this.redisService.setKey(cacheKey, JSON.stringify(data), 3600)
      // .then(() => console.log(`Cache set for ${cacheKey}`));

      return data satisfies CurrentWeatherResponse;
    }
    catch (error) {
      throw error;
    }
  }

}
