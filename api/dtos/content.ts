import { z } from "zod";

export const ContentResponseSchema = z.object({
  AdditionalAddress: z.string(),
  BrandComment: z.string(),
  BrandGivenPoint: z.number().int(),
  BrandId: z.number().int(),
  BrandInstructionPnt: z.number().int(),
  BrandName: z.string(),
  BrandProfileLink: z.string(),
  BrandProfilePicId: z.number().int(),
  BrandTypes: z.array(
    z.object({
      BrandId: z.number().int(),
      BrandTypeId: z.number().int(),
      CreatedBy: z.number().int(),
      CreatedAt: z.string(),
      ModifiedBy: z.number().int(),
      ModifiedAt: z.string(),
      TypeName: z.string(),
    })
  ),
  Caption: z.string(),
  ContentId: z.string(),
  ContentPhase: z.string(),
  ContentThumbnail: z.string(),
  ContentThumbnailFileId: z.number().int(),
  ContentVideo: z.string(),
  ContentVideoFileId: z.number().int(),
  ContextPnt: z.number().int(),
  CreatedAt: z.string(),
  CreatedBy: z.number().int(),
  CreationPnt: z.number().int(),
  CreatorId: z.number().int(),
  Deadline: z.nullable(z.string()),
  FeedBacks: z.nullable(z.any()),
  FirstName: z.string(),
  LastName: z.string(),
  ModifiedAt: z.string(),
  ModifiedBy: z.number().int(),
  Nickname: z.string(),
  PointCnfId: z.number().int(),
  ProductId: z.string(),
  ProductName: z.string(),
  RequestReason: z.string(),
  Star: z.number().int(),
  Status: z.string(),
});

export type ContentResponseSchema = z.infer<typeof ContentResponseSchema>;

export const ContentGalleryResponseSchema = z.object({
  AdditionalAddress: z.string(),
  BrandComment: z.string(),
  BrandGivenPoint: z.number().int(),
  BrandId: z.number().int(),
  BrandInstructionPnt: z.number().int(),
  BrandName: z.string(),
  BrandProfileLink: z.string(),
  BrandProfilePicId: z.number().int(),
  BrandTypes: z.array(
    z.object({
      BrandId: z.number().int(),
      BrandTypeId: z.number().int(),
      CreatedBy: z.number().int(),
      CreatedAt: z.string(),
      ModifiedBy: z.number().int(),
      ModifiedAt: z.string(),
      TypeName: z.string(),
    })
  ),
  Caption: z.string(),
  ContentId: z.string(),
  ContentThumbnail: z.string(),
  ContentThumbnailFileId: z.number().int(),
  ContentVideo: z.string(),
  ContentVideoFileId: z.number().int(),
  ContextPnt: z.number().int(),
  CreatedAt: z.string(),
  CreatedBy: z.number().int(),
  CreationPnt: z.number().int(),
  CreatorId: z.number().int(),
  CreatorProfileLink: z.string().optional(),
  CreatorProfilePicId: z.number().int(),
  Deadline: z.nullable(z.string()),
  FirstName: z.string(),
  LastName: z.string(),
  LvlName: z.string(),
  ModifiedAt: z.string(),
  ModifiedBy: z.number().int(),
  Nickname: z.string(),
  PointCnfId: z.number().int(),
  ProductId: z.string(),
  ProductName: z.string(),
  RequestReason: z.string(),
  Status: z.string(),
});

export type ContentGalleryResponseSchema = z.infer<
  typeof ContentGalleryResponseSchema
>;

export const ProductRequestPutRequestSchema = z.object({
  ContentId: z.string(),
  Status: z.string(),
});

export const ProductRequestPostRequestSchema = z.object({
  ProductId: z.string(),
  RequestReason: z.string(),
  AdditionalAddress: z.string().nullable(),
});

export const ProductRequestStatusPutRequestSchema = z.object({
  ContentId: z.string(),
  Status: z.string(),
});

export const BrandRequestReviewPutRequestSchema = z.object({});

export const ContentSubmitPostRequestSchema = z.object({
  ContentId: z.string(),
  Caption: z.string(),
  ContentThumbnailFileId: z.number().int(),
  ContentVideoFileId: z.number().int(),
});

export const ContentReceivePostRequestSchema = z.object({
  ContentId: z.string(),
  Comment: z.string(),
  InstructionStar: z.number().int(),
  ContextStar: z.number().int(),
  CreationStar: z.number().int(),
});

export const HomeworkUploadPostRequestSchema = z.object({
  Caption: z.string(),
  ContentThumbnailFileId: z.number().int(),
  ContentVideoFileId: z.number().int(),
});
