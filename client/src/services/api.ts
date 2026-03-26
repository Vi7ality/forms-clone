import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GraphQLResponse } from "../types/graphql";
import type { CreateFormResponse, GetFormsResponse } from "../types/api";
import type { Form } from "../types/form";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/graphql",
    method: "POST",
  }),
  endpoints: (builder) => ({
    getForms: builder.query<GraphQLResponse<GetFormsResponse>, void>({
      query: () => ({
        url: "",
        body: {
          query: `
            query {
              forms {
                id
                title
                description
              }
            }
          `,
        },
      }),
    }),
    createForm: builder.mutation<
      GraphQLResponse<CreateFormResponse>,
      { title: string; description?: string }
    >({
      query: (input) => ({
        url: "",
        body: {
          query: `
            mutation CreateForm($input: CreateFormInput!) {
              createForm(input: $input) {
                id
                title
              }
            }
          `,
          variables: { input },
        },
      }),
    }),
    getForm: builder.query<Form, string>({
      query: (id) => ({
        url: "",
        body: {
          query: `
        query GetForm($id: ID!) {
          form(id: $id) {
            id
            title
            description
            questions {
              id
              title
              type
              options
            }
          }
        }
      `,
          variables: { id },
        },
      }),
      transformResponse: (response: any) => response.data.form,
    }),

    submitResponse: builder.mutation<any, { formId: string; answers: any[] }>({
      query: (body) => ({
        url: "",
        body: {
          query: `
        mutation Submit($input: SubmitResponseInput!) {
          submitResponse(input: $input) {
            id
          }
        }
      `,
          variables: { input: body },
        },
      }),
    }),
  }),
});

export const {
  useGetFormsQuery,
  useCreateFormMutation,
  useGetFormQuery,
  useSubmitResponseMutation,
} = api;
