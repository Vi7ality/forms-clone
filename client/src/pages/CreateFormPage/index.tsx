import { useState } from "react";
import { QuestionType } from "../../types/form";
import { useCreateFormMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import validateCreateForm from "../../utils/validateCreateForm";
import { notify } from "../../utils/notify";

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
          <li
            key={q.id}
            className="mb-4 p-4 border rounded bg-gray-50 shadow-sm space-y-2 flex flex-col items-start"
          >
            <input
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Question title"
              value={q.title}
              onChange={(e) => updateQuestion(q.id, { title: e.target.value })}
            />

            <select
              className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={q.type}
              onChange={(e) =>
                updateQuestion(q.id, { type: e.target.value as QuestionType, options: [] })
              }
            >
              <option value="TEXT">Text</option>
              <option value="MULTIPLE_CHOICE">Multiple choice</option>
              <option value="CHECKBOX">Checkbox</option>
              <option value="DATE">Date</option>
            </select>

            {(q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") && (
              <ul className="space-y-1">
                {q.options.map((opt, idx) => (
                  <li className="flex gap-2">
                    <input
                      key={idx}
                      className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={opt}
                      onChange={(e) => updateOption(q.id, idx, e.target.value)}
                    />

                    <button onClick={() => removeOption(q.id, idx)} className="text-red-500">
                      ✕
                    </button>
                  </li>
                ))}
                <button
                  className="mt-1 bg-gray-200 rounded hover:bg-gray-300"
                  onClick={() => addOption(q.id)}
                >
                  + Add option
                </button>
              </ul>
            )}

            <button onClick={() => removeQuestion(q.id)} className="text-red-500 text-sm">
              Remove question
            </button>
          </li>
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
