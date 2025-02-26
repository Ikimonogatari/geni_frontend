import { client } from "@/api/axios";
import { queryClient } from "@/api/query-client";
import Cookies from "js-cookie";

export const handleLogout = () => {
  Cookies.remove("auth");
  Cookies.remove("userType");
  Cookies.remove("user-info");
  client.defaults.headers["Authorization"] = "";
  queryClient.resetQueries({ queryKey: ["userInfo"] });
  window.location.replace("/login");
};
