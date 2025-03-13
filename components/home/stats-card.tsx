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
}: {
  count: number;
  subtitle: string;
  className?: string;
  imgSrc: string;
  wrapperClassName?: string;
  addImgSrc?: string;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col items-start justify-center px-8 py-5 bg-primary-bg border border-primary rounded-[30px] relative",
        wrapperClassName
      )}
    >
      <div className={cn("text-8xl font-black", className)}>
        <NumberTicker
          value={count}
          className={cn(
            "whitespace-pre-wrap text-8xl font-black tracking-tighter",
            className
          )}
        />
        <span>+</span>
      </div>
      <div className="text-2xl text-black font-bold">{subtitle}</div>
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
