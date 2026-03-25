import { Field, InputType } from '@nestjs/graphql';
import { AnswerInput } from './answer.input';

@InputType()
export class SubmitResponseInput {
  @Field()
  formId: string;

  @Field(() => [AnswerInput])
  answers: AnswerInput[];
}
