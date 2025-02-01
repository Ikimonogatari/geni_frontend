import { BrandResponseSchema } from "@/api/dtos/brand";
import { createPaginationQueryHook } from "@/api/helpers";

// GET /api/web/public/brand?limit=1000&offset=0 (paginated)
export const useGetPublicBrandList = createPaginationQueryHook<
  typeof BrandResponseSchema
>({
  endpoint: "/api/web/public/brand",
  dataSchema: BrandResponseSchema,
  rQueryParams: { queryKey: ["publicBrands"] },
});
