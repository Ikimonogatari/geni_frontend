import React, { Dispatch, SetStateAction } from "react";
import { Content, DialogType, STATUS_LIST } from "../content.services";
import Image from "next/image";
import HLSPlayer from "@/components/common/HLSPlayer";

type ViewContentProps = {
  content: Content;
  setDialogType: Dispatch<SetStateAction<DialogType>>;
};

const ViewContent: React.FC<ViewContentProps> = ({
  content,
  setDialogType,
}) => {
  return (
    <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4 gap-3">
      <p className="text-xl font-bold">Контент үзэх</p>
      <div className="flex flex-col lg:flex-row gap-8 flex-1 min-h-0">
        <div className="lg:basis-1/2 flex flex-row gap-4">
          <div className="basis-1/2 flex flex-col min-h-0 gap-2">
            <p className="text-sm font-bold">Контент</p>
            <div className="aspect-[9/16] w-full h-full rounded-2xl overflow-hidden">
              <HLSPlayer src={content.ContentVideo} />
            </div>
            {/* <video
              src={content.ContentVideo}
              className="rounded-lg border-[1px] border-[#E6E6E6] flex-1 min-h-0"
            /> */}
          </div>
          <div className="basis-1/2 flex flex-col min-h-0 gap-2">
            <p className="text-sm font-bold">Thumbnail зураг</p>
            <img
              src={content.ContentThumbnail || "/no-content-image.png"}
              alt=""
              className="aspect-[9/16] w-full h-full rounded-2xl"
            />
            {/* <Image
              src={content.ContentThumbnail || "/no-content-image.png"}
              alt="thumbnail"
              height={0}
              width={0}
              className="rounded-lg border-[1px] border-[#E6E6E6] w-full h-full flex-1 aspect-[9/16]"
            /> */}
          </div>
        </div>
        <div className="lg:basis-1/2 flex flex-col justify-between min-h-0 grow">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-bold">Тайлбар</p>
            <caption className="grow text-start text-sm text-[#6F6F6F]">
              {content.Caption}
            </caption>
          </div>
          <div className="flex flex-col justify-between gap-2">
            {[STATUS_LIST.BrandConfirming].includes(
              content?.CurrentStepName?.String as STATUS_LIST
            ) && (
              <button
                type="button"
                className="bg-[#F49D19] text-white py-1 sm:py-2 font-bold rounded-lg sm:rounded-lg transition-all"
                onClick={() => setDialogType(DialogType.EDIT_REQUEST)}
              >
                Контент засах хүсэлт илгээх
              </button>
            )}
            {[STATUS_LIST.BrandConfirming, STATUS_LIST.ContentReSent].includes(
              content?.CurrentStepName?.String as STATUS_LIST
            ) && (
              <button
                type="button"
                className="bg-secondary text-white py-1 sm:py-2 font-bold rounded-lg sm:rounded-lg transition-all"
                onClick={() => setDialogType(DialogType.ACCEPT_REQUEST)}
              >
                Контент хүлээж авах
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewContent;
