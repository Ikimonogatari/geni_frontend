"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";

function BrandContentGallery({ contentsGallery }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
  console.log(contentsGallery);
  const handleMouseEnter = (e) => {
    const vid = e.target;
    vid.muted = true;
    vid.play();
    vid.poster = vid.dataset.thumbnail;
  };

  const handleMouseLeave = (e) => {
    const vid = e.target;
    vid.muted = false;
    vid.currentTime = 0;
    vid.pause();
  };
  return (
    <>
      <div className="mt-7 px-3 pt-6 border-t-[1px] border-[#CDCDCD] relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 items-center">
        {contentsGallery ? (
          contentsGallery?.map((content, id) => (
            <Dialog key={id}>
              <DialogTrigger>
                <div className="cursor-pointer z-0 col-span-1 relative w-full h-full aspect-[9/16] rounded-2xl">
                  <video
                    preload="metadata"
                    className="border-[1px] border-black/15 aspect-[9/16] w-full h-full rounded-2xl object-cover"
                    muted
                    loop
                    // onMouseEnter={handleMouseEnter}
                    // onMouseLeave={handleMouseLeave}
                    poster={content?.ContentThumbnail}
                  >
                    <source type="video/mp4" src={content?.ContentVideo} />
                  </video>
                  <div className="absolute z-10 w-full h-full top-0">
                    <button className="z-20 absolute top-3 right-3 p-2 rounded-lg bg-[#F5F4F0]">
                      <Image
                        src={"/expand-icon.png"}
                        width={24}
                        height={24}
                        alt="expand"
                        className="w-3 h-3 sm:w-6 sm:h-6"
                      />
                    </button>
                    <div className="absolute w-full bottom-3 sm:bottom-4 px-3 sm:px-4 object-bottom z-20 flex flex-col text-xs md:text-base text-white">
                      <div className="bg-black/20 w-full px-3 py-2 rounded-lg flex flex-col items-start">
                        <div className="flex flex-row items-center gap-2">
                          <Image
                            src={
                              content?.CreatorProfileLink
                                ? content?.CreatorProfileLink
                                : "/dummy-profile.jpg"
                            }
                            width={20}
                            height={20}
                            className="rounded-full w-4 h-4 sm:w-5 sm:h-5"
                            alt=""
                          />
                          <span className="text-base sm:text-lg font-semibold">
                            {content?.Nickname}
                          </span>
                          <Image
                            src={"/verified-icon.png"}
                            width={20}
                            height={20}
                            alt="verified"
                            className="w-4 h-4 sm:w-5 sm:h-5"
                          />
                        </div>
                        <span>{content?.ProductName}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="overflow-y-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 max-h-[739px] w-full sm:w-auto lg:w-full max-w-[1000px] rounded-3xl">
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold">Контент</span>

                  <video
                    controls
                    className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                  >
                    <source src={content?.ContentVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="flex flex-col gap-4">
                  <span className="text-lg font-semibold">Thumbnail зураг</span>

                  <img
                    src={content?.ContentThumbnail}
                    alt=""
                    className="aspect-[9/16] w-full h-full sm:w-[272px] rounded-2xl"
                  />
                </div>

                <div className="flex flex-col gap-4 h-full justify-between">
                  <span className="text-lg font-semibold">Дэлгэрэнгүй</span>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                      <span className="text-base">Контентын тайлбар</span>
                      <span className="p-3 rounded-xl bg-[#F5F4F0] text-sm sm:text-base text-[#6F6F6F]">
                        {content?.Caption}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-base">
                        Контент бүтээгчид өгсөн оноо
                      </span>
                      <div className="flex gap-2">
                        {[20, 40, 60, 80, 100].map((point, i) => (
                          <div
                            key={i}
                            className={`py-2 px-5 text-sm rounded-xl ${
                              content?.BrandGivenPoint === point
                                ? "bg-[#4FB755] border-[#4FB755] border text-white"
                                : "bg-transparent border-[#CDCDCD] border text-[#CDCDCD]"
                            }`}
                          >
                            {point}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-base">
                        Контентод үлдээсэн сэтгэгдэл
                      </span>
                      <span className="p-3 rounded-xl bg-[#F5F4F0] text-sm sm:text-base text-[#6F6F6F]">
                        {content.BrandComment}
                      </span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default BrandContentGallery;
