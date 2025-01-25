import React from "react";
import Image from "next/image";
import { DialogClose, DialogContent, Dialog } from "./ui/dialog";

function ConvertToCreatorModal({ isCreator, handleBecomeCreator }) {
  return (
    <Dialog open={isCreator}>
      <DialogContent className="w-full max-w-2xl flex flex-col gap-3 rounded-3xl">
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col gap-3 sm:gap-5">
            <span className="text-[#4FB755] text-3xl sm:text-5xl font-bold">
              Баяр хүргэе!
            </span>
            <span className="text-[10px] sm:text-base">
              Таны илгээсэн контент хөтөлбөрийн чанарыг хангаж та амжилттай Geni
              creator хаягтай болж Geni Брэндтэй хамтрах эрхтэй боллоо.
            </span>
          </div>
          <Image
            src={"/become-creator-image.png"}
            width={217}
            height={213}
            className="max-w-[127px] max-h-[123px] sm:max-w-[217px] sm:max-h-[213px]"
            alt=""
          />
        </div>
        <div className="bg-[#F49D19] rounded-2xl text-[10px] sm:text-sm text-white p-4 w-full flex flex-row items-center gap-3">
          <Image
            src={"/info-white.png"}
            width={24}
            height={24}
            className="w-6 h-6"
            alt=""
          />
          Та өөрийн яг одоо ашиглаж буй мэдээллээрээ Geni Creator гэсэн хэсгийг
          сонгон нэвтрэнэ үү!
        </div>
        <DialogClose
          onClick={handleBecomeCreator}
          className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-base sm:text-xl border border-[#2D262D] rounded-2xl"
        >
          Geni Creator-р нэвтрэх
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default ConvertToCreatorModal;
