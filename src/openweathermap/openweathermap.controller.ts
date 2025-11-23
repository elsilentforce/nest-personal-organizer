import { Controller, Get } from '@nestjs/common';
import { OpenweathermapService } from './openweathermap.service';
import { env } from 'process';

@Controller('weather')
export class OpenweathermapController {
  constructor(private readonly openweathermapService: OpenweathermapService) { }

  @Get()
  currentWeather() {
    const lat: number = Number(env.OPENWEATHERMAP_DEFAULT_LAT);
    const lon: number = Number(env.OPENWEATHERMAP_DEFAULT_LON);
    return this.openweathermapService.getCurrentWeather(lat, lon);
  }
}
