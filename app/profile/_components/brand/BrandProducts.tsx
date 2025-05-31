"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  useAddProductSupplyMutation,
  useDeleteProductMutation,
  useDisableProductMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import EmptyList from "@/components/common/EmptyList";
import ProductDetailModal from "./productDetailModals/ProductDetailModal";
import { Skeleton } from "@/components/ui/skeleton";

function BrandProducts({ brandProducts, brandData, isLoading }) {
  const [count, setCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDisabling, setIsDisabling] = useState(false);
  const [productDetailModal, setProductDetailModal] = useState(false);
  const [p, setP] = useState({});
  const [requestStatus, setRequestStatus] = useState("");

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

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
    disableProduct,
    {
      data: disableProductData,
      error: disableProductError,
      isLoading: disableProductLoading,
      isSuccess: disableProductSuccess,
    },
  ] = useDisableProductMutation();

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
      //@ts-ignore
      toast.error(addProductSupplyError?.data?.error);
    }
  }, [addProductSupplySuccess, addProductSupplyError]);

  useEffect(() => {
    if (deleteProductSuccess) {
      toast.success("Амжилттай");
      setIsDeleting(false);
      setProductDetailModal(false);
    } else if (deleteProductError) {
      //@ts-ignore
      toast.error(deleteProductError?.data?.error);
    }
  }, [deleteProductSuccess, deleteProductError]);

  useEffect(() => {
    if (disableProductSuccess) {
      toast.success("Амжилттай");
      setIsDisabling(false);
    } else if (disableProductError) {
      //@ts-ignore
      toast.error(disableProductError?.data?.error);
    }
  }, [disableProductSuccess, disableProductError]);

  const addSupply = (productId) => {
    addProductSupply({
      ProductId: productId,
      Credit: count,
    });
  };

  const getStockStatus = (leftStock, quantity, isActive) => {
    const ratio = leftStock / quantity;
    if (isActive) {
      if (leftStock === 0) {
        return { status: "Дууссан", className: "text-[#F41919]" };
      } else if (ratio <= 0.2) {
        return { status: "Дуусах дөхөж байна", className: "text-[#F49D19]" };
      } else {
        return { status: "Хангалттай байна", className: "text-[#4FB755]" };
      }
    } else {
      return { status: "Идэвхгүй", className: "text-[#F41919]" };
    }
  };

  const getRequestStatus = (status) => {
    if (status === "Rejected") {
      return { text: "Хүсэлт буцаагдсан", className: "text-[#F41919]" };
    } else if (status === "Request") {
      return { text: "Хүсэлт илгээсэн", className: "text-[#F49D19]" };
    } else return;
  };

  const openProductModal = (product) => {
    setP(product);
    setProductDetailModal(true);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
  };

  const handleDisableProduct = async (productId) => {
    await disableProduct(productId);
  };

  return (
    <div className="w-full overflow-x-auto">
      {!isLoading ? (
        brandProducts?.length === 0 ? (
          <EmptyList
            text="Бүтээгдэхүүн хараахан нэмээгүй байна"
            imageClassName="w-[155px] h-[154px]"
            image="/no-product-image.png"
          />
        ) : (
          <div className="min-w-[540px] w-full flex flex-col gap-3">
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
              <span className="col-span-1">Контентын тоо</span>

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
            {brandProducts?.map((p, i) => {
              const stockStatus = getStockStatus(
                p.LeftStock,
                p.Credit,
                p.IsActive
              );
              const requestStatus = getRequestStatus(p.Status);
              return (
                <div
                  key={i}
                  className="text-[10px] sm:text-base px-5 py-1 sm:p-5 grid grid-cols-[2fr,1fr,2fr,2fr] sm:grid-cols-[2fr,1fr,2fr,1fr] gap-6 w-full items-center border-[#CDCDCD] border-opacity-50 border-[1px] rounded-3xl"
                >
                  <span className="col-span-1">{p.ProductName}</span>

                  <span className="col-span-1">
                    {p.ContentLeft} / {p.ContentLimit}
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

                  <button
                    onClick={() => openProductModal(p)}
                    className="col-span-1 border-[1px] border-[#F5F4F0] p-2 rounded-lg w-11"
                  >
                    <Image
                      src={"/hamburger-menu-icon.png"}
                      alt=""
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )
      ) : (
        <div className="min-w-[540px] w-full px-7 pt-3 mt-7 border-t-[1px] border-[#CDCDCD] flex flex-col gap-3">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-full">
              <Skeleton className="h-16 w-full rounded-3xl" />
            </div>
          ))}
        </div>
      )}
      <ProductDetailModal
        brandData={brandData}
        p={p}
        requestStatus={requestStatus}
        productDetailModal={productDetailModal}
        setProductDetailModal={setProductDetailModal}
        isDisabling={isDisabling}
        setIsDisabling={setIsDisabling}
        handleDisableProduct={handleDisableProduct}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        handleDeleteProduct={handleDeleteProduct}
        increment={increment}
        decrement={decrement}
        addSupply={addSupply}
        count={count}
        refetchBrandData={() => {
          // Refetch brand data after credit purchase
          if (addProductSupplySuccess) {
            window.location.reload();
          }
        }}
      />
    </div>
  );
}

export default BrandProducts;
