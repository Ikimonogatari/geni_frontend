import React, { useEffect } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRejectSelfContentMutation } from "@/app/services/service";

function ContentReturnModalContent({ requestId, setDialogOpen, refetch }) {
  const [
    rejectSelfContent,
    {
      error: rejectSelfContentError,
      isLoading: rejectSelfContentLoading,
      isSuccess: rejectSelfContentSuccess,
    },
  ] = useRejectSelfContentMutation();

  useEffect(() => {
    if (rejectSelfContentError) {
      //@ts-ignore
      toast.error(rejectSelfContentError?.data?.error);
    }
    if (rejectSelfContentSuccess) {
      toast.success("Амжилттай");
      setDialogOpen(false);
      refetch();
    }
  }, [rejectSelfContentSuccess, rejectSelfContentError]);

  const handleRejectSelfContent = () => {
    rejectSelfContent(requestId);
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
        type="button"
        onClick={handleRejectSelfContent}
        disabled={rejectSelfContentLoading}
        className="w-full py-3 text-white font-semibold bg-[#CA7FFE] text-2xl rounded-2xl"
      >
        Тийм
      </button>
    </div>
  );
}

export default ContentReturnModalContent;
