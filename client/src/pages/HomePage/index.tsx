import { useGetFormsQuery } from "../../services/api";

export const HomePage = () => {
  const { data, isLoading } = useGetFormsQuery();

  if (isLoading) return <>Loading</>;

  return (
    <>
      <h1>Forms</h1>
      <ul>
        {data?.data.forms.map((form: any) => (
          <li>
            <h3>{form.title}</h3>
            <p>{form.description}</p>
          </li>
        ))}
      </ul>
    </>
  );
};
