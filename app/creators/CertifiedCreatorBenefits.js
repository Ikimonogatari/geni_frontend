import React from "react";
import Image from "next/image";

function CertifiedCreatorBenefits() {
  return (
    <div className="container max-w-7xl px-7 py-10 sm:py-20 mx-auto">
      <span className="text-2xl">
        Geni Creator Program-д сууж төгсөн Certified Creator болсноор:
      </span>
      <div className="flex flex-col lg:flex-row gap-5 mt-6">
        <div className="w-full lg:w-1/2 flex flex-col gap-8 p-8 rounded-2xl bg-[#F5F4F0]">
          <Image
            loading="lazy"
            src={"/creators-image3.png"}
            width={172}
            height={220}
            alt=""
            className="mx-auto"
          />
          <span className="text-2xl sm:text-4xl font-bold">
            UGC creator болоход шаардлагатай бүх суурь чадваруудыг эзэмшинэ
          </span>
        </div>
        <div className="w-full lg:w-1/2 flex flex-col gap-6 p-8 rounded-2xl bg-[#F5F4F0]">
          <Image
            loading="lazy"
            src={"/creators-image4.png"}
            width={247}
            height={232}
            alt="creators-image"
            className="mx-auto"
          />
          <span className="text-2xl sm:text-4xl font-bold">
            Geni платформыг албан ёсны бүтээгч болон хамтрах боломж нээгдэнэ
          </span>
        </div>
      </div>
    </div>
  );
}

export default CertifiedCreatorBenefits;
