import { z } from "zod";

export const BrandResponseSchema = z.object({
  ProfileLink: z.string(),
  Name: z.string(),
  Bio: z.string(),
  Socials: z.nullable(
    z.array(
      z.object({
        Platform: z.string(),
        Url: z.string(),
      })
    )
  ),
  BrandTypes: z.array(
    z.object({
      TypeName: z.string(),
    })
  ),
});
