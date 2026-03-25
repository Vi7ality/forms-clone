import { useGetFormsQuery } from "../../services/api";
import type { Form } from "../../types/form";

export const HomePage = () => {
  const { data, isLoading } = useGetFormsQuery();

  if (isLoading) return <>Loading</>;

  return (
    <>
      <h1>Forms</h1>
      <ul>
        {data?.data.forms.map((form: Form) => (
          <li>
            <h3>{form.title}</h3>
            <p>{form.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
