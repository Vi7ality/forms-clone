import { useParams, useNavigate } from "react-router-dom";
import { useGetFormQuery, useSubmitResponseMutation } from "../../services/api";
import { useState } from "react";
import formatAnswersForSubmit from "../../utils/formatAnswersForSubmit";
import validateFilledForm from "../../utils/validateFilledForm";
import { notify } from "../../utils/notify";
import FormFillQuestion from "../../components/FormFillQuestion";

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
    const errors = validateFilledForm(form, answers);

    if (errors.length > 0) {
      notify.error(errors[0].message);
      return;
    }
    try {
      await submitResponse({
        formId: form.id,
        answers: formattedAnswers,
      }).unwrap();

      notify.success("Form submitted!");
      setAnswers({});
      navigate("/");
    } catch (e) {
      console.error(e);
      notify.error("Error submitting form");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-4">{form.title}</h1>
      <p className="text-gray-600 mb-6">{form.description}</p>

      {form.questions.map((q) => (
        <FormFillQuestion
          key={q.id}
          question={q}
          value={answers[q.id]}
          onChange={handleChange}
          onCheckboxChange={handleCheckboxChange}
        />
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
