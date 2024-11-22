// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints

export const geniApi = createApi({
  reducerPath: "geniApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AWS_URL,
    prepareHeaders: (headers) => {
      const auth = Cookies.get("auth");
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
      invalidatesTags: ["UserInfo"],
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
    changeBrandType: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/brand/types",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["UserInfo"],
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
      query: ({ limit, offset }) => ({
        url: `/api/web/private/content?&limit=${limit}&offset=${offset}`,
        method: "GET",
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

    listPaymentPlans: builder.query({
      query: (body) => ({
        url: "/api/web/private/subscription-plan",
        method: "GET",
        body,
      }),
    }),
    subscribePlan: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/subscribe",
        method: "POST",
        body,
      }),
    }),
    creatorContentSubmit: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/content/submit",
        method: "POST",
        body,
      }),
    }),
    getImagePresignedUrl: builder.mutation({
      query: (body) => ({
        url: "/api/admin/private/file/url",
        method: "POST",
        body,
      }),
    }),
    getVideoPresignedUrl: builder.mutation({
      query: (body) => ({
        url: "/api/admin/private/file/url",
        method: "POST",
        body,
      }),
    }),
    brandReceiveContent: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/content/receive",
        method: "POST",
        body,
      }),
    }),
    checkPayment: builder.query({
      query: (txId) => ({
        url: `/api/admin/qpay/callback/${txId}`,
        method: "GET",
      }),
    }),
    listNotification: builder.query({
      query: (body) => ({
        url: "/api/web/private/notif",
        method: "GET",
        body,
      }),
    }),
    listBrandProducts: builder.query({
      query: ({ limit, offset }) => ({
        url: `/api/web/private/product?&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
    }),
    listBrandContents: builder.query({
      query: ({ limit, offset }) => ({
        url: `/api/web/private/content?&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
    }),
    uploadHomework: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/student/homework",
        method: "POST",
        body,
      }),
    }),
    addProductSupply: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/product/supply",
        method: "POST",
        body,
      }),
    }),
    listContentGallery: builder.query({
      query: () => ({
        url: `/api/web/private/content/my`,
        method: "GET",
      }),
    }),
    listBrandTypes: builder.query({
      query: (body) => ({
        url: "/api/web/private/user/brand/type",
        method: "GET",
        body,
      }),
    }),
    sendOtpToEmail: builder.mutation({
      query: (body) => ({
        url: "/api/admin/public/otp",
        method: "POST",
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/forgotpass",
        method: "POST",
        body,
      }),
    }),
    getPublicBrandList: builder.query({
      query: (body) => ({
        url: "/api/web/public/brand?limit=1000&offset=0",
        method: "GET",
        body,
      }),
    }),
    getPublicCreatorList: builder.query({
      query: (body) => ({
        url: "/api/web/public/creator?offset=0&limit=100",
        method: "GET",
        body,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/web/private/product/${productId}`,
        method: "DELETE",
      }),
    }),
    editProduct: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/product`,
        method: "PUT",
        body,
      }),
    }),
    getPublicCreatorById: builder.query({
      query: (id) => ({
        url: `/api/web/public/creator/${id}`,
        method: "GET",
      }),
    }),
    listPublicCreatorContentGallery: builder.query({
      query: (id) => ({
        url: `/api/web/public/content/user/${id}?limit=1000&offset=0`,
        method: "GET",
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
  useUploadHomeworkMutation,
  useListProductTypesQuery,
  useCreateProductTypesMutation,
  useGetUserInfoQuery,
  useListProductDictsQuery,
  useChangeProfilePictureMutation,
  useChangePasswordMutation,
  useChangeEmailMutation,
  useCreateSocialChannelMutation,
  useUpdateSocialChannelMutation,
  useListCreatorContentsQuery,
  useListPublicProductsQuery,
  useGetPublicProductByIdQuery,
  useRequestProductContentMutation,
  useUpdateContentStatusMutation,
  useListBrandContentsQuery,
  useUploadByPresignUrlMutation,
  useListPaymentPlansQuery,
  useSubscribePlanMutation,
  useCreatorContentSubmitMutation,
  useGetVideoPresignedUrlMutation,
  useGetImagePresignedUrlMutation,
  useBrandReceiveContentMutation,
  useCheckPaymentQuery,
  useListNotificationQuery,
  useListBrandProductsQuery,
  useAddProductSupplyMutation,
  useSendOtpToEmailMutation,
  useListContentGalleryQuery,
  useListBrandTypesQuery,
  useChangeBrandTypeMutation,
  useForgotPasswordMutation,
  useGetPublicBrandListQuery,
  useGetPublicCreatorListQuery,
  useGetPublicCreatorByIdQuery,
  useListPublicCreatorContentGalleryQuery,
  useDeleteProductMutation,
  useEditProductMutation,
} = geniApi;
