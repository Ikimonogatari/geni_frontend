// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
const auth = Cookies.get("auth");
export const geniApi = createApi({
  reducerPath: "geniApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AWS_URL,
    prepareHeaders: (headers) => {
      if (auth) {
        headers.set("Authorization", `Bearer ${auth}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    creatorLogin: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/login",
        method: "POST",
        body,
      }),
    }),
    editCreatorProfile: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user",
        method: "PUT",
        body,
      }),
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/api/admin/private/product",
        method: "POST",
        body,
      }),
    }),
    uploadFile: builder.mutation({
      query: (body) => ({
        url: "/api/admin/private/file",
        method: "POST",
        body,
      }),
    }),
    listProductTypes: builder.query({
      query: (body) => ({
        url: "/api/admin/private/producttype",
        method: "GET",
        body,
      }),
    }),
    createProductTypes: builder.mutation({
      query: (body) => ({
        url: "/api/admin/private/producttype",
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useCreatorLoginMutation,
  useEditCreatorProfileMutation,
  useCreateProductMutation,
  useUploadFileMutation,
  useListProductTypesQuery,
  useCreateProductTypesMutation,
} = geniApi;
