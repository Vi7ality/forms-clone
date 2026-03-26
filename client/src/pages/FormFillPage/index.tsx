import { useParams } from "react-router-dom";
import { useGetFormQuery, useSubmitResponseMutation } from "../../services/api";
import { useState } from "react";
import { QuestionType } from "../../types/form";

type AnswerState = {
  [questionId: string]: string | string[];
};

const FormFillPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: form, isLoading } = useGetFormQuery(id!);
  const [submitResponse, { isLoading: isSubmitting }] = useSubmitResponseMutation();

  const [answers, setAnswers] = useState<AnswerState>({});

  if (isLoading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;

  const handleChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleCheckboxChange = (questionId: string, option: string, checked: boolean) => {
    const current = (answers[questionId] as string[]) || [];

    if (checked) {
      handleChange(questionId, [...current, option]);
    } else {
      handleChange(
        questionId,
        current.filter((v) => v !== option),
      );
    }
  };

  const handleSubmit = async () => {
    const formattedAnswers = form.questions.map((q) => ({
      questionId: q.id,
      value: q.type === QuestionType.CHECKBOX ? undefined : (answers[q.id] as string) || "",
      values: q.type === QuestionType.CHECKBOX ? (answers[q.id] as string[]) || [] : undefined,
    }));

    try {
      await submitResponse({
        formId: form.id,
        answers: formattedAnswers,
      }).unwrap();

      alert("Form submitted!");
      setAnswers({});
    } catch (e) {
      console.error(e);
      alert("Error submitting form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      {form.questions.map((q) => (
        <div key={q.id} className="mb-4">
          <label className="block mb-1 font-medium">{q.title}</label>

          {q.type === "TEXT" && (
            <input
              className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            />
          )}

          {q.type === "DATE" && (
            <input
              type="date"
              className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={answers[q.id] || ""}
              onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
            />
          )}

          {(q.type === "MULTIPLE_CHOICE" || q.type === "CHECKBOX") && (
            <div className="space-y-1">
              {q.options.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type={q.type === "MULTIPLE_CHOICE" ? "radio" : "checkbox"}
                    name={q.id}
                    value={opt}
                    checked={
                      q.type === "MULTIPLE_CHOICE"
                        ? answers[q.id] === opt
                        : answers[q.id]?.includes(opt)
                    }
                    onChange={(e) => handleOptionChange(q.id, opt, q.type)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
};

export default FormFillPage;
