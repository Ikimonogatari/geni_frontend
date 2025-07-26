import React, { useEffect, useState } from "react";

import Image from "next/image";
import Step1 from "./Step1";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import {
  useUseFreeContentMutation,
  useGetUserInfoQuery,
  useCalculateCouponMutation,
  useListPaymentPlansQuery,
  useSubscribePlanMutation,
} from "@/app/services/service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SubscriptionModal from "../SubscriptionModal";
import Loader from "@/components/common/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import StorapayModal from "./StorapayModal";

function CreditPurchase({
  className,
  buttonIconSize,
  buttonText,
  onCreditPurchase,
}) {
  const router = useRouter();
  const [isMainDialogOpen, setMainDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("qpay");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [shouldShowQR, setShouldShowQR] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState(1);
  const [subscribeData, setSubscribeData] = useState(null);
  const [shouldShowStorePay, setShouldShowStorePay] = useState(false);

  const { data: userInfo, isLoading: userInfoLoading } = useGetUserInfoQuery(
    {}
  );

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
    subscribePlan,
    {
      data: subscribePlanData,
      error: subscribePlanError,
      isLoading: subscribePlanLoading,
      isSuccess: subscribePlanSuccess,
    },
  ] = useSubscribePlanMutation();

  const {
    data: listPaymentPlansData,
    error: listPaymentPlansError,
    isLoading: listPaymentPlansLoading,
  } = useListPaymentPlansQuery({});

  const selectedPackageData = listPaymentPlansData
    ? listPaymentPlansData[selectedPackageIndex]
    : null;

  const couponCodeformik = useFormik({
    initialValues: {
      couponCode: "",
    },
    validationSchema: Yup.object({}),
    onSubmit: async (values) => {
      try {
        calculateCoupon({
          Amount: selectedPackageData?.Price || 0,
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

  // Handle subscribe plan success to get payment data
  useEffect(() => {
    if (subscribePlanSuccess && subscribePlanData) {
      setSubscribeData(subscribePlanData);
      setCurrentStep(4); // Move to Step5 (payment selection)
    }
    if (subscribePlanError) {
      //@ts-ignore
      toast.error(subscribePlanError?.data?.error);
    }
  }, [subscribePlanSuccess, subscribePlanError, subscribePlanData]);

  // Update steps and selected option when userInfo is loaded
  useEffect(() => {
    if (userInfo) {
      // If user has already used free content, default to brandpackage option
      if (userInfo.IsUsedFreeContent) {
        setSelectedOption("brandpackage");
      }
    }
  }, [userInfo]);

  // Default to first step
  const [currentStep, setCurrentStep] = useState(1);

  const [
    useFreeContent,
    {
      data: useFreeContentData,
      error: useFreeContentError,
      isLoading: useFreeContentLoading,
      isSuccess: useFreeContentSuccess,
    },
  ] = useUseFreeContentMutation();

  useEffect(() => {
    if (useFreeContentSuccess) {
      toast.success("Танд 1ш үнэгүй контэнт хийлгэх эрх үүслээ");
      router.push("/add-product");
    }
    if (useFreeContentError) {
      //@ts-ignore
      toast.error(useFreeContentError?.data?.error);
    }
  }, [useFreeContentSuccess, useFreeContentError, router]);

  const nextStep = () => {
    if (selectedOption === "freecontent") {
      useFreeContent({});
    } else if (currentStep === 3) {
      // When proceeding from Step4, call subscribe API
      subscribePlan({
        planId: selectedPackageId,
        ...(couponCodeformik.values.couponCode && {
          CouponCode: couponCodeformik.values.couponCode,
        }),
      });
    } else if (currentStep === 4) {
      // Handle Step5 continue button
      if (selectedPayment === "qpay" && selectedPaymentMethod) {
        setShouldShowQR(true);
      } else if (selectedPayment === "invoice") {
        setMainDialogOpen(false);
        onCreditPurchase();
      } else if (selectedPayment === "storepay") {
        setMainDialogOpen(false);
        setShouldShowStorePay(true);
      }
    } else {
      setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
    }
  };
  
  const handleStorepayClose = () => {
    setShouldShowStorePay(false);
    setMainDialogOpen(true);
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const renderStepContent = () => {
    if (userInfoLoading) {
      return <Loader />;
    }

    switch (currentStep) {
      case 1:
        return (
          <Step1
            handleSelect={handleSelect}
            selectedOption={selectedOption}
            userInfo={userInfo}
          />
        );
      case 2:
        return (
          <Step3
            setSelectedPackageIndex={setSelectedPackageIndex}
            selectedPackageIndex={selectedPackageIndex}
            setSelectedPackageId={setSelectedPackageId}
          />
        );
      case 3:
        return (
          <Step4
            selectedPackageIndex={selectedPackageIndex}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            formik={couponCodeformik}
            calculateCouponData={calculateCouponData}
            selectedPackageData={selectedPackageData}
          />
        );
      case 4:
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
                onCreditPurchase();
              } else if (selectedPayment === "storepay") {
                setMainDialogOpen(false);
              }
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog open={isMainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogTrigger
          className={`${className} whitespace-nowrap gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] rounded-lg text-white font-bold`}
        >
          {buttonText}
          <Image
            src={"/add-icon.png"}
            width={14}
            height={14}
            alt="arrow"
            className={buttonIconSize}
          />
        </DialogTrigger>
        {/* @ts-ignore */}
        <DialogContent
          className={`overflow-y-auto flex flex-col items-center lg:items-start gap-6 max-h-[739px] w-full lg:w-full ${
            currentStep == 4 ? "max-w-6xl" : "max-w-5xl"
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
            {currentStep < 3 ? (
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
            ) : currentStep === 3 ? (
              <button
                onClick={nextStep}
                disabled={subscribePlanLoading}
                className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-black px-3 sm:px-5 py-2 sm:py-3 rounded-full text-white font-bold`}
              >
                {subscribePlanLoading ? (
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
      {/* StorePay Modal */}
      <StorapayModal
        onClose={handleStorepayClose}
        open={shouldShowStorePay}
        planId={selectedPackageId}
        promoCode={couponCodeformik.values.couponCode}
      />
    </>
  );
}

export default CreditPurchase;
