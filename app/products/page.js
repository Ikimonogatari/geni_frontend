"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useListProductsQuery } from "../services/service";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const {
    data: listProductsData,
    error: listProductsError,
    isLoading: listProductsLoading,
  } = useListProductsQuery();

  useEffect(() => {
    let filtered = listProductsData;
    console.log(filtered);

    // if (selectedCategory) {
    //   filtered = filtered.filter(
    //     (product) => product.category === selectedCategory
    //   );
    // }

    // if (searchQuery) {
    //   filtered = filtered.filter(
    //     (product) =>
    //       product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    //       product.description.toLowerCase().includes(searchQuery.toLowerCase())
    //   );
    // }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, listProductsData]);

  return (
    <div className="min-h-screen w-full bg-white text-[#2D262D]">
      <div className="mt-32">
        <div className="container max-w-8xl mx-auto px-7 py-12">
          <div className="w-full flex flex-wrap items-center gap-3 font-bold text-[10px] sm:text-xs">
            {["Beauty", "Food", "Cloth"].map((category) => (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer rounded-full px-2 py-1 sm:px-4 sm:py-2 ${
                  selectedCategory === category
                    ? "bg-[#CA7FFE] text-white"
                    : "bg-[#F5F4F0]"
                }`}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="mt-4 bg-[#F2F2F2] rounded-2xl w-full flex flex-row items-center justify-between gap-2 px-4 py-3 sm:pl-10 sm:pr-6 sm:py-6">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-11">
            {listProductsData ? (
              filteredProducts?.map((product) => (
                <Link
                  href={`/products/${product.id}`}
                  key={product.id}
                  className="flex flex-col rounded-2xl shadow-md"
                >
                  <div className="relative w-full h-full rounded-t-2xl">
                    <Image
                      src={product.ImageUrl}
                      width={280}
                      height={280}
                      alt=""
                      className="w-full h-full"
                    />
                    <div className="bg-[#CA7FFE] text-[8px] sm:text-xs font-bold rounded-full px-2 py-1 sm:px-4 sm:py-2 absolute top-2 right-2 sm:top-3 sm:right-3">
                      {product.category}
                    </div>
                  </div>
                  <div className="bg-[#F5F4F0] p-3 sm:p-5 flex flex-col gap-2 rounded-b-2xl">
                    <span className="font-bold text-sm sm:text-xl">
                      {product.ProductName}
                    </span>
                    <span className="text-xs sm:text-lg">
                      {product.ProductName}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
