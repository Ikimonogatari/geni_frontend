import React, { useState } from "react";
import Image from "next/image";
import PriceFormatter from "@/app/components/common/FormatPrice";
import { useListPaymentPlansQuery } from "@/app/services/service";

function Step3({
  selectedPackageIndex,
  setSelectedPackageIndex,
  setSelectedPackageId,
}) {
  const [selectedPackageImage, setSelectedPackageImage] = useState(
    "/brand-bundle-1.png"
  );

  const {
    data: listPaymentPlansData,
    error: listPaymentPlansError,
    isLoading: listPaymentPlansLoading,
  } = useListPaymentPlansQuery();

  const handleCircleClick = (index) => {
    const scopeSelectedPackageId = listPaymentPlansData
      ? listPaymentPlansData[index]?.PlanId
      : null;
    console.log(index, "SELECTED INDEX IN STEP3");
    console.log(scopeSelectedPackageId, "PACKAGE ID HERE");
    setSelectedPackageId(scopeSelectedPackageId);
    setSelectedPackageIndex(index);
    setSelectedPackageImage(`/brand-bundle-${index + 1}.png`);
  };

  const selectedPackageData = listPaymentPlansData
    ? listPaymentPlansData[selectedPackageIndex]
    : null;
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Та идэвхжүүлэх багцаа сонгоно уу
      </span>
      <span className="text-sm sm:text-base">
        Та Geni credit-н тоогоор бүтээгдэхүүнээ байршуулах эрхтэй болох бөгөөд
        байршуулсан бүтээгдэхүүний тоогоор эргүүлэн контент хүлээн авах юм.
      </span>
      <span className="text-sm sm:text-base text-[#4D55F5]">
        Та өөрийн хэрэглээнд тохируулан цэнэглэх багцаа сонгоно уу.
      </span>

      <div className="rounded-3xl border border-[#4D55F5] py-4 px-3 sm:py-10 sm:px-6 w-full">
        <div className="flex flex-row items-center gap-5 sm:gap-9">
          <Image
            src={selectedPackageImage}
            width={200}
            height={200}
            alt=""
            className="w-1/2 sm:w-[200px] h-auto sm:h-[200px]"
          />
          <div className="flex flex-col gap-3 sm:gap-6">
            <div className="flex flex-col sm:flex-row items-start gap-2 sm:gap-10">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base">Geni credit:</span>
                <span className="text-lg sm:text-2xl">
                  {selectedPackageData?.Credit}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base">Контентийн үнэ:</span>
                <span className="text-lg sm:text-2xl">
                  <PriceFormatter price={selectedPackageData?.ContentPrice} />
                </span>
                <span className="text-[#4FB755] text-sm sm:text-base">
                  Хэмнэлт:{" "}
                  <PriceFormatter
                    price={selectedPackageData?.ContentPriceDiscount}
                  />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base">Нийт үнэ:</span>
                <span className="text-lg sm:text-2xl">
                  <PriceFormatter price={selectedPackageData?.Price} />
                </span>
                <span className="text-[#4FB755] text-sm sm:text-base">
                  Хэмнэлт:{" "}
                  <PriceFormatter price={selectedPackageData?.PriceDiscount} />
                </span>
              </div>
            </div>
            <span className="hidden sm:block rounded-full px-6 py-3 bg-[#F49D19] text-white">
              1 credit гэдэг нь 1 бүтээгдэхүүн нэмээд 1 контент авах эрхийг
              хэлнэ.
            </span>
          </div>
        </div>
        <span className="mt-4 block sm:hidden rounded-3xl text-sm px-3 py-2 bg-[#F49D19] text-white">
          1 credit гэдэг нь 1 бүтээгдэхүүн нэмээд 1 контент авах эрхийг хэлнэ.
        </span>
      </div>

      <div className="relative flex flex-col items-center justify-center my-8">
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-between w-full z-10">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                onClick={() => handleCircleClick(index)}
                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border ${
                  selectedPackageIndex >= index
                    ? "bg-[#4D55F5] text-white border-[#4D55F5]"
                    : "bg-white text-[#4D55F5] border-[#E0E0E0]"
                }`}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center -top-[2px]">
            <div className="absolute inset-0 bg-[#E0E0E0] rounded-lg h-1 w-full"></div>
            <div
              className={`absolute inset-0 bg-[#4D55F5] rounded-lg h-1 transition-width duration-300 ease-in-out`}
              style={{ width: `${(selectedPackageIndex / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3;
