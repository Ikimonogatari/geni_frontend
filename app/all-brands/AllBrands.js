"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetPublicBrandListQuery } from "../services/service";
import { Skeleton } from "@/components/ui/skeleton";
import PublicBrandCard from "@/components/PublicBrandCard";

function AllBrands() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: getPublicBrandListData,
    error: getPublicBrandListError,
    isLoading: getPublicBrandListLoading,
  } = useGetPublicBrandListQuery();

  const filteredBrands = getPublicBrandListData?.Data?.filter((brand) =>
    brand?.Name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <span className="text-[#6F6F6F] text-base sm:text-2xl">
        Бүх Geni брэндүүд / {getPublicBrandListData?.Data?.length}
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!getPublicBrandListLoading ? (
          filteredBrands?.map((brand, id) => {
            const instagramLink = brand?.Socials?.find(
              (channel) => channel.Name === "Instagram"
            )?.SocialAddress;

            const facebookLink = brand?.Socials?.find(
              (channel) => channel.Name === "Facebook"
            )?.SocialAddress;

            return (
              <PublicBrandCard
                key={id}
                id={id}
                brand={brand}
                instagramLink={instagramLink}
                facebookLink={facebookLink}
                isSwiper={false}
                size=""
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

export default AllBrands;
