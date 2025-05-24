"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

export default function OAuthLogin() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      Cookies.set("auth", token, { expires: 1 / 24 });
      Cookies.set("userType", "Sys", { expires: 1 / 24 });

      const newUrl = window.location.pathname;
      window.history.replaceState({}, "", newUrl);

      router.push("/profile");
    }
  }, [searchParams, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Нэвтэрч байна...</h1>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
      </div>
    </div>
  );
}
