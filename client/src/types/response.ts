export type Answer = {
  questionId: string;
  value?: string;
  values?: string[];
};

export type Response = {
  id: string;
  formId: string;
  answers: Answer[];
};
