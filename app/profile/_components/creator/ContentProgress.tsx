import Image from "next/image";

import ContentReviewModal from "@/components/ContentReviewModal";
import ContentUploadModal from "@/components/ContentUploadModal";
import DeadlineHover from "@/components/DeadlineHover";
import FeedbackModal from "@/components/FeedbackModal";
import StatusIndicator from "@/components/StatusIndicator";
import Cookies from "js-cookie";
import ContentReturnModal from "./ContentReturnModal";
import ContentProgressModalContent from "@/components/content-progress/ContentProgressModal";
import { mainStates } from "@/components/content-progress/content.services";

function ContentProgress({ currentContents }) {
  const tempContent = currentContents[0];
  currentContents = [
    ...Object.keys(mainStates).map((state) => ({
      ...tempContent,
      Status: state,
    })),
    ...currentContents,
  ];

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] sm:min-w-[1200px] mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,2fr,3fr,2fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
          <div className="col-span-1 flex flex-row items-center justify-between">
            <span className="">Бүтээгдэхүүн</span>
            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
            />
          </div>
          <span className="col-span-1">Брэнд</span>
          {/* <span className="col-span-1">Үе шат</span> */}
          <div className="col-span-1 flex flex-row items-center justify-between">
            <span>Төлөв</span>
            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
            />
          </div>
          <span className="col-span-1">Хугацаа</span>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((p, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,3fr,2fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{p.ProductName}</span>
            <span className="col-span-1">{p.BrandName}</span>
            {/* <span className="col-span-1">{p.ContentPhase}</span> */}

            <StatusIndicator status={p.Status} />
            {p.Deadline ? (
              <DeadlineHover deadline={p.Deadline} />
            ) : (
              <div className="col-span-1"></div>
            )}
            <div className="col-span-1 flex justify-end">
              <ContentProgressModalContent content={p} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;
