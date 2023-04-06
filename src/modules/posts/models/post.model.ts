import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/modules/users/models/user.model';

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String)
  content: string;

  @Field()
  author: User;

  @Field(() => String)
  authorId: string;
}
