"use client";
import React from "react";

import Cookies from "js-cookie";
import StatusIndicator from "@/components/StatusIndicator";
import FeedbackModal from "@/components/FeedbackModal";

function ContentProgress({ currentContents }) {
  console.log(currentContents);

  const userInfo = Cookies.get("user-info");
  console.log(userInfo ? userInfo : "");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[850px] sm:min-w-[1200px] mt-7 pt-3 px-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,1fr,1fr,2fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
          <span className="col-span-1">Үзэх хичээл</span>
          <span className="col-span-1">Багш</span>
          <span className="col-span-1">Хичээл</span>
          <span className="col-span-1">Статус</span>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((c, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-base w-full grid grid-cols-[2fr,1fr,1fr,2fr,1fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
          >
            <span className="col-span-1">Geni creator online course</span>
            <span className="col-span-1">Geni</span>
            <a
              className="underline col-span-1"
              target="_blank"
              href="https://meirapage.gumroad.com/l/hxwkma/hic5m2k"
            >
              Үзэх
            </a>
            <StatusIndicator status={c.Status} />
            <div className="col-span-1">
              {c.Status === "ContentRejected" ? (
                <FeedbackModal
                  parsedUserInfo={parsedUserInfo}
                  contentId={c.ContentId}
                  feedbacks={c.FeedBacks}
                />
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
