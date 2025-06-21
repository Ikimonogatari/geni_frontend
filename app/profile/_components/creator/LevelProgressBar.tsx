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
  nextLvlXp: number;
}

function LevelProgressBar({
  level,
  progress,
  nextLvlXp,
}: LevelProgressBarProps) {
  // Calculate the progress percentage correctly
  // If user has 102 XP and needs 100 more, they're at 102/(102+100) = 102/202 = ~50.5%
  const totalXpForNextLevel = progress + nextLvlXp;
  const progressPercentage = Math.min(
    (progress / totalXpForNextLevel) * 100,
    100
  );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="relative z-0 gap-2 bg-primary-bg border rounded-full w-full h-6 sm:h-8">
          <div
            className="absolute left-0 top-0 h-6 sm:h-8 bg-geni-green rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <span
            className="relative z-10 w-full flex justify-center items-center h-6 sm:h-8 text-xs sm:text-sm font-bold text-white"
            style={{
              textShadow:
                "1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8), 1px -1px 2px rgba(0,0,0,0.8), -1px 1px 2px rgba(0,0,0,0.8)",
            }}
          >
            {progress}xp
          </span>
        </TooltipTrigger>
        {/* @ts-ignore */}
        <TooltipContent>
          <span className="text-xs sm:text-sm">
            Дараагын түвшин хүртэл: <b>{nextLvlXp}xp</b>
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LevelProgressBar;
