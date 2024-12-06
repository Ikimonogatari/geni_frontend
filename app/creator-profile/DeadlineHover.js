import React from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../components/ui/hover-card";

function DeadlineHover({ deadline }) {
  const getDeadlineInfo = (deadline) => {
    const now = new Date();
    const timeRemaining = new Date(deadline) - now;
    const oneDay = 1000 * 60 * 60 * 24; // 1 day in milliseconds
    const daysLeft = Math.ceil(timeRemaining / oneDay);

    if (timeRemaining < 0) {
      return { bgClass: "bg-[#FF0000] text-white", text: "Хоцорсон" }; // deep red for overdue
    }
    if (daysLeft <= 1) {
      return { bgClass: "bg-[#FFE0E0]", text: `${daysLeft} хоног үлдсэн` };
    }
    if (daysLeft <= 3) {
      return { bgClass: "bg-[#FFF8E0]", text: `${daysLeft} хоног үлдсэн` };
    }
    if (daysLeft <= 7) {
      return { bgClass: "bg-[#E0F4FF]", text: `${daysLeft} хоног үлдсэн` };
    }

    return { bgClass: "bg-[#E0F4FF]", text: `${daysLeft} хоног үлдсэн` };
  };
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

  const { formattedDate, formattedTime } = formatDeadline(deadline);
  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <span
          className={`px-2 py-[6px] rounded-md text-center ${
            getDeadlineInfo(deadline).bgClass
          }`}
        >
          {getDeadlineInfo(deadline).text}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className=" max-w-[220px] rounded-2xl border border-[#2D262D] bg-[#F5F4F0] p-4 flex flex-col">
        <span className="text-xs">Контент илгээх сүүлийн хугацаа:</span>
        <div className="flex flex-row items-center">
          <span className="text-xl w-1/2 font-medium">{formattedDate}</span>
          <span className="text-xl w-1/2 font-medium">{formattedTime}</span>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default DeadlineHover;
