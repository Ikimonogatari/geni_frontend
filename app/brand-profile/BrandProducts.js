import Image from "next/image";
import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { useAddProductSupplyMutation } from "../services/service";
import toast from "react-hot-toast";

function BrandProducts({ brandProducts, brandData }) {
  console.log(brandData);
  console.log(brandProducts);
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count > 0 ? count - 1 : 0);

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
      toast.error(addProductSupplyError.data.error);
    }
  }, [addProductSupplySuccess, addProductSupplyError]);

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
  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[540px] w-full px-7 pt-3 mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
        <div className="text-xs sm:text-base px-5 py-3 sm:p-5 grid grid-cols-[2fr,1fr,2fr,1fr] gap-6 w-full items-center text-[#6F6F6F]">
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
        {brandProducts
          ?.filter((p) => p.Status === "Approved")
          .map((p, i) => {
            const stockStatus = getStockStatus(p.LeftStock, p.Quantity);
            return (
              <div
                key={i}
                className="text-[10px] sm:text-base px-5 py-1 sm:p-5 grid grid-cols-[2fr,1fr,2fr,1fr] gap-6 w-full items-center border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
              >
                <span className="col-span-1">{p.ProductName}</span>

                <span className="col-span-1">
                  {p.LeftStock} / {p.Quantity}
                </span>
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
                <div className="col-span-1">
                  <Dialog>
                    <DialogTrigger className="bg-[#4D55F5] border-[1px] border-[#2D262D] px-5 py-2 rounded-lg text-white font-bold">
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
                          className="w-[445px] h-[239px] rounded-2xl mt-11"
                        />
                      ) : (
                        <></>
                      )}
                      <div className="flex flex-row items-center gap-6">
                        <Image
                          src={brandData ? brandData.ProfileLink : ""}
                          width="84"
                          height="84"
                          alt=""
                          className="rounded-full border-[1px] border-[#2D262D]"
                        />
                        <div className="flex flex-col gap-2">
                          <span className="text-xl font-bold">
                            {p.BrandName}
                          </span>
                          <span className="text-base">{p.ProductName}</span>
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
                </div>
              </div>
            );
          })}
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
