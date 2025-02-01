import {
  SubscriptionPostRequestSchema,
  UnknownResponseSchema,
} from "@/api/dtos";
import { createPostMutationHook } from "@/api/helpers";

// POST /api/web/private/subscribe
export const useSubscribePlan = createPostMutationHook({
  endpoint: "/api/web/private/subscribe",
  bodySchema: SubscriptionPostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});
