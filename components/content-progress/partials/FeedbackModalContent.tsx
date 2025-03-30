import React from "react";
import { DialogType } from "../content.services";

function FeedbackModalContent({ feedbacks, setDialogType }) {
  return (
    <>
      <div>
        <div className="border-[1px] border-[#E6E6E6] p-4 rounded-xl">
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
        </div>
      </div>
    </>
  );
}

export default FeedbackModalContent;
