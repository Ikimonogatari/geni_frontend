import { UnknownResponseSchema, UnknownSchema } from "@/api/dtos";
import { createGetQueryHook, createPostMutationHook } from "@/api/helpers";

// POST /api/web/private/subscribe/free
export const useUseFreeContent = createPostMutationHook({
  endpoint: "/api/web/private/subscribe/free",
  bodySchema: UnknownSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// GET /api/web/private/subscription-package
export const useListPaymentPlans = createGetQueryHook({
  endpoint: "/api/web/private/subscription-package",
  responseSchema: UnknownResponseSchema,
  rQueryParams: { queryKey: ["paymentPlans"] },
});
