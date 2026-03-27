import type { Question } from "../types/form";
import { QuestionType } from "../types/form";

type Props = {
  question: Question;
  value: string | string[] | undefined;
  onChange: (questionId: string, value: string | string[]) => void;
  onCheckboxChange: (questionId: string, option: string, checked: boolean) => void;
};

const FormFillQuestion = ({ question, value, onChange, onCheckboxChange }: Props) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-medium">{question.title}</label>

      {question.type === QuestionType.TEXT && (
        <input
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={(value as string) || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
        />
      )}

      {question.type === QuestionType.DATE && (
        <input
          type="date"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={(value as string) || ""}
          onChange={(e) => onChange(question.id, e.target.value)}
        />
      )}

      {question.type === QuestionType.MULTIPLE_CHOICE && (
        <div className="flex flex-col space-y-2">
          {question.options?.map((opt, idx) => (
            <label key={idx} className="flex items-center gap-2">
              <input
                type="radio"
                name={question.id}
                value={opt}
                checked={value === opt}
                onChange={() => onChange(question.id, opt)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      )}

      {question.type === QuestionType.CHECKBOX && (
        <div className="flex flex-col space-y-2">
          {question.options?.map((opt, idx) => {
            const selected = (value as string[]) || [];
            return (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={opt}
                  checked={selected.includes(opt)}
                  onChange={(e) => onCheckboxChange(question.id, opt, e.target.checked)}
                />
                <span>{opt}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FormFillQuestion;
