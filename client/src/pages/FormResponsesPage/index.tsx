import { useNavigate, useParams } from "react-router-dom";
import { useGetFormQuery, useGetResponsesQuery } from "../../services/api";
import FormResponseCard from "../../components/FormResponseCard";

const FormResponsesPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: form, isLoading: formLoading } = useGetFormQuery(id!);
  const { data: responses, isLoading: respLoading } = useGetResponsesQuery(id!);
  const navigate = useNavigate();

  if (formLoading || respLoading) return <div>Loading...</div>;
  if (!form) return <div>Form not found</div>;
  if (!responses) return <div>Error loading responses</div>;

  const questionMap = Object.fromEntries(form.questions.map((q) => [q.id, q]));

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 hover:underline">
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-6">Responses for: {form.title}</h1>

      {responses.length === 0 && <p className="text-gray-500">No responses yet</p>}

      <div className="space-y-4">
        {responses.map((res, idx) => (
          <FormResponseCard key={res.id} response={res} questionMap={questionMap} index={idx} />
        ))}
      </div>
    </div>
  );
};

export default FormResponsesPage;
