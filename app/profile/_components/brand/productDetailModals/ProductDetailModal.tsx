import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import DisableProductModal from "./DisableProductModal";
import DeleteProductModal from "./DeleteProductModal";
import RestockProductModal from "./RestockProductModal";

function ProductDetailModal({
  brandData,
  p,
  requestStatus,
  productDetailModal,
  setProductDetailModal,
  isDisabling,
  setIsDisabling,
  handleDisableProduct,
  isDeleting,
  setIsDeleting,
  handleDeleteProduct,
  increment,
  decrement,
  addSupply,
  count,
}) {
  return (
    <Dialog open={productDetailModal} onOpenChange={setProductDetailModal}>
      <DialogTrigger className="bg-[#F49D19] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold">
        Харах
      </DialogTrigger>
      {/*@ts-ignore*/}
      <DialogContent className="overflow-y-auto h-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 py-12 w-full lg:w-full max-w-[1000px] rounded-3xl">
        {/*@ts-ignore*/}
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <Image
          src={p.ProductPics ? p.ProductPics[0]?.Url : "/white-placeholder.png"}
          width={400}
          height={400}
          alt=""
          className="w-[400px] h-[400px] aspect-square rounded-2xl object-cover border"
        />
        <div className="lg:h-[400px] h-auto flex flex-col gap-5 w-full justify-between">
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
            <div className="flex flex-row">
              <div className="flex flex-col gap-2 w-1/2">
                <span className="text-base text-[#6F6F6F]">Контентын тоо</span>
                <span className="text-xl font-semibold text-[#6F6F6F]">
                  {p.ContentLeft}/{p.ContentLimit}
                </span>
              </div>
              <div className="flex flex-col gap-2 w-1/2">
                <span className="text-base text-[#6F6F6F]">Статус</span>
                <span
                  className={`${requestStatus?.className} text-[#4FB755] text-xl`}
                >
                  {requestStatus?.text}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 text-lg sm:text-xl text-[#2D262D] font-semibold">
            <a
              href={`/edit-product/${p.ProductId}`}
              className="whitespace-nowrap w-full sm:w-1/2 rounded-xl bg-[#F5F4F0] border-[#2D262D] border flex flex-row justify-center items-center gap-2 py-3 px-6"
            >
              <Image
                src={"/edit-product-icon.png"}
                width={24}
                height={24}
                alt=""
                className="w-6 h-6 aspect-square"
              />
              Засах
            </a>
            {p.Status === "Approved" && (
              <DisableProductModal
                brandData={brandData}
                p={p}
                isDisabling={isDisabling}
                setIsDisabling={setIsDisabling}
                handleDisableProduct={handleDisableProduct}
              />
            )}
            {p.Status === "Approved" ? (
              <RestockProductModal
                brandData={brandData}
                p={p}
                count={count}
                decrement={decrement}
                increment={increment}
                addSupply={addSupply}
              />
            ) : (
              <DeleteProductModal
                brandData={brandData}
                p={p}
                isDeleting={isDeleting}
                setIsDeleting={setIsDeleting}
                handleDeleteProduct={handleDeleteProduct}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailModal;
