"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

function ContentGallery({ contentsGallery }) {
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
            <div
              onClick={() => (
                setShowModal(true), setSelectedReel(content.ContentVideo)
              )}
              key={id}
              className="cursor-pointer z-0 col-span-1 relative w-full h-full"
            >
              <video
                preload="metadata"
                className="rounded-2xl border-[1px] border-black/15 min-w-[161px] min-h-[285px] sm:min-w-[216px] sm:min-h-[385px] xl:min-w-[272px] xl:min-h-[484px]"
                muted
                loop
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                poster={content.ContentThumbnail}
              >
                <source type="video/mp4" src={content.ContentVideo} />
              </video>
              <button className="z-50 absolute top-3 right-3 p-2 rounded-lg bg-[#F5F4F0]">
                <Image
                  src={"/expand-icon.png"}
                  width={24}
                  height={24}
                  alt="expand"
                  className="w-3 h-3 sm:w-6 sm:h-6"
                />
              </button>
              <div className="z-50 absolute bottom-6 left-6 flex flex-row items-center gap-2">
                <Image
                  src={"/content-creator-dummy.png"}
                  width={22}
                  height={22}
                  alt="dummy"
                />
                <span className="text-xs md:text-base text-white">
                  {content.Nickname}
                </span>
                <Image
                  src={"/verified-icon.png"}
                  width={24}
                  height={24}
                  alt="verified"
                  className="w-4 h-4 sm:w-6 sm:h-6"
                />
              </div>
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      {showModal ? (
        <div className="justify-center items-center flex fixed inset-0 z-50 outline-none focus:outline-none bg-black/60">
          <motion.div
            animate={{
              opacity: showModal ? 1 : 0,
              transition: {
                delay: 1000,
              },
            }}
            className="rounded-2xl"
          >
            <div className="flex flex-col items-center px-7 rounded-2xl">
              <button onClick={() => setShowModal(false)}>
                <Image
                  src={"/cross-button.png"}
                  width={32}
                  height={32}
                  className="absolute right-[35px] top-[35px] w-6 h-6 sm:w-8 sm:h-8"
                  alt="close"
                />
              </button>

              <video
                className="w-[300px] h-[533px] sm:w-[360px] sm:h-[640px] lg:w-[420px] lg:h-[746px] xl:w-[480px] xl:h-[852px] rounded-2xl"
                autoPlay
                loop
                preload="metadata"
                controls="controls"
              >
                <source src={selectedReel} type="video/mp4" />
              </video>
            </div>
          </motion.div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default ContentGallery;
