"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useGetPublicBrandList } from "@/hooks/react-queries";

function AllBrands() {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: getPublicBrandListData,
    error: getPublicBrandListError,
    isLoading: getPublicBrandListLoading,
  } = useGetPublicBrandList();

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
      <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[10px] sm:gap-4">
        {filteredBrands?.map((brand, id) => {
          const instagramLink = brand?.Socials?.find(
            (channel) => channel.Name === "Instagram"
          )?.SocialAddress;

          const facebookLink = brand?.Socials?.find(
            (channel) => channel.Name === "Facebook"
          )?.SocialAddress;

          return (
            <div
              key={id}
              className="bg-[#F5F4F0] rounded-2xl p-4 text-[#2D262D] border border-[#000000] flex flex-col items-center gap-2 h-full"
            >
              <Image
                src={
                  brand?.ProfileLink ? brand?.ProfileLink : "/dummy-brand.png"
                }
                width={194}
                height={194}
                alt=""
                className="aspect-square w-[115px] sm:w-[194px] h-[115px] sm:h-[194px] rounded-full border border-[#000000] object-cover"
              />
              <span className="hover:underline hover:underline-offset-3 text-base sm:text-lg font-semibold max-w-[150px] whitespace-nowrap overflow-hidden">
                {brand?.Name ? brand?.Name : "Geni Брэнд"}
              </span>
              {brand?.BrandTypes && (
                <div className="bg-[#CA7FFE] text-white rounded-full px-4 py-2">
                  {brand?.BrandTypes?.[0]?.TypeName}
                </div>
              )}
              <div className="flex flex-row gap-2">
                {instagramLink ? (
                  <a
                    href={instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75"
                  >
                    <Image
                      src="/Instagram.png"
                      width={24}
                      height={24}
                      alt=""
                      className="h-5 w-5 sm:w-6 sm:h-6"
                    />
                  </a>
                ) : (
                  <></>
                )}
                {facebookLink ? (
                  <a
                    href={facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-75"
                  >
                    <Image
                      src="/Facebook.png"
                      width={24}
                      height={24}
                      alt=""
                      className="h-5 w-5 sm:w-6 sm:h-6"
                    />
                  </a>
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AllBrands;
