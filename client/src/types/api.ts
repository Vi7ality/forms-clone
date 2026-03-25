import type { Form } from "./form";

// QUERY
export type GetFormsResponse = {
  forms: Form[];
};

// MUTATION
export type CreateFormResponse = {
  createForm: Form;
};
