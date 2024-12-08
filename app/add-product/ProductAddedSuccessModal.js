import React from "react";
import { Dialog, DialogContent } from "../components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductAddedSuccessModal({
  setCreateProductSuccess,
  parsedUserInfo,
  createProductData,
  createProductSuccess,
}) {
  const router = useRouter;
  const handleThanks = () => {
    setCreateProductSuccess(false);
    router.push("/brand-profile");
  };
  return (
    <Dialog open={createProductSuccess}>
      <DialogContent className="max-w-lg w-full flex flex-col items-center gap-2 rounded-3xl">
        <span className="text-[#4FB755] text-4xl sm:text-5xl text-center font-bold">
          БҮТЭЭГДЭХҮҮН НЭМЭГДЛЭЭ
        </span>
        <Image
          src={"/product-added.png"}
          width={209}
          height={220}
          alt="recieved"
        />

        <div className="w-full flex flex-col gap-5">
          <div className="bg-[#F49D19] p-4 text-white rounded-2xl">
            Geni танай бүтээгдэхүүнийг дээрх тоо ширхэгийн дагуу баталгаажуулж,
            агуулахдаа хүлээн авсны дараа платформ дээр бүтээгчдэд санал болгох
            болно. Баярлалаа.
          </div>
          <button
            onClick={handleThanks}
            className="w-full py-4 text-white font-semibold bg-[#4D55F5] text-2xl border border-[#2D262D] rounded-2xl"
          >
            Баярлалаа
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductAddedSuccessModal;
