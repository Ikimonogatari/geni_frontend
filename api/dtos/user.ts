import { z } from "zod";

export const UserType = z.enum(["Student", "Creator", "Brand"]);

export const UserResponseSchema = z.object({
  AdditionalPhoneNum: z.string().nullable().optional(),
  AverageRating: z.string().nullable().optional(),
  Bio: z.string().nullable().optional(),
  Birthday: z.string().nullable().optional(),
  ContentCount: z.number().int().optional(),
  CreatedBy: z.number().int(),
  EbarimtConsumerNo: z.string().nullable().optional(),
  EduId: z.number().int().optional(),
  Email: z.string().email().optional(),
  FirstName: z.string().optional(),
  Gender: z.enum(["M", "F"]).nullable().optional(),
  HasSeenGuide: z.boolean(),
  IconFileId: z.number().int().optional(),
  IsStudent: z.boolean().optional(),
  IsVerified: z.boolean(),
  Name: z.string().optional(),
  LastName: z.string().optional(),
  LevelName: z.string().optional(),
  Location: z.string().nullable().optional(),
  LvlId: z.number().int().optional(),
  ModifiedBy: z.number().int().optional(),
  Nickname: z.string().optional(),
  PhoneNumber: z.string().optional(),
  Point: z.number().int().optional(),
  ProfileLink: z.string().nullable().optional(),
  ProfilePictureId: z.number().int().optional(),
  RegNo: z.string().nullable().optional(),
  SocialChannels: z
    .array(
      z.object({
        UserId: z.number().int(),
        PlatformId: z.number().int(),
        OrderNo: z.number().int(),
        SocialAddress: z.string(),
        CreatedBy: z.number().int(),
        ModifiedBy: z.number().int(),
        PlatformName: z.string(),
      })
    )
    .optional()
    .nullable(),
  UserId: z.number().int(),
  UserType: z.enum(["Student", "Creator", "Brand"]).nullable().optional(),
  OnBoardingStatus: z.string().optional(),
  BrandTypes: z.array(z.any()).optional().nullable(),
  Credit: z.any(),
  HasGivenHomework: z.boolean().optional(),
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
  FirstName: z.string().optional(),
  LastName: z.string().optional(),
  Nickname: z.string().optional(),
  Email: z.string().email(),
  Bio: z.string().nullable().optional(),
  RegNo: z.string().nullable().optional(),
  PhoneNumber: z.string().nullable().optional(),
  AdditionalPhoneNum: z.string().nullable().optional(),
  Location: z.string().nullable().optional(),
  EbarimtConsumerNo: z.string().nullable().optional(),
  Birthday: z.string().nullable().optional(),
  EduId: z.number().int().nullable().optional(),
  // Gender: z.enum(["M", "F"]).nullable().optional(),
  Gender: z.string().nullable().optional(),
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
