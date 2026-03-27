import type { Question } from "../types/form";
import type { Response } from "../types/response";

type Props = {
  response: Response;
  questionMap: Record<string, Question>;
  index: number;
};

const FormResponseCard = ({ response, questionMap, index }: Props) => {
  return (
    <div className="bg-white p-4 border rounded shadow-sm">
      <h3 className="font-medium mb-2">Response #{index + 1}</h3>
      <div className="space-y-2">
        {response.answers.map((ans) => {
          const question = questionMap[ans.questionId];
          if (!question) return null;

          return (
            <div key={ans.questionId}>
              <p className="font-medium">{question.title}</p>
              {ans.value && <p className="text-gray-700">{ans.value}</p>}
              {ans.values && ans.values.length > 0 && (
                <ul className="list-disc list-inside text-gray-700">
                  {ans.values.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormResponseCard;
