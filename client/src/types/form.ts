export const QuestionType = {
  TEXT: "TEXT",
  MULTIPLE_CHOICE: "MULTIPLE_CHOICE",
  CHECKBOX: "CHECKBOX",
  DATE: "DATE",
} as const;

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType];

export type Question = {
  id: string;
  title: string;
  type: QuestionType;
  options?: string[];
};

export type Form = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};
