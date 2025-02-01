import {
  ProductAddPostRequestSchema,
  ProductPostRequestSchema,
  ProductPutRequestSchema,
  ProductTypePostRequestSchema,
  UnknownResponseSchema,
} from "@/api/dtos";
import {
  createDeleteMutationHook,
  createPostMutationHook,
  createPutMutationHook,
} from "@/api/helpers";

//
// -- POST --
//

// POST /api/web/private/product
export const useCreateProduct = createPostMutationHook({
  endpoint: "/api/web/private/product",
  bodySchema: ProductPostRequestSchema,
  responseSchema: UnknownResponseSchema,
});

// POST /api/admin/private/producttype
export const useCreateProductTypes = createPostMutationHook({
  endpoint: "/api/admin/private/producttype",
  bodySchema: ProductTypePostRequestSchema,
  responseSchema: UnknownResponseSchema,
});

// POST /api/web/private/product/supply
export const useAddProductSupply = createPostMutationHook({
  endpoint: "/api/web/private/product/supply",
  bodySchema: ProductAddPostRequestSchema,
  responseSchema: UnknownResponseSchema,
});

//
// -- PUT --
//

// PUT /api/web/private/product
export const useEditProduct = createPutMutationHook({
  endpoint: "/api/web/private/product",
  bodySchema: ProductPutRequestSchema,
  responseSchema: UnknownResponseSchema,
});

//
// -- DELETE --
//

// DELETE /api/web/private/product/{productId}
export const useDeleteProduct = createDeleteMutationHook<
  undefined,
  { productId: string }
>({
  endpoint: "/api/web/private/product/:productId",
  rMutationParams: {},
});
