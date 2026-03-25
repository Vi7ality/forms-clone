import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Form } from './models/form.model';
import { FormService } from './form.service';
import { CreateFormInput } from './dto/create-form.input';

@Resolver(() => Form)
export class FormResolver {
  constructor(private formService: FormService) {}

  @Query(() => [Form])
  forms() {
    return this.formService.getForms();
  }

  @Query(() => Form, { nullable: true })
  form(@Args('id') id: string) {
    return this.formService.getForm(id);
  }

  @Mutation(() => Form)
  createForm(@Args('input') input: CreateFormInput) {
    return this.formService.createForm(input);
  }
}
