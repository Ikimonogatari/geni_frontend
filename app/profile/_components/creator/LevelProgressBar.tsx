import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LevelProgressBarProps {
  level: number;
  progress: number;
  total: number;
}

function LevelProgressBar({ level, progress, total }: LevelProgressBarProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="relative z-0 gap-2 bg-primary-bg border border-primary rounded-full w-full h-6 sm:h-8">
          <div
            className="absolute left-0 top-0 h-6 bg-geni-green text-white font-bold rounded-full flex items-center justify-center py-[2px]"
            style={{ width: `${(progress / total) * 100}%` }}
          ></div>
          <span className="z-10 w-full flex justify-center items-center sm:h-6 h-full text-xs sm:text-sm">
            {progress}xp
          </span>
        </TooltipTrigger>
        {/* @ts-ignore */}
        <TooltipContent>
          <span className="text-xs sm:text-sm">
            Дараагын түвшин хүртэл: <b>626xp</b>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LevelProgressBar;
