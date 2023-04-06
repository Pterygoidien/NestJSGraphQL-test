import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Category } from './models/category.entity';
import Post from './models/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import * as redisStore from 'cache-manager-redis-store';
import { SearchModule } from 'src/modules/search/search.module';
import PostsSearchService from './postsSearch.service';
import { PostsResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        host: configService.get('REDIS_HOST'),
        port: configService.get('REDIS_PORT'),
        ttl: 120,
      }),
    }),
    TypeOrmModule.forFeature([Post, Category]),
    AuthModule,
    SearchModule,
    UsersModule,
  ],
  controllers: [PostsController],
  providers: [PostsService, PostsSearchService, PostsResolver],
})
export class PostsModule {}
