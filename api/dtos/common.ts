import { z } from "zod";

export const UnknownSchema = z.any();
export type UnknownSchema = z.infer<typeof UnknownSchema>;

export const UnknownResponseSchema = z.any();
export type UnknownResponseSchema = z.infer<typeof UnknownResponseSchema>;

export const NotificationResponseSchema = z.array(
  z.object({
    NotifId: z.number().int(),
    UserId: z.number().int(),
    Title: z.string(),
    Body: z.string(),
    NotifImageFile: z.number().int(),
    IsSeen: z.boolean(),
    CreatedBy: z.number().int(),
    CreatedAt: z.string(),
    ModifiedBy: z.number().int(),
    SeenAt: z.string(),
  })
);

export const CreatorResponseSchema = z.object({
  CreatorId: z.number().int(),
  ProfileLink: z.string(),
  FirstName: z.string(),
  LastName: z.string(),
  Nickname: z.string(),
  Bio: z.string().nullable(),
  LevelName: z.string(),
  Point: z.number().int(),
  Socials: z.nullable(
    z.object({
      Name: z.string(),
      SocialAddress: z.string(),
    })
  ),
  ContentCount: z.number().int(),
  AverageRating: z.string(),
  CollabBrands: z.nullable(z.any()),
});

export const PresignUrlUploadRequestSchema = z.object({
  FolderName: z.string(),
});
export const PresignUrlDownloadRequestSchema = z.object({
  FileId: z.number().int(),
});
export const OtpRequestSchema = z.object({
  To: z.string().email(),
  UserType: z.enum(["Sys", "Brand", "Creator"]),
  Channel: z.enum(["smtp", "sms"]),
  Type: z.string(),
});
