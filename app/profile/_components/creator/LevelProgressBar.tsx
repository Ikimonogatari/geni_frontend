import React from "react";

interface LevelProgressBarProps {
  level: number;
  progress: number;
  total: number;
}

function LevelProgressBar({ level, progress, total }: LevelProgressBarProps) {
  return (
    <div className="relative z-0 gap-2 bg-primary-bg border border-primary rounded-full w-full md:max-w-[166px] h-6">
      <div
        className="absolute left-0 top-0 h-6 bg-geni-green text-white text-sm font-bold rounded-full flex items-center justify-center py-[2px]"
        style={{ width: `${(progress / total) * 100}%` }}
      ></div>
      <span className="block z-10 w-full text-center h-6">{progress}xp</span>
    </div>
  );
}

export default LevelProgressBar;
