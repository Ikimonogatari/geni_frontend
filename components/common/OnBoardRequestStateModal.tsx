"use client";
import React from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface OnBoardRequestStateModalProps {
  isRequested: boolean;
}

const OnBoardRequestStateModal: React.FC<OnBoardRequestStateModalProps> = ({
  isRequested,
}) => {
  return (
    <Dialog open={isRequested}>
      {/* @ts-ignore */}
      <DialogContent className={"max-w-lg rounded-3xl w-full"}>
        <div className="flex flex-col items-center gap-2">
          <Image
            src={"/onboard-request-state.png"}
            width={353}
            height={271}
            className=""
            alt=""
          />
          <span className="uppercase font-bold text-[#4FB755] text-3xl sm:text-4xl text-center">
            Брэнд болох хүсэлт хүлээгдэж байна.
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OnBoardRequestStateModal;
