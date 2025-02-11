"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetWalletInfoQuery } from "@/app/services/service";
import AddBalance from "./AddBalance";
function CreatorWallet() {
  const router = useRouter();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const {
    data: getWalletInfoData,
    error: getWalletInfoError,
    isLoading: getWalletInfoLoading,
    //@ts-ignore
  } = useGetWalletInfoQuery();

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32 mb-12">
        <div className="max-w-4xl min-h-screen mx-auto px-7 py-11 container">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <p className="text-3xl sm:text-4xl xl:text-5xl font-bold my-7">
            Geni хэтэвч
          </p>
          <div className="rounded-3xl bg-[#F5F4F0] p-5 w-full flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
              <Image
                src={"/geni-credit-card.png"}
                width={310}
                height={160}
                alt=""
                className="aspect-[310/160] w-full sm:w-auto"
              />
              <div className="flex flex-row gap-3 sm:gap-1 justify-normal items-center sm:items-start sm:flex-col">
                <span className="text-lg sm:text-lg">Geni Credit Point:</span>
                <span className="font-bold text-xl sm:text-3xl">
                  {Number(getWalletInfoData?.CurrBal).toLocaleString()}
                </span>
              </div>
            </div>
            <div className="flex flex-row justify-center sm:justify-end md:justify-normal md:flex-col gap-4">
              <AddBalance />
              <button className="aspect-[200/50] text-sm sm:text-base w-[200px] rounded-lg border-[1px] border-[#2D262D] flex justify-center items-center">
                Шилжүүлэг хийх
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorWallet;
