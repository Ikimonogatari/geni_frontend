import {
  ProductRequestPostRequestSchema,
  ProductRequestStatusPutRequestSchema,
  ContentSubmitPostRequestSchema,
  UnknownResponseSchema,
  ContentReceivePostRequestSchema,
  BrandRequestReviewPutRequestSchema,
} from "@/api/dtos";
import {
  createDeleteMutationHook,
  createPostMutationHook,
  createPutMutationHook,
} from "@/api/helpers";

// POST /api/web/private/content/submit
export const useCreatorContentSubmit = createPostMutationHook({
  endpoint: "/api/web/private/content/submit",
  bodySchema: ContentSubmitPostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/private/content/receive
export const useBrandReceiveContent = createPostMutationHook({
  endpoint: "/api/web/private/content/receive",
  bodySchema: ContentReceivePostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/private/content/prod-request
export const useRequestProductContent = createPostMutationHook({
  endpoint: "/api/web/private/content/prod-request",
  bodySchema: ProductRequestPostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// PUT /api/web/private/content/prod-request/status
export const useUpdateContentStatus = createPutMutationHook({
  endpoint: "/api/web/private/content/prod-request/status",
  bodySchema: ProductRequestStatusPutRequestSchema,
  responseSchema: UnknownResponseSchema,
});

export const useBrandRequestReview = createPutMutationHook({
  endpoint: "/api/web/private/user/brand/review",
  bodySchema: BrandRequestReviewPutRequestSchema,
  responseSchema: UnknownResponseSchema,
});

// DELETE /api/web/private/content/{id}
export const useUndoContentRequest = createDeleteMutationHook({
  endpoint: "/api/web/private/content/:id",
  rMutationParams: {},
});
