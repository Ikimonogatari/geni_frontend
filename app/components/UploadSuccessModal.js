import React from "react";
import { DialogClose, DialogContent, Dialog } from "./ui/dialog";
import Image from "next/image";

function UploadSuccessModal({
  isContentSubmitSuccess,
  parsedUserInfo,
  setIsContentSubmitSuccess,
}) {
  console.log(parsedUserInfo);
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

        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex flex-row justify-between items-start bg-[#F5F4F0] rounded-3xl p-4 sm:p-5">
            <div className="w-full flex flex-row items-center gap-5">
              {parsedUserInfo ? (
                <Image
                  src={
                    parsedUserInfo.ProfileLink
                      ? parsedUserInfo?.ProfileLink
                      : "/dummy-profile.jpg"
                  }
                  width={128}
                  height={128}
                  alt=""
                  className="w-[100px] h-[100px] aspect-square sm:w-[128px] sm:h-[128px] rounded-2xl"
                />
              ) : (
                <></>
              )}
              {parsedUserInfo && (
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full flex flex-row items-center gap-3">
                    <span className="font-bold text-xl">
                      {parsedUserInfo?.FirstName}
                      {parsedUserInfo?.Name}
                    </span>
                  </div>

                  <span className="text-lg">
                    {parsedUserInfo ? parsedUserInfo?.Point : 0}
                    xp
                  </span>
                </div>
              )}
            </div>
          </div>

          <DialogClose>
            <button
              onClick={() => setIsContentSubmitSuccess(false)}
              className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
            >
              Баярлалаа
            </button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UploadSuccessModal;
