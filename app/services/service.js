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
        url: "/api/web/private/user/creator",
        method: "PUT",
        body,
      }),
    }),
    editBrandProfile: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/brand",
        method: "PUT",
        body,
      }),
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/product",
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
        url: "/api/web/public/producttype",
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
    getUserInfo: builder.query({
      query: (body) => ({
        url: "/api/web/private/user",
        method: "GET",
        body,
      }),
    }),
    listProducts: builder.query({
      query: (body) => ({
        url: "/api/admin/private/product",
        method: "GET",
        body,
      }),
    }),
    listProductDicts: builder.query({
      query: (Type) => ({
        url: `/api/admin/private/productdict?dictType=${Type}`,
        method: "GET",
      }),
    }),
    changeProfilePicture: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/user/pfp`,
        method: "PUT",
        body,
      }),
    }),
    listSocialChannels: builder.query({
      query: (body) => ({
        url: `/api/admin/private/socialplatform`,
        method: "GET",
        body,
      }),
    }),
    updateSocialChannel: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/social-channel`,
        method: "PUT",
        body,
      }),
    }),
    listCreatorContents: builder.query({
      query: (body) => ({
        url: `/api/web/private/content`,
        method: "GET",
        body,
      }),
    }),
    listPublicProducts: builder.query({
      query: (body) => ({
        url: `/api/web/public/product?searchKey=&limit=100&offset=0`,
        method: "GET",
        body,
      }),
    }),
    getPublicProductById: builder.query({
      query: (productId) => ({
        url: `/api/web/public/product/${productId}`,
        method: "GET",
      }),
    }),
    requestProductContent: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/content/prod-request`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreatorLoginMutation,
  useEditCreatorProfileMutation,
  useEditBrandProfileMutation,
  useCreateProductMutation,
  useUploadFileMutation,
  useListProductTypesQuery,
  useCreateProductTypesMutation,
  useGetUserInfoQuery,
  useListProductsQuery,
  useListProductDictsQuery,
  useChangeProfilePictureMutation,
  useListSocialChannelsQuery,
  useUpdateSocialChannelMutation,
  useListCreatorContentsQuery,
  useListPublicProductsQuery,
  useGetPublicProductByIdQuery,
  useRequestProductContentMutation,
} = geniApi;
