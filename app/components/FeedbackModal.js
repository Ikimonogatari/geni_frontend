import React, { useState } from "react";
import { DialogContent, Dialog, DialogTrigger } from "./ui/dialog";
import FeedbackModalUploadModalContent from "./FeedbackModalUploadModalContent";

function FeedbackModal({ parsedUserInfo, contentId, feedbacks }) {
  const [resubmitting, setIsResubmitting] = useState(false);

  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className="bg-[#F49D19] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
      >
        Дэлгэрэнгүй
      </DialogTrigger>
      {!resubmitting ? (
        <DialogContent className="overflow-y-auto flex flex-col p-6 h-full w-full max-h-[739px] max-w-[577px] rounded-3xl">
          <span className="text-3xl font-bold">Зөвлөгөө</span>
          <div className="mt-4 flex flex-col gap-3">
            {feedbacks?.map((f, i) => (
              <div
                key={i}
                className="flex flex-row items-center gap-6 p-5 bg-[#F5F4F0] rounded-3xl"
              >
                <div className="rounded-full w-3 h-3 bg-[#D9D9D9]"></div>
                <span>{f.Name}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setIsResubmitting(true)}
            className="mt-auto w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
          >
            Дахин илгээх
          </button>
        </DialogContent>
      ) : (
        <FeedbackModalUploadModalContent
          parsedUserInfo={parsedUserInfo}
          contentId={contentId}
        />
      )}
    </Dialog>
  );
}

export default FeedbackModal;
