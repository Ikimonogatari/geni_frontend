"use client";
import React, { Suspense, useEffect, useState } from "react";
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
  usePurchaseCourseMutation,
  useGetStudentCoursesQuery,
} from "@/app/services/service";
import toast from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface CoursePaymentProps {
  setIsMainDialogOpen: (open: boolean) => void;
  selectedPayment: string;
  couponCode: string;
  courseId: string;
}

const CoursePaymentModal: React.FC<CoursePaymentProps> = ({
  setIsMainDialogOpen,
  selectedPayment,
  couponCode,
  courseId,
}) => {
  const [txId, setTxId] = useState(null);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isPaymentDialogOpen, setPaymentDialogOpen] = useState(false);

  console.log(courseId, "COURSE ID");
  const finalCourseId = courseId || "1"; // Default to course ID 1 if undefined

  const [
    purchaseCourse,
    {
      data: purchaseCourseData,
      error: purchaseCourseError,
      isLoading: purchaseCourseLoading,
      isSuccess: purchaseCourseSuccess,
    },
  ] = usePurchaseCourseMutation();

  const {
    data: checkPaymentData,
    error: checkPaymentError,
    isLoading: checkPaymentLoading,
    refetch: checkPayment,
  } = useCheckPaymentQuery(txId, { skip: !txId });

  // Get access to the student courses query to refetch after payment
  const { refetch: refetchStudentCourses } = useGetStudentCoursesQuery(
    {},
    {
      skip: !isPaymentSuccess, // Skip on first render
    }
  );

  useEffect(() => {
    if (purchaseCourseSuccess) {
      if (selectedPayment === "qpay") {
        setTxId(purchaseCourseData?.UserTxnId || null);
        setPaymentDialogOpen(true);
      }
    }
    if (purchaseCourseError) {
      //@ts-ignore
      toast.error(purchaseCourseError?.data?.error);
    }
  }, [purchaseCourseSuccess, purchaseCourseError]);

  const handleSubscription = () => {
    if (!finalCourseId) {
      toast.error("Курсын ID олдсонгүй. Дахин оролдоно уу.");
      return;
    }

    purchaseCourse({
      CourseId: finalCourseId,
      CouponCode: couponCode,
    });
  };

  const handleCheckPayment = async () => {
    if (txId) {
      try {
        const checkPaymentResponse = await checkPayment();
        if (checkPaymentResponse?.data && checkPaymentResponse.data.IsPaid) {
          setIsPaymentSuccess(true);
          // Refetch student courses when payment is successful
          await refetchStudentCourses();
        } else {
          toast.error(
            "Төлбөр төлөгдөөгүй байна. Та QR кодыг уншуулж төлбөрөө төлнө үү."
          );
        }
      } catch (error) {
        console.error("Error checking payment:", error);
        toast.error("Төлбөр шалгах үед алдаа гарлаа. Дахин оролдоно уу.");
      }
    }
  };

  // Also refetch courses when payment is confirmed successful
  useEffect(() => {
    if (isPaymentSuccess) {
      refetchStudentCourses();
    }
  }, [isPaymentSuccess, refetchStudentCourses]);

  const handleCloseDialog = () => {
    setPaymentDialogOpen(false);
    setIsMainDialogOpen(false);
    setIsPaymentSuccess(false);
  };

  return (
    <>
      <button
        onClick={handleSubscription}
        disabled={purchaseCourseLoading}
        className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-geni-green border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
      >
        Үргэлжлүүлэх
        <Image
          src={"/arrow-right-icon.png"}
          width={10}
          height={10}
          alt="arrow"
          className="w-[10px] h-[10px]"
        />
      </button>
      <Dialog open={isPaymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        {/* @ts-ignore */}
        <DialogContent className={"max-w-lg rounded-3xl w-full"}>
          {!isPaymentSuccess && (
            //@ts-ignore
            <DialogHeader>
              {/* @ts-ignore */}
              <DialogTitle className="text-3xl">QPay Payment</DialogTitle>
            </DialogHeader>
          )}
          <div className="flex justify-center items-center w-full">
            {purchaseCourseSuccess && purchaseCourseData ? (
              !isPaymentSuccess ? (
                <div className="flex flex-col gap-6 w-full">
                  {!purchaseCourseLoading && purchaseCourseData ? (
                    <Image
                      src={`data:image/png;base64,${purchaseCourseData?.QrImage}`}
                      width={394}
                      height={394}
                      alt=""
                      className="aspect-square w-full rounded-2xl"
                    />
                  ) : (
                    <div className="w-[394px] h-[394px] rounded-2xl aspect-square bg-primary-bg flex justify-center items-center">
                      <ClipLoader
                        loading={purchaseCourseLoading}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                        className="aspect-[9/16] w-full h-full rounded-2xl"
                        size={50}
                      />
                    </div>
                  )}
                  <button
                    onClick={handleCheckPayment}
                    className="bg-geni-pink text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-4"
                  >
                    Төлбөр шалгах
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col-reverse items-center gap-6">
                    <Image
                      src={"/payment-success.png"}
                      width={353}
                      height={271}
                      className=""
                      alt=""
                    />
                    <span className="uppercase font-extrabold text-[#4FB755] text-4xl sm:text-5xl text-center">
                      АМЖИЛТТАЙ ТӨЛӨГДЛӨӨ
                    </span>
                  </div>
                  <p className="text-center text-lg sm:text-xl">
                    Geni Creator Course идэвхжилээ. <br />
                    <br /> Та Geni Бүтээгчдийн Discord хүрээлэлд нэгдэж бусад
                    сурагчидтайгаа хамтдаа суралцаарай. <br />
                    <br />
                    Танд амжилт хүсье!
                  </p>
                  <a
                    target="_blank"
                    href="https://discord.gg/6eG2ptvm3f"
                    className="flex flex-row items-center justify-center text-lg gap-2 bg-geni-pink text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-4"
                  >
                    <Image
                      src={"/discord-icon.png"}
                      width={28}
                      height={28}
                      alt=""
                      className="w-7 h-7"
                    />
                    Хүрээлэлд нэгдэх
                  </a>
                </div>
              )
            ) : (
              <>
                {!purchaseCourseError && (
                  <div className="w-[394px] h-[394px] rounded-2xl aspect-square bg-primary-bg flex justify-center items-center">
                    <ClipLoader
                      loading={purchaseCourseLoading}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                      className="aspect-[9/16] w-full h-full rounded-2xl"
                      size={50}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CoursePaymentModal;
