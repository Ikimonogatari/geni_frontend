import React from "react";
import Image from "next/image";

function BrandAlumni() {
  return (
    <div className="container max-w-7xl px-7 mx-auto py-10">
      <div className="flex flex-col lg:flex-row p-8 gap-2 sm:gap-10 items-center rounded-3xl border-[#2D262D] border-[1px] bg-[#4D55F5] text-white">
        <div className="flex flex-col gap-4">
          <span className="text-base sm:text-lg lg:text-2xl font-bold">
            Ad creative-ийн хувьд худалдан авалтад хамгийн их нөлөөлдөг хэлбэр
            нь UGC гэж боддог. Монгол залуус маань энэ шинэ төрлийн ad
            creative-ийн онцгой ач холбогдлыг олж харж Монголынхоо бизнесүүдэд
            санал болгож, нэвтрүүлж байгаад нь үнэхээр сайшаалтай байгаа.
          </span>
          <div className="hidden sm:flex flex-row items-center gap-5">
            <Image src={"/titem.png"} width={56} height={56} alt="lhamour" />
            <span className="text-2xl">Erkhbayar Founder of Titem Brand</span>
          </div>
        </div>
        <Image
          src={"/brand-alumni-image.png"}
          width={302}
          height={302}
          alt="creator-alumni"
          className=""
        />
        <div className="flex sm:hidden flex-row items-center gap-5">
          <Image
            src={"/titem.png"}
            width={56}
            height={56}
            alt="titem"
            className="min-w-[56px]"
          />
          <span className="text-base">Erkhbayar Founder of Titem Brand</span>
        </div>
      </div>
    </div>
  );
}

export default BrandAlumni;
