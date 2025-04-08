import React from "react";

function LeaderboardRank({ rank }) {
  const getRankBg = (rank) => {
    if (rank === 1) return "/rank-bg-high.png";
    if (rank === 2 || rank === 3) return "/rank-bg-mid.png";
    if (rank === 4 || rank === 5) return "/rank-bg-low.png";
    return "/rank-bg-low.png";
  };

  return (
    <div
      className={`flex items-center justify-center w-14 h-full aspect-square text-black rounded-full ${
        rank <= 3 ? "font-bold text-lg sm:text-2xl" : "text-sm sm:text-base"
      }`}
      style={{
        backgroundImage: `url(${getRankBg(rank)})`,
        backgroundSize: "cover",
      }}
    >
      {rank}
    </div>
  );
}

export default LeaderboardRank;
