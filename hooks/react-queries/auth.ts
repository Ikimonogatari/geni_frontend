import { client } from "@/api/axios";
import { LoginRequestSchema, UnknownResponseSchema } from "@/api/dtos";
import { createPostMutationHook } from "@/api/helpers";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

// POST /api/web/public/login
export const useLogin = createPostMutationHook({
  endpoint: "/api/web/public/login",
  bodySchema: LoginRequestSchema,
  responseSchema: UnknownResponseSchema,
  rMutationParams: {
    onSuccess: (data, _, __, queryClient) => {
      client.defaults.headers["Authorization"] = `Bearer ${data.JWT}`;
      Cookies.set("auth", data.JWT, { expires: 1 / 24 });
      queryClient.resetQueries({ queryKey: ["userInfo"] });
    },
    onError: (error) => {
      toast.error(error.error);
    },
  },
});
