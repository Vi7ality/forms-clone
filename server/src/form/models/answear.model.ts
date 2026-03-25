import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Answer {
  @Field()
  questionId: string;

  @Field({ nullable: true })
  value?: string;

  @Field(() => [String], { nullable: true })
  values?: string[];
}
