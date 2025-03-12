import React from "react";

interface ConcaveCardProps {
  children: React.ReactNode;
  layoutHorizontally: "left" | "right";
  layoutVertically: "top" | "bottom";
}

const ConcaveCard: React.FC<ConcaveCardProps> = ({
  children,
  layoutHorizontally,
  layoutVertically,
}) => {
  const horizontalClass =
    layoutHorizontally === "right" ? "flex flex-row-reverse" : "flex flex-row";
  const verticalClass =
    layoutVertically === "top"
      ? "flex flex-col"
      : layoutVertically === "bottom"
      ? "flex flex-col-reverse"
      : "";

  const roundedClasses = {
    leftTop: "rounded-br-[30px]",
    leftBottom: "rounded-tr-[30px]",
    rightTop: "rounded-bl-[30px]",
    rightBottom: "rounded-tl-[30px]",
    top: "rounded-t-[30px]",
    bottom: "rounded-b-[30px]",
  };

  return (
    <div className={`${verticalClass} w-full h-full max-w-xl`}>
      <div className={`${horizontalClass} w-full items-stretch`}>
        <div className="h-full bg-primary-bg">
          <div
            className={`bg-white p-6 w-full h-full ${
              layoutHorizontally === "left"
                ? layoutVertically === "top"
                  ? roundedClasses.leftTop
                  : layoutVertically === "bottom"
                  ? roundedClasses.leftBottom
                  : ""
                : layoutVertically === "top"
                ? roundedClasses.rightTop
                : layoutVertically === "bottom"
                ? roundedClasses.rightBottom
                : ""
            }`}
          >
            {children}
          </div>
        </div>
        <div
          className={`${
            layoutVertically === "top"
              ? roundedClasses.top
              : roundedClasses.bottom
          } h-auto w-full bg-primary-bg`}
        ></div>
      </div>
      <div
        className={`${
          layoutHorizontally === "left"
            ? layoutVertically === "top"
              ? "rounded-b-[30px] rounded-tl-[30px]"
              : layoutVertically === "bottom"
              ? "rounded-t-[30px] rounded-bl-[30px]"
              : ""
            : layoutVertically === "top"
            ? "rounded-b-[30px] rounded-tr-[30px]"
            : layoutVertically === "bottom"
            ? "rounded-t-[30px] rounded-br-[30px]"
            : ""
        } bg-primary-bg h-[200px]`}
      ></div>
    </div>
  );
};

export default ConcaveCard;
