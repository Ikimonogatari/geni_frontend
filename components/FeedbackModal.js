import React, { useState } from "react";
import FeedbackModalUploadModalContent from "./FeedbackModalUploadModalContent";
import { DialogType } from "./content-progress/content.services";

function FeedbackModal({
  parsedUserInfo,
  contentId,
  feedbacks,
  setDialogType,
}) {
  const [resubmitting, setIsResubmitting] = useState(false);
  return (
    <>
      {/* {!resubmitting ? ( */}
      <div>
        <div className="border-[1px] border-[#E6E6E6] p-4 rounded-xl">
          {/* <DialogContent className="overflow-y-auto flex flex-col p-6 w-full max-h-[739px] max-w-[577px] rounded-3xl"> */}
          <span className="text-3xl font-bold">Зөвлөгөө</span>
          <div className="mt-4 flex flex-col gap-3">
            {feedbacks?.map((f, i) => (
              <div
                key={i}
                className="flex flex-row items-center gap-3 sm:gap-6 p-3 sm:p-5 bg-[#F5F4F0] rounded-3xl overflow-x-auto"
              >
                <div className="rounded-full w-2 h-2 sm:w-3 sm:h-3 bg-[#D9D9D9]"></div>
                <span className="text-sm sm:text-base">{f.Feedback}</span>
              </div>
            ))}
          </div>
          {/* </DialogContent> */}
        </div>
        <button
          onClick={() => setDialogType(DialogType.CONTENT_IN_PROGRESS)}
          className="mt-5 sm:mt-10 w-full py-2 text-white font-semibold bg-[#CA7FFE] rounded-xl"
        >
          Дахин илгээх
        </button>
      </div>
      {/* // ) : (
      //   <FeedbackModalUploadModalContent
      //     parsedUserInfo={parsedUserInfo}
      //     contentId={contentId}
      //   />
      // )} */}
    </>
  );
}

export default FeedbackModal;
