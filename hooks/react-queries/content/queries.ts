import {
  ContentGalleryResponseSchema,
  ContentResponseSchema,
  UnknownSchema,
} from "@/api/dtos";
import { createGetQueryHook, createPaginationQueryHook } from "@/api/helpers";

// GET /api/web/private/content?limit=&offset= (paginated)
export const useListContents = createPaginationQueryHook<
  typeof ContentResponseSchema
>({
  endpoint: "/api/web/private/content",
  rQueryParams: { queryKey: ["contents"] },
});

// GET /api/web/private/content/my
export const useListContentGallery = createPaginationQueryHook<
  typeof ContentGalleryResponseSchema
>({
  endpoint: "/api/web/private/content/my",
  dataSchema: ContentGalleryResponseSchema,
  rQueryParams: { queryKey: ["contentGallery"], retry: false },
});

// GET /api/web/public/content/user/{id}?limit=&offset= (paginated)
export const useListPublicCreatorContentGallery = createPaginationQueryHook<
  typeof UnknownSchema,
  {
    userId: string;
  }
>({
  endpoint: "/api/web/public/content/user/:userId",
  rQueryParams: { queryKey: ["publicCreatorContentGallery"] },
});
