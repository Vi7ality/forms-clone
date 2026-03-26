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
    baseUrl: "http://localhost:3000/graphql",
    prepareHeaders: (headers) => {
      // Nest GraphQL expects JSON POST bodies
      headers.set("content-type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getForms: builder.query<Form[], void>({
      query: () => ({
        url: "",
        method: "POST",
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
      transformResponse: (response: GraphQLResponse<GetFormsResponse>) => response.data.forms,
    }),
    createForm: builder.mutation<
      GraphQLResponse<CreateFormResponse>,
      CreateFormInput
    >({
      query: (input) => ({
        url: "",
        method: "POST",
        body: {
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
        },
      }),
    }),
    getForm: builder.query<Form | null, string>({
      query: (id) => ({
        url: "",
        method: "POST",
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
      transformResponse: (response: GraphQLResponse<GetFormResponse>) =>
        response.data.form,
    }),

    getResponses: builder.query<Response[], string>({
      query: (formId) => ({
        url: "",
        method: "POST",
        body: {
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
        },
      }),
      transformResponse: (response: GraphQLResponse<GetResponsesResponse>) =>
        response.data.responses,
    }),

    submitResponse: builder.mutation<
      GraphQLResponse<SubmitResponseResponse>,
      SubmitResponseInput
    >({
      query: (input) => ({
        url: "",
        method: "POST",
        body: {
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
  useGetResponsesQuery,
} = api;
