import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormResolver } from './form.resolver';

@Module({
  providers: [FormService, FormResolver]
})
export class FormModule {}
