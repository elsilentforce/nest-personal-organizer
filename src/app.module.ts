import { Module } from '@nestjs/common';

import { OpenweathermapService } from './openweathermap/openweathermap.service';
import { OpenweathermapController } from './openweathermap/openweathermap.controller';
import { RedisService } from './redis/redis.service';
import { OpenweathermapModule } from './openweathermap/openweathermap.module';

@Module({
  imports: [OpenweathermapModule],
  controllers: [OpenweathermapController],
  providers: [OpenweathermapService, RedisService],
})
export class AppModule { }
