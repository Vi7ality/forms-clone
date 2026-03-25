import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../common/database.service';
import { CreateFormInput } from './dto/create-form.input';

import { randomUUID } from 'crypto';

@Injectable()
export class FormService {
  constructor(private db: DatabaseService) {}

  getForms() {
    return this.db.forms;
  }

  getForm(id: string) {
    return this.db.forms.find((f) => f.id === id);
  }

  createForm(input: CreateFormInput) {
    const form = {
      id: randomUUID(),
      ...input,
      questions:
        input.questions?.map((q) => ({ ...q, id: randomUUID() })) || [],
    };
    this.db.forms.push(form);
    return form;
  }
}
