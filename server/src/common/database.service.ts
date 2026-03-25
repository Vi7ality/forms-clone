import { Injectable } from '@nestjs/common';
import { Form } from 'src/form/models/form.model';

@Injectable()
export class DatabaseService {
  forms: Form[] = [];

  responses: Response[] = [];
}
