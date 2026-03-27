import { useState } from "react";
import { QuestionType } from "../../types/form";
import { useCreateFormMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import validateCreateForm from "../../utils/validateCreateForm";
import { notify } from "../../utils/notify";
import type { QuestionDraft } from "../../types/questionDraft";
import QuestionListItem from "../../components/QuestionListItem";

const CreateFormPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<QuestionDraft[]>([]);
  const [createForm] = useCreateFormMutation();
  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        title: "",
        type: QuestionType.TEXT,
        options: [],
      },
    ]);
  };

  const updateQuestion = (id: string, data: Partial<QuestionDraft>) => {
    setQuestions((prev) => prev.map((q) => (q.id === id ? { ...q, ...data } : q)));
  };

  const removeQuestion = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  };

  const addOption = (questionId: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, options: [...q.options, ""] } : q)),
    );
  };

  const updateOption = (questionId: string, index: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id !== questionId) return q;

        const newOptions = [...q.options];
        newOptions[index] = value;

        return { ...q, options: newOptions };
      }),
    );
  };

  const removeOption = (questionId: string, index: number) => {
    setQuestions((prev) =>
      prev.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.filter((_, i) => i !== index),
            }
          : q,
      ),
    );
  };

  const handleSubmit = async () => {
    const errors = validateCreateForm({ title, questions });

    if (errors.length > 0) {
      notify.error(errors[0].message);
      return;
    }

    try {
      await createForm({
        title,
        description,
        questions: questions.map((q) => ({
          title: q.title,
          type: q.type,
          options:
            q.type === QuestionType.TEXT || q.type === QuestionType.DATE
              ? undefined
              : q.options.filter((opt) => opt.trim() !== ""),
        })),
      }).unwrap();

      notify.success("Form created!");

      setTitle("");
      setDescription("");
      setQuestions([]);
      navigate("/");
    } catch (error) {
      console.error(error);
      notify.error("Error creating form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 ">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Create Form</h1>

      <input
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Form title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <ul>
        {questions.map((q) => (
          <QuestionListItem
            key={q.id}
            question={q}
            updateQuestion={updateQuestion}
            updateOption={updateOption}
            addOption={addOption}
            removeOption={removeOption}
            removeQuestion={removeQuestion}
          />
        ))}
      </ul>
      <div className="flex flex-col items-start">
        <button
          onClick={addQuestion}
          className="mb-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Question
        </button>

        <button
          onClick={handleSubmit}
          className=" bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save form
        </button>
      </div>
    </div>
  );
};

export default CreateFormPage;
