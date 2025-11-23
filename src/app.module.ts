import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenweathermapService } from './openweathermap/openweathermap.service';
import { OpenweathermapController } from './openweathermap/openweathermap.controller';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { OpenweathermapModule } from './openweathermap/openweathermap.module';

@Module({
  imports: [OpenweathermapModule],
  controllers: [AppController, OpenweathermapController],
  providers: [AppService, OpenweathermapService, RedisService],
})
export class AppModule { }
