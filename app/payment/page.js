"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useListPaymentPlans } from "@/hooks/react-queries";

function page() {
  const router = useRouter();

  const {
    data: listPaymentPlansData,
    error: listPaymentPlansError,
    isLoading: listPaymentPlansLoading,
  } = useListPaymentPlans();

  const [plans, setPlans] = useState([]);
  useEffect(() => {
    if (listPaymentPlansData) {
      const sortedPlans = [...listPaymentPlansData]?.sort((a, b) => {
        return planOrder.indexOf(a.type) - planOrder.indexOf(b.type);
      });
      setPlans(sortedPlans);
    }
  }, [listPaymentPlansData]);

  const planOrder = ["Trial", "Beginner", "Pro", "Enterprise"];

  return (
    <div className="min-h-screen w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-7xl min-h-screen mx-auto px-7 py-10 sm:py-20 flex flex-col">
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
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl my-7">
            Subscription
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full gap-5">
            {plans ? (
              plans.map((s, i) => (
                <div
                  key={i}
                  className="border-[4px] border-[#F5F4F0] transition-all duration-150 hover:border-[#4D55F5] w-full bg-[#F5F4F0] col-span-1 rounded-3xl flex flex-col items-center justify-between p-4"
                >
                  <div className="flex flex-col justify-between items-center gap-4 w-full">
                    <Image
                      src={subPlans[i]?.image}
                      width={125}
                      height={131}
                      alt="sub"
                    />
                    <span className="text-3xl font-bold">
                      {subPlans[i]?.title}
                    </span>
                    <span className="text-lg">
                      {subPlans[i]?.desc ? subPlans[i]?.desc : <br />}
                    </span>
                    {s.plans && i != 3 ? (
                      <div className="border border-[#6F6F6F] rounded-3xl w-full px-7 py-4 flex flex-col">
                        <span className="text-lg mx-auto mt-2">
                          {s.plans[0]?.planDurationInMonth ? (
                            s.plans[0]?.planDurationInMonth
                          ) : (
                            <></>
                          )}{" "}
                          month
                        </span>
                        <span className="text-2xl text-nowrap font-bold">
                          {s.plans[0]?.price} MNT
                        </span>
                        <span className="text-sm mt-2">
                          Content limit: &nbsp;{s.plans[0]?.contentLimit}
                        </span>
                        <span className="text-sm mt-1">
                          Content price:{" "}
                          {(
                            s.plans[0]?.price / s.plans[0]?.contentLimit
                          ).toFixed(1)}{" "}
                          MNT
                        </span>
                      </div>
                    ) : (
                      <div className="text-center border border-[#6F6F6F] rounded-3xl px-7 py-4 flex flex-col">
                        {subPlans[i]?.text}
                      </div>
                    )}
                    {s.plans.length > 1 ? (
                      <div className="text-[#6F6F6F] border border-[#CDCDCD] rounded-3xl w-full p-4 flex flex-col items-center">
                        <span className="text-lg">
                          {s.plans[1]?.planDurationInMonth} month
                        </span>
                        <span className="text-xl font-bold">
                          {s.plans[1]?.price} MNT
                        </span>
                        <div className="mt-5 bg-[#4FB755] text-white text-sm rounded-3xl flex flex-col items-center w-full px-5 py-3">
                          <span>
                            {" "}
                            Хэмнэлт:{" "}
                            {s.plans[1]?.savedPrice
                              ? s.plans[1]?.savedPrice
                              : 0}{" "}
                            MNT
                          </span>
                          <span>
                            +
                            {s.plans[1]?.freeContent
                              ? s.plans[1]?.freeContent
                              : 6}{" "}
                            контент үнэгүй
                          </span>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <button
                    onClick={() => router.push(`/payment/${s.type}`)}
                    className="hover:bg-[#4D55F5] transition-all duration-250 mt-3 bg-[#CA7FFE] text-white font-bold border-[1px] border-[#2D262D] rounded-xl w-full text-center py-4"
                  >
                    {subPlans[i]?.buttonText}
                  </button>
                </div>
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

export default page;

const subPlans = [
  {
    image: "/subPlan1.svg",
    title: "Trial",
    desc: "Only beginner creators",
    singlePlan: {
      time: "1 month",
      limit: 3,
      price: "33’000 MNT",
      total: "100’000 MNT",
    },
    buttonText: "Try",
  },
  {
    image: "/subPlan2.svg",
    title: "Beginner",
    desc: "All creators",
    singlePlan: {
      time: "1 month",
      limit: 8,
      price: "82’000 MNT",
      total: "660’000 MNT",
    },
    bundlePlan: {
      time: "6 month",
      price: "3’564’000 MNT",
      savedPrice: "396’000 MNT",
      freeContent: "6",
    },
    buttonText: "Upgrade",
  },
  {
    image: "/subPlan3.svg",
    title: "Pro",
    desc: "Only Pro creators",
    singlePlan: {
      time: "1 month",
      limit: 15,
      price: "110’000 MNT",
      total: "1’650’000 MNT",
    },
    bundlePlan: {
      time: "6 month",
      price: "4’380’000 MNT",
      savedPrice: "990’000 MNT",
      freeContent: "6",
    },
    buttonText: "Upgrade",
  },
  {
    image: "/subPlan4.svg",
    title: "Enterprise",
    text: "Олон брэндтэй байгууллагууд тусгай үнийн санал, хамтран ажиллах хүсэлт авах боломжтой.",
    buttonText: "Contact email",
  },
];
