import { z } from "zod";

export const ProductDictSchema = z.nullable(
  z.array(
    z.object({
      Type: z.string(),
      Val: z.string(),
      Name: z.string(),
    })
  )
);

export const PaginatedProductSchema = z.object({
  AddInfoSource: z.string().nullable(),
  Amount: z.string(),
  BrandId: z.number().int(),
  BrandName: z.string(),
  CreatedAt: z.string(),
  CreatedBy: z.number().int(),
  Information: z.string(),
  LeftStock: z.number().int(),
  ModifiedAt: z.string(),
  ModifiedBy: z.number().int(),
  Price: z.string(),
  ProductId: z.string(),
  ProductName: z.string(),
  ProductPics: z.array(
    z.object({
      FileId: z.number().int(),
      Url: z.string(),
    })
  ),
  ProductTypes: z.array(
    z.object({
      ProductId: z.string(),
      ProductTypeId: z.number().int(),
      CreatedBy: z.number().int(),
      CreatedAt: z.string(),
      ModifiedBy: z.number().int(),
      ModifiedAt: z.string(),
      TypeName: z.string(),
    })
  ),
  Quantity: z.number().int(),
  RequestForCreators: z.string(),
  Status: z.string(),
});

export type PaginatedProductSchema = z.infer<typeof PaginatedProductSchema>;

export const ProductSchema = z.object({
  ProductId: z.string().uuid(),
  ProductName: z.string(),
  Information: z.string(),
  RequestForCreators: z.string(),
  BrandName: z.string(),
  Quantity: z.number().int(),
  LeftStock: z.number().int(),
  Price: z.string(),
  AddInfoSource: z.string().nullable(),
  Amount: z.string(),
  BrandProfileUrl: z.string(),
  ContentType: z.array(
    z.object({
      Type: z.string(),
      Val: z.string(),
      Name: z.string(),
    })
  ),
  ContentResult: z.array(
    z.object({
      Type: z.string(),
      Val: z.string(),
      Name: z.string(),
    })
  ),
  ProductTypes: z.array(
    z.object({
      ProductTypeId: z.number().int(),
      TypeName: z.string(),
    })
  ),
  ProductPics: z.array(
    z.object({
      FileId: z.number().int(),
      Url: z.string(),
    })
  ),
  CreatedBy: z.number().int(),
  CreatedAt: z.string().datetime(),
  ModifiedBy: z.number().int(),
  ModifiedAt: z.string().datetime(),
});

export type ProductSchema = z.infer<typeof ProductSchema>;

export const ProductTypeListResponseSchema = z.array(
  z.object({
    ProductTypeId: z.number().int(),
    TypeName: z.string(),
    CreatedBy: z.number().int(),
    CreatedAt: z.string(),
    ModifiedBy: z.number().int(),
    ModifiedAt: z.string(),
  })
);

export const PrivateProductSchema = z.object({
  Data: z.array(z.any()),
  ProdRequestInfo: z.array(
    z.object({
      Type: z.string(),
      Cnt: z.number().int(),
    })
  ),
  RowCount: z.number().int(),
});

export const ProductPostRequestSchema = z.object({
  Amount: z.string(),
  AddInfoSource: z.string().nullable(),
  ProductName: z.string(),
  Information: z.string(),
  RequestForCreators: z.string(),
  Quantity: z.number().int(),
  Price: z.string(),
  ContentInfo: z.array(
    z.object({
      Type: z.string(),
      Name: z.string(),
    })
  ),
  ProductTypes: z.array(z.number().int()),
  ProductPics: z.array(z.number().int()),
});

export const ProductTypePostRequestSchema = z.object({
  TypeName: z.string().min(1, "Type name is required"),
});

export const ProductAddPostRequestSchema = z.object({
  ProductId: z.string(),
  Credit: z.number().int().min(1, "Credit count must be at least 1"),
});

export const ProductPutRequestSchema = z.object({
  ProductName: z.string().min(1, "Product name is required"),
  ProductId: z.string(),
  LeftStock: z
    .number()
    .int()
    .min(0, "Left stock must be a non-negative integer"),
});
