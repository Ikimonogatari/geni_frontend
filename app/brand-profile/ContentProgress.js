import React from "react";
import Image from "next/image";

function ContentProgress({ currentContents }) {
  const getColorClass = (status) => {
    switch (status) {
      case "Бүтээгдэхүүн хүргэж байна":
        return "text-[#F49D19]";
      case "Контент хийгдэж байна":
        return "text-[#F49D19]";
      case "Geni шалгаж байна":
        return "text-[#4D55F5]";
      case "Контент илгээсэн":
        return "text-[#4FB755]";
      default:
        return "";
    }
  };
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[768px] mt-7 pt-3 px-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,2fr,1fr,3fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
          <div className="col-span-1 flex flex-row items-center justify-between">
            <span className="">Бүтээгдэхүүн</span>

            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
            />
          </div>
          <span className="col-span-1">Бүтээгч</span>
          <span className="col-span-1">Үе шат</span>
          <div className="col-span-1 flex flex-row items-center justify-between">
            <span>Статус</span>
            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
            />
          </div>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((p, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,1fr,3fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{p.name}</span>
            <div className="col-span-1 flex flex-row items-center gap-3">
              <span>{p.creator}</span>
              <Image
                src={"/verified-icon.png"}
                width={24}
                height={24}
                alt="verified"
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
            </div>
            <span className="col-span-1">{p.stage}/5</span>
            <div
              className={`${getColorClass(
                p.status
              )} col-span-1 flex flex-row items-center gap-3`}
            >
              <Image
                src={stages[p.stage - 1]}
                width={24}
                height={24}
                alt="stage"
                className="w-4 h-4 sm:w-6 sm:h-6"
              />
              <span className="">{p.status}</span>
            </div>
            <div>
              {p.stage === 4 ? (
                <button className="bg-[#4D55F5] border-[1px] border-[#2D262D] whitespace-nowrap px-5 py-2 rounded-lg text-white font-bold">
                  Контент авах
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;

const stages = [
  "/stage-icon1.png",
  "/stage-icon2.png",
  "/stage-icon3.png",
  "/stage-icon4.png",
];
