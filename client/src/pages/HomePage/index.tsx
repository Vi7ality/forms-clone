import { Link } from "react-router-dom";
import { useGetFormsQuery } from "../../services/api";
import type { Form } from "../../types/form";

const HomePage = () => {
  const { data: forms, isLoading, error } = useGetFormsQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error loading forms</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Forms</h1>

      <div style={{ marginBottom: 20 }}>
        <Link to="/forms/new">
          <button>Create New Form</button>
        </Link>
      </div>

      {forms?.length === 0 && <p>No forms yet</p>}

      {forms?.map((form: Form) => (
        <div
          key={form.id}
          style={{
            border: "1px solid #ccc",
            padding: 15,
            marginBottom: 15,
          }}
        >
          <h3>{form.title}</h3>
          <p>{form.description}</p>

          <div style={{ display: "flex", gap: 10 }}>
            <Link to={`/forms/${form.id}/fill`}>
              <button>Fill</button>
            </Link>

            <Link to={`/forms/${form.id}/responses`}>
              <button>Responses</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
