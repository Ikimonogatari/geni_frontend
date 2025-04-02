// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import StudentRegister from "../register/student/page";

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
    brandVerification: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/brand-verification",
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
    publicUploadByPresignUrl: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/file/presign",
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
      query: () => ({
        url: `/api/web/public/product?searchKey=&limit=1000&offset=0`,
        method: "GET",
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
      query: () => ({
        url: "/api/web/private/subscription-package",
        method: "GET",
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
    getPublicVideoPresignedUrl: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/file/url",
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
    becomeCreator: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/student/becomecreator",
        method: "POST",
        body,
      }),
    }),
    studentRegister: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/student-register",
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
      query: ({ limit, offset }) => ({
        url: `/api/web/private/content/my?&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
    }),
    listBrandTypes: builder.query({
      query: () => ({
        url: "/api/web/private/user/brand/type",
        method: "GET",
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
    disableProduct: builder.mutation({
      query: (productId) => ({
        url: `/api/web/private/product/active?productId=${productId}`,
        method: "PUT",
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
    undoContentRequest: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/${id}`,
        method: "DELETE",
      }),
    }),
    getCompetitionInfo: builder.query({
      query: () => ({
        url: `/api/web/public/competition/active`,
        method: "GET",
      }),
    }),
    getWalletInfo: builder.query({
      query: () => ({
        url: `/api/web/private/wallet`,
        method: "GET",
      }),
    }),
    creatorWithdraw: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/wallet",
        method: "POST",
        body,
      }),
    }),
    getCreatorWalletHistory: builder.query({
      query: ({ limit, offset }) => ({
        url: `/api/web/private/wallet/txn-hist?&limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
    }),
    brandTermCheck: builder.mutation({
      query: () => ({
        url: "/api/web/private/user/term-check",
        method: "POST",
      }),
    }),
    useFreeContent: builder.mutation({
      query: () => ({
        url: "/api/web/private/subscribe/free",
        method: "POST",
      }),
    }),
    guideCheck: builder.mutation({
      query: () => ({
        url: "/api/web/private/user/no-guide",
        method: "POST",
      }),
      invalidatesTags: ["UserInfo"],
    }),
    brandRegister: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/brand/signup",
        method: "POST",
        body,
      }),
    }),
    brandRequestReview: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/brand/review",
        method: "PUT",
        body,
      }),
    }),
    getBrandCreditInfo: builder.query({
      query: () => ({
        url: "/api/web/private/user/credit",
        method: "GET",
      }),
    }),
    getBrandCreditHistory: builder.query({
      query: ({ limit, offset }) => ({
        url: `/api/web/private/user/brand/credit/hist?limit=${limit}&offset=${offset}`,
        method: "GET",
      }),
    }),
    getBankList: builder.query({
      query: () => ({
        url: "/api/web/private/banks",
        method: "GET",
      }),
    }),
    creatorApply: builder.mutation({
      query: (body) => ({
        url: "/api/web/public/creator-application",
        method: "POST",
        body,
      }),
    }),
    purchaseCourse: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/student/qpay",
        method: "POST",
        body,
      }),
    }),
    checkBankAccountName: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/cgw/check-name",
        method: "POST",
        body,
      }),
    }),
    getConnectedBankAccount: builder.query({
      query: () => ({
        url: "/api/web/private/cust-bank",
        method: "GET",
      }),
    }),
    connectBankAccount: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/cust-bank",
        method: "POST",
        body,
      }),
    }),
    updateBankAccount: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/cust-bank",
        method: "PUT",
      }),
    }),
    creatorXpHistory: builder.query({
      // query: ({ limit, offset }) => ({
      query: () => ({
        // url: `/api/web/private/creator-xp?limit=${limit}&offset=${offset}`,
        url: `/api/web/private/creator-xp`,
        method: "GET",
      }),
    }),
    qpayDeliveryPayment: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/qpay-delivery-payment/${id}`,
        method: "POST",
      }),
    }),
    dictList: builder.mutation({
      query: ({ ...params }) => ({
        url: `/api/web/public/dict?${new URLSearchParams(params)}`,
        method: "GET",
      }),
    }),
    contentProcessRefund: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/content/content-process/refund`,
        method: "POST",
        body,
      }),
    }),
    receivedProduct: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/content-process/received/${id}`,
        method: "POST",
      }),
    }),
    getContentProcess: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/content/process",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useCreatorLoginMutation,
  useBrandRegisterMutation,
  useBrandRequestReviewMutation,
  useBrandVerificationMutation,
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
  usePublicUploadByPresignUrlMutation,
  useListPaymentPlansQuery,
  useSubscribePlanMutation,
  useCreatorContentSubmitMutation,
  useGetVideoPresignedUrlMutation,
  useGetPublicVideoPresignedUrlMutation,
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
  useDisableProductMutation,
  useEditProductMutation,
  useBecomeCreatorMutation,
  useUndoContentRequestMutation,
  useGetCompetitionInfoQuery,
  useGetWalletInfoQuery,
  useBrandTermCheckMutation,
  useUseFreeContentMutation,
  useGuideCheckMutation,
  useGetBrandCreditInfoQuery,
  useCreatorApplyMutation,
  useStudentRegisterMutation,
  usePurchaseCourseMutation,
  useGetBankListQuery,
  useCheckBankAccountNameMutation,
  useGetConnectedBankAccountQuery,
  useConnectBankAccountMutation,
  useUpdateBankAccountMutation,
  useCreatorWithdrawMutation,
  useGetCreatorWalletHistoryQuery,
  useGetBrandCreditHistoryQuery,
  useCreatorXpHistoryQuery,
  useQpayDeliveryPaymentMutation,
  useDictListMutation,
  useContentProcessRefundMutation,
  useReceivedProductMutation,
  useGetContentProcessMutation,
} = geniApi;
