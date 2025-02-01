import { CreatorResponseSchema } from "@/api/dtos";
import { createGetQueryHook, createPaginationQueryHook } from "@/api/helpers";

// GET /api/web/public/creator?offset=0&limit=100 (paginated)
export const useGetPublicCreatorList = createPaginationQueryHook<
  typeof CreatorResponseSchema
>({
  endpoint: "/api/web/public/creator",
  dataSchema: CreatorResponseSchema,
  rQueryParams: { queryKey: ["publicCreators"] },
});

// GET /api/web/public/creator/{id}
export const useGetPublicCreatorById = createGetQueryHook<
  typeof CreatorResponseSchema,
  { id: string }
>({
  endpoint: "/api/web/public/creator/:id",
  responseSchema: CreatorResponseSchema,
  rQueryParams: { queryKey: ["publicCreator"] },
});
