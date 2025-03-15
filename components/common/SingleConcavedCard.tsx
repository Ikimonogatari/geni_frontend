import React from "react";

interface SingleConcavedCardProps {
  children: React.ReactNode;
  layoutHorizontally: "left" | "right";
  layoutVertically: "top" | "bottom";
  context: React.ReactNode;
  contextClassName?: string;
}

const SingleConcavedCard: React.FC<SingleConcavedCardProps> = ({
  children,
  layoutHorizontally,
  layoutVertically,
  context,
  contextClassName,
}) => {
  const isLeft = layoutHorizontally === "left";
  const isTop = layoutVertically === "top";

  const containerClasses = `flex w-full h-auto max-w-xl ${
    isTop ? "flex-col" : "flex-col-reverse"
  }`;
  const rowClasses = `flex w-full items-stretch ${
    isLeft ? "flex-row" : "flex-row-reverse"
  }`;
  const cardClasses = `bg-white p-6 w-full h-full ${
    isLeft
      ? isTop
        ? "rounded-br-[30px]"
        : "rounded-tr-[30px]"
      : isTop
      ? "rounded-bl-[30px]"
      : "rounded-tl-[30px]"
  }`;
  const bgClasses = `${
    isTop ? "rounded-t-[30px]" : "rounded-b-[30px]"
  } h-auto w-full bg-primary-bg`;
  const bottomBgClasses = `${
    isLeft
      ? isTop
        ? "rounded-b-[30px] rounded-tl-[30px]"
        : "rounded-t-[30px] rounded-bl-[30px]"
      : isTop
      ? "rounded-b-[30px] rounded-tr-[30px]"
      : "rounded-t-[30px] rounded-br-[30px]"
  } bg-primary-bg h-full w-full py-10 px-16 ${contextClassName}`;

  return (
    <div className={containerClasses}>
      <div className={rowClasses}>
        <div className="h-full bg-primary-bg">
          <div className={cardClasses}>{children}</div>
        </div>
        <div className={bgClasses}></div>
      </div>
      <div className={bottomBgClasses}>{context}</div>
    </div>
  );
};

export default SingleConcavedCard;
