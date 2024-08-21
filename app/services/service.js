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
  tagTypes: ["UserInfo"],
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
      invalidatesTags: ["UserInfo"],
    }),
    editBrandProfile: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/brand",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserInfo"],
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
    uploadByPresignUrl: builder.mutation({
      query: (body) => ({
        url: "/api/admin/private/file/presign",
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
      query: () => ({
        url: "/api/web/private/user",
        method: "GET",
      }),
      providesTags: ["UserInfo"],
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
      invalidatesTags: ["UserInfo"],
    }),
    changeEmail: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/change-email",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserInfo"], // Invalidate the tag
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/change-pass",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserInfo"], // Invalidate the tag
    }),
    updateSocialChannel: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/social-channel`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserInfo"],
    }),
    createSocialChannel: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/social-channel`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["UserInfo"],
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
    updateContentStatus: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/content/prod-request/status",
        method: "PUT",
        body,
      }),
    }),
    listBrandContents: builder.query({
      query: (body) => ({
        url: `/api/admin/private/content?offset=0`,
        method: "GET",
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
  useListProductDictsQuery,
  useChangeProfilePictureMutation,
  useChangePasswordMutation,
  useCreateSocialChannelMutation,
  useUpdateSocialChannelMutation,
  useListCreatorContentsQuery,
  useListPublicProductsQuery,
  useGetPublicProductByIdQuery,
  useRequestProductContentMutation,
  useUpdateContentStatusMutation,
  useListBrandContentsQuery,
  useUploadByPresignUrlMutation,
} = geniApi;
