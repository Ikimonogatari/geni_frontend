"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useAddProductSupplyMutation,
  useDeleteProductMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function BrandProducts({ brandProducts, brandData }) {
  const router = useRouter();
  console.log(brandData);
  console.log(brandProducts);
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

  const [
    deleteProduct,
    {
      data: deleteProductData,
      error: deleteProductError,
      isLoading: deleteProductLoading,
      isSuccess: deleteProductSuccess,
    },
  ] = useDeleteProductMutation();

  const [
    addProductSupply,
    {
      data: addProductSupplyData,
      error: addProductSupplyError,
      isLoading: addProductSupplyLoading,
      isSuccess: addProductSupplySuccess,
    },
  ] = useAddProductSupplyMutation();

  useEffect(() => {
    if (addProductSupplySuccess) {
      toast.success("Амжилттай");
    } else if (addProductSupplyError) {
      toast.error(addProductSupplyError?.data?.error);
    }
  }, [addProductSupplySuccess, addProductSupplyError]);

  useEffect(() => {
    if (deleteProductSuccess) {
      toast.success("Амжилттай");
      setIsDeleting(false);
    } else if (deleteProductError) {
      toast.error(deleteProductError?.data?.error);
    }
  }, [deleteProductSuccess, deleteProductError]);

  const addSupply = (productId) => {
    addProductSupply({
      ProductId: productId,
      SupplyCnt: count,
    });
  };

  const getStockStatus = (leftStock, quantity) => {
    const ratio = leftStock / quantity;
    if (leftStock === 0) {
      return { status: "Дууссан", className: "text-[#F41919]" };
    } else if (ratio <= 0.2) {
      return { status: "Дуусах дөхөж байна", className: "text-[#F49D19]" };
    } else {
      return { status: "Хангалттай байна", className: "text-[#4FB755]" };
    }
  };

  const getRequestStatus = (status) => {
    if (status === "Rejected") {
      return { text: "Хүсэлт буцаагдсан", className: "text-[#F41919]" };
    } else if (status === "Request") {
      return { text: "Хүсэлт илгээсэн", className: "text-[#F49D19]" };
    } else return;
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    router.replace("/profile");
  };

  // const sortedBrandProducts = [...brandProducts].sort((a, b) => {
  //   if (a.Status === "Approved" && b.Status !== "Approved") {
  //     return -1;
  //   } else if (a.Status !== "Approved" && b.Status === "Approved") {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[540px] w-full px-7 pt-3 mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,1fr,2fr,2fr] sm:grid-cols-[2fr,1fr,2fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
          <div className="col-span-1 flex flex-row gap-2 items-center justify-between">
            <span>Бүтээгдэхүүн</span>
            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
          <span className="col-span-1">Тоо хэмжээ</span>

          <div className="col-span-1 flex flex-row gap-2 items-center justify-between">
            <span>Статус</span>
            <Image
              src={"/brand-profile-arrow-icon.png"}
              width={24}
              height={24}
              alt="arrow"
              className="w-4 h-4 sm:w-6 sm:h-6"
            />
          </div>
          <span className="col-span-1">Үйлдэл</span>
        </div>
        {
          // sortedBrandProducts
          brandProducts?.map((p, i) => {
            const stockStatus = getStockStatus(p.LeftStock, p.Quantity);
            const requestStatus = getRequestStatus(p.Status);
            return (
              <div
                key={i}
                className="text-[10px] sm:text-base px-5 py-1 sm:p-5 grid grid-cols-[2fr,1fr,2fr,2fr] sm:grid-cols-[2fr,1fr,2fr,1fr] gap-6 w-full items-center border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
              >
                <span className="col-span-1">{p.ProductName}</span>

                <span className="col-span-1">
                  {p.LeftStock} / {p.Quantity}
                </span>
                {p.Status === "Approved" ? (
                  <div
                    className={`${stockStatus.className} col-span-1 flex flex-row items-center gap-3`}
                  >
                    <Image
                      src={"/product-supply-icon.png"}
                      width={24}
                      height={24}
                      alt="stage"
                      className="w-4 h-4 sm:w-6 sm:h-6"
                    />
                    <span className="">{stockStatus.status}</span>
                  </div>
                ) : (
                  <span className={`${requestStatus?.className}`}>
                    {requestStatus?.text}
                  </span>
                )}
                <div className="col-span-1">
                  <Dialog>
                    <DialogTrigger className="bg-[#F49D19] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold">
                      Харах
                    </DialogTrigger>
                    <DialogContent className="overflow-y-auto h-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 py-12 w-full lg:w-full max-w-[1000px] rounded-3xl">
                      <DialogHeader>
                        <DialogTitle></DialogTitle>
                      </DialogHeader>
                      <Image
                        src={
                          p.ProductPics
                            ? p.ProductPics[0]?.Url
                            : "/white-placeholder.png"
                        }
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
                              <span className="text-xl font-bold">
                                {p.BrandName}
                              </span>
                              <span className="text-base">{p.ProductName}</span>
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className="flex flex-col gap-2 w-1/2">
                              <span className="text-base text-[#6F6F6F]">
                                Тоо хэмжээ
                              </span>
                              <span className="text-xl font-semibold text-[#6F6F6F]">
                                {p.LeftStock}/{p.Quantity}
                              </span>
                            </div>
                            <div className="flex flex-col gap-2 w-1/2">
                              <span className="text-base text-[#6F6F6F]">
                                Статус
                              </span>
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
                            Мэдээлэл засах
                          </a>
                          {p.Status === "Approved" ? (
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
                              <DialogContent className="w-full max-w-lg flex flex-col gap-6 rounded-3xl">
                                <DialogHeader>
                                  <DialogTitle className="text-3xl">
                                    Бүтээгдэхүүн нэмэх
                                  </DialogTitle>
                                </DialogHeader>
                                {p.ProductPics ? (
                                  <Image
                                    src={p.ProductPics[0]?.Url}
                                    width={445}
                                    height={239}
                                    alt=""
                                    className="w-[445px] h-[239px] rounded-2xl mt-11 object-cover"
                                  />
                                ) : (
                                  <></>
                                )}
                                <div className="flex flex-row items-center gap-6">
                                  <Image
                                    src={brandData ? brandData.ProfileLink : ""}
                                    width={84}
                                    height={84}
                                    alt=""
                                    className="w-[84px] h-[84px] aspect-square rounded-full border-[1px] border-[#2D262D]"
                                  />
                                  <div className="flex flex-col gap-2">
                                    <span className="text-xl font-bold">
                                      {p.BrandName}
                                    </span>
                                    <span className="text-base">
                                      {p.ProductName}
                                    </span>
                                  </div>
                                </div>
                                <div className="rounded-xl bg-[#F5F4F0] flex flex-row items-center justify-between text-3xl py-4 px-16">
                                  <button onClick={decrement}>-</button>
                                  {count}
                                  <button onClick={increment}>+</button>
                                </div>
                                <button
                                  onClick={() => addSupply(p.ProductId)}
                                  className="bg-[#CA7FFE] text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-4"
                                >
                                  Нэмэх
                                </button>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <button
                              onClick={() => setIsDeleting(true)}
                              className="w-full sm:w-1/2 rounded-xl bg-[#F5F4F0] border-[#2D262D] border flex flex-row justify-center items-center gap-2 py-3 px-6"
                            >
                              <Image
                                src={"/delete-product-icon.png"}
                                width={24}
                                height={24}
                                alt=""
                                className="w-6 h-6 aspect-square"
                              />
                              Устгах
                            </button>
                          )}

                          <Dialog
                            open={isDeleting}
                            onOpenChange={setIsDeleting}
                          >
                            <DialogContent className="overflow-y-auto h-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 py-12 w-full lg:w-full max-w-[1000px] rounded-3xl">
                              <Image
                                src={
                                  p.ProductPics
                                    ? p.ProductPics[0]?.Url
                                    : "/white-placeholder.png"
                                }
                                width={400}
                                height={400}
                                alt=""
                                className="w-[400px] h-[400px] aspect-square rounded-2xl object-cover border"
                              />
                              <div className="lg:h-[400px] h-auto flex flex-col gap-5 w-full">
                                <div className="h-full flex flex-col gap-5">
                                  <div className="flex flex-row items-center gap-6">
                                    <Image
                                      src={
                                        brandData ? brandData.ProfileLink : ""
                                      }
                                      width={84}
                                      height={84}
                                      alt=""
                                      className="w-[84px] h-[84px] aspect-square rounded-full border-[1px] border-[#2D262D]"
                                    />
                                    <div className="flex flex-col gap-2">
                                      <span className="text-xl font-bold">
                                        {p.BrandName}
                                      </span>
                                      <span className="text-base">
                                        {p.ProductName}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="text-[#6F6F6F] line-clamp-5 text-sm">
                                    {p.Information}
                                  </span>
                                </div>
                                <span className="text-xl sm:text-2xl font-semibold">
                                  Та энэ бүтээгдэхүүнийг устгахдаа итгэлтэй
                                  байна уу?
                                </span>
                                <div className="flex flex-col-reverse sm:flex-row items-center gap-2 sm:gap-4 text-lg text-white font-semibold">
                                  <button
                                    onClick={() => setIsDeleting(false)}
                                    className="w-full sm:w-1/2 rounded-xl bg-[#F41919] gap-2 py-3 px-6"
                                  >
                                    Үгүй
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDeleteProduct(p.ProductId)
                                    }
                                    className="w-full sm:w-1/2 rounded-xl bg-[#4FB755] py-3 px-6"
                                  >
                                    Тийм
                                  </button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
}

export default BrandProducts;

const stages = [
  "/stage-icon1.png",
  "/stage-icon2.png",
  "/stage-icon3.png",
  "/stage-icon4.png",
];
