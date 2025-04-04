"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";

import {
  useListCreatorContentsQuery,
  useBecomeCreatorMutation,
} from "@/app/services/service";
import ContentProgress from "./ContentProgress";
import LogoutButton from "@/components/common/LogoutButton";
import HomeworkUploadModal from "@/components/HomeworkUploadModal";
import ConvertToCreatorModal from "@/components/ConvertToCreatorModal";
import { Skeleton } from "@/components/ui/skeleton";
import usePagination from "@/components/hooks/usePagination";
import Pagination from "@/components/common/Pagination";
import CoursePurchaseModal from "@/components/course/CoursePurchaseModal";
import GuideModal from "@/components/common/GuideModal";

function StudentProfile({ getUserInfoData, getUserInfoLoading }) {
  const [currentPage, setCurrentPage] = useState(1);
  const contentsPerPage = 12;
  const [currentContents, setCurrentContents] = useState([]);
  const offset = (currentPage - 1) * contentsPerPage;
  const router = useRouter();

  const {
    data: listCreatorContentsData,
    error: listCreatorContentsError,
    isLoading: listCreatorContentsLoading,
  } = useListCreatorContentsQuery(
    { limit: contentsPerPage, offset },
    { refetchOnMountOrArgChange: true }
  );

  const [
    becomeCreator,
    {
      data: becomeCreatorData,
      error: becomeCreatorError,
      isLoading: becomeCreatorLoading,
      isSuccess: becomeCreatorSuccess,
    },
  ] = useBecomeCreatorMutation();

  const isLoading = useMemo(() => {
    return listCreatorContentsLoading;
  }, [listCreatorContentsLoading]);

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
  }, [currentPage, listCreatorContentsData]);

  const getCurrentContents = () => {
    const contents = listCreatorContentsData?.Data ?? [];
    return contents;
  };

  const getTotalPages = () => {
    let totalCount;
    totalCount = listCreatorContentsData?.RowCount ?? [];
    return Math.ceil(totalCount / contentsPerPage);
  };

  const renderStudentProfile = () => {
    return <ContentProgress currentContents={currentContents} />;
  };

  const totalPages = getTotalPages();

  const pageNumbers = usePagination(totalPages, currentPage);

  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const instagramLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Instagram"
  );

  const facebookLink = getUserInfoData?.SocialChannels?.find(
    (channel) => channel.PlatformName === "Facebook"
  );

  const isCreator = getUserInfoData?.HasGivenHomework;

  const handleBecomeCreator = async () => {
    await becomeCreator({});
  };

  useEffect(() => {
    if (becomeCreatorSuccess) {
      router.push("/login");
    }
  }, [becomeCreatorSuccess, router]);

  useEffect(() => {
    if (getUserInfoData?.UserType === "Creator") {
      router.push("/login");
    }
  }, [getUserInfoData, router]);

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-start justify-between w-full">
            <div className="flex flex-row items-center gap-7">
              {getUserInfoData ? (
                <Image
                  src={
                    getUserInfoData?.ProfileLink
                      ? getUserInfoData?.ProfileLink
                      : "/dummy-student.png"
                  }
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-full sm:rounded-xl w-[90px] h-[90px] sm:w-[194px] sm:h-[194px] aspect-square border border-[#2D262D] object-cover"
                  alt=""
                />
              ) : (
                <div className="w-[90px] h-[90px] sm:w-[194px] sm:h-[194px]"></div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-[#2D262D] text-base sm:text-2xl font-bold">
                  {getUserInfoLoading
                    ? ""
                    : getUserInfoData?.Nickname || "Geni сурагч"}
                </span>
                <div className="flex flex-row items-center gap-2 sm:gap-3">
                  {instagramLink ? (
                    <a
                      target="_blank"
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
                {getUserInfoData ? (
                  <span className="text-[#6F6F6F] text-xs sm:text-base">
                    {getUserInfoData?.Bio}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 sm:gap-4">
              <Link
                href={"/notifications"}
                className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
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
                className="border-[#2D262D] bg-[#F5F4F0] p-2 gap-5 rounded-lg"
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
          <div className="mt-4 sm:mt-16 w-full flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center gap-3">
              {brandProfileButtons.map((b, i) => (
                <a
                  target="_blank"
                  // href={b.link}
                  key={i}
                  className={`border-[1px] whitespace-nowrap border-[#CDCDCD] text-[#6F6F6F] px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold text-xs sm:text-lg`}
                >
                  {b.title}
                </a>
              ))}
            </div>

            {/* <HomeworkUploadModal parsedUserInfo={parsedUserInfo} /> */}
            <CoursePurchaseModal
              buttonIconSize={""}
              className={
                "flex flex-row items-center bg-geni-green text-xs sm:text-base px-3 sm:px-5 py-2 sm:py-3"
              }
              buttonText={"Хөтөлбөр идэвхжүүлэх"}
              userInfo={getUserInfoData}
            />
          </div>
          {currentContents && !isLoading ? (
            renderStudentProfile()
          ) : (
            <div className="space-y-6 mt-10">
              {[...Array(8)].map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-[42px] sm:h-[66px] w-full rounded-3xl"
                />
              ))}
            </div>
          )}
        </div>

        {listCreatorContentsData && totalPages > 1 ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            pageNumbers={pageNumbers}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
            paginate={paginate}
            bg={"bg-geni-green"}
            border={"border-geni-green"}
          />
        ) : (
          <></>
        )}
      </div>
      <ConvertToCreatorModal
        isCreator={isCreator}
        handleBecomeCreator={handleBecomeCreator}
      />
      {getUserInfoData && (
        <GuideModal
          hasSeenGuide={getUserInfoData?.HasSeenGuide}
          slides={guideSlides}
          theme="student"
        />
      )}
    </div>
  );
}

export default StudentProfile;

const brandProfileButtons = [
  {
    title: "Онлайн хичээл",
    value: "content-progress",
    link: "",
  },
];

const guideSlides = [
  {
    image: "/student-guide-image1.png",
    title: "Хөтөлбөрөө идэвхжүүлэх",
    text: "Та “Хөтөлбөр идэвхжүүлэх” товчин дээр даран төлбөрөө төлж хөтөлбөрөө идэвхжүүлээрэй.",
  },
  {
    image: "/student-guide-image2.png",
    title: "Хичээлээ үзэх",
    text: "Ta Geni creator online course хэсгийн “Үзэх” товч дээр дараарай. Та хичээлээ Gumroad платформ дээрээс үзэх бөгөөд та утсаараа үзэх бол Gumroad app-г татахыг зөвлөж байна. Энэхүү хичээлийн линк нь зөвхөн танд зориулсан бөгөөд та линкээр хандсаны дараа хичээлийн нүүр хэсгээс “I want this” товч дээр даран tip гэсэн хэсэгт 0 гэж оруулаад 100% үнэгүй хичээлээ нээж үзээрэй.",
  },
  {
    image: "/student-guide-image3.png",
    title: "Даалгавар биелүүлэх",
    text: "Та хичээлээ үзэж дуусгаад Даалгавар хэсэгт буй зааврын дагуу өөрийн хэрэглэх дуртай, гэртээ байгаа 1 бүтээгдэхүүнээ сонгон контент бүтээж илгээгээрэй. Контентоо илгээхдээ Reel бичлэг болон Thumbnail зураг, Description тайлбар гэсэн хэсгүүдийг бүрдүүлж илгээнэ. Таны илгээсэн контент дээр бидний зүгээс нэмэлт зөвлөгөө өгөх бөгөөд та контент UGC контентийн шаарлагт тэнцсэнээр Geni Creator хаягтай болно",
  },
  {
    image: "/student-guide-image4.png",
    title: "Брэндтэй хамтрах",
    text: "Даалгавраа амжилттай биелүүлсний дараа брэндтэй хамтрах эрх шууд нээгдэх бөгөөд хамтралаа амжилттай хийн брэндээс 100 хүртэлх xp оноо цуглуулснаар Certified тэмдэглэгээтэй болно.",
  },
];
