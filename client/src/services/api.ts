import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { GraphQLResponse } from "../types/graphql";
import type { CreateFormResponse, GetFormsResponse } from "../types/api";

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
  }),
});

export const { useGetFormsQuery, useCreateFormMutation } = api;
