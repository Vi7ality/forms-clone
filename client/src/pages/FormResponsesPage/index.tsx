import { useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../../services/api";

const FormResponsesPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: form, isLoading: formLoading } = useGetFormQuery(id!);
  const { data: responses, isLoading: respLoading } = useGetResponsesQuery(id!);

  if (formLoading || respLoading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;
  if (!responses) return <div>Error loading responses</div>;

  // helper: questionId → question
  const questionMap = Object.fromEntries(form.questions.map((q) => [q.id, q]));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Responses for: {form.title}</h1>

      {responses.length === 0 && <p className="text-gray-500">No responses yet</p>}

      <div className="space-y-4">
        {responses.map((res, idx) => (
          <div key={res.id} className="bg-white p-4 border rounded shadow-sm">
            <h3 className="font-medium mb-2">Response #{idx + 1}</h3>
            <div className="space-y-2">
              {res.answers.map((ans) => {
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
        ))}
      </div>
    </div>
  );
};

export default FormResponsesPage;
