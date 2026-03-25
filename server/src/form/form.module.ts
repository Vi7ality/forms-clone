import { Module } from '@nestjs/common';
import { FormService } from './form.service';
import { FormResolver } from './form.resolver';
import { DatabaseService } from 'src/common/database.service';

@Module({
  providers: [FormService, FormResolver, DatabaseService],
  exports: [FormService],
})
export class FormModule {}
