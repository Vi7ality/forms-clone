import { QuestionType } from "../types/form";

export type ValidationError = { field: string; message: string };

export function validateCreateForm(input: {
  title: string;
  questions: Array<{ title: string; type: string; options?: string[] }>;
}): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!input.title.trim()) errors.push({ field: "title", message: "Form title is required" });

  if (!input.questions.length) {
    errors.push({ field: "questions", message: "Add at least one question" });
    return errors;
  }

  input.questions.forEach((q, idx) => {
    if (!q.title.trim()) {
      errors.push({ field: `questions[${idx}].title`, message: "Question title is required" });
    }

    if (q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.CHECKBOX) {
      const opts = (q.options ?? []).map((x) => x.trim()).filter(Boolean);
      if (opts.length === 0) {
        errors.push({ field: `questions[${idx}].options`, message: "Add at least one option" });
      }
      const uniq = new Set(opts);
      if (uniq.size !== opts.length) {
        errors.push({ field: `questions[${idx}].options`, message: "Options must be unique" });
      }
    }
  });

  return errors;
}

export default validateCreateForm;
