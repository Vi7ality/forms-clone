import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/common/database.service';
import { SubmitResponseInput } from './dto/submit-response.input';
import { randomUUID } from 'crypto';

@Injectable()
export class ResponseService {
  constructor(private db: DatabaseService) {}

  getResponses(formId: string) {
    return this.db.responses.filter((r) => r.formId === formId);
  }

  submitResponse(input: SubmitResponseInput) {
    const response = { id: randomUUID(), ...input };
    this.db.responses.push(response);
    return response;
  }
}
