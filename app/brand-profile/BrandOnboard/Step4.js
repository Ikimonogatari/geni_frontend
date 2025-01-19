import React, { useState } from "react";
import Image from "next/image";

function Step4() {
  const [selectedPayment, setSelectedPayment] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Идэвхжүүлэх багцын мэдээлэл
      </span>

      <span className="text-[#6F6F6F] text-xl font-bold">
        Та төлбөр төлөх нөхцөлөө сонгоно уу
      </span>
      <button
        onClick={() => setSelectedPayment("qpay")}
        className={`border-[2px] transition-all duration-150 ${
          selectedPayment === "qpay" ? "border-[#4D55F5]" : "border-[#F5F4F0]"
        }  py-4 w-[179px] flex justify-center rounded-3xl bg-[#F5F4F0]`}
      >
        <Image
          src={"/qpay.png"}
          width={96}
          height={36}
          alt="payment"
          className=""
        />
      </button>
    </div>
  );
}

export default Step4;
