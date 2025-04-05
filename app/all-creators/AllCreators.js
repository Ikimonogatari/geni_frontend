"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetPublicCreatorListQuery } from "../services/service";
import PublicCreatorCard from "@/components/PublicCreatorCard";
import { Skeleton } from "@/components/ui/skeleton";

function AllCreators() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: getPublicCreatorListData,
    error: getPublicCreatorListError,
    isLoading: getPublicCreatorListLoading,
  } = useGetPublicCreatorListQuery();

  const filteredCreators = getPublicCreatorListData?.Data?.filter((creator) =>
    creator?.Nickname?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[#6F6F6F] text-base sm:text-2xl">
        Бүх Geni бүтээгчид / {getPublicCreatorListData?.Data?.length || 0}
      </span>
      <div className="bg-[#F2F2F2] rounded-xl w-full flex flex-row items-center justify-between gap-2 px-4 py-3 sm:pl-10 sm:pr-6 sm:py-6">
        <input
          className="bg-inherit outline-none w-full placeholder:text-[#6F6F6F] placeholder:text-sm sm:placeholder:text-base"
          placeholder="Хайлт хийх..."
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Image
          src={"/search-icon.png"}
          width={24}
          height={24}
          alt="search"
          className="w-5 h-5 sm:w-6 sm:h-6"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-4">
        {!getPublicCreatorListLoading ? (
          filteredCreators?.map((creator, id) => {
            const instagramLink = creator?.Socials?.find(
              (channel) => channel.Name === "Instagram"
            )?.SocialAddress;

            const facebookLink = creator?.Socials?.find(
              (channel) => channel.Name === "Facebook"
            )?.SocialAddress;

            return (
              <PublicCreatorCard
                key={id}
                id={id}
                creator={creator}
                instagramLink={instagramLink}
                facebookLink={facebookLink}
              />
            );
          })
        ) : (
          <>
            {[...Array(8)].map((_, index) => (
              <div key={index} className="flex flex-col gap-4">
                <Skeleton className="w-[94px] h-[94px] sm:w-[194px] sm:h-[194px] rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default AllCreators;
