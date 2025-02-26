"use client";
import React from "react";
import MonthlyCompetition from "./MonthlyCompetition";
import Leaderboard from "./Leaderboard";
import { useGetCompetitionInfo } from "@/hooks/react-queries";

function MonthlyCompetitionLayout() {
  const {
    data: getCompetitionInfoData,
    error: getCompetitionInfoError,
    isLoading: getCompetitionInfoLoading,
  } = useGetCompetitionInfo();

  return (
    <div className="flex flex-col">
      <MonthlyCompetition getCompetitionInfoData={getCompetitionInfoData} />
      <Leaderboard getCompetitionInfoData={getCompetitionInfoData} />
    </div>
  );
}

export default MonthlyCompetitionLayout;
