import React, { useState } from "react";
import Image from "next/image";
import { useListPaymentPlansQuery } from "@/app/services/service";
import PriceFormatter from "@/components/common/FormatPrice";

function Step4({ selectedPackageIndex }) {
  const [selectedPayment, setSelectedPayment] = useState("qpay");

  const {
    data: listPaymentPlansData,
    error: listPaymentPlansError,
    isLoading: listPaymentPlansLoading,
  } = useListPaymentPlansQuery();

  const selectedPackageData = listPaymentPlansData
    ? listPaymentPlansData[selectedPackageIndex]
    : null;

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Идэвхжүүлэх багцын мэдээлэл
      </span>

      <div className="mt-2 sm:mt-4 bg-[#F5F4F0] rounded-3xl p-3 sm:p-8 flex flex-row items-center gap-4 sm:gap-20">
        <Image
          src={`/brand-bundle-${selectedPackageIndex + 1}.png`}
          width={200}
          height={200}
          alt=""
          className="w-1/2 sm:w-[200px] h-auto sm:h-[200px]"
        />
        <div className="flex flex-col gap-[3px] sm:gap-3">
          <div className="flex flex-col text-[#6F6F6F]">
            <span>Geni кредит:</span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
              {selectedPackageData?.Credit}
            </span>
          </div>
          <div className="flex flex-col text-[#6F6F6F]">
            <span>Контентийн үнэ: </span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
              <PriceFormatter price={selectedPackageData?.ContentPrice} />
            </span>
          </div>
          <div className="flex flex-col">
            <span>Нийт үнэ: </span>
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
              <PriceFormatter price={selectedPackageData?.Price} />
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-[#6F6F6F] text-xl font-bold">
          Та төлбөр төлөх нөхцөлөө сонгоно уу
        </span>
        <button
          onClick={() => setSelectedPayment("qpay")}
          className={`border-[2px] transition-all duration-150 ${
            selectedPayment === "qpay" ? "border-[#4D55F5]" : "border-[#F5F4F0]"
          }  py-3 sm:py-4 w-[130px] sm:w-[189px] flex justify-center rounded-3xl bg-[#F5F4F0]`}
        >
          <Image
            src={"/qpay.png"}
            width={96}
            height={36}
            alt="payment"
            className="w-[64px] h-[24px] sm:w-[96px] sm:h-[36px]"
          />
        </button>
      </div>
    </div>
  );
}

export default Step4;
