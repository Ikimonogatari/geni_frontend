import React, { useEffect, useState } from "react";

import Image from "next/image";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step5 from "./Step5";
import {
  useCalculateCouponMutation,
  useGetOnboardingCourseQuery,
  usePurchaseCourseMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "@/components/common/Loader";
import { ClipLoader } from "react-spinners";

function CoursePurchaseModal({
  className,
  buttonIconSize,
  buttonText,
  userInfo,
}) {
  const [isMainDialogOpen, setMainDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("qpay");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [shouldShowQR, setShouldShowQR] = useState(false);
  const [selectedOption, setSelectedOption] = useState("creatorcourse");
  const [subscribeData, setSubscribeData] = useState(null);

  // Always start with step 1 or skip to step 3 if free content was used
  const initialStep = userInfo?.IsUsedFreeContent ? 2 : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const {
    data: courseData,
    isLoading: courseDataLoading,
    error: courseDataError,
  } = useGetOnboardingCourseQuery({});

  const [
    calculateCoupon,
    {
      data: calculateCouponData,
      error: calculateCouponError,
      isLoading: calculateCouponLoading,
      isSuccess: calculateCouponSuccess,
    },
  ] = useCalculateCouponMutation();

  const [
    purchaseCourse,
    {
      data: purchaseCourseData,
      error: purchaseCourseError,
      isLoading: purchaseCourseLoading,
      isSuccess: purchaseCourseSuccess,
    },
  ] = usePurchaseCourseMutation();

  const couponCodeformik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      try {
        calculateCoupon({
          Amount: courseData?.coursePrice,
          CouponCode: values.couponCode,
        });
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });

  useEffect(() => {
    if (calculateCouponSuccess) {
      toast.success("Таны купон амжилттай идэвхжилээ");
    }
    if (calculateCouponError) {
      //@ts-ignore
      toast.error(calculateCouponError?.data?.error);
    }
  }, [calculateCouponSuccess, calculateCouponError]);

  // Handle purchase course success to get payment data
  useEffect(() => {
    if (purchaseCourseSuccess && purchaseCourseData) {
      setSubscribeData(purchaseCourseData);
      setCurrentStep(3); // Move to Step5 (payment selection)
    }
    if (purchaseCourseError) {
      //@ts-ignore
      toast.error(purchaseCourseError?.data?.error);
    }
  }, [purchaseCourseSuccess, purchaseCourseError, purchaseCourseData]);

  const nextStep = () => {
    if (currentStep === 2) {
      // When proceeding from Step3, call purchase course API
      purchaseCourse({
        CourseId: courseData?.courseId || "1",
        ...(couponCodeformik.values.couponCode && {
          CouponCode: couponCodeformik.values.couponCode,
        }),
      });
    } else if (currentStep === 3) {
      // Handle Step5 continue button
      if (selectedPayment === "qpay" && selectedPaymentMethod) {
        setShouldShowQR(true);
      } else if (selectedPayment === "invoice") {
        setMainDialogOpen(false);
        // Handle invoice payment if needed
      }
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 3));
    }
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const renderStepContent = () => {
    if (courseDataLoading) {
      return <Loader />;
    }

    switch (currentStep) {
      case 1:
        return (
          <Step1
            handleSelect={handleSelect}
            selectedOption={selectedOption}
            courseData={courseData}
          />
        );
      case 2:
        return (
          <Step3
            formik={couponCodeformik}
            calculateCouponData={calculateCouponData}
            courseData={courseData}
          />
        );
      case 3:
        return (
          <Step5
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            subscribeData={subscribeData}
            onPaymentMethodSelect={setSelectedPaymentMethod}
            shouldShowQR={shouldShowQR}
            setShouldShowQR={setShouldShowQR}
            onContinue={() => {
              if (selectedPayment === "invoice") {
                setMainDialogOpen(false);
                // Handle invoice payment if needed
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isMainDialogOpen} onOpenChange={setMainDialogOpen}>
      <DialogTrigger
        className={`${className} whitespace-nowrap gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] rounded-lg text-white font-bold`}
      >
        {buttonText}
        <Image
          src={"/arrow-right-icon.png"}
          width={14}
          height={14}
          alt="arrow"
          className={buttonIconSize}
        />
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent
        className={`overflow-y-auto flex flex-col items-center lg:items-start gap-6 max-h-[739px] w-full lg:w-full ${
          currentStep === 1
            ? "max-w-3xl"
            : currentStep === 3
            ? "max-w-6xl"
            : "max-w-5xl"
        } rounded-3xl`}
      >
        {renderStepContent()}
        <div className="flex flex-row items-center justify-between w-full">
          {currentStep > 1 && (
            <button
              onClick={previousStep}
              className={`flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#F5F4F0] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-full font-bold`}
            >
              <Image
                src={"/arrow-forward-icon.png"}
                width={10}
                height={10}
                alt="arrow"
                className="w-[14px] h-[14px] rotate-180"
              />
              Буцах
            </button>
          )}
          {currentStep < 2 ? (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && selectedOption === null}
              className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 
               ${
                 currentStep === 1 && selectedOption === null
                   ? "opacity-70 cursor-not-allowed"
                   : "opacity-100"
               } 
                bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-full text-white font-bold`}
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
          ) : currentStep === 2 ? (
            <button
              onClick={nextStep}
              disabled={purchaseCourseLoading}
              className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-black px-3 sm:px-5 py-2 sm:py-3 rounded-full text-white font-bold`}
            >
              {purchaseCourseLoading ? (
                <ClipLoader color="white" size={20} />
              ) : (
                "Төлбөр төлөх"
              )}
              <Image
                src={"/arrow-right-icon.png"}
                width={10}
                height={10}
                alt="arrow"
                className="w-[10px] h-[10px]"
              />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={selectedPayment === "qpay" && !selectedPaymentMethod}
              className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 ${
                selectedPayment === "qpay" && !selectedPaymentMethod
                  ? "opacity-70 cursor-not-allowed"
                  : "opacity-100"
              } bg-black px-3 sm:px-5 py-2 sm:py-3 rounded-full text-white font-bold`}
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CoursePurchaseModal;
