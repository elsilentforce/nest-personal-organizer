import { Module } from '@nestjs/common';
import { RedisModule } from 'src/redis/redis.module';
import { OpenweathermapController } from './openweathermap.controller';
import { OpenweathermapService } from './openweathermap.service';

@Module({
  imports: [RedisModule],
  controllers: [OpenweathermapController],
  providers: [OpenweathermapService]
})
export class OpenweathermapModule { }
