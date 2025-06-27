import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { useRouter } from "next/navigation";

function ProductAddedSuccessModal({
  setCreateProductSuccess,
  userInfo,
  createProductData,
  createProductSuccess,
}) {
  const router = useRouter();
  const handleThanks = () => {
    setCreateProductSuccess(false);
    router.push("/profile");
  };

  return (
    <Dialog open={createProductSuccess} onOpenChange={setCreateProductSuccess}>
      <DialogContent className="max-w-lg sm:max-w-3xl w-full flex flex-col items-center gap-2 rounded-3xl">
        <span className="text-[#4FB755] text-3xl sm:text-5xl text-center font-bold">
          БҮТЭЭГДЭХҮҮН НЭМЭГДЛЭЭ
        </span>
        <Image
          src={"/product-added.png"}
          width={150}
          height={157}
          className="w-[138px] sm:w-[160px] h-[146px] sm:h-[168px]"
          alt="recieved"
        />

        <div className="w-full flex flex-col gap-5">
          <div className="bg-[#F49D19] p-4 text-white rounded-2xl text-xs sm:text-sm">
            Geni танай бүтээгдэхүүнийг дээрх тоо ширхэгийн дагуу баталгаажуулж,
            агуулахдаа хүлээн авсны дараа платформ дээр бүтээгчдэд санал болгох
            болно. Баярлалаа.
          </div>
          <span className="bg-primary-bg rounded-2xl p-4 text-black text-xs sm:text-sm">
            Хаяг: ХУД, 6-р хороо, Нүхт 32-615 тоот
          </span>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d669.1539190453369!2d106.80754826969235!3d47.86640599820094!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDfCsDUxJzU5LjEiTiAxMDbCsDQ4JzI5LjUiRQ!5e0!3m2!1sen!2smn!4v1751005165899!5m2!1sen!2smn"
            width="100%"
            className="rounded-2xl max-h-[200px]"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>

          <button
            onClick={handleThanks}
            className="w-full py-4 text-white font-semibold bg-[#4D55F5] text-xl sm:text-2xl border border-[#2D262D] rounded-2xl"
          >
            Баярлалаа
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductAddedSuccessModal;
