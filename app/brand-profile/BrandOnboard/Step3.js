import React, { useState } from "react";
import Image from "next/image";
import PriceFormatter from "@/app/components/common/FormatPrice";

function Step3() {
  const [selectedBundle, setSelectedBundle] = useState(0);
  const [selectedBrandImage, setSelectedBrandImage] = useState(
    "/brand-bundle-1.png"
  );

  const handleCircleClick = (index) => {
    setSelectedBundle(index);
    setSelectedBrandImage(`/brand-bundle-${index + 1}.png`);
  };
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
        <div className="flex flex-row items-center gap-9">
          <Image src={selectedBrandImage} width={200} height={200} alt="" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-row items-start gap-10">
              <div className="flex flex-col">
                <span className="text-sm sm:text-base">Geni credit:</span>
                <span className="text-lg sm:text-2xl">15</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base">Контентийн үнэ:</span>
                <span className="text-lg sm:text-2xl">
                  <PriceFormatter price={15000} />
                </span>
                <span className="text-[#4FB755] text-sm sm:text-base">
                  Хэмнэлт: <PriceFormatter price={40000} />
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm sm:text-base">Нийт үнэ:</span>
                <span className="text-lg sm:text-2xl">
                  <PriceFormatter price={15000} />
                </span>
                <span className="text-[#4FB755] text-sm sm:text-base">
                  Хэмнэлт: <PriceFormatter price={15000} />
                </span>
              </div>
            </div>
            <span className="rounded-full px-6 py-3 bg-[#F49D19] text-white">
              1 credit гэдэг нь 1 бүтээгдэхүүн нэмээд 1 контент авах эрхийг
              хэлнэ.
            </span>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col items-center justify-center my-8">
        <div className="relative w-full flex items-center justify-center">
          <div className="absolute inset-0 flex items-center justify-between w-full z-10">
            {[0, 1, 2, 3].map((index) => (
              <div
                key={index}
                onClick={() => handleCircleClick(index)}
                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center border ${
                  selectedBundle >= index
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
              style={{ width: `${(selectedBundle / 3) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step3;
