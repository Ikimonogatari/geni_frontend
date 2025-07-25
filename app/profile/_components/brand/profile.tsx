"use client";
import React, { useEffect, useMemo, useState, useRef } from "react";
import Image from "next/image";
import ContentProgress from "./ContentProgress";
import BrandProducts from "./BrandProducts";
import {
  useListBrandContentsQuery,
  useListBrandProductsQuery,
  useListContentGalleryQuery,
} from "@/app/services/service";
import Link from "next/link";
import BrandContentGallery from "./BrandContentGallery";
import CreditPurchase from "@/components/credit/CreditPurchaseModal";
import GuideModal from "@/components/common/GuideModal";
import OnBoardRequestStateModal from "@/components/common/OnBoardRequestStateModal";
import { Skeleton } from "@/components/ui/skeleton";
import usePagination from "@/components/hooks/usePagination";
import Pagination from "@/components/common/Pagination";
import {
  createPaymentStatusMonitor,
  closePaymentMonitor,
} from "@/utils/sseUtils";
import toast from "react-hot-toast";

function BrandProfile({
  getUserInfoData,
  getUserInfoLoading,
  refetchUserInfo,
}) {
  const [profileState, setProfileState] = useState("content-progress");
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 16;
  const [currentContents, setCurrentContents] = useState([]);
  const offset = (currentPage - 1) * contentsPerPage;
  const paymentMonitorRef = useRef(null);

  const {
    data: listBrandContentsData,
    error: listBrandContentsError,
    isLoading: listBrandContentsLoading,
    refetch: refetchBrandContents,
  } = useListBrandContentsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: listContentGalleryData,
    error: listContentGalleryError,
    isLoading: listContentGalleryLoading,
  } = useListContentGalleryQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const {
    data: listBrandProductsData,
    error: listBrandProductsError,
    isLoading: listBrandProductsLoading,
  } = useListBrandProductsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const isLoading = useMemo(() => {
    return (
      listBrandContentsLoading ||
      listContentGalleryLoading ||
      listBrandProductsLoading
    );
  }, [
    listBrandContentsLoading,
    listContentGalleryLoading,
    listBrandProductsLoading,
  ]);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, getTotalPages()));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  useEffect(() => {
    const contents = getCurrentContents();
    setCurrentContents(contents);
  }, [
    currentPage,
    profileState,
    listBrandContentsData,
    listContentGalleryData,
    listBrandProductsData,
  ]);

  const getCurrentContents = () => {
    let contents;
    switch (profileState) {
      case "content-progress":
        contents = listBrandContentsData?.Data ?? [];
        break;
      case "content-gallery":
        contents = listContentGalleryData?.Data ?? [];
        break;
      case "brand-products":
        contents = listBrandProductsData?.Data ?? [];
        break;
      default:
        contents = listBrandContentsData?.Data ?? [];
    }

    return contents;
  };

  const getTotalPages = () => {
    let totalCount;
    switch (profileState) {
      case "content-progress":
        totalCount = listBrandContentsData?.RowCount ?? null;
        break;
      case "content-gallery":
        totalCount = listContentGalleryData?.RowCount ?? null;
        break;
      case "brand-products":
        totalCount = listBrandProductsData?.RowCount ?? null;
        break;
      default:
        totalCount = listBrandContentsData?.RowCount ?? null;
    }
    return Math.ceil(totalCount / contentsPerPage);
  };

  const renderBrandProfile = () => {
    switch (profileState) {
      case "content-progress":
        return (
          <ContentProgress
            currentContents={currentContents}
            refetch={refetchBrandContents}
          />
        );
      case "content-gallery":
        return <BrandContentGallery contentsGallery={currentContents} />;
      case "brand-products":
        return (
          <BrandProducts
            isLoading={listBrandProductsLoading}
            brandProducts={currentContents}
            brandData={getUserInfoData ? getUserInfoData : null}
          />
        );
      default:
        return (
          <ContentProgress
            currentContents={currentContents}
            refetch={refetchBrandContents}
          />
        );
    }
  };

  const totalPages = getTotalPages();

  const pageNumbers = usePagination(totalPages, currentPage);

  const instagramLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Instagram"
  );

  const facebookLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Facebook"
  );

  // Cleanup function to close the payment monitor when unmounting
  useEffect(() => {
    return () => {
      closePaymentMonitor(paymentMonitorRef.current);
    };
  }, []);

  const handleCreditPurchase = () => {
    // Start payment status monitoring via SSE
    if (getUserInfoData?.UserTxnId) {
      paymentMonitorRef.current = createPaymentStatusMonitor(
        getUserInfoData.UserTxnId,
        () => {
          // On payment success
          toast.success("Төлбөр амжилттай төлөгдлөө");
          refetchUserInfo();
        },
        (error) => {
          // On error
          console.error("Payment monitoring error:", error);
          toast.error("Төлбөр шалгахад алдаа гарлаа");
        }
      );
    }
  };

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pb-16 sm:pb-24">
        <div className=" text-[#2D262D] max-w-7xl min-h-screen mx-auto py-10 sm:py-20">
          <div className="px-7 flex flex-col gap-3 md:flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-4 sm:gap-7">
              {getUserInfoData ? (
                <Image
                  src={
                    getUserInfoData?.ProfileLink
                      ? getUserInfoData?.ProfileLink
                      : "/dummy-brand.png"
                  }
                  alt=""
                  width={194}
                  height={194}
                  className="rounded-full sm:rounded-xl w-[90px] sm:w-[194px] h-[90px] sm:h-[194px] border border-[#2D262D] object-cover"
                />
              ) : (
                <div className="w-[90px] sm:w-[194px] h-[90px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-1 sm:gap-2">
                <span className="font-bold text-base sm:text-xl xl:text-2xl">
                  {getUserInfoLoading
                    ? ""
                    : getUserInfoData?.Name || "Geni брэнд"}
                </span>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  {instagramLink ? (
                    <a
                      target="_blank"
                      className="rounded-3xl border p-2 bg-transparent hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
                      href={`${instagramLink?.SocialAddress || ""}`}
                    >
                      <Image
                        src={"/Instagram.png"}
                        width={24}
                        height={24}
                        alt="ig"
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </a>
                  ) : (
                    <></>
                  )}
                  {facebookLink ? (
                    <a
                      target="_blank"
                      className="rounded-3xl border p-2 bg-transparent hover:scale-110 hover:shadow-lg transition-all duration-300 ease-in-out"
                      href={`${facebookLink?.SocialAddress || ""}`}
                    >
                      <Image
                        src={"/Facebook.png"}
                        width={24}
                        height={24}
                        alt=""
                        className="w-5 h-5 sm:w-6 sm:h-6"
                      />
                    </a>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="overflow-x-auto w-full">
                  <div className="flex w-[220px] sm:w-full sm:max-w-lg flex-row sm:flex-wrap items-center gap-1 sm:gap-2 lg:w-5/6">
                    {getUserInfoData?.BrandTypes?.map((b, i) => (
                      <button
                        key={i}
                        className="bg-[#4D55F5] whitespace-nowrap text-white rounded-full px-3 text-sm py-1 sm:py-[6px]"
                      >
                        {b.TypeName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row w-full md:w-auto justify-between sm:justify-normal items-end sm:items-center gap-2 sm:gap-4 mt-5 md:mt-0">
              <div className="w-full md:w-auto flex items-center justify-between sm:items-end flex-row md:flex-col gap-4">
                <Link
                  href={"/wallet"}
                  className="flex flex-row items-center gap-2 px-2 py-[9px] sm:px-4 sm:py-3 bg-[#4FB755] rounded-lg"
                >
                  <Image
                    src={"/rating-geni.png"}
                    height={24}
                    width={24}
                    alt=""
                    className="w-4 h-4 sm:w-6 sm:h-6"
                  />
                  <span className="text-white text-xs sm:text-base font-bold">
                    Geni Кредит: {getUserInfoData?.Credit}
                  </span>
                </Link>
                <div className="flex flex-row items-center gap-2 sm:gap-4">
                  <Link
                    href="/notifications"
                    className="rounded-xl bg-[#F5F4F0] p-2"
                  >
                    <Image
                      src={"/notification-icon.png"}
                      width={24}
                      height={24}
                      alt="icon"
                      className="min-w-5 sm:min-w-6 min-h-5 h-5 w-5 sm:min-h-6 sm:h-6 sm:w-6"
                    />
                  </Link>
                  <Link
                    href="/profile/edit"
                    className="rounded-xl bg-[#F5F4F0] p-2"
                  >
                    <Image
                      src={"/edit-profile-icon.png"}
                      width={24}
                      height={24}
                      alt="icon"
                      className="min-w-5 sm:min-w-6 min-h-5 h-5 w-5 sm:min-h-6 sm:h-6 sm:w-6"
                    />
                  </Link>
                </div>
              </div>
            </div>
            {getUserInfoData?.IsSubscribed === true ||
            getUserInfoData?.Credit > 0 ? (
              <Link
                href={"/add-product"}
                className={`flex md:hidden whitespace-nowrap w-full flex-row justify-center text-xs items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
              >
                Шинэ бүтээгдэхүүн нэмэх
                <Image
                  src={"/add-icon.png"}
                  width={14}
                  height={14}
                  alt="arrow"
                />
              </Link>
            ) : (
              <CreditPurchase
                buttonIconSize={""}
                className={
                  "flex md:hidden flex-row items-center text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3"
                }
                buttonText={"Шинэ бүтээгдэхүүн нэмэх "}
                onCreditPurchase={handleCreditPurchase}
              />
            )}
          </div>

          <div className="overflow-x-auto pl-7 md:px-7 mt-4 md:mt-16 w-full">
            <div className="">
              <div className="z-50 -mb-[1px] overflow-x-auto flex flex-row justify-between text-sm sm:text-base">
                <div className="min-w-[540px] flex flex-row gap-2 items-end text-xs sm:text-base">
                  {brandProfileButtons.map((b, i) => (
                    <div
                      key={i}
                      onClick={() => setProfileState(b.value)}
                      className={`whitespace-nowrap cursor-pointer text-center rounded-t-2xl ${
                        b.value === profileState
                          ? "pb-3 bg-white border border-[#CDCDCD] border-b-0 font-medium"
                          : "pb-3 text-[#6F6F6F] border-t border-x-[1px] border-transparent"
                      }`}
                    >
                      <div
                        className={`font-bold w-full text-center px-4 py-2 ${
                          b.value === profileState
                            ? ""
                            : "border border-[#CDCDCD] rounded-lg"
                        }`}
                      >
                        {b.title}
                      </div>
                      {b.value === profileState && (
                        <div className="border-geni-blue border-b-[3px] w-14 mx-auto"></div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end pb-2">
                  {getUserInfoData?.IsSubscribed === true ||
                  getUserInfoData?.Credit > 0 ? (
                    <Link
                      href={"/add-product"}
                      className={`hidden md:flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-4 py-2 rounded-lg text-white font-bold`}
                    >
                      Шинэ бүтээгдэхүүн нэмэх
                      <Image
                        src={"/add-icon.png"}
                        width={14}
                        height={14}
                        alt="arrow"
                      />
                    </Link>
                  ) : (
                    <CreditPurchase
                      buttonIconSize={""}
                      className={
                        "hidden md:flex flex-row items-center text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3"
                      }
                      buttonText={"Шинэ бүтээгдэхүүн нэмэх "}
                      onCreditPurchase={handleCreditPurchase}
                    />
                  )}
                </div>
              </div>

              <div className={`border-t border-[#CDCDCD] py-3`}>
                {currentContents && !isLoading ? (
                  renderBrandProfile()
                ) : (
                  <div className="space-y-6 mt-2">
                    {[...Array(8)].map((_, index) => (
                      <Skeleton
                        key={index}
                        className="h-[59px] sm:h-[84px] w-full rounded-3xl"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {listBrandContentsData && totalPages > 1 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            paginate={paginate}
            bg={"bg-geni-blue"}
            border={"border-geni-blue"}
          />
        ) : (
          <></>
        )}
      </div>
      {getUserInfoData && (
        <GuideModal
          hasSeenGuide={getUserInfoData?.HasSeenGuide}
          hasAcceptedTerms={getUserInfoData?.HasAcceptedTerms}
          slides={guideSlides}
          theme="brand"
        />
      )}
      {getUserInfoData && (
        <OnBoardRequestStateModal
          isRequested={getUserInfoData?.OnBoardingStatus === "Request"}
        />
      )}
    </div>
  );
}

export default BrandProfile;

const brandProfileButtons = [
  {
    title: "Контент статус",
    value: "content-progress",
  },
  {
    title: "Миний контент",
    value: "content-gallery",
  },
  {
    title: "Бүтээгдэхүүн",
    value: "brand-products",
  },
];

const guideSlides = [
  {
    image: "/brand-guide-image1.png",
    text: "Та “Контент статус” хэсгээс Geni Бүтээгчидтэй хамтран ажиллаж буй бүх процессыг хянах боломжтой. Энэхүү процесс нь 5 үе шаттай бөгөөд дээрх зураг шиг бүтээгдэхүүн хүргэж байгаа үеээс эхлэн та контентоо хүлээж авах үйлдэл хүртэлх процесс хамаарагдана.",
  },
  {
    image: "/brand-guide-image2.png",
    text: "Та “Контент авах” товчин дээр дарсанаар таньд Reel видео контент, Thumbnail зураг болон Geni Бүтээгчийн сэтгэгдэл бүхий тайлбар харагдах юм. Та контентоо хүлээж авахдаа заавал контент бүтээгчийг 3 төрлөөр дүгнэж үнэлгээ өгөх бөгөөд нэмэлтээр та сэтгэгдэлээ илгээх боложмтой.",
  },
  {
    image: "/brand-guide-image3.png",
    text: "Таны “Контент” хэсэгт Geni Бүтээгчидээс хүлээн авсан бүх контентууд харагдах бөгөөд эндээс та хүссэн үедээ хэрэгтэй контентоо үзэн татаж авах боломжтой.",
  },
  {
    image: "/brand-guide-image4.png",
    text: "Та “Бүтээгдэхүүн” хэсгээс өөрийн оруулсан бүтээгдэхүүний тоо ширхэгээ хянах юм. Мөн дууссан бүтээгдэхүүний тоо ширхэгээ нэмэх болон бүтээгдэхүүнийхээ мэдээллийг өөрчлөх гэх мэд үйлдэлүүдийг хийх боломжтой.",
  },
  {
    image: "/brand-guide-image5.png",
    text: "Та “Geni Credit”-н тоогоор контент авах эрхтэй болох бөгөөд та хүссэн үедээ өөрийн хүссэн багцаараа цэнэглэх боломжтой.",
  },
];
