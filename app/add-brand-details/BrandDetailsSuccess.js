import React from "react";
import Image from "next/image";

function BrandDetailsSuccess({ router }) {
  return (
    <div className="flex flex-col gap-5">
      <Image
        src={"/brand-add-detail-success.png"}
        width={202}
        height={214}
        className="w-[202px] h-[214px] mx-auto"
        alt=""
      />
      <span className="text-[#4FB755] text-2xl sm:text-3xl xl:text-4xl font-bold">
        Та амжилттай брэндийн мэдээллээ илгээлээ.
      </span>
      <p>
        Таны илгээсэн мэдээллийг Geni Platform-н зүгээс ажлын 1-3 хоногийн
        хугацаанд шалган таны бүртгүүлсэн имэйл хаягруу мэдэгдэл илгээгдэх
        болно.
        <br />
        <br />
        Брэндийн мэдээллийн шаардлага хангасан тохиолдолд та багц идэвхжүүлэх
        эрхтэй болох юм. Баярлалаа
      </p>
      <button
        type="button"
        onClick={() => router.push("/profile")}
        className="mt-8 sm:mt-16 w-full flex flex-row items-center
justify-center gap-2 bg-inherit text-[#2D262D] rounded-lg sm:rounded-xl border
border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl"
      >
        Дуусгах
      </button>
    </div>
  );
}

export default BrandDetailsSuccess;
