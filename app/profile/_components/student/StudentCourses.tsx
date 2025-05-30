"use client";
import React from "react";
import StatusIndicator from "@/components/StatusIndicator";
import FeedbackModal from "@/components/FeedbackModal";
import HomeworkUploadModal from "@/components/HomeworkUploadModal";

function StudentCourses({ currentContents, parsedUserInfo }) {
  // Renamed prop but keeping compatibility with both old and new implementations
  const userInfo = parsedUserInfo;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[850px] sm:min-w-[1200px] mt-7 pt-3 px-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,1fr,1fr,2fr,2fr] gap-6 w-full items-center text-[#6F6F6F]">
          <span className="col-span-1">Үзэх хичээл</span>
          <span className="col-span-1">Багш</span>
          <span className="col-span-1">Хичээл</span>
          <span className="col-span-1">Статус</span>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((c, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-base w-full grid grid-cols-[2fr,1fr,1fr,2fr,2fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{c.CourseName}</span>
            <span className="col-span-1">Geni</span>
            <a
              className="underline col-span-1"
              target="_blank"
              href={c.CourseGumroadLink}
            >
              Үзэх
            </a>
            <StatusIndicator status={c.ContentStatus?.Status} />
            <div className="col-span-1">
              {c.ContentStatus?.Status === "ContentRejected" ? (
                <FeedbackModal
                  parsedUserInfo={userInfo}
                  contentId={c.ContentId}
                  feedbacks={c.FeedBacks}
                />
              ) : (
                <></>
              )}
              {c.ContentStatus === null ? (
                <HomeworkUploadModal
                  parsedUserInfo={userInfo}
                  courseId={c.CourseId}
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

export default StudentCourses;
