"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  useListProductTypesQuery,
  useListPublicProductsQuery,
  useGetPublicBrandListQuery,
} from "../services/service";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/components/hooks/usePagination";
import ProductCard from "./ProductCard";

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 18;
  const offset = (currentPage - 1) * productsPerPage;

  const {
    data: listProductsData,
    error: listProductsError,
    isLoading: listProductsLoading,
  } = useListPublicProductsQuery(
    {
      searchKey: searchQuery,
      limit: productsPerPage,
      offset,
    },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: listProductTypesData,
    error: listProductTypesError,
    isLoading: listProductTypesLoading,
  } = useListProductTypesQuery();

  const {
    data: listBrandsData,
    error: listBrandsError,
    isLoading: listBrandsLoading,
  } = useGetPublicBrandListQuery();

  // Filter brands based on selected category
  const filteredBrands = React.useMemo(() => {
    if (!listBrandsData?.Data || !selectedCategory)
      return listBrandsData?.Data || [];

    // Get all products for the current page
    const currentProducts = listProductsData?.Data || [];

    // Get unique brand IDs that have products in the selected category
    const brandIdsInCategory = new Set(
      currentProducts
        .filter((product) =>
          product.ProductTypes?.some(
            (type) => type.TypeName === selectedCategory
          )
        )
        .map((product) => product.BrandId)
    );

    // Filter brands to only include those with products in the selected category
    return listBrandsData.Data.filter((brand) =>
      brandIdsInCategory.has(brand.BrandId)
    );
  }, [listBrandsData?.Data, listProductsData?.Data, selectedCategory]);

  // Filter products based on selected category and brand
  const filteredProducts = React.useMemo(() => {
    if (!listProductsData?.Data) return [];

    return listProductsData.Data.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.ProductTypes?.some(
          (type) => type.TypeName === selectedCategory
        );
      const matchesBrand =
        !selectedBrand || product.BrandName === selectedBrand;

      return matchesCategory && matchesBrand;
    });
  }, [listProductsData?.Data, selectedCategory, selectedBrand]);

  // Calculate total pages based on filtered products
  const getTotalPages = () => {
    if (!listProductsData?.Data) return 0;

    // If no filters are applied, use the total count from API
    if (!selectedCategory && !selectedBrand) {
      return Math.ceil((listProductsData.RowCount || 0) / productsPerPage);
    }

    // If filters are applied, calculate based on filtered products
    const totalFiltered = listProductsData.Data.filter((product) => {
      const matchesCategory =
        !selectedCategory ||
        product.ProductTypes?.some(
          (type) => type.TypeName === selectedCategory
        );
      const matchesBrand =
        !selectedBrand || product.BrandName === selectedBrand;
      return matchesCategory && matchesBrand;
    }).length;

    return Math.ceil(totalFiltered / productsPerPage);
  };

  const totalPages = getTotalPages();
  const pageNumbers = usePagination(totalPages, currentPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, selectedBrand]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#2D262D]">
      <div className="">
        <div className="container max-w-8xl mx-auto px-7 py-12">
          <div className="w-full whitespace-nowrap pb-3 overflow-x-auto flex flex-row items-center gap-3 font-bold text-[10px] sm:text-xs">
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
          <div className="w-full bg-primary-bg rounded-2xl whitespace-nowrap  overflow-x-auto flex flex-row p-4 items-center gap-4 font-bold text-[10px] sm:text-xs">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    onClick={() => setSelectedBrand("")}
                    className={`cursor-pointer rounded-full border border-primary p-[2px] ${
                      selectedBrand === "" ? "bg-[#4D55F5]" : "bg-[#F5F4F0]"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-[#F5F4F0] flex items-center justify-center">
                      <span className="text-[8px] sm:text-xs">БҮГД</span>
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Бүх брэнд</p>
                </TooltipContent>
              </Tooltip>
              {filteredBrands.map((brand, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <div
                      onClick={() => setSelectedBrand(brand?.Name)}
                      className={`cursor-pointer rounded-full p-[2px] ${
                        selectedBrand === brand?.Name
                          ? "bg-[#4D55F5]"
                          : "bg-[#F5F4F0]"
                      }`}
                    >
                      <div
                        className={`w-16 h-16 rounded-full overflow-hidden border ${
                          selectedBrand === brand?.Name
                            ? "border-[#4D55F5] ring-[#4D55F5]/20"
                            : "border-[#2D262D]"
                        }`}
                      >
                        <Image
                          src={brand?.ProfileLink || "/dummy-brand.png"}
                          width={74}
                          height={74}
                          alt={brand?.Name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{brand?.Name}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </TooltipProvider>
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
              ? filteredProducts.map((product) => (
                  <ProductCard key={product.ProductId} product={product} />
                ))
              : [...Array(productsPerPage)].map((_, index) => (
                  <Skeleton
                    key={index}
                    className="rounded-2xl shadow-md h-full min-h-[280px] sm:min-h-[400px] lg:min-h-[552px] xl:min-h-[480px]"
                  />
                ))}
          </div>
          {!listProductsLoading && totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              handlePrevPage={handlePrevPage}
              handleNextPage={handleNextPage}
              paginate={paginate}
              bg={"bg-[#4D55F5]"}
              border={"border-[#4D55F5]"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
