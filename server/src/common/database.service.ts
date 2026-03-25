import { Injectable } from '@nestjs/common';
import { Form } from 'src/form/models/form.model';
import { Response } from 'src/form/models/response.model';

@Injectable()
export class DatabaseService {
  forms: Form[] = [];

  responses: Response[] = [];
}
