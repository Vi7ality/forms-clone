import type { QuestionType } from "../types/form";
import type { QuestionDraft } from "../types/questionDraft";

type Props = {
  question: QuestionDraft;
  updateQuestion(id: string, data: Partial<QuestionDraft>): void;
  updateOption(questionId: string, index: number, value: string): void;
  addOption(questionId: string): void;
  removeOption(questionId: string, index: number): void;
  removeQuestion(id: string): void;
};

const QuestionListItem = ({
  question,
  updateQuestion,
  updateOption,
  addOption,
  removeOption,
  removeQuestion,
}: Props) => {
  return (
    <li
      key={question.id}
      className="mb-4 p-4 border rounded bg-gray-50 shadow-sm space-y-2 flex flex-col items-start"
    >
      <input
        className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Question title"
        value={question.title}
        onChange={(e) => updateQuestion(question.id, { title: e.target.value })}
      />

      <select
        className="px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
        value={question.type}
        onChange={(e) =>
          updateQuestion(question.id, { type: e.target.value as QuestionType, options: [] })
        }
      >
        <option value="TEXT">Text</option>
        <option value="MULTIPLE_CHOICE">Multiple choice</option>
        <option value="CHECKBOX">Checkbox</option>
        <option value="DATE">Date</option>
      </select>

      {(question.type === "MULTIPLE_CHOICE" || question.type === "CHECKBOX") && (
        <ul className="space-y-1">
          {question.options.map((opt, idx) => (
            <li key={idx} className="flex gap-2">
              <input
                className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={opt}
                onChange={(e) => updateOption(question.id, idx, e.target.value)}
              />

              <button onClick={() => removeOption(question.id, idx)} className="text-red-500">
                ✕
              </button>
            </li>
          ))}
          <button
            className="mt-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => addOption(question.id)}
          >
            + Add option
          </button>
        </ul>
      )}

      <button onClick={() => removeQuestion(question.id)} className="text-red-500 text-sm">
        Remove question
      </button>
    </li>
  );
};

export default QuestionListItem;
