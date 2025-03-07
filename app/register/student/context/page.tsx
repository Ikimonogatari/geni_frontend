import React from "react";
import Image from "next/image";
import BecomeGeniButton from "@/components/common/BecomeGeniButton";

function page() {
  return (
    <div className="mt-[96px] sm:mt-[136px] md:mt-[152px] container text-[#2D262D] max-w-6xl mx-auto pb-4 pt-14 sm:py-28 px-7 flex flex-col md:flex-row gap-8 lg:items-center">
      <div className="flex flex-col gap-5 sm:gap-10 w-full md:w-1/2">
        <span className="text-2xl sm:text-3xl xl:text-4xl font-bold mt-0 sm:mt-3">
          Чадвараа ахиулан суралцаад Geni бүтээгч болох уу?
        </span>
        <p className="text-base sm:text-xl">
          Та Geni Creator Course-д нэгдэж контент бүтээх чадварт суралцахдаа
          бэлэн үү.
          <br />
          <br />
          Та 100% онлайнаар өөрийнхөө хурдаар хичээлүүдээ үзээд даалгавараа
          илгээж тэнцсэнээр брэндүүдтэй тогтмол хамтран ажиллах эрхтэй албан
          ёсны бүтээгч болох юм.
          <br />
          <br />
          Ингэхийн тулд та бүртгэл үүсгэн хөтөлбөрөө идэвхжүүлээрэй.
        </p>
        <Image
          src={"/student-image.png"}
          width={410}
          height={413}
          alt=""
          className="block md:hidden"
        />
        <BecomeGeniButton
          width={"aspect-[371/84] w-full lg:max-w-[371px]"}
          link={"/apply"}
          text={"Бүртгэл үүсгэх"}
          bg={"bg-geni-green"}
          shadowbg={"shadow-[0.25rem_0.25rem_#3B7A3C]"}
        />
      </div>
      <Image
        src={"/student-image.png"}
        width={410}
        height={413}
        alt=""
        className="hidden md:block"
      />
    </div>
  );
}

export default page;
