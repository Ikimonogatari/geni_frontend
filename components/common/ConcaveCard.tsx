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
  return (
    <div
      className={`${
        layoutVertically === "top"
          ? "flex flex-col"
          : layoutVertically === "bottom"
          ? "flex flex-col-reverse"
          : ""
      } w-full h-full max-w-xl`}
    >
      <div
        className={`${
          layoutHorizontally === "right"
            ? "flex flex-row-reverse"
            : layoutHorizontally === "left"
            ? "flex flex-row"
            : ""
        } w-full items-stretch`}
      >
        <div className="h-full bg-primary-bg">
          <div
            className={`bg-white p-6 w-full h-full ${
              layoutHorizontally === "left"
                ? layoutVertically === "top"
                  ? "rounded-br-[30px]"
                  : layoutVertically === "bottom"
                  ? "rounded-tr-[30px]"
                  : ""
                : layoutVertically === "top"
                ? "rounded-bl-[30px]"
                : layoutVertically === "bottom"
                ? "rounded-tl-[30px]"
                : ""
            }`}
          >
            {children}
          </div>
        </div>
        <div
          className={`${
            layoutVertically === "top" ? "rounded-t-[30px]" : "rounded-b-[30px]"
          }  h-auto w-full bg-primary-bg`}
        ></div>
      </div>
      <div
        className={`bg-primary-bg h-[200px] ${
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
        }
         
        }`}
      ></div>
    </div>
  );
};

export default ConcaveCard;
