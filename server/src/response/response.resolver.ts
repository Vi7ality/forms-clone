import { Args, Mutation, Resolver, Query, ID } from '@nestjs/graphql';
import { ResponseService } from './response.service';
import { Response } from 'src/form/models/response.model';
import { SubmitResponseInput } from './dto/submit-response.input';

@Resolver()
export class ResponseResolver {
  constructor(private responseService: ResponseService) {}

  @Query(() => [Response])
  responses(@Args('formId', { type: () => ID }) formId: string) {
    return this.responseService.getResponses(formId);
  }

  @Mutation(() => Response)
  submitResponse(@Args('input') input: SubmitResponseInput) {
    return this.responseService.submitResponse(input);
  }
}
