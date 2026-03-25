import { Field, ID, ObjectType } from '@nestjs/graphql';
import { QuestionType } from '../../common/enums/question-type.enum';

@ObjectType()
export class Question {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field(() => QuestionType)
  type: QuestionType;

  @Field(() => [String], { nullable: true })
  options?: string[];
}
