import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Answer } from './answer.model';

@ObjectType()
export class Response {
  @Field(() => ID)
  id: string;

  @Field()
  formId: string;

  @Field(() => [Answer])
  answers: Answer[];
}
