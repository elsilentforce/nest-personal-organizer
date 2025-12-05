import { Module } from '@nestjs/common';
import { OpenweathermapService } from './openweathermap/openweathermap.service';
import { OpenweathermapController } from './openweathermap/openweathermap.controller';
import { RedisService } from './redis/redis.service';
import { OpenweathermapModule } from './openweathermap/openweathermap.module';
import { UserService } from './user/user.service';
import { PrismaService } from './prisma/prisma.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';

@Module({
  imports: [OpenweathermapModule, UserModule],
  controllers: [OpenweathermapController, UserController],
  providers: [OpenweathermapService, RedisService, UserService, PrismaService],
})
export class AppModule { }
