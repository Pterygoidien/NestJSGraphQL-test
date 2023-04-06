import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './models/post.model';
import { UseGuards } from '@nestjs/common';
import { GraphqlJwtAuthGuard } from 'src/common/guards/graphql-jwt-auth.guard';
import { CreatePostInput } from './inputs/post.input';
import RequestWithUser from '../auth/requestWithUser.interface';
import { UsersService } from '../users/users.service';
import { User } from '../users/models/user.model';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService,
  ) {}
  @Query(() => [Post])
  async posts() {
    const posts = await this.postsService.getPosts();
    return posts.items;
  }

  @ResolveField('author', () => User)
  async getAuthor(@Parent() post: Post) {
    const { authorId } = post;
    return this.usersService.getById(authorId);
  }

  @Mutation(() => Post)
  @UseGuards(GraphqlJwtAuthGuard)
  async createPost(
    @Args('input') createPostInput: CreatePostInput,
    @Context() context: { req: RequestWithUser },
  ) {
    return this.postsService.createPost(createPostInput, context.req.user);
  }
}
