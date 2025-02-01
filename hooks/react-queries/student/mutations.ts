import {
  HomeworkUploadPostRequestSchema,
  UnknownResponseSchema,
  UnknownSchema,
} from "@/api/dtos";
import { createPostMutationHook } from "@/api/helpers";

// POST /api/web/private/student/becomecreator
export const useBecomeCreator = createPostMutationHook({
  endpoint: "/api/web/private/student/becomecreator",
  bodySchema: UnknownSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// POST /api/web/private/student/homework
export const useUploadHomework = createPostMutationHook({
  endpoint: "/api/web/private/student/homework",
  bodySchema: HomeworkUploadPostRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});
