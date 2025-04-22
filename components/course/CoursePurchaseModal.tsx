import React, { useEffect, useState } from "react";

import Image from "next/image";
import Step1 from "./Step1";
import Step3 from "./Step3";
import {
  useCalculateCouponMutation,
  useGetOnboardingCourseQuery,
} from "@/app/services/service";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import CoursePaymentModal from "./CoursePaymentModal";

function CoursePurchaseModal({
  className,
  buttonIconSize,
  buttonText,
  userInfo,
}) {
  const [isMainDialogOpen, setMainDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("qpay");
  const [selectedOption, setSelectedOption] = useState("creatorcourse");
  // Always start with step 1 or skip to step 3 if free content was used
  const initialStep = userInfo?.IsUsedFreeContent ? 2 : 1;
  const [currentStep, setCurrentStep] = useState(initialStep);

  const {
    data: courseData,
    isLoading,
    error,
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

  const couponCodeformik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      try {
        // @ts-ignore
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

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 2));
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const renderStepContent = () => {
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
            setSelectedPayment={setSelectedPayment}
            selectedPayment={selectedPayment}
            formik={couponCodeformik}
            calculateCouponData={calculateCouponData}
            courseData={courseData}
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
          currentStep === 1 ? "max-w-3xl" : "max-w-5xl"
        } rounded-3xl`}
      >
        {renderStepContent()}
        <div className="flex flex-row items-center justify-between w-full">
          {currentStep > 1 && (
            <button
              onClick={previousStep}
              className={`flex whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#F5F4F0] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg font-bold`}
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
                bg-geni-green border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
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
          ) : (
            <CoursePaymentModal
              setIsMainDialogOpen={setMainDialogOpen}
              selectedPayment={selectedPayment}
              couponCode={couponCodeformik.values.couponCode}
              courseId={courseData?.courseId}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CoursePurchaseModal;
