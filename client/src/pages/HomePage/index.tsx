import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../services/api";
import type { Form } from "../../types/form";

const HomePage = () => {
  const { data: forms, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <div className="text-center mt-20">Loading forms...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">Error loading forms</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Forms</h1>

      <div className="mb-6">
        <Link to="/forms/new">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            + Create New Form
          </button>
        </Link>
      </div>

      {forms?.length === 0 && <p className="text-gray-500">No forms yet.</p>}

      <div className="space-y-4">
        {forms?.map((form: Form) => (
          <div key={form.id} className="bg-white p-6 rounded shadow hover:shadow-md transition">
            <h3 className="text-xl font-medium text-gray-900">{form.title}</h3>
            <p className="text-gray-600">{form.description}</p>

            <div className="mt-4 flex gap-2">
              <Link to={`/forms/${form.id}/fill`}>
                <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded hover:bg-blue-200">
                  Fill
                </button>
              </Link>
              <Link to={`/forms/${form.id}/responses`}>
                <button className="bg-green-100 text-green-800 px-3 py-1 rounded hover:bg-green-200">
                  Responses
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
