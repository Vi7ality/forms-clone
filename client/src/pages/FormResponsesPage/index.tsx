import { useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../../services/api";

const FormResponsesPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: form, isLoading: formLoading } = useGetFormQuery(id!);
  const { data: responses, isLoading: respLoading } = useGetResponsesQuery(id!);

  if (formLoading || respLoading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;

  // helper: questionId → question
  const questionMap = Object.fromEntries(form.questions.map((q) => [q.id, q]));

  return (
    <div style={{ padding: 20 }}>
      <h1>Responses for: {form.title}</h1>

      {responses.length === 0 && <p>No responses yet</p>}

      {responses.map((response: any, index: number) => (
        <div
          key={response.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
          }}
        >
          <h3>Response #{index + 1}</h3>

          {response.answers.map((ans: any) => {
            const question = questionMap[ans.questionId];

            if (!question) return null;

            return (
              <div key={ans.questionId} style={{ marginBottom: 10 }}>
                <strong>{question.title}</strong>

                <div>
                  {ans.value && <span>{ans.value}</span>}

                  {ans.values && ans.values.length > 0 && (
                    <ul>
                      {ans.values.map((v: string) => (
                        <li key={v}>{v}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default FormResponsesPage;
