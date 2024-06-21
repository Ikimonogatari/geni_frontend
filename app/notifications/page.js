"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";

const ITEMS_PER_PAGE = 10;

function Page() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(notifications.length / ITEMS_PER_PAGE);

  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 10;
    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`${
            currentPage === i ? "border-[#CA7FFE]" : "border-none"
          } transition-all duration-150 w-10 h-10 rounded-full flex items-center border bg-[#F5F4F0] justify-center`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-24">
        <div className="container min-h-screen text-[#2D262D] max-w-7xl mx-auto px-7 py-20 flex flex-col">
          <button
            onClick={() => router.back()}
            className="w-14 h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl my-7">
            Notification
          </span>
          <div className="flex flex-col gap-4 w-full">
            {paginatedNotifications.map((n, i) => (
              <div
                key={i}
                onClick={() => router.push(`/notifications/${i}`)}
                className="cursor-pointer rounded-3xl bg-[#F5F4F0] p-6 flex flex-row gap-4"
              >
                <Image
                  src={
                    n.status === "unread"
                      ? "/not-status-unread.png"
                      : "/not-status-read.png"
                  }
                  width={17}
                  height={17}
                  alt="status"
                  className="rounded-full w-[17px] h-[17px]"
                />
                <div className="w-full flex flex-col sm:flex-row gap-8">
                  <Image
                    src={"/dummy-notification.png"}
                    width={190}
                    height={170}
                    alt="not"
                    className="rounded-2xl"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between items-center">
                      <span className="font-bold text-2xl">{n.title}</span>
                      <span className="text-[#6F6F6F] text-lg">
                        {n.date} {n.time}
                      </span>
                    </div>

                    <span className="text-[#6F6F6F] text-lg">{n.tag}</span>
                    <span className="line-clamp-4 text-[#6F6F6F] text-lg mt-3">
                      {n.desc}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {totalPages !== 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {currentPage !== 1 && (
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
                >
                  <Image
                    src={"/arrow-right-icon.png"}
                    width={14}
                    height={14}
                    alt="arrow"
                    className="rotate-180"
                  />
                  Prev
                </button>
              )}

              {renderPageNumbers()}
              {currentPage != totalPages && (
                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  className="flex flex-row items-center gap-2 border-[1px] border-[#2D262D] bg-[#CA7FFE] px-5 py-2 rounded-lg text-white font-bold"
                >
                  Next
                  <Image
                    src={"/arrow-right-icon.png"}
                    width={14}
                    height={14}
                    alt="arrow"
                  />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;

const notifications = [
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "unread",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
  {
    status: "read",
    image: "/dummy-notification.png",
    title: "Platform new feature update",
    tag: "@geni.team",
    desc: "Бид олон нийтэд нээлттэй компаниудын хувьцаа эзэмшигчдийн хурлаар яригдсан зүйлсийг уншигчдадаа ойлгомжтой, дэлгэрэнгүй хүргэх зорилгоор “LP Transcript” буюу хурлын тэмдэглэлийн контент гаргаж байгаа билээ. LP Transcript-н ээлжит дугаараар АПУ ХК (APU)-ийн хувьцаа эзэмшигчдийн хурлын тэмдэглэлийг хүргэж байна. Тухлан сууж, таалан уншина уу!",
    date: "05/16/2024",
    time: "14:00",
  },
];
