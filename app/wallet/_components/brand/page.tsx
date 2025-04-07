"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  useGetBrandCreditHistoryQuery,
  useGetBrandCreditInfoQuery,
  useGetUserInfoQuery,
} from "@/app/services/service";
import CreditPurchase from "@/components/credit/CreditPurchaseModal";
import ListRowLayout from "@/components/common/ListRowLayout";
import { useDateFormatter } from "@/app/hooks/useDateFormatter";

function BrandWallet() {
  const router = useRouter();
  const { data: parsedUserInfo } = useGetUserInfoQuery({});
  const { formatDate } = useDateFormatter();

  const {
    data: getBrandCreditInfoData,
    error: getBrandCreditInfoError,
    isLoading: getBrandCreditInfoLoading,
    //@ts-ignore
  } = useGetBrandCreditInfoQuery();
  const {
    data: getBrandCreditHistoryData,
    error: getBrandCreditHistoryError,
    isLoading: getBrandCreditHistoryLoading,
    //@ts-ignore
  } = useGetBrandCreditHistoryQuery(
    { limit: 10, offset: 0 },
    { refetchOnMountOrArgChange: true }
  );

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32 mb-12">
        <div className="max-w-5xl min-h-screen mx-auto px-7 py-11 container">
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
          <p className="text-3xl sm:text-4xl xl:text-5xl font-extrabold my-7">
            Таны Geni Credit
          </p>
          <div className="rounded-3xl bg-[#F5F4F0] p-5 sm:p-10 w-full flex flex-col md:flex-row items-center justify-between gap-2 sm:gap-8">
            <Image
              src={"/brands-image1.png"}
              width={237}
              height={249}
              alt=""
              className="w-full max-w-[237px] max-h-[249px]"
            />
            <div className="flex flex-col gap-4 w-full">
              <div className="rounded-3xl p-4 sm:p-8 border border-geni-gray flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-1 sm:gap-5 text-base sm:text-xl">
                  <span className="font-bold col-span-2">Үлдэгдэл:</span>
                  <span className="col-span-1">
                    {getBrandCreditInfoData?.CreditExist}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-5 text-base sm:text-xl">
                  <span className="font-bold col-span-2">Ашигласан:</span>
                  <span className="col-span-1">
                    {getBrandCreditInfoData?.CreditUsed}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 sm:gap-5 text-base sm:text-xl">
                  <span className="font-bold col-span-2">
                    Сүүлд цэнэглэсэн:
                  </span>
                  <div className="col-span-1 flex flex-col gap-4">
                    {getBrandCreditInfoData?.LastDepositedCredit ? (
                      <span>
                        {getBrandCreditInfoData?.LastDepositedCredit} Кредит
                      </span>
                    ) : (
                      <></>
                    )}

                    <span>
                      {getBrandCreditInfoData?.LastDepositedDate &&
                      !isNaN(
                        new Date(
                          getBrandCreditInfoData?.LastDepositedDate
                        ).getTime()
                      )
                        ? new Date(getBrandCreditInfoData?.LastDepositedDate)
                            .toLocaleDateString("en-CA")
                            .replace(/-/g, ".")
                        : ""}
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
          <div className="w-full overflow-x-auto pt-3 mt-7 border-t-[1px] border-[#F5F4F0] flex flex-col gap-3">
            <span className="text-2xl font-bold">Кредит түүх</span>
            <div className="flex flex-col gap-3 min-w-[450px]">
              <div className="px-5 text-[10px] gap-3 sm:gap-6 sm:text-base grid grid-cols-[1fr,1fr,1fr,2fr] text-[#6F6F6F]">
                <span className="col-span-1">Ашигласан</span>
                <span className="col-span-1">Төлөв</span>
                <span className="col-span-1">Хугацаа</span>
                <span className="col-span-1">Тайлбар</span>
              </div>
              {getBrandCreditHistoryData &&
                getBrandCreditHistoryData?.Data?.map((h, i) => (
                  <ListRowLayout
                    key={i}
                    layout="grid grid grid-cols-[1fr,1fr,1fr,2fr]"
                  >
                    <span
                      className={`col-span-1 font-bold text-sm sm:text-base lg:text-lg ${
                        h.Type ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {h.Type ? "+" : "-"}
                      {h.Credit}
                    </span>
                    <span
                      className={`col-span-1 max-w-min rounded-lg sm:rounded-xl text-white py-1 px-2 sm:px-4 text-center text-[10px] sm:text-sm lg:text-lg ${
                        h.Type ? "bg-geni-green" : "bg-geni-red"
                      }`}
                    >
                      {h.Type ? "Нэмэгдсэн" : "Хасагдсан"}
                    </span>
                    <span className="col-span-1">
                      {formatDate(h.CreatedAt)}
                      <span className="col-span-1">{h.Description}</span>
                    </span>
                  </ListRowLayout>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BrandWallet;
