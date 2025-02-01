import { z } from "zod";

export const SubscriptionPostRequestSchema = z.object({
  PlanId: z.number().int(),
});
