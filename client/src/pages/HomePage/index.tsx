import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../services/api";
import type { Form } from "../../types/form";
import FormListItem from "../../components/FormListItem";

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
          <FormListItem form={form} key={form.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
