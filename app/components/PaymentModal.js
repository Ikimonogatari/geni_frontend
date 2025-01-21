"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/app/components/ui/dialog";
import {
  useCheckPaymentQuery,
  useSubscribePlanMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";

function PaymentModal({ selectedPackage }) {
  const [txId, setTxId] = useState(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const [
    subscribePlan,
    {
      data: subscribePlanData,
      error: subscribePlanError,
      isLoading: subscribePlanLoading,
      isSuccess: subscribePlanSuccess,
    },
  ] = useSubscribePlanMutation();

  const {
    data: checkPaymentData,
    error: checkPaymentError,
    isLoading: checkPaymentLoading,
    refetch: checkPayment,
  } = useCheckPaymentQuery(txId, { skip: !txId });

  useEffect(() => {
    if (subscribePlanSuccess) {
      setTxId(subscribePlanData?.UserTxnId);
    }
    if (subscribePlanError) {
      toast.error(subscribePlanError?.data?.error);
    }
  }, [subscribePlanSuccess, subscribePlanError]);

  const handleSubscription = () => {
    subscribePlan({ planId: selectedPackage });
  };

  const handleCheckPayment = async () => {
    if (txId) {
      const checkPaymentResposne = await checkPayment(txId);
      console.log(checkPaymentResposne);
      if (checkPaymentResposne?.data && checkPaymentResposne?.isSuccess) {
        if (checkPaymentResposne?.data?.IsPaid) {
          setIsPaymentSuccess(true);
        } else {
          toast.error("Төлбөр төлөгдөөгүй байна");
        }
      } else {
        toast.error("Алдаа гарлаа");
      }
    }
  };

  return (
    <Dialog open={subscribePlanSuccess}>
      <DialogTrigger
        onClick={handleSubscription}
        className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
      >
        Үргэлжлүүлэх
        <Image
          src={"/arrow-right-icon.png"}
          width={10}
          height={10}
          alt="arrow"
          className="w-[10px] h-[10px]"
        />
      </DialogTrigger>

      <DialogContent className={"max-w-lg rounded-3xl w-full"}>
        {!isPaymentSuccess && (
          <DialogHeader>
            <DialogTitle className="text-3xl">QPay Payment</DialogTitle>
          </DialogHeader>
        )}
        {subscribePlanSuccess && subscribePlanData ? (
          !isPaymentSuccess ? (
            <div className="flex flex-col gap-6">
              <Image
                src={`data:image/png;base64,${subscribePlanData?.QrImage}`}
                width={394}
                height={394}
                alt="dummy-qr"
                className="aspect-square w-full rounded-2xl"
              />

              <button
                onClick={handleCheckPayment}
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
          )
        ) : (
          <></>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
