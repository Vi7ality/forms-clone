import { QuestionType, type Form } from "../types/form";

const formatAnswersForSubmit = (form: Form, answers: Record<string, string | string[]>) =>
  form.questions.map((q) => ({
    questionId: q.id,
    value: q.type === QuestionType.CHECKBOX ? undefined : (answers[q.id] as string) || "",
    values: q.type === QuestionType.CHECKBOX ? (answers[q.id] as string[]) || [] : undefined,
  }));

export default formatAnswersForSubmit;
