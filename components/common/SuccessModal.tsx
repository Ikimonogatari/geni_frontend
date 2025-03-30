import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";

interface SuccessModalProps {
  isSuccessDialogOpen?: boolean;
  setIsSuccessDialogOpen?: (open: boolean) => void;
  modalImage: string;
  modalTitle: string;
  modalTriggerText?: string;
  context?: React.ReactNode;
  imageClassName: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  isSuccessDialogOpen,
  setIsSuccessDialogOpen,
  modalImage,
  modalTitle,
  modalTriggerText,
  context,
  imageClassName,
}) => {
  return (
    <Dialog open={isSuccessDialogOpen} onOpenChange={setIsSuccessDialogOpen}>
      {modalTriggerText && (
        <DialogTrigger
          type="submit"
          className={`w-full py-4 text-white text-lg sm:text-xl font-bold rounded-lg border border-[#2D262D] bg-[#CA7FFE]`}
        >
          {modalTriggerText}
        </DialogTrigger>
      )}
      {/* @ts-ignore */}
      <DialogContent
        className={
          "max-w-lg rounded-3xl w-full flex flex-col items-center gap-3"
        }
      >
        {/* @ts-ignore */}
        <DialogTitle className="text-[#4FB755] uppercase text-4xl sm:text-5xl font-extrabold text-center">
          {modalTitle}
        </DialogTitle>

        <Image
          src={modalImage}
          width={342}
          height={264}
          alt=""
          className={`${imageClassName}`}
        />
        {context && context}
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
