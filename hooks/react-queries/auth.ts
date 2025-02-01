import { LoginRequestSchema, UnknownResponseSchema } from "@/api/dtos";
import { createPostMutationHook } from "@/api/helpers";

// POST /api/web/public/login
export const useCreatorLogin = createPostMutationHook({
  endpoint: "/api/web/public/login",
  bodySchema: LoginRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});
