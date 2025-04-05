import Image from "next/image";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

function ProductCard({ product }) {
  const getStockStatus = (contentLeft, contentLimit, createdAt) => {
    const ratio = contentLeft / contentLimit;
    const now = new Date();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    if (
      new Date(createdAt).getTime() > twentyFourHoursAgo.getTime() &&
      contentLeft > 0 &&
      ratio > 0.2
    ) {
      return { status: "Шинэ", className: "bg-[#4FB755]" };
    } else if (contentLeft === 0) {
      return { status: "Дууссан", className: "bg-[#F41919]" };
    } else if (ratio <= 0.2) {
      return { status: "Цөөхөн үлдсэн", className: "bg-[#F49D19]" };
    } else {
      return { status: "Хангалттай", className: "bg-[#4FB755]" };
    }
  };
  const stockStatus = getStockStatus(
    product.ContentLeft,
    product.ContentLimit,
    product.CreatedAt
  );
  return (
    <Link
      href={`/products/${product.ProductId}`}
      key={product.ProductId}
      className="flex flex-col rounded-2xl shadow-md"
    >
      <div className="relative w-full rounded-t-2xl">
        <Image
          src={product.ProductPics?.[0]?.Url}
          width={280}
          height={280}
          alt=""
          className="aspect-square inset-0 w-full rounded-t-2xl object-cover"
        />
        <div className="flex flex-row items-center justify-end sm:justify-between w-full absolute top-2 px-3 sm:top-3">
          <div className="hidden sm:flex flex-row items-center w-full gap-2">
            {product.ProductTypes?.slice(0, 1).map((t, i) => (
              <div
                key={i}
                className="whitespace-nowrap bg-[#CA7FFE] text-[8px] sm:text-xs font-bold rounded-full px-2 py-1 sm:px-4 sm:py-2 text-white"
              >
                {t.TypeName}
              </div>
            ))}
          </div>
          <div
            className={`${stockStatus.className} text-white whitespace-nowrap text-[8px] sm:text-xs font-bold rounded-full px-2 py-1 sm:px-4 sm:py-2`}
          >
            <span className="">{stockStatus.status}</span>
          </div>
        </div>
      </div>
      <div className="bg-[#F5F4F0] p-3 sm:p-5 flex flex-col rounded-b-2xl h-full">
        <div className="flex sm:hidden flex-row items-center w-full gap-2">
          {product.ProductTypes?.slice(0, 1).map((t, i) => (
            <div
              key={i}
              className="mb-1 whitespace-nowrap bg-[#CA7FFE] text-[8px] sm:text-xs font-bold rounded-full px-2 py-1 sm:px-4 sm:py-2 text-white"
            >
              {t.TypeName}
            </div>
          ))}
        </div>
        <span className="text-xs sm:text-xl">{product.BrandName}</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="font-bold text-sm sm:text-2xl line-clamp-1">
                {product.ProductName}
              </span>
            </TooltipTrigger>

            {product.ProductName?.length > 20 && (
              //   @ts-ignore
              <TooltipContent className="max-w-[300px]">
                <p className="text-sm sm:text-base">{product.ProductName}</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
        <div className="text-[#6F6F6F] flex flex-col text-xs sm:text-base mt-0 sm:mt-2">
          <span className="">
            Хамтрах хүсэлт: {product.ContentLeft}/{product.ContentLimit}
          </span>
          <span className="">
            Үнэ: ₮{Number(product.TotalPrice).toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
