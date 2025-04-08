"use client";
import React from "react";
import MonthlyCompetition from "./MonthlyCompetition";
import Leaderboard from "./Leaderboard";
import { useGetCompetitionInfoQuery } from "../services/service";

function MonthlyCompetitionLayout() {
  const {
    data: getCompetitionInfoData,
    error: getCompetitionInfoError,
    isLoading: getCompetitionInfoLoading,
  } = useGetCompetitionInfoQuery();

  return (
    <div className="flex flex-col">
      <MonthlyCompetition getCompetitionInfoData={getCompetitionInfoData} />
      <Leaderboard getCompetitionInfoData={getCompetitionInfoData} />
    </div>
  );
}

export default MonthlyCompetitionLayout;
