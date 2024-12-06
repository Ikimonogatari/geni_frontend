import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

function DeadlineModal({ p, handleUpdateContentStatus }) {
  const formatDeadline = (deadline) => {
    const deadlineDate = new Date(deadline);
    const formattedDate = deadlineDate.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = deadlineDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    return { formattedDate, formattedTime };
  };

  const { formattedDate, formattedTime } = formatDeadline(p.Deadline);

  return (
    <div className="col-span-1">
      <Dialog>
        <DialogTrigger
          onClick={() =>
            handleUpdateContentStatus(p.ContentId, "ContentInProgress")
          }
          className="bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold"
        >
          Хүлээж авсан
        </DialogTrigger>
        <DialogContent className="max-w-lg w-full flex flex-col gap-4">
          <span className="text-xl">
            Бүтээгдэхүүнээ хүлээн авлаа. <br />
            Контентоо хийхэд тань амжилт хүсье!
          </span>
          <div className="rounded-2xl border border-[#2D262D] bg-[#F5F4F0] p-4 flex flex-col">
            <span className="font-medium">Контент илгээх сүүлийн хугацаа:</span>
            <div className="flex flex-row">
              <div className="flex flex-col w-1/2">
                <span className="text-base">Сар өдөр</span>
                <span className="text-3xl font-medium">{formattedDate}</span>
              </div>
              <div className="flex flex-col w-1/2">
                <span className="text-base">Цаг</span>
                <span className="text-3xl font-medium">{formattedTime}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default DeadlineModal;
