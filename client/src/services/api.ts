import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GraphQLResponse } from "../types/graphql";
import type {
  CreateFormInput,
  CreateFormResponse,
  GetFormResponse,
  GetFormsResponse,
  GetResponsesResponse,
  SubmitResponseInput,
  SubmitResponseResponse,
} from "../types/api";
import type { Form } from "../types/form";
import type { Response } from "../types/response";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    prepareHeaders: (headers) => {
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Forms", "Responses"],
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: JSON.stringify({
          query: `
            query {
              forms {
                id
                title
                description
              }
            }
          `,
        }),
      }),
      transformResponse: (response: GraphQLResponse<GetFormsResponse>) => response.data.forms,
      providesTags: ["Forms"],
    }),
    createForm: builder.mutation<GraphQLResponse<CreateFormResponse>, CreateFormInput>({
      query: (input) => ({
        url: "/graphql",
        method: "POST",
        body: JSON.stringify({
          query: `
            mutation CreateForm($input: CreateFormInput!) {
              createForm(input: $input) {
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
          variables: { input },
        }),
      }),
      invalidatesTags: ["Forms"],
    }),
    getForm: builder.query<Form | null, string>({
      query: (id) => ({
        url: "/graphql",
        method: "POST",
        body: JSON.stringify({
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
        }),
      }),
      transformResponse: (response: GraphQLResponse<GetFormResponse>) => response.data.form,
    }),

    getResponses: builder.query<Response[], string>({
      query: (formId) => ({
        url: "/graphql",
        method: "POST",
        body: JSON.stringify({
          query: `
        query GetResponses($formId: ID!) {
          responses(formId: $formId) {
            id
            formId
            answers {
              questionId
              value
              values
            }
          }
        }
      `,
          variables: { formId },
        }),
      }),
      transformResponse: (response: GraphQLResponse<GetResponsesResponse>) =>
        response.data.responses,
      providesTags: (result, error, formId) => [{ type: "Responses", id: formId }],
    }),

    submitResponse: builder.mutation<GraphQLResponse<SubmitResponseResponse>, SubmitResponseInput>({
      query: (input) => ({
        url: "/graphql",
        method: "POST",
        body: JSON.stringify({
          query: `
        mutation Submit($input: SubmitResponseInput!) {
          submitResponse(input: $input) {
            id
            formId
            answers {
              questionId
              value
              values
            }
          }
        }
      `,
          variables: { input },
        }),
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Responses", id: arg.formId }],
    }),
  }),
});

export const {
  useGetFormsQuery,
  useCreateFormMutation,
  useGetFormQuery,
  useSubmitResponseMutation,
  useGetResponsesQuery,
} = api;
