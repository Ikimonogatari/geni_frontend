import {
  NotificationResponseSchema,
  OtpRequestSchema,
  UnknownResponseSchema,
  UnknownSchema,
} from "@/api/dtos";
import { createGetQueryHook, createPostMutationHook } from "@/api/helpers";

// GET /api/web/private/notif
export const useListNotification = createGetQueryHook({
  endpoint: "/api/web/private/notif",
  responseSchema: NotificationResponseSchema,
  rQueryParams: { queryKey: ["notifications"] },
});

// POST /api/admin/public/otp
export const useSendOtpToEmail = createPostMutationHook({
  endpoint: "/api/admin/public/otp",
  bodySchema: OtpRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {},
});

// GET /api/admin/qpay/callback/{txId}
export const useCheckPayment = createGetQueryHook({
  endpoint: "/api/admin/qpay/callback/:txId",
  responseSchema: UnknownResponseSchema,
  rQueryParams: { queryKey: ["checkPayment"] },
});

// GET /api/web/public/competition/active
export const useGetCompetitionInfo = createGetQueryHook({
  endpoint: "/api/web/public/competition/active",
  responseSchema: UnknownSchema,
  rQueryParams: { queryKey: ["competitionInfo"] },
});
