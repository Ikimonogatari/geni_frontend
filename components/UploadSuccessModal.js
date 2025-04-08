import React from "react";
import { DialogClose, DialogContent, Dialog } from "./ui/dialog";
import Image from "next/image";

function UploadSuccessModal({
  isContentSubmitSuccess,
  setIsContentSubmitSuccess,
  setIsMainDialogOpen,
}) {
  const handleBayrlalaaClick = () => {
    setIsContentSubmitSuccess(false);
    // Close the parent dialog if the function exists
    if (setIsMainDialogOpen) {
      setIsMainDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isContentSubmitSuccess}
      onOpenChange={setIsContentSubmitSuccess}
    >
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
            onClick={handleBayrlalaaClick}
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
