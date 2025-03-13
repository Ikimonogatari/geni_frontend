import React from "react";
import Image from "next/image";
interface ConcaveCardProps {
  children: React.ReactNode;
  layoutHorizontally: "left" | "right";
  layoutVertically: "top" | "bottom";
  context: React.ReactNode;
  addImage?: any;
  image?: any;
  className?: string;
}

const ConcaveCard: React.FC<ConcaveCardProps> = ({
  children,
  layoutHorizontally = "left",
  layoutVertically,
  context,
  image,
  addImage,
  className,
}) => {
  const childrenArray = React.Children.toArray(children);
  const firstChild = childrenArray[0];
  const secondChild = childrenArray[1];
  const roundedClasses = {
    leftTop: "rounded-br-[30px]",
    leftBottom: "rounded-tr-[30px]",
    rightTop: "rounded-bl-[30px]",
    rightBottom: "rounded-tl-[30px]",
    top: "rounded-t-[30px]",
    bottom: "rounded-b-[30px]",
  };

  return (
    <div
      className={`${
        layoutHorizontally === "right"
          ? "flex flex-row-reverse"
          : "flex flex-row"
      } w-full h-full  items-stretch ${className}`}
    >
      <div
        className={`${
          layoutHorizontally === "right"
            ? "flex flex-row-reverse"
            : "flex flex-row"
        } w-full h-auto xl:min-h-[350px] items-stretch relative`}
      >
        {/* 1st child */}
        <div
          className={`min-w-[317px] ${
            layoutVertically === "top"
              ? "flex flex-col"
              : "flex flex-col-reverse"
          }`}
        >
          <div className="bg-primary-bg">
            <div
              className={`bg-white p-6 w-full ${
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
              {firstChild}
            </div>
          </div>
          <div
            className={`${
              layoutHorizontally === "left"
                ? "rounded-l-[30px]"
                : "rounded-r-[30px]"
            } h-full w-full bg-primary-bg p-8`}
          ></div>
        </div>
        <div
          className={`${
            !secondChild
              ? layoutHorizontally === "left"
                ? layoutVertically === "top"
                  ? "rounded-t-[30px] rounded-br-[30px]"
                  : layoutVertically === "bottom"
                  ? "rounded-b-[30px] rounded-tr-[30px]"
                  : ""
                : layoutVertically === "top"
                ? "rounded-t-[30px] rounded-bl-[30px]"
                : layoutVertically === "bottom"
                ? "rounded-b-[30px] rounded-tl-[30px]"
                : ""
              : ""
          } ${
            secondChild &&
            (layoutVertically === "top"
              ? "rounded-tl-[30px] rounded-br-[30px]"
              : "rounded-tr-[30px] rounded-bl-[30px]")
          } p-14 bg-primary-bg w-3/7 flex justify-center`}
        >
          {context}
        </div>
        <div className="absolute bottom-10 w-full px-20">
          <div className="flex flex-row gap-1 items-end h-3/4 border-b-[1px] border-b-primary">
            <Image
              src={image?.src}
              className={image?.size}
              alt=""
              width={241}
              height={165}
            />
            {addImage && (
              <Image
                src={addImage?.src}
                alt=""
                width={50}
                height={30}
                className={addImage?.size}
              />
            )}
          </div>
        </div>
      </div>
      {/* 2st child */}
      {secondChild && layoutHorizontally === "left" && (
        <div
          className={`${
            layoutVertically === "top"
              ? "flex flex-col-reverse"
              : "flex flex-col"
          }`}
        >
          <div className="bg-primary-bg">
            <div
              className={`bg-white p-6 w-full ${
                layoutHorizontally === "left"
                  ? layoutVertically === "top"
                    ? roundedClasses.rightBottom
                    : layoutVertically === "bottom"
                    ? roundedClasses.rightTop
                    : ""
                  : layoutVertically === "top"
                  ? roundedClasses.leftBottom
                  : layoutVertically === "bottom"
                  ? roundedClasses.leftTop
                  : ""
              }`}
            >
              {secondChild}
            </div>
          </div>
          <div className={`rounded-r-[30px] h-full w-full bg-primary-bg`}></div>
        </div>
      )}
    </div>
  );
};

export default ConcaveCard;
