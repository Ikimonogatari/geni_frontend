import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";

function DeleteProductModal({
  brandData,
  p,
  isDeleting,
  setIsDeleting,
  handleDeleteProduct,
}) {
  return (
    <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
      <DialogTrigger className="w-full sm:w-1/2 rounded-xl bg-[#F5F4F0] border-[#2D262D] border flex flex-row justify-center items-center gap-2 py-3 px-6">
        <Image
          src={"/delete-product-icon.png"}
          width={24}
          height={24}
          alt=""
          className="w-6 h-6 aspect-square"
        />
        Устгах
      </DialogTrigger>
      {/*@ts-ignore*/}
      <DialogContent className="overflow-y-auto h-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 py-12 w-full lg:w-full max-w-[1000px] rounded-3xl">
        <Image
          src={p.ProductPics ? p.ProductPics[0]?.Url : "/white-placeholder.png"}
          width={400}
          height={400}
          alt=""
          className="w-[400px] h-[400px] aspect-square rounded-2xl object-cover border"
        />
        <div className="lg:h-[400px] h-auto flex flex-col gap-5 w-full">
          <div className="h-full flex flex-col gap-5">
            <div className="flex flex-row items-center gap-6">
              <Image
                src={brandData ? brandData.ProfileLink : ""}
                width={84}
                height={84}
                alt=""
                className="w-[84px] h-[84px] aspect-square rounded-full border-[1px] border-[#2D262D]"
              />
              <div className="flex flex-col gap-2">
                <span className="text-xl font-bold">{p.BrandName}</span>
                <span className="text-base">{p.ProductName}</span>
              </div>
            </div>
            <span className="text-[#6F6F6F] line-clamp-5 text-sm">
              {p.Information}
            </span>
          </div>
          <span className="text-xl sm:text-2xl font-semibold">
            Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй байна уу?
          </span>
          <div className="flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-4 text-lg text-white font-semibold">
            <button
              onClick={() => setIsDeleting(false)}
              className="w-full sm:w-1/2 rounded-xl bg-[#F41919] gap-2 py-3 px-6"
            >
              Үгүй
            </button>
            <button
              onClick={() => handleDeleteProduct(p.ProductId)}
              className="w-full sm:w-1/2 rounded-xl bg-[#4FB755] py-3 px-6"
            >
              Тийм
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProductModal;
