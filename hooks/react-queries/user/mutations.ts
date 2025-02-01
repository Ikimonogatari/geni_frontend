import {
  UnknownResponseSchema,
  UnknownSchema,
  UserBrandPutRequestSchema,
  UserBrandTypesPutRequestSchema,
  UserChangeEmailPutRequestSchema,
  UserChangePasswordPostRequestSchema,
  UserCreatorPutRequestSchema,
  UserForgotPasswordPostRequestSchema,
  UserPfpPutRequestSchema,
  UserSocialRequestSchema,
} from "@/api/dtos";
import { createPostMutationHook, createPutMutationHook } from "@/api/helpers";

// POST /api/web/private/user/term-check
export const useBrandTermCheck = createPostMutationHook({
  endpoint: "/api/web/private/user/term-check",
  bodySchema: UnknownSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/private/user/no-guide
export const useBrandGuideCheck = createPostMutationHook({
  endpoint: "/api/web/private/user/no-guide",
  bodySchema: UnknownSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/user/creator
export const useEditCreatorProfile = createPutMutationHook({
  endpoint: "/api/web/private/user/creator",
  bodySchema: UserCreatorPutRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/user/brand
export const useEditBrandProfile = createPutMutationHook({
  endpoint: "/api/web/private/user/brand",
  bodySchema: UserBrandPutRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/user/pfp
export const useChangeProfilePicture = createPutMutationHook({
  endpoint: "/api/web/private/user/pfp",
  bodySchema: UserPfpPutRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/user/change-email
export const useChangeEmail = createPutMutationHook({
  endpoint: "/api/web/private/user/change-email",
  bodySchema: UserChangeEmailPutRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/private/user/change-pass
export const useChangePassword = createPostMutationHook({
  endpoint: "/api/web/private/user/change-pass",
  bodySchema: UserChangePasswordPostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/user/brand/types
export const useChangeBrandType = createPutMutationHook({
  endpoint: "/api/web/private/user/brand/types",
  bodySchema: UserBrandTypesPutRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/social-channel
export const useUpdateSocialChannel = createPutMutationHook({
  endpoint: "/api/web/private/social-channel",
  bodySchema: UserSocialRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/private/social-channel
export const useCreateSocialChannel = createPostMutationHook({
  endpoint: "/api/web/private/social-channel",
  bodySchema: UserSocialRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/public/forgotpass
export const useForgotPassword = createPostMutationHook({
  endpoint: "/api/web/public/forgotpass",
  bodySchema: UserForgotPasswordPostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});
