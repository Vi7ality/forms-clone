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
    <div style={{ padding: 20 }}>
      <h1>{form.title}</h1>
      <p>{form.description}</p>

      {form.questions.map((q) => (
        <div
          key={q.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
          }}
        >
          <p>{q.title}</p>

          {q.type === QuestionType.TEXT && (
            <input
              value={(answers[q.id] as string) || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === QuestionType.DATE && (
            <input
              type="date"
              value={(answers[q.id] as string) || ""}
              onChange={(e) => handleChange(q.id, e.target.value)}
            />
          )}

          {q.type === QuestionType.MULTIPLE_CHOICE &&
            q.options?.map((opt) => (
              <label key={opt} style={{ display: "block" }}>
                <input
                  type="radio"
                  name={q.id}
                  checked={answers[q.id] === opt}
                  onChange={() => handleChange(q.id, opt)}
                />
                {opt}
              </label>
            ))}

          {q.type === QuestionType.CHECKBOX &&
            q.options?.map((opt) => (
              <label key={opt} style={{ display: "block" }}>
                <input
                  type="checkbox"
                  checked={(answers[q.id] as string[])?.includes(opt) || false}
                  onChange={(e) => handleCheckboxChange(q.id, opt, e.target.checked)}
                />
                {opt}
              </label>
            ))}
        </div>
      ))}

      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
};

export default FormFillPage;
