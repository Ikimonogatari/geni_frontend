import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ClipLoader } from "react-spinners";
import { Check } from "lucide-react";
import { useSubscribeStorepayMutation } from "@/app/services/service";
import { createStorepayStatusMonitor } from "@/utils/sseUtils";
import toast from "react-hot-toast";

type StorepayModalProps = {
  onClose: () => void;
  open?: boolean;
  planId: number;
  promoCode?: string;
};

const StorapayModal: React.FC<StorepayModalProps> = ({
  onClose,
  open = false,
  planId,
  promoCode,
}) => {
  const [phoneNumber, setPhoneNumber] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [storePaySuccess, setStorePaySuccess] = useState(false);
  const [subscribeStorepay, { isLoading, data, error }] =
    useSubscribeStorepayMutation();
  const storepayStatusMonitorRef = useRef(null);

  useEffect(() => {
    if (data?.user_txn_id) {
      console.log(data);
      setLoading(true);
      setStep(2);
      storepayStatusMonitorRef.current = createStorepayStatusMonitor(
        data.user_txn_id,
        () => {
          console.log("Payment successful");
          toast.success("Төлбөр амжилттай төлөгдлөө");
          setStorePaySuccess(true);
          setLoading(false);
        },
        (error) => {
          console.error("Payment error:", error);
          toast.error("Төлбөр шалгахад алдаа гарлаа");
          setLoading(false);
        }
      );
    }
  }, [data]);

  useEffect(() => {
    if ((error as any)?.data?.error) {
      toast.error((error as any)?.data?.error);
      console.log(error);
    }
  }, [error]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPhoneNumber = [...phoneNumber];
      newPhoneNumber[index] = value;
      setPhoneNumber(newPhoneNumber);

      // Auto-focus next input
      if (value && index < 7) {
        const nextInput = document.getElementById(
          `phone-${index + 1}`
        ) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !phoneNumber[index] && index > 0) {
      const prevInput = document.getElementById(
        `phone-${index - 1}`
      ) as HTMLInputElement;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };

  const handleNext = () => {
    subscribeStorepay({
      PlanId: planId,
      MobileNumber: phoneNumber.join(""),
      PromoCode: promoCode,
    });
  };

  const handlePrevious = () => {
    if (step > 1) {
      if (storePaySuccess) {
        onClose();
      } else {
        setStep(step - 1);
      }
    } else {
      onClose();
    }
  };

  const renderSection = () => {
    if (step == 1) {
      // Content Section
      return (
        <div className="p-4 sm:p-6 pb-0">
          <p className="text-center text-gray-800 mb-4 sm:mb-6 text-sm sm:text-md">
            Та бүртгэлтэй утасны дугаараа оруулан аппликейшн дээр нэхэмжлэлээ
            авна уу.
          </p>

          <div className="flex justify-center space-x-1 sm:space-x-2 mb-4 sm:mb-6">
            {phoneNumber.map((digit, index) => (
              <input
                key={index}
                id={`phone-${index}`}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-center text-lg sm:text-2xl lg:text-4xl font-semibold border-2 border-gray-300 rounded-xl sm:rounded-2xl focus:border-blue-500 focus:outline-none"
                placeholder=""
              />
            ))}
          </div>

          <div className="bg-orange-400 border border-orange-200 rounded-lg p-3 sm:p-4">
            <p className="text-white text-xs sm:text-sm leading-relaxed">
              Та Storepay-д бүртгэлтэй утасны дугаараа оруулан хүсэлт илгээн
              үүссэн нэхэмжлэхийн дагуу худалдан авалтаа баталгаажуулснаар бараа
              бүтээгдэхүүн, үйлчилгээ авах боломжтой.
            </p>
          </div>
        </div>
      );
    } else if (step == 2) {
      return (
        <div className="p-4 sm:p-6 pb-0 w-full">
          <div className="flex flex-col justify-center items-center h-full w-full gap-3 sm:gap-4">
            {loading ? (
              <ClipLoader color="black" size={20} />
            ) : (
              <Check className="w-8 h-8 sm:w-10 sm:h-10 text-white bg-green-500 rounded-full" />
            )}

            <p className="text-xs sm:text-sm text-center px-2">
              Төлбөрийн нэхэмжлэхийг Storepay-рүү илгээсэн тул та эхний төлөлтөө
              хийж захиалгаа баталгаажуулна уу.
            </p>
          </div>
        </div>
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={null}>
      {/* @ts-ignore */}
      <DialogContent
        hideCloseButton
        className="overflow-y-auto flex flex-col items-center justify-between lg:items-start gap-4 sm:gap-6 h-[500px] sm:h-[580px] lg:h-[620px] max-w-[95vw] sm:max-w-[600px] lg:max-w-[1000px] w-full !px-3 sm:!px-4 !py-2"
      >
        {/* Header Section - Dark Blue */}
        <div className="bg-[#000062] relative overflow-hidden w-full mt-2 rounded-2xl sm:rounded-3xl">
          <div className="p-4 sm:p-6 pb-0">
            {/* Decorative Stars - Responsive positioning */}
            <Image
              src="/brand/rectangle-star.svg"
              alt="Star"
              width={24}
              height={24}
              className="w-4 h-4 sm:w-6 sm:h-6 absolute top-6 sm:top-10 right-4 sm:right-8 lg:right-[20rem]"
            />
            <Image
              src="/brand/rectangle-star.svg"
              alt="Star"
              width={24}
              height={24}
              className="w-4 h-4 sm:w-6 sm:h-6 absolute top-8 sm:top-15 left-4 sm:left-8 lg:left-[20rem]"
            />

            {/* Logo */}
            <Image
              src="/brand/storepay-logo.svg"
              alt="Storepay Logo"
              width={180}
              height={40}
              className="absolute top-4 sm:top-7 left-4 sm:left-7 w-24 sm:w-32 lg:w-[180px]"
            />

            <div className="flex items-center justify-center">
              {/* Left Text */}
              <div className="text-white text-center mb-1 flex flex-col items-end pt-6 sm:pt-10">
                <div className="text-xs sm:text-sm">МАРКЕТИНГАА</div>
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#0052FF]">
                  ОДОО ЭХЭЛ
                </div>
              </div>

              {/* Mascot */}
              <div className="flex-shrink-0 self-end mx-2 sm:mx-4">
                <Image
                  src="/brand/storepay-mascot.svg"
                  alt="Storepay Mascot"
                  width={280}
                  height={148}
                  className="w-32 h-auto sm:w-48 lg:w-[280px]"
                />
              </div>

              {/* Right Text */}
              <div className="text-white text-center mb-1 flex flex-col items-start pt-6 sm:pt-10">
                <div className="text-xs sm:text-sm">БОРЛУУЛАЛТААСАА</div>
                <div className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#0052FF]">
                  ДАРАА ТӨЛ
                </div>
              </div>
            </div>
          </div>
        </div>

        {renderSection()}

        {/* Button Section */}
        <div className="p-4 sm:p-6 bg-white flex justify-between w-full gap-3 sm:gap-4">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center space-x-1 sm:space-x-2 bg-gray-200 text-gray-800 py-2 sm:py-3 px-4 sm:px-6 lg:px-10 rounded-2xl sm:rounded-3xl font-medium hover:bg-gray-300 transition-colors border-[1px] border-black text-sm sm:text-base"
          >
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Буцах</span>
          </button>

          {step == 1 && (
            <button
              onClick={handleNext}
              disabled={phoneNumber.some((digit) => digit === "") || isLoading}
              className="flex items-center justify-center space-x-1 sm:space-x-2 bg-black text-white py-2 sm:py-3 px-4 sm:px-6 lg:px-10 rounded-2xl sm:rounded-3xl font-medium text-sm sm:text-base disabled:opacity-50"
            >
              {isLoading && <ClipLoader color="white" size={10} />}
              <span>Хүсэлт илгээх</span>
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StorapayModal;
