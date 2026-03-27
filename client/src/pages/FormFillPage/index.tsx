import { useParams, useNavigate } from "react-router-dom";
import { useGetFormQuery, useSubmitResponseMutation } from "../../services/api";
import { useState } from "react";
import { QuestionType } from "../../types/form";
import formatAnswersForSubmit from "../../utils/formatAnswersForSubmit";

type AnswerState = {
  [questionId: string]: string | string[];
};

const FormFillPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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
    const formattedAnswers = formatAnswersForSubmit(form, answers);

    try {
      await submitResponse({
        formId: form.id,
        answers: formattedAnswers,
      }).unwrap();

      alert("Form submitted!");
      setAnswers({});
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Error submitting form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      {form.questions.map((q) => (
        <div key={q.id} className="mb-6">
          <label className="block mb-2 font-medium">{q.title}</label>

          {q.type === QuestionType.TEXT && (
            <input
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === QuestionType.DATE && (
            <input
              type="date"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              value={answers[q.id] || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === QuestionType.MULTIPLE_CHOICE && (
            <div className="flex flex-col space-y-2">
              {q.options?.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    checked={answers[q.id] === opt}
                    onChange={() => handleChange(q.id, opt)}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          )}

          {q.type === QuestionType.CHECKBOX && (
            <div className="flex flex-col space-y-2">
              {q.options?.map((opt, idx) => {
                const selected = (answers[q.id] as string[]) || [];
                return (
                  <label key={idx} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      value={opt}
                      checked={selected.includes(opt)}
                      onChange={(e) => handleCheckboxChange(q.id, opt, e.target.checked)}
                    />
                    <span>{opt}</span>
                  </label>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default FormFillPage;
