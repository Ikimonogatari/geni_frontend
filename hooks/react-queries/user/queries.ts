import {
  UserListBrandTypeResponseSchema,
  UserResponseSchema,
  UserWalletResponseSchema,
} from "@/api/dtos";
import { createGetQueryHook } from "@/api/helpers";

// GET /api/web/private/user
export const useGetUserInfo = createGetQueryHook({
  endpoint: "/api/web/private/user",
  responseSchema: UserResponseSchema,
  rQueryParams: {
    queryKey: ["userInfo"],
  },
});

// GET /api/web/private/user/brand/type
export const useListBrandTypes = createGetQueryHook({
  endpoint: "/api/web/private/user/brand/type",
  responseSchema: UserListBrandTypeResponseSchema,
  rQueryParams: { queryKey: ["brandTypes"] },
});

// GET /api/web/private/wallet
export const useGetWalletInfo = createGetQueryHook({
  endpoint: "/api/web/private/wallet",
  responseSchema: UserWalletResponseSchema,
  rQueryParams: { queryKey: ["walletInfo"] },
});
