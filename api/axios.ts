import axios from "axios";
import qs from "qs";

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
