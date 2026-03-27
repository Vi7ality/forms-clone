import { Link } from "react-router-dom";
import type { Form } from "../types/form";

type Props = {
  form: Form;
};

const FormListItem = ({ form }: Props) => {
  return (
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
  );
};

export default FormListItem;
