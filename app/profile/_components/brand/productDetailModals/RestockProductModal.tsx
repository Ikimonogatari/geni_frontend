import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import Image from "next/image";
import CreditPurchase from "@/components/credit/CreditPurchaseModal";
import FadeInAnimation from "@/components/common/FadeInAnimation";
import { ErrorText } from "@/components/ui/error-text";

function RestockProductModal({
  brandData,
  p,
  count,
  decrement,
  increment,
  addSupply,
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full sm:w-1/2 rounded-xl bg-[#F5F4F0] border-[#2D262D] border flex flex-row justify-center items-center gap-2 py-3 px-6">
        <Image
          src={"/add-supply-icon.png"}
          width={24}
          height={24}
          alt=""
          className="w-6 h-6 aspect-square"
        />
        Нэмэх
      </DialogTrigger>
      {/*@ts-ignore*/}
      <DialogContent className="w-full max-w-xl flex flex-col gap-4 rounded-3xl">
        {/*@ts-ignore*/}
        <DialogHeader>
          {/*@ts-ignore*/}
          <DialogTitle className="text-3xl">
            Контент бүтээгчидтэй хамтрах хүсэлт нэмэх
          </DialogTitle>
          {/*@ts-ignore*/}
        </DialogHeader>
        {p?.ProductPics ? (
          <Image
            src={p?.ProductPics[0]?.Url}
            width={445}
            height={239}
            alt=""
            className="w-[445px] h-[239px] rounded-2xl mt-8 object-cover"
          />
        ) : (
          <></>
        )}
        <div className="flex flex-row items-center gap-6">
          <Image
            src={brandData ? brandData?.ProfileLink : ""}
            width={84}
            height={84}
            alt=""
            className="w-[84px] h-[84px] aspect-square rounded-full border-[1px] border-[#2D262D]"
          />
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold">{p?.BrandName}</span>
            <span className="text-base">{p?.ProductName}</span>
          </div>
        </div>
        <div className="rounded-xl bg-[#F5F4F0] flex flex-row items-center justify-between text-3xl py-4 px-16">
          <button onClick={decrement}>-</button>
          {count}
          <button onClick={increment}>+</button>
        </div>
        <div className="flex flex-col gap-2 border-primary border p-3 sm:p-4 bg-primary-bg rounded-xl">
          <span className="font-bold">
            Таны Geni Credit Үлдэгдэл:{" "}
            {brandData?.Credit ? brandData?.Credit : 0}
          </span>
          <FadeInAnimation visible={brandData?.Credit < count}>
            <ErrorText
              text={
                "Таны Geni Credit үлдэгдэл хүрэлцэхгүй байна. Та Geni Credit-ээ цэнэглэнэ үү."
              }
              visible={true}
            />
          </FadeInAnimation>
          <CreditPurchase
            buttonText={"Geni Credit цэнэглэх"}
            buttonIconSize={"w-4 h-4"}
            className={
              "text-lg flex flex-row items-center justify-center py-4 w-full"
            }
          />
        </div>
        <button
          onClick={() => addSupply(p?.ProductId)}
          className="bg-geni-blue text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-4"
        >
          Нэмэх
        </button>
      </DialogContent>
    </Dialog>
  );
}

export default RestockProductModal;
