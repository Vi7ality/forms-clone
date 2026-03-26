import { useState } from "react";
import type { QuestionType } from "../../../types/form";

type QuestionDraft = {
  id: string;
  title: string;
  type: QuestionType;
  options: string[];
};

const CreateFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);

  return <div>Create Form</div>;
};

export default CreateFormPage;
