import React, { useEffect, useState } from "react";

import Image from "next/image";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import {
  useBrandTermCheckMutation,
  useUseFreeContentMutation,
  useGetUserInfoQuery
} from "@/app/services/service";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import SubscriptionModal from "../SubscriptionModal";
import Loader from "@/components/common/Loader";

function CreditPurchase({ className, buttonIconSize, buttonText }) {
  const router = useRouter();
  const [isMainDialogOpen, setMainDialogOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("qpay");
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState(1);
  
  const { data: userInfo, isLoading: userInfoLoading } = useGetUserInfoQuery({});
  
  const [currentStep, setCurrentStep] = useState(1); // Default to first step
  const [isAgreed, setIsAgreed] = useState(false); // Default to not agreed

  // Update steps and selected option when userInfo is loaded
  useEffect(() => {
    if (userInfo) {
      const initialStep = userInfo.IsUsedFreeContent
        ? userInfo.IsCheckedTerm
          ? 3
          : 2
        : 1;
      setCurrentStep(initialStep);
      setIsAgreed(userInfo.IsCheckedTerm || false);
      
      // If user has already used free content, default to brandpackage option
      if (userInfo.IsUsedFreeContent) {
        setSelectedOption("brandpackage");
      }
    }
  }, [userInfo]);

  const [
    brandTermCheck,
    {
      data: brandTermCheckData,
      error: brandTermCheckError,
      isLoading: brandTermCheckLoading,
      isSuccess: brandTermCheckSuccess,
    },
  ] = useBrandTermCheckMutation();

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

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    setIsAgreed(isChecked);
    if (isChecked) {
      brandTermCheck({});
    }
  };

  const nextStep = () => {
    if (selectedOption === "freecontent") {
      useFreeContent({});
    } else {
      setCurrentStep((prevStep) => {
        if (userInfo?.IsCheckedTerm && prevStep === 1) {
          return 3;
        }
        return Math.min(prevStep + 1, 4);
      });
    }
  };

  const previousStep = () => {
    setCurrentStep((prevStep) => {
      if (userInfo?.IsUsedFreeContent && prevStep === 3) {
        return 3;
      }
      if (userInfo?.IsCheckedTerm && prevStep === 3) {
        return 1;
      }
      return Math.max(prevStep - 1, 1);
    });
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
        return <Step2 setIsAgreed={setIsAgreed} />;
      case 3:
        return (
          <Step3
            setSelectedPackageIndex={setSelectedPackageIndex}
            selectedPackageIndex={selectedPackageIndex}
            setSelectedPackageId={setSelectedPackageId}
          />
        );
      case 4:
        return (
          <Step4
            selectedPackageIndex={selectedPackageIndex}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
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
          src={"/add-icon.png"}
          width={14}
          height={14}
          alt="arrow"
          className={buttonIconSize}
        />
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-6 max-h-[739px] w-full lg:w-full max-w-4xl rounded-3xl">
        {renderStepContent()}
        <div className="flex flex-row items-center justify-between w-full">
          {currentStep == 2 ? (
            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <div className="relative">
                <input
                  type="checkbox"
                  id="checkbox"
                  className="peer hidden"
                  checked={isAgreed}
                  defaultChecked={userInfo?.IsCheckedTerm}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="checkbox"
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-all peer-checked:bg-[#4D55F5] peer-checked:border-[#4D55F5]"
                >
                  <span className="text-sm sm:text-base text-white text-center select-none peer-checked:inline-block w-3 h-5 border-white">
                    ✓
                  </span>
                </label>
              </div>

              <span className="text-xs sm:text-lg font-semibold">
                Хүлээн зөвшөөрч байна
              </span>
            </div>
          ) : currentStep > 3 ||
            (currentStep > 2 && !userInfo?.IsCheckedTerm) ? (
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
          ) : (
            <></>
          )}
          {currentStep < 4 ? (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === 1 && selectedOption === null) ||
                (currentStep === 2 && !isAgreed)
              }
              className={`flex ml-auto whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 
               ${
                 (currentStep === 1 && selectedOption === null) ||
                 (currentStep === 2 && !isAgreed)
                   ? "opacity-70 cursor-not-allowed"
                   : "opacity-100"
               } 
                bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
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
            <SubscriptionModal
              selectedPackageId={selectedPackageId}
              setIsMainDialogOpen={setMainDialogOpen}
              selectedPayment={selectedPayment}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CreditPurchase;
