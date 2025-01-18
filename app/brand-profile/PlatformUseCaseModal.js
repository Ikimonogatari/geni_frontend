import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import Image from "next/image";
import Step1 from "./BrandOnboard/Step1";
import Step2 from "./BrandOnboard/Step2";
import Step3 from "./BrandOnboard/Step3";

function PlatformUseCaseModal({ responsive }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAgreed, setIsAgreed] = useState(false);

  const nextStep = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, 4));
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
          <Step1 handleSelect={handleSelect} selectedOption={selectedOption} />
        );
      case 2:
        return <Step2 setIsAgreed={setIsAgreed} />;
      case 3:
        return <Step3 />;
      case 4:
        return <div>Step 4 Content</div>; // Replace with actual content for Step 4
      default:
        return null;
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        className={`${responsive} whitespace-nowrap flex-row text-xs sm:text-base items-center gap-2 bg-[#4D55F5] border-[1px] border-[#2D262D] px-3 sm:px-5 py-2 sm:py-3 rounded-lg text-white font-bold`}
      >
        Бүтээгдэхүүн нэмэх
        <Image src={"/add-icon.png"} width={14} height={14} alt="arrow" />
      </DialogTrigger>
      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-6 max-h-[739px] w-full lg:w-full max-w-4xl rounded-3xl">
        {renderStepContent()}
        <div className="flex flex-row items-center justify-between w-full">
          {currentStep == 2 ? (
            <div className="flex flex-row items-center gap-2 sm:gap-3">
              <div className="relative">
                <input type="checkbox" id="checkbox" className="peer hidden" />
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
          ) : currentStep > 2 ? (
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
          {currentStep < 5 && (
            <button
              onClick={nextStep}
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
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PlatformUseCaseModal;
