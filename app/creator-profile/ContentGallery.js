"use client";
import { motion } from "framer-motion";
import React, { useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";

function ContentGallery({ contentsGallery, creatorData }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReel, setSelectedReel] = useState(null);
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
  return (<><div className="relative grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 items-center mt-9">
    {creatorData?.content?.map((content, id) => (
      <button
        onClick={() => (
          setShowModal(true), setSelectedReel(content.content_id?.video)
        )}
        key={id}
      >
        <video
          preload="metadata"
          className="rounded-2xl border-[1px] border-black/15"
          muted
          loop
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          poster={`https://cms.geni.mn/assets/${content.content_id?.thumbnail}`}
        >
          <source
            type="video/mp4"
            src={`https://cms.geni.mn/assets/${content.content_id?.video}`}
          />
        </video>
      </button>
    ))}
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
              <source
                src={`https://cms.geni.mn/assets/${selectedReel}`}
                type="video/mp4"
              />
            </video>
          </div>
        </motion.div>
      </div>
    ) : (
      <></>
    )}
    {/* <div className="mt-7 pt-6 border-t-[1px] border-[#CDCDCD] w-full grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">

      {contentsGallery.map((c, i) => (
        <div key={i} className="z-0 col-span-1 relative w-full h-full">
          <Image
            src={c.content}
            width={272}
            height={484}
            alt="dummy"
            className="z-0 w-full"
          />
          <button className="z-50 absolute top-3 right-3 p-2 rounded-lg bg-[#F5F4F0]">
            <Image
              src={"/expand-icon.png"}
              width={24}
              height={24}
              alt="expand"
            />
          </button>
          <div className="z-50 absolute bottom-6 left-6 flex flex-row items-center gap-2">
            <Image
              src={"/content-creator-dummy.png"}
              width={22}
              height={22}
              alt="dummy"
            />
            <span className="text-base text-white">{c.name}</span>
            <Image
              src={"/verified-icon.png"}
              width={24}
              height={24}
              alt="verified"
            />
          </div>
        </div>
      ))}
    </div>
     */}
  </>
  );
}

export default ContentGallery;
