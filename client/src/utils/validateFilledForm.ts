import { QuestionType, type Form } from "../types/form";

export function validateFilledForm(
  form: Form,
  answers: Record<string, string | string[]>,
): { questionId: string; message: string }[] {
  const errors: { questionId: string; message: string }[] = [];

  form.questions.forEach((q) => {
    const a = answers[q.id];

    if (q.type === QuestionType.CHECKBOX) {
      const arr = Array.isArray(a) ? a : [];
      if (arr.length === 0)
        errors.push({ questionId: q.id, message: `Select at least one option` });
      return;
    }

    const val = typeof a === "string" ? a.trim() : "";
    if (!val) errors.push({ questionId: q.id, message: `Answer is required` });

    if (q.type === QuestionType.DATE && val) {
      if (!/^\d{4}-\d{2}-\d{2}$/.test(val)) {
        errors.push({ questionId: q.id, message: `Invalid date format` });
      }
    }
  });

  return errors;
}
