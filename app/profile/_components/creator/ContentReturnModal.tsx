import React, { useEffect } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useUndoContentRequestMutation } from "@/app/services/service";

function ContentReturnModal({ requestId }) {
  const [
    undoContentRequest,
    {
      data: undoContentRequestData,
      error: undoContentRequestError,
      isLoading: undoContentRequestLoading,
      isSuccess: undoContentRequestSuccess,
    },
  ] = useUndoContentRequestMutation();

  useEffect(() => {
    if (undoContentRequestError) {
      //@ts-ignore
      toast.error(undoContentRequestError?.data?.error);
    }
    if (undoContentRequestSuccess) {
      toast.success("Амжилттай");
    }
  }, [undoContentRequestSuccess, undoContentRequestError]);

  const handleUndoContentRequest = () => {
    undoContentRequest(requestId);
  };

  return (
    <Dialog>
      <DialogTrigger
        type="submit"
        className="col-span-1 border-[1px] border-[#F5F4F0] p-2 rounded-lg"
      >
        <Image src={"/hamburger-menu-icon.png"} alt="" width={24} height={24} />
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent className="w-full max-w-lg flex flex-col items-center gap-2 rounded-3xl">
        <span className="text-[#4FB755] text-2xl sm:text-3xl text-center font-bold uppercase">
          контент хүсэлтээ буцаахдаа итгэлтэй байна уу?
        </span>
        <Image
          src={"/content-return.png"}
          width={209}
          height={220}
          alt="recieved"
        />
        <DialogClose className="w-full">
          <button
            onClick={handleUndoContentRequest}
            className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
          >
            Тийм
          </button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ContentReturnModal;