import { Injectable } from '@nestjs/common';

@Injectable()
export class OpenweathermapService {

  private baseUrl: string = 'https://api.openweathermap.org/data/2.5';
  private apiKey: string = process.env.OPENWEATHERMAP_API_KEY ?? '';

  async getCurrentWeather(lat: number, lon: number) {
    try {
      const currentWeatherUrl = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${this.apiKey}`;
      // TODO: Check cache before hitting external API
      const res = await fetch(currentWeatherUrl);

      if (!res.ok) {
        throw new Error(`OpenWeatherMap API error: ${res.status} ${res.statusText}`);
      }
      const data = await res.json();

      return data;
    }
    catch (error) {
      throw error;
    }
  }

}
