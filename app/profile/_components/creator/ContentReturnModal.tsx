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
    <div className="w-full h-full flex flex-col items-center justify-between">
      <span className="text-[#4FB755] text-2xl sm:text-3xl text-center font-bold uppercase">
        контент хүсэлтээ буцаахдаа итгэлтэй байна уу?
      </span>
      <div className="flex justify-center">
        <Image
          src={"/content-return.png"}
          width={209}
          height={220}
          alt="recieved"
        />
      </div>

      <button
        onClick={handleUndoContentRequest}
        className="w-full py-3 text-white font-semibold bg-[#CA7FFE] text-2xl rounded-2xl"
      >
        Тийм
      </button>
    </div>
  );
}

export default ContentReturnModal;
