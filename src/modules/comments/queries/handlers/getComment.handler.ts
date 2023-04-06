import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Query } from 'typeorm/driver/Query';
import { Comment } from '../../comment.entity';
import { GetCommentsQuery } from '../implementations/getComments.query';

@QueryHandler(GetCommentsQuery)
export class GetCommentsHandler implements IQueryHandler<GetCommentsQuery> {
  constructor(
    @InjectRepository(Comment) private commentsRepository: Repository<Comment>,
  ) {}

  async execute(query: GetCommentsQuery): Promise<any> {
    if (query.postId) {
      return this.commentsRepository.find({ post: { id: query.postId } });
    }
    return this.commentsRepository.find();
  }
}
