"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useGetWalletInfoQuery } from "@/app/services/service";
import CreditPurchase from "@/components/credit/CreditPurchaseModal";

function BrandWallet() {
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
        <div className="max-w-3xl min-h-screen mx-auto px-7 py-11 container">
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
            Таны Geni Credit
          </p>
          <div className="rounded-3xl bg-[#F5F4F0] p-5 w-full flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-8">
            <Image
              src={"/brands-image1.png"}
              width={237}
              height={249}
              alt=""
              className="w-full max-w-[237px] max-h-[249px]"
            />
            <div className="flex flex-col gap-4 w-full">
              <div className="rounded-3xl p-4 sm:p-8 border border-geni-gray flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-5 text-base sm:text-xl">
                  <span className="font-bold col-span-2">Үлдэгдэл:</span>
                  <span className="col-span-1">{parsedUserInfo?.Credit}</span>
                </div>
                <div className="grid grid-cols-3 gap-5 text-base sm:text-xl">
                  <span className="font-bold col-span-2">Ашигласан:</span>
                  <span className="col-span-1">
                    {parsedUserInfo?.CreditSpent}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-5 text-base sm:text-xl">
                  <span className="font-bold col-span-2">
                    Сүүлд цэнэглэсэн:
                  </span>
                  <div className="col-span-1 flex flex-col gap-4">
                    <span>{parsedUserInfo?.LatestSubscription?.Credit}</span>
                    <span>
                      {parsedUserInfo?.LatestSubscription?.StartedDate}
                    </span>
                  </div>
                </div>
              </div>
              <CreditPurchase
                buttonText={"Geni Credit цэнэглэх"}
                buttonIconSize={"w-4 h-4"}
                className={
                  "text-lg flex flex-row items-center justify-center py-4 w-full"
                }
                userInfo={parsedUserInfo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandWallet;
