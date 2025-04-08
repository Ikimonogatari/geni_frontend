"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useListProductTypesQuery,
  useListPublicProductsQuery,
} from "../services/service";
import { Skeleton } from "@/components/ui/skeleton";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    data: listProductsData,
    error: listProductsError,
    isLoading: listProductsLoading,
  } = useListPublicProductsQuery();

  const {
    data: listProductTypesData,
    error: listProductTypesError,
    isLoading: listProductTypesLoading,
  } = useListProductTypesQuery();

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

  useEffect(() => {
    if (listProductsData) {
      let filtered = [...listProductsData.Data];

      // Filter by selected category
      if (selectedCategory) {
        filtered = filtered.filter((product) =>
          product.ProductTypes?.some(
            (type) => type.TypeName === selectedCategory
          )
        );
      }

      // Search query filter
      if (searchQuery) {
        filtered = filtered.filter(
          (product) =>
            product.ProductName.toLowerCase().includes(
              searchQuery.toLowerCase()
            ) ||
            product.Information.toLowerCase().includes(
              searchQuery.toLowerCase()
            )
        );
      }

      // Sort by the ratio
      filtered.sort((a, b) => {
        const ratioA = a.ContentLeft / a.ContentLimit;
        const ratioB = b.ContentLeft / b.ContentLimit;
        return ratioB - ratioA; // Descending order
      });

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, selectedCategory, listProductsData]);

  return (
    <div className="min-h-screen w-full bg-white text-[#2D262D]">
      <div className="mt-32">
        <div className="container max-w-8xl mx-auto px-7 py-12">
          <div className="w-full whitespace-nowrap pb-3 overflow-x-auto flex flex-row sm:flex-wrap items-center gap-3 font-bold text-[10px] sm:text-xs">
            <div
              onClick={() => setSelectedCategory("")}
              className={`cursor-pointer rounded-full px-4 py-2 ${
                selectedCategory === ""
                  ? "bg-[#CA7FFE] text-white"
                  : "bg-[#F5F4F0]"
              }`}
            >
              Бүгд
            </div>
            {listProductTypesData?.map((t, i) => (
              <div
                key={i}
                onClick={() => setSelectedCategory(t?.TypeName)}
                className={`cursor-pointer rounded-full px-4 py-2 ${
                  selectedCategory === t?.TypeName
                    ? "bg-[#CA7FFE] text-white"
                    : "bg-[#F5F4F0]"
                }`}
              >
                {t?.TypeName}
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#F2F2F2] rounded-xl w-full flex flex-row items-center justify-between gap-2 px-4 py-3 sm:pl-10 sm:pr-6 sm:py-6">
            <input
              className="bg-inherit outline-none w-full placeholder:text-[#6F6F6F] placeholder:text-sm sm:placeholder:text-base"
              placeholder="Бүтээгдэхүүн хайх"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Image
              src={"/search-icon.png"}
              width={24}
              height={24}
              alt="search"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-11">
            {!listProductsLoading
              ? filteredProducts?.map((product) => {
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
                        <span className="text-xs sm:text-xl">
                          {product.BrandName}
                        </span>
                        <span className="font-bold text-sm sm:text-2xl">
                          {product.ProductName}
                        </span>
                        <div className="text-[#6F6F6F] flex flex-col text-xs sm:text-base mt-0 sm:mt-2">
                          <span className="">
                            Хамтрах хүсэлт: {product.ContentLeft}/
                            {product.ContentLimit}
                          </span>
                          <span className="">
                            Үнэ: ₮{Number(product.TotalPrice).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })
              : [...Array(12)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="rounded-2xl shadow-md h-full min-h-[280px] sm:min-h-[400px] lg:min-h-[552px] xl:min-h-[480px]"
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
