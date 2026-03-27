import type { QuestionType } from "./form";

export type QuestionDraft = {
  id: string;
  title: string;
  type: QuestionType;
  options: string[];
};
