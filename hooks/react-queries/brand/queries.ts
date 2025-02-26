import { UnknownSchema } from "@/api/dtos";
import { BrandResponseSchema } from "@/api/dtos/brand";
import {
  createPaginationQueryHook,
  createPostMutationHook,
} from "@/api/helpers";

// GET /api/web/public/brand?limit=1000&offset=0 (paginated)
export const useGetPublicBrandList = createPaginationQueryHook<
  typeof BrandResponseSchema
>({
  endpoint: "/api/web/public/brand",
  dataSchema: BrandResponseSchema,
  rQueryParams: { queryKey: ["publicBrands"] },
});

export const useListBrandContents = createPaginationQueryHook<
  typeof UnknownSchema
>({
  endpoint: "/api/web/private/content",
  dataSchema: UnknownSchema,
  rQueryParams: { queryKey: ["brandContents"] },
});

export const useBrandRegister = createPostMutationHook({
  endpoint: "/api/web/public/brand/signup",
  bodySchema: UnknownSchema,
  responseSchema: UnknownSchema,
});
