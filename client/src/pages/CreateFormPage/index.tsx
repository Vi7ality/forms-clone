import { useState } from "react";
import { QuestionType } from "../../types/form";
import { useCreateFormMutation } from "../../services/api";

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
  const [createForm, { isLoading }] = useCreateFormMutation();

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
    if (!title.trim()) {
      alert("Form title is required");
      return;
    }

    if (questions.length === 0) {
      alert("Add at least one question");
      return;
    }

    if (questions.some((q) => !q.title.trim())) {
      alert("All questions must have a title");
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

      alert("Form created!");

      setTitle("");
      setDescription("");
      setQuestions([]);
    } catch (error) {
      console.error(error);
      alert("Error creating form");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Create Form</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Form title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: 10, width: 300 }}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: "block", width: 300 }}
        />
      </div>

      <button onClick={addQuestion} style={{ marginBottom: 20 }}>
        Add Question
      </button>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
          }}
        >
          <input
            placeholder="Question title"
            value={q.title}
            onChange={(e) => updateQuestion(q.id, { title: e.target.value })}
            style={{ display: "block", marginBottom: 10, width: 300 }}
          />

          <select
            value={q.type}
            onChange={(e) =>
              updateQuestion(q.id, {
                type: e.target.value as QuestionType,
                options: [],
              })
            }
            style={{ marginBottom: 10 }}
          >
            <option value="TEXT">Text</option>
            <option value="MULTIPLE_CHOICE">Multiple choice</option>
            <option value="CHECKBOX">Checkbox</option>
            <option value="DATE">Date</option>
          </select>

          {(q.type === QuestionType.MULTIPLE_CHOICE || q.type === QuestionType.CHECKBOX) && (
            <div>
              {q.options.map((opt, idx) => (
                <div key={idx} style={{ marginBottom: 5 }}>
                  <input value={opt} onChange={(e) => updateOption(q.id, idx, e.target.value)} />
                  <button onClick={() => removeOption(q.id, idx)} style={{ marginLeft: 5 }}>
                    x
                  </button>
                </div>
              ))}

              <button onClick={() => addOption(q.id)}>Add Option</button>
            </div>
          )}

          <div style={{ marginTop: 10 }}>
            <button onClick={() => removeQuestion(q.id)}>Delete Question</button>
          </div>
        </div>
      ))}

      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Saving..." : "Save Form"}
      </button>
    </div>
  );
};

export default CreateFormPage;
