import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import * as Redis from 'ioredis';
import { env } from 'process';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: Redis.Redis;
  onModuleInit() {
    this.client = new Redis.Redis({
      host: env.REDIS_HOST || 'redis',
      port: 6379
    });
  }

  onModuleDestroy() {
    this.client.quit();
  }

  async setKey(key: string, otp: string, ttlInSeconds: number): Promise<void> {
    await this.client.set(key, otp, 'EX', ttlInSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async delete(key: string): Promise<number> {
    return this.client.del(key);
  }
}
