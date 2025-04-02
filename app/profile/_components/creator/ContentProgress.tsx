import Image from "next/image";

import ContentReviewModal from "@/components/ContentReviewModal";
import ContentUploadModal from "@/components/ContentUploadModal";
import DeadlineHover from "@/components/DeadlineHover";
import FeedbackModal from "@/components/FeedbackModal";
import StatusIndicator from "@/components/StatusIndicator";
import Cookies from "js-cookie";
import ContentReturnModal from "./ContentReturnModal";
import ContentProgressModalContent, {
  getStepIndex,
} from "@/components/content-progress/ContentProgressModal";
// import {
//   STATUS_LIST,
//   STATUS_LIST_VALUE,
// } from "@/components/content-progress/content.services";

function ContentProgress({ currentContents }) {
  // const tempContent = currentContents[0];
  // currentContents = [
  //   ...Object.keys(STATUS_LIST).map((state) => ({
  //     ...tempContent,
  //     Status: "",
  //     CurrentStepId: getStepIndex(state) + 1,
  //     CurrentStepName: { String: state, Valid: true },
  //     // Process: [
  //     //   {
  //     //     ContentId: "testid",
  //     //     ContentProccessId: 1,
  //     //     ContentStepId: 1,
  //     //     StepName: "Контентийн хүсэлт",
  //     //     ContentStepStatusCode: { String: state, Valid: true },
  //     //     ContentStepStatusId: 1,
  //     //     Desc: { String: STATUS_LIST_VALUE[state], Valid: true },
  //     //     CreatedAt: "2025-03-30T12:13:28.276835Z",
  //     //   },
  //     // ],
  //   })),
  //   // {
  //   //   ...tempContent,
  //   //   Status: "",
  //   //   CurrentStepId: 1,
  //   //   CurrentStepName: "ContentPending",
  //   // },
  //   ...currentContents,
  // ];
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[900px] sm:min-w-[1200px] mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[3fr,2fr,3fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
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
          <div className="col-span-1 flex flex-row items-center justify-between">
            <span>Статус</span>
            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
            />
          </div>
          {/* <span className="col-span-1">Хугацаа</span> */}
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {currentContents.map((p, i) => (
          <div
            key={i}
            className="text-[10px] sm:text-base w-full grid grid-cols-[3fr,2fr,3fr,1fr] gap-6 items-center px-5 py-3 sm:p-5 border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
          >
            <span className="col-span-1">{p.ProductName}</span>
            <span className="col-span-1">{p.BrandName}</span>

            <StatusIndicator
              status={
                p.Status === null || p.Status === ""
                  ? p.CurrentStepName.String
                  : p.Status
              }
            />
            {/* {p.Deadline ? (
              <DeadlineHover deadline={p.Deadline} />
            ) : (
              <div className="col-span-1"></div>
            )} */}
            <div className="col-span-1 flex justify-end">
              {p.Status === null || p.Status === "" ? (
                <ContentProgressModalContent content={p} />
              ) : (
                <>
                  {p.Status === "Request" ? (
                    <ContentReturnModal requestId={p?.ContentId} />
                  ) : (
                    <></>
                  )}
                  {p.Status === "ContentRejected" ? (
                    <FeedbackModal
                      parsedUserInfo={parsedUserInfo}
                      contentId={p?.ContentId}
                      feedbacks={p?.FeedBacks}
                    />
                  ) : (
                    <></>
                  )}
                  {p.Status === "ContentInProgress" ? (
                    <ContentUploadModal
                      parsedUserInfo={parsedUserInfo}
                      contentId={p.ContentId}
                    />
                  ) : null}
                  {p.Status === "ContentReceived" ? (
                    <ContentReviewModal p={p} />
                  ) : null}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ContentProgress;
