import { cn } from "@/lib/utils";
import { NumberTicker } from "../magicui/number-ticker";
import Image from "next/image";

export const StatsCard = ({
  count,
  subtitle,
  className,
  imgSrc,
  wrapperClassName,
  addImgSrc,
  postfix,
  mobileCount,
}: {
  count: number;
  mobileCount?: number;
  subtitle: string;
  className?: string;
  imgSrc: string;
  wrapperClassName?: string;
  addImgSrc?: string;
  postfix?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center px-8 py-5 bg-primary-bg border border-border-gray/60 rounded-[30px] relative",
        wrapperClassName
      )}
    >
      <div className={cn("text-8xl font-black", className)}>
        <NumberTicker
          value={count}
          className={cn(
            "whitespace-pre-wrap text-8xl font-black tracking-tighter",
            className,
            mobileCount && "hidden md:block"
          )}
        />
        {mobileCount ? (
          <NumberTicker
            value={mobileCount}
            className={cn(
              "whitespace-pre-wrap md:hidden text-7xl font-black tracking-tighter",
              className
            )}
          />
        ) : null}
        {postfix && postfix}
        <span className={cn(mobileCount && "text-7xl md:text-8xl")}>+</span>
      </div>
      <div className="text-xl md:text-2xl text-black font-bold">{subtitle}</div>
      <div className="size-6 absolute top-6 right-6 flex items-center justify-center">
        <Image
          src={imgSrc}
          alt=""
          width={42}
          height={42}
          className="absolute z-0 min-h-11 min-w-11 aspect-square"
        />
        {addImgSrc && (
          <Image
            src={addImgSrc}
            alt=""
            width={24}
            height={24}
            className="relative z-10 w-6 h-6 aspect-square"
          />
        )}
      </div>
    </div>
  );
};
