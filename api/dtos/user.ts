import { z } from "zod";

export const UserResponseSchema = z.object({
  AdditionalPhoneNum: z.string().nullable(),
  AverageRating: z.string().nullable(),
  Bio: z.string().nullable(),
  Birthday: z.string().nullable(),
  ContentCount: z.number().int(),
  CreatedBy: z.number().int(),
  EbarimtConsumerNo: z.string().nullable(),
  EduId: z.number().int(),
  Email: z.string().email(),
  FirstName: z.string(),
  Gender: z.enum(["M", "F"]).nullable(),
  HasSeenGuide: z.boolean(),
  IconFileId: z.number().int(),
  IsStudent: z.boolean(),
  IsVerified: z.boolean(),
  LastName: z.string(),
  LevelName: z.string(),
  Location: z.string().nullable(),
  LvlId: z.number().int(),
  ModifiedBy: z.number().int(),
  Nickname: z.string(),
  PhoneNumber: z.string(),
  Point: z.number().int(),
  ProfileLink: z.string().nullable(),
  ProfilePictureId: z.number().int(),
  RegNo: z.string().nullable(),
  SocialChannels: z.array(
    z.object({
      UserId: z.number().int(),
      PlatformId: z.number().int(),
      OrderNo: z.number().int(),
      SocialAddress: z.string(),
      CreatedBy: z.number().int(),
      ModifiedBy: z.number().int(),
      PlatformName: z.string(),
    })
  ),
  UserId: z.number().int(),
  UserType: z.enum(["Student", "Creator"]).nullable(),
});

export const UserListBrandTypeResponseSchema = z.array(
  z.object({
    TypeId: z.number().int(),
    TypeName: z.string(),
    CreatedBy: z.number().int(),
    ModifiedBy: z.number().int(),
  })
);

export const UserCreatorPutRequestSchema = z.object({
  FirstName: z.string(),
  LastName: z.string(),
  Nickname: z.string(),
  Email: z.string().email(),
  Bio: z.string().nullable(),
  RegNo: z.string().nullable(),
  PhoneNumber: z.string().nullable(),
  AdditionalPhoneNum: z.string().nullable(),
  Location: z.string().nullable(),
  EbarimtConsumerNo: z.string().nullable(),
  Birthday: z.date().nullable(),
  EduId: z.number().int().nullable(),
  Gender: z.enum(["M", "F"]).nullable(),
});

export const UserBrandPutRequestSchema = z.object({
  Name: z.string(),
  Bio: z.string().nullable(),
  Website: z.string().url().nullable(),
  PhoneNumber: z.string().nullable(),
  Address: z.string().nullable(),
  BrandAoADescription: z.string().nullable(),
  RegNo: z.string().nullable(),
});

export const UserPfpPutRequestSchema = z.object({
  FileId: z.number().int(),
});

export const UserChangeEmailPutRequestSchema = z.object({
  OTP: z.string(),
  NewEmail: z.string().email(),
});

export const UserChangePasswordPostRequestSchema = z.object({
  OldPassword: z.string(),
  NewPassword: z.string(),
});

export const UserBrandTypesPutRequestSchema = z.object({
  BrandTypeIds: z
    .array(z.number().int())
    .min(1, "At least one brand type is required"),
});

export const UserWalletResponseSchema = z.object({
  WalletId: z.string(),
  CreatorId: z.number().int(),
  IsOpen: z.boolean(),
  CurrBal: z.string(),
  HoldBal: z.string(),
  CreatedBy: z.number().int(),
  ModifiedBy: z.number().int(),
});

export const UserSocialRequestSchema = z.object({
  PlatformId: z.number().int(),
  SocialAddress: z.string(),
});

export const UserForgotPasswordPostRequestSchema = z.object({
  UserType: z
    .string()
    .refine((value) => ["Sys", "Creator", "Brand", "Student"].includes(value), {
      message: "User type must be one of Sys, Creator, Brand, Student",
    }),
  NewPassword: z.string().min(1, { message: "Required" }),
  OTP: z.string().min(1, { message: "Required" }),
  To: z.string().min(1, { message: "Required" }),
  Channel: z.string().min(1, { message: "Required" }),
});
