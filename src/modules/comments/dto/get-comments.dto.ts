import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

class GetCommentsDto {
  @Type(() => Number)
  @IsOptional()
  postId?: number;
}
export default GetCommentsDto;
