import { isNumber, isString } from 'class-validator';

export class UpdatePostDto {
  public id: number;

  title: string;

  content: string;
}
