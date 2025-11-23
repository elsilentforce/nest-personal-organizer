import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenweathermapService } from './openweathermap/openweathermap.service';
import { OpenweathermapController } from './openweathermap/openweathermap.controller';

@Module({
  imports: [],
  controllers: [AppController, OpenweathermapController],
  providers: [AppService, OpenweathermapService],
})
export class AppModule { }
