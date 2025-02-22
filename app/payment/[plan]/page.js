"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  useCheckPaymentQuery,
  useListPaymentPlansQuery,
  useSubscribePlanMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const params = useParams();
  const { plan } = params; // assuming the URL parameter is named 'plan'
  const [txId, setTxId] = useState(null);

  const planMap = {
    Trial: 0,
    Beginner: 1,
    Pro: 2,
    Enterprise: 3,
  };

  const id = planMap[plan] !== undefined ? planMap[plan] : 0;

  const {
    data: listPaymentPlansData,
    error: listPaymentPlansError,
    isLoading: listPaymentPlansLoading,
  } = useListPaymentPlansQuery();

  const [
    subscribePlan,
    {
      data: subscribePlanData,
      error: subscribePlanError,
      isLoading: subscribePlanLoading,
    },
  ] = useSubscribePlanMutation();

  const [selectedType, setSelectedType] = useState();

  const {
    data: checkPaymentData,
    error: checkPaymentError,
    isLoading: checkPaymentLoading,
    refetch: checkPayment,
  } = useCheckPaymentQuery(txId);

  useEffect(() => {
    if (listPaymentPlansData) {
      const sortedPlans = [...listPaymentPlansData]?.sort((a, b) => {
        return planOrder.indexOf(a.type) - planOrder.indexOf(b.type);
      });

      setSelectedType(sortedPlans[id]);
    }
  }, [listPaymentPlansData]);

  useEffect(() => {
    if (checkPaymentData && checkPaymentData?.IsPaid) {
      setIsPaymentSuccess(true);
    }
    if (checkPaymentError) {
      toast.error(checkPaymentError?.data?.error);
    }
  }, [checkPaymentData, checkPaymentError, subscribePlanData]);

  useEffect(() => {
    if (subscribePlanData) {
      setTxId(subscribePlanData.UserTxnId);
    }
    if (subscribePlanError) {
      toast.error(subscribePlanError?.data?.error);
    }
  }, [subscribePlanData, subscribePlanError]);

  const planOrder = ["Trial", "Beginner", "Pro", "Enterprise"];

  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [qrCodeSrc, setQrCodeSrc] = useState("");

  const handleSelectPlan = (planId) => {
    setSelectedPlan(planId);
  };

  const handlePayment = () => {
    subscribePlan({ planId: selectedPlan });
  };

  const handleCheckOayment = (txId) => {
    checkPayment(txId);
  };

  return (
    <div className="w-full h-full bg-white">
      <div className="pt-32 pb-16 sm:pb-24">
        <div className="container text-[#2D262D] max-w-5xl mx-auto px-7 py-10 sm:py-20 flex flex-col">
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
          <span className="text-[#2D262D] font-bold text-4xl sm:text-5xl xl:text-6xl mt-7 mb-5">
            Payment
          </span>
          <span className="text-[#6F6F6F] text-xl mb-5 font-bold">Package</span>
          <div className="w-full gap-5 flex flex-col">
            <div className="transition-all duration-150 w-full bg-[#F5F4F0] rounded-3xl flex flex-row items-center gap-9 justify-between p-8">
              <Image
                src={subPlans[id]?.image}
                width={237}
                height={249}
                alt="sub"
                className="hidden lg:block"
              />
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col items-center lg:items-start gap-2">
                  <Image
                    src={subPlans[id]?.image}
                    width={237}
                    height={249}
                    alt="sub"
                    className="block lg:hidden"
                  />
                  <span className="text-3xl font-bold">
                    {selectedType ? selectedType.type : <></>}
                  </span>
                  <span className="text-lg">{subPlans[id]?.desc}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-7 h-full">
                  {selectedType && selectedType.plans && id != 3 ? (
                    <div
                      onClick={() =>
                        handleSelectPlan(selectedType.plans[0]?.planId)
                      }
                      className={`transition-all duration-150 cursor-pointer min-h-[184px] md:w-1/2 border-[2px] ${
                        selectedPlan == selectedType.plans[0]?.planId
                          ? "border-[#4D55F5]"
                          : "border-[#CDCDCD]"
                      } transition-all duration-150 h-full rounded-3xl w-full px-7 py-4 flex flex-col`}
                    >
                      <span className="text-lg mx-auto">
                        {selectedType ? (
                          selectedType.plans[0]?.planDurationInMonth
                        ) : (
                          <></>
                        )}{" "}
                        month
                      </span>
                      <span className="text-3xl mx-auto text-nowrap font-bold">
                        {selectedType ? selectedType.plans[0]?.price : <></>}{" "}
                        MNT
                      </span>
                      <span className="text-sm mt-5">
                        Content limit: &nbsp;
                        {selectedType ? (
                          selectedType.plans[0]?.contentLimit
                        ) : (
                          <></>
                        )}
                      </span>
                      <span className="text-sm mt-1">
                        Content price:{" "}
                        {selectedType ? (
                          (
                            selectedType.plans[0]?.price /
                            selectedType.plans[0]?.contentLimit
                          ).toFixed(1)
                        ) : (
                          <></>
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full md:w-1/2 mx-auto lg:mx-0 text-center border border-[#6F6F6F] rounded-3xl px-7 py-4 flex flex-col">
                      {subPlans[id]?.text}
                    </div>
                  )}
                  {selectedType && selectedType.plans.length > 1 ? (
                    <div
                      onClick={() =>
                        handleSelectPlan(selectedType.plans[1]?.planId)
                      }
                      className={`transition-all duration-150 cursor-pointer min-h-[184px] h-full md:w-1/2 border-[2px] ${
                        selectedPlan == selectedType.plans[1]?.planId
                          ? "border-[#4D55F5]"
                          : "border-[#CDCDCD]"
                      } transition-all duration-150 rounded-3xl w-full px-7 py-4 flex flex-col items-center justify-between`}
                    >
                      <span className="text-lg">
                        {selectedType ? (
                          selectedType.plans[1]?.planDurationInMonth
                        ) : (
                          <></>
                        )}{" "}
                        month
                      </span>
                      <span className="text-3xl font-bold">
                        {selectedType ? selectedType.plans[1]?.price : <></>}{" "}
                        MNT
                      </span>
                      <div className="mt-5 bg-[#4FB755] text-white text-sm rounded-3xl flex flex-col items-center w-full px-5 py-3">
                        <span>
                          Saved:{" "}
                          {selectedType ? (
                            selectedType.plans[1]?.savedPrice
                          ) : (
                            <></>
                          )}
                        </span>
                        <span>
                          +
                          {selectedType ? (
                            selectedType.plans[1]?.freeContent ? (
                              s.plans[1]?.freeContent
                            ) : (
                              6
                            )
                          ) : (
                            <></>
                          )}{" "}
                          контент үнэгүй
                        </span>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <span className="text-[#6F6F6F] text-xl font-bold">
              Payment method
            </span>
            <button
              onClick={() => setSelectedPayment("qpay")}
              className={`border-[2px] transition-all duration-150 ${
                selectedPayment === "qpay"
                  ? "border-[#4D55F5]"
                  : "border-[#F5F4F0]"
              }  py-4 w-[179px] flex justify-center rounded-3xl bg-[#F5F4F0]`}
            >
              <Image
                src={"/qpay.png"}
                width={96}
                height={36}
                alt="payment"
                className=""
              />
            </button>
            <Dialog>
              <DialogTrigger
                onClick={handlePayment}
                className="hover:bg-[#4D55F5] transition-all duration-250 mt-3 bg-[#CA7FFE] text-white font-bold border-[1px] border-[#2D262D] rounded-xl w-full text-center py-4"
              >
                Төлбөр хийх
              </DialogTrigger>

              <DialogContent className={"max-w-lg rounded-3xl w-full"}>
                {!isPaymentSuccess && (
                  <DialogHeader>
                    <DialogTitle className="text-3xl">QPay Payment</DialogTitle>
                  </DialogHeader>
                )}
                {!isPaymentSuccess ? (
                  <div className="flex flex-col gap-6">
                    {subscribePlanData ? (
                      <Image
                        src={`data:image/png;base64,${subscribePlanData.QrImage}`}
                        width={394}
                        height={394}
                        alt="dummy-qr"
                        className="w-[394px] h-[394px] rounded-2xl"
                      />
                    ) : (
                      <></>
                    )}

                    <button
                      onClick={() => checkPayment(subscribePlanData.UserTxnId)}
                      className="bg-[#4D55F5] text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-4"
                    >
                      Төлбөр шалгах
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-6">
                    <Image
                      src={"/payment-success.png"}
                      width={353}
                      height={271}
                      className=""
                    />
                    <span className="uppercase font-bold text-[#4FB755] text-4xl sm:text-5xl text-center">
                      АМЖИЛТТАЙ ТӨЛӨГДЛӨӨ
                    </span>
                    <DialogClose className="mt-24 bg-[#4D55F5] text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-4">
                      Баярлалаа
                    </DialogClose>
                  </div>
                )}
              </DialogContent>
            </Dialog>
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
