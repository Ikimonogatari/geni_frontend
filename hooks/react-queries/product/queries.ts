import {
  PaginatedProductSchema,
  PrivateProductSchema,
  ProductDictSchema,
  ProductSchema,
  ProductTypeListResponseSchema,
} from "@/api/dtos";
import { createGetQueryHook, createPaginationQueryHook } from "@/api/helpers";

// GET /api/web/public/producttype
export const useListProductTypes = createGetQueryHook({
  endpoint: "/api/web/public/producttype",
  responseSchema: ProductTypeListResponseSchema,
  rQueryParams: { queryKey: ["productTypes"] },
});

// GET /api/admin/private/productdict?dictType={dictType}
export const useListProductDicts = createGetQueryHook<
  typeof ProductDictSchema,
  undefined,
  { dictType: string }
>({
  endpoint: `/api/admin/private/productdict`,
  responseSchema: ProductDictSchema,
  rQueryParams: { queryKey: ["productDicts"] },
});

// GET /api/web/public/product?searchKey=&limit=1000&offset=0 (paginated)
export const useListPublicProducts = createPaginationQueryHook({
  endpoint: "/api/web/public/product",
  dataSchema: PaginatedProductSchema,
  rQueryParams: { queryKey: ["publicProducts"] },
});

// GET /api/web/public/product/{productId}
export const useGetPublicProductById = createGetQueryHook<
  typeof ProductSchema,
  {
    productId: string;
  }
>({
  endpoint: `/api/web/public/product/:productId`,
  responseSchema: ProductSchema,
  rQueryParams: { queryKey: ["publicProduct"] },
});

// GET /api/web/private/product?limit=&offset=(paginated)
export const useListBrandProducts = createPaginationQueryHook({
  endpoint: "/api/web/private/product",
  customSchema: PrivateProductSchema,
  rQueryParams: { queryKey: ["brandProducts"] },
});
