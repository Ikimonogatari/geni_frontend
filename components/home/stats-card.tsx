import { cn } from "@/lib/utils";
import { NumberTicker } from "../magicui/number-ticker";
import Image from "next/image";

export const StatsCard = ({
  count,
  subtitle,
  className,
  imgSrc,
}: {
  count: number;
  subtitle: string;
  className?: string;
  imgSrc: string;
}) => {
  return (
    <div className="flex flex-col items-start justify-center px-8 py-5 bg-primary-bg rounded-[30px] relative">
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
      <div className="size-6 absolute top-6 right-6">
        <Image
          src={imgSrc}
          alt="hero-image"
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </div>
    </div>
  );
};
