import React from "react";
import { DialogClose, DialogContent, Dialog } from "./ui/dialog";
import Image from "next/image";

function UploadSuccessModal({
  isContentSubmitSuccess,
  parsedUserInfo,
  setIsContentSubmitSuccess,
}) {
  return (
    <Dialog open={isContentSubmitSuccess}>
      <DialogContent className="w-full max-w-lg flex flex-col items-center gap-2 rounded-3xl">
        <span className="text-[#4FB755] uppercase text-4xl sm:text-5xl text-center font-bold">
          контент илгээгдлээ
        </span>
        <Image
          src={"/content-sent.png"}
          width={209}
          height={220}
          alt="recieved"
        />

        <DialogClose className="w-full">
          <button
            onClick={() => setIsContentSubmitSuccess(false)}
            className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
          >
            Баярлалаа
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default UploadSuccessModal;
