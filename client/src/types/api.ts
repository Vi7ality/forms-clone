import type { Form } from "./form";
import type { QuestionType } from "./form";
import type { Response } from "./response";

// QUERY
export type GetFormsResponse = {
  forms: Form[];
};

export type GetFormResponse = {
  form: Form | null;
};

export type GetResponsesResponse = {
  responses: Response[];
};

// MUTATION
export type CreateFormResponse = {
  createForm: Form;
};

export type SubmitResponseResponse = {
  submitResponse: Response;
};

// INPUTS
export type QuestionInput = {
  title: string;
  type: QuestionType;
  options?: string[];
};

export type CreateFormInput = {
  title: string;
  description?: string;
  questions?: QuestionInput[];
};

export type AnswerInput = {
  questionId: string;
  value?: string;
  values?: string[];
};

export type SubmitResponseInput = {
  formId: string;
  answers: AnswerInput[];
};
