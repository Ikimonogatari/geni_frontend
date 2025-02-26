import axios from "axios";
import qs from "qs";
import Cookies from "js-cookie";

export const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AWS_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Accept-Language": "mn",
  },

  paramsSerializer: (params) => {
    return qs.stringify(params, { arrayFormat: "repeat" });
  },
});

client.interceptors.request.use(
  (config) => {
    const auth = Cookies.get("auth");

    if (auth) {
      config.headers["Authorization"] = `Bearer ${auth}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
