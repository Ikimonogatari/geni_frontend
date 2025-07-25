// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import StudentRegister from "../register/student/page";
import {
  GetBadgeListResponse,
  BadgeDetail,
} from "../profile/_components/creator/badge.services";

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
  tagTypes: ["UserInfo", "Address", "Badge"],
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
      providesTags: (_) => ["UserInfo"],
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
      query: ({ searchKey, limit, offset, category, brand }) => ({
        url: `/api/web/public/product?searchKey=${
          searchKey || ""
        }&limit=${limit}&offset=${offset}${
          category ? `&category=${category}` : ""
        }${brand ? `&brand=${brand}` : ""}`,
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
    getPublicBrandById: builder.query({
      query: (id) => ({
        url: `/api/web/public/brand/${id}`,
        method: "GET",
      }),
    }),
    listPublicCreatorContentGallery: builder.query({
      query: (id) => ({
        url: `/api/web/public/content/user/${id}?limit=1000&offset=0`,
        method: "GET",
      }),
    }),
    getPublicProfileContentGalleryById: builder.query({
      query: (id) => ({
        url: `/api/web/public/content/${id}`,
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
    termCheck: builder.mutation({
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
        url: "/api/web/private/geni-course/buy",
        method: "POST",
        body,
      }),
    }),
    checkCoupon: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/student/check-coupon",
        method: "POST",
        body,
      }),
    }),
    calculateCoupon: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/geni-course/calculate-coupon",
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
    getOnboardingCourse: builder.query({
      query: () => ({
        url: "/api/web/private/geni-course/onboarding",
        method: "GET",
      }),
    }),
    getStudentCourses: builder.query({
      query: () => ({
        url: "/api/web/private/geni-course/my",
        method: "GET",
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
    getFeaturedProductList: builder.query({
      query: (body) => ({
        url: "/api/web/public/product/featured?limit=30&offset=0",
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
    contentProcessOverdue: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/overdue/${id}`,
        method: "GET",
      }),
    }),
    contentProcessOverduePayment: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/overdue/payment/${id}`,
        method: "POST",
      }),
    }),
    contentFeedback: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/feedback/${id}`,
        method: "GET",
      }),
    }),
    brandReview: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/content/brand-review`,
        method: "POST",
        body,
      }),
    }),
    getBrandReview: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/brand-review/${id}`,
        method: "GET",
      }),
    }),
    contentResend: builder.mutation({
      query: (body) => ({
        url: `/api/web/private/content/brand-review/resend`,
        method: "POST",
        body,
      }),
    }),
    getBrandReviewBrand: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/brand-review/brand/${id}`,
        method: "GET",
      }),
    }),
    getFinalContentXp: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/brand-feedback/creator/${id}`,
        method: "GET",
      }),
    }),
    getContentProcess: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/content/process",
        method: "POST",
        body,
      }),
    }),
    getPasswordPolicy: builder.query({
      query: () => ({
        url: "/api/web/public/dict/pass-policy",
        method: "GET",
      }),
    }),
    rejectSelfContent: builder.mutation({
      query: (id) => ({
        url: `/api/web/private/content/reject-self/${id}`,
        method: "POST",
      }),
    }),
    // Address-related endpoints
    getCityList: builder.query({
      query: () => ({
        url: "/api/web/private/user/address-dict/city",
        method: "GET",
      }),
    }),
    getDistrictList: builder.query({
      query: (cityId) => ({
        url: `/api/web/private/user/address-dict/dist/${cityId}`,
        method: "GET",
      }),
    }),
    getSubDistrictList: builder.query({
      query: (distId) => ({
        url: `/api/web/private/user/address-dict/subdist/${distId}`,
        method: "GET",
      }),
    }),
    getUserAddress: builder.query({
      query: () => ({
        url: "/api/web/private/user/address",
        method: "GET",
      }),
      providesTags: ["Address"],
    }),
    createAddress: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/address",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation({
      query: (body) => ({
        url: "/api/web/private/user/address",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),
    getBannedTime: builder.query({
      query: () => ({
        url: "/api/web/private/user/banned-time",
        method: "GET",
      }),
    }),
    getCreatorBadges: builder.query<GetBadgeListResponse, void>({
      query: () => ({
        url: "api/web/private/badge",
        method: "GET",
      }),
      providesTags: ["Badge"],
    }),
    getCreatorBadgeById: builder.query<BadgeDetail, string>({
      query: (id) => ({
        url: `/api/web/private/badge/${id}`,
        method: "GET",
      }),
    }),
    subscribeStorepay: builder.mutation<StorepayResponse, StorepayBody>({
      query: (body) => ({
        url: `/api/web/private/subscribe/storepay`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPasswordPolicyQuery,
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
  useGetPublicBrandByIdQuery,
  useListPublicCreatorContentGalleryQuery,
  useGetPublicProfileContentGalleryByIdQuery,
  useDeleteProductMutation,
  useDisableProductMutation,
  useEditProductMutation,
  useBecomeCreatorMutation,
  useUndoContentRequestMutation,
  useGetCompetitionInfoQuery,
  useGetWalletInfoQuery,
  useTermCheckMutation,
  useUseFreeContentMutation,
  useGuideCheckMutation,
  useGetBrandCreditInfoQuery,
  useCreatorApplyMutation,
  useStudentRegisterMutation,
  usePurchaseCourseMutation,
  useCheckCouponMutation,
  useCalculateCouponMutation,
  useGetOnboardingCourseQuery,
  useGetStudentCoursesQuery,
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
  useContentProcessOverdueMutation,
  useContentProcessOverduePaymentMutation,
  useContentFeedbackMutation,
  useBrandReviewMutation,
  useGetBrandReviewMutation,
  useContentResendMutation,
  useGetBrandReviewBrandMutation,
  useGetFinalContentXpMutation,
  useGetContentProcessMutation,
  useGetFeaturedProductListQuery,
  useRejectSelfContentMutation,
  useGetCityListQuery,
  useGetDistrictListQuery,
  useGetSubDistrictListQuery,
  useGetUserAddressQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useGetBannedTimeQuery,
  useGetCreatorBadgesQuery,
  useGetCreatorBadgeByIdQuery,
  useSubscribeStorepayMutation,
} = geniApi;
