import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  CacheInterceptor,
  Query,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import JwtAuthenticationGuard from 'src/common/guards/jwt-auth.guard';
import RoleGuard from 'src/common/guards/roles.guard';
import { PaginationParams } from 'src/utils/types/paginationParams';
import RequestWithUser from '../auth/requestWithUser.interface';
import { Role } from '../users/roles/role.enum';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HttpCacheInterceptor } from './httpCache.interceptor';
import { PostsService } from './posts.service';
import { GET_POSTS_CACHE_KEY } from './types/postsCacheKey.constant';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseInterceptors(HttpCacheInterceptor)
  @CacheKey(GET_POSTS_CACHE_KEY)
  @CacheTTL(120)
  @Get()
  getPosts(
    @Query('search') search: string,
    @Query() { offset, limit, startId }: PaginationParams,
  ) {
    if (search) {
      return this.postsService.searchForPosts(search, offset, limit, startId);
    }
    return this.postsService.getPosts(offset, limit, startId);
  }

  @Get(':id')
  getPostById(@Param('id') id: string) {
    return this.postsService.getPostById(Number(id));
  }

  @Post()
  @UseGuards(RoleGuard(Role.User))
  async createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postsService.createPost(post, req.user);
  }

  @Put(':id')
  async replacePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postsService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @UseGuards(RoleGuard(Role.Admin))
  async deletePost(@Param('id') id: string) {
    this.postsService.deletePost(Number(id));
  }
}
