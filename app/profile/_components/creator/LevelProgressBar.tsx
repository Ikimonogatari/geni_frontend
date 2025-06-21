import React from "react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface LevelProgressBarProps {
  progress: number;
  nextLvlXpThreshold: number;
}

// Level thresholds
const LEVEL_THRESHOLDS = {
  Certified: 100,
  Bronze: 1000,
  Silver: 5000,
  Pro: 15000,
};

function LevelProgressBar({
  progress,
  nextLvlXpThreshold,
}: LevelProgressBarProps) {
  // Determine current level based on progress
  const getCurrentLevel = (xp: number) => {
    if (xp >= LEVEL_THRESHOLDS.Pro) return "Pro";
    if (xp >= LEVEL_THRESHOLDS.Silver) return "Silver";
    if (xp >= LEVEL_THRESHOLDS.Bronze) return "Bronze";
    if (xp >= LEVEL_THRESHOLDS.Certified) return "Certified";
    return "Beginner";
  };

  // Get current level threshold (where current level starts)
  const getCurrentLevelThreshold = (currentLevel: string) => {
    switch (currentLevel) {
      case "Pro":
        return LEVEL_THRESHOLDS.Pro;
      case "Silver":
        return LEVEL_THRESHOLDS.Silver;
      case "Bronze":
        return LEVEL_THRESHOLDS.Bronze;
      case "Certified":
        return LEVEL_THRESHOLDS.Certified;
      default:
        return 0; // Beginner starts at 0
    }
  };

  // Get next level threshold based on current level
  const getNextLevelThreshold = (currentLevel: string) => {
    switch (currentLevel) {
      case "Beginner":
        return LEVEL_THRESHOLDS.Certified;
      case "Certified":
        return LEVEL_THRESHOLDS.Bronze;
      case "Bronze":
        return LEVEL_THRESHOLDS.Silver;
      case "Silver":
        return LEVEL_THRESHOLDS.Pro;
      case "Pro":
        return LEVEL_THRESHOLDS.Pro; // Max level
      default:
        return LEVEL_THRESHOLDS.Certified;
    }
  };

  const currentLevel = getCurrentLevel(progress);
  const currentLevelThreshold = getCurrentLevelThreshold(currentLevel);
  const nextThreshold = getNextLevelThreshold(currentLevel);

  // Calculate progress within current level
  const progressInCurrentLevel = progress - currentLevelThreshold;
  const currentLevelRange = nextThreshold - currentLevelThreshold;

  // Calculate percentage within current level (0-100%)
  const progressPercentage =
    currentLevel === "Pro"
      ? 100 // Max level reached
      : Math.min((progressInCurrentLevel / currentLevelRange) * 100, 100);

  console.log("Current Level:", currentLevel);
  console.log("Progress:", progress);
  console.log("Current Level Threshold:", currentLevelThreshold);
  console.log("Next Threshold:", nextThreshold);
  console.log("Progress in Current Level:", progressInCurrentLevel);
  console.log("Current Level Range:", currentLevelRange);
  console.log("Progress Percentage:", progressPercentage);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className="relative z-0 gap-2 bg-primary-bg border rounded-full w-full h-6">
          <div
            className="absolute left-0 top-0 h-6 bg-geni-green rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <span
            className="relative z-10 w-full flex justify-center items-center h-6 text-xs sm:text-sm font-bold text-white"
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
            {currentLevel === "Pro" ? (
              <span>Хамгийн дээд түвшинд хүрсэн!</span>
            ) : (
              <span>
                Дараагын түвшин хүртэл: <b>{nextThreshold - progress}xp</b>
              </span>
            )}
          </span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default LevelProgressBar;
