"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

import Image from "next/image";
import { useListNotification } from "@/hooks/react-queries";

function page() {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // assuming the URL parameter is named 'plan'
  const [notification, setNotification] = useState(null);
  const {
    data: listNotificationData,
    error: listNotificationError,
    isLoading: listNotificationLoading,
  } = useListNotification();

  useEffect(() => {
    if (listNotificationData) {
      const singleNotification = listNotificationData?.find(
        (n) => n.NotifId === parseInt(id)
      );
      setNotification(singleNotification);
    }
  }, [listNotificationData]);

  function formatDate(dateString) {
    const date = new Date(dateString);

    // Get month, day, year, hour, and minutes
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${month}/${day}/${year} ${hours}:${minutes}`;
  }

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container min-h-screen text-[#2D262D] max-w-7xl mx-auto px-7 py-10 sm:py-20 flex flex-col">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <div className="rounded-3xl bg-[#F5F4F0] p-6 sm:p-10 mt-7 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Image
              src={
                notification?.IsSeen === false
                  ? "/not-status-unread.png"
                  : "/not-status-read.png"
              }
              width={17}
              height={17}
              alt="status"
              className="rounded-full w-3 h-3 sm:w-[17px] sm:h-[17px]"
            />
            <div className="w-full flex flex-col gap-3 sm:gap-8">
              <Image
                src={"/dummy-notification-big.png"}
                width={1052}
                height={214}
                alt="not"
                className="rounded-2xl w-full min-h-[170px]"
              />

              <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between items-center">
                  <span className="font-bold text-2xl sm:text-3xl">
                    {notification ? notification.Title : <></>}
                  </span>
                  <span className="text-[#6F6F6F] text-lg">
                    {notification ? formatDate(notification.CreatedAt) : <></>}
                  </span>
                </div>

                <span className="text-[#6F6F6F] text-base sm:text-lg">
                  @geni.team
                </span>
                <span className="text-[#6F6F6F] text-base sm:text-lg mt-3">
                  {notification ? notification.Body : <></>}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
