import { useState, useEffect } from "react";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialogc";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";

interface PaymentUrl {
  name: string;
  description: string;
  logo: string;
  link: string;
}

interface Step5Props {
  selectedPayment: string;
  setSelectedPayment: (payment: string) => void;
  subscribeData?: {
    QrImage?: string;
    QrText?: string;
    Urls?: PaymentUrl[];
  };
  onPaymentMethodSelect: (method: PaymentUrl | null) => void;
  shouldShowQR: boolean;
  setShouldShowQR: (show: boolean) => void;
  onContinue: () => void;
}

function Step5({
  selectedPayment,
  setSelectedPayment,
  subscribeData,
  onPaymentMethodSelect,
  shouldShowQR,
  setShouldShowQR,
  onContinue,
}: Step5Props) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentUrl | null>(null);

  const handlePaymentMethodClick = (paymentMethod: PaymentUrl) => {
    setSelectedPaymentMethod(paymentMethod);
    onPaymentMethodSelect(paymentMethod);
    setSelectedPayment("qpay");
  };

  const handleInvoiceClick = () => {
    setSelectedPaymentMethod(null);
    onPaymentMethodSelect(null);
    setSelectedPayment("invoice");
  };

  useEffect(() => {
    if (shouldShowQR && selectedPayment === "qpay" && selectedPaymentMethod) {
      // QR modal will be controlled by shouldShowQR prop
    }
  }, [shouldShowQR, selectedPayment, selectedPaymentMethod]);

  const handleContinue = () => {
    if (selectedPayment === "qpay" && selectedPaymentMethod) {
      setShouldShowQR(true);
    }
    onContinue();
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 w-full">
        <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
          Төлбөр төлөх
        </span>

        <div className="w-full flex flex-col gap-5">
          {/* QPay Payment Options */}
          <span className="text-[#6F6F6F] text-base sm:text-xl font-bold block">
            Та төлбөр төлөх нөхцөлөө сонгоно уу
          </span>
          <div className="border border-[#F5F4F0] p-6 rounded-3xl">
            {subscribeData?.Urls && subscribeData.Urls.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {subscribeData.Urls.map((paymentMethod, index) => (
                  <HoverCard key={index}>
                    <HoverCardTrigger className="max-w-[189px] w-full">
                      <button
                        key={index}
                        onClick={() => handlePaymentMethodClick(paymentMethod)}
                        className={`w-full border-[2px] transition-all duration-150 flex flex-col justify-center items-center rounded-full bg-[#F5F4F0] p-1 ${
                          selectedPayment === "qpay" &&
                          selectedPaymentMethod?.name === paymentMethod.name
                            ? "border-geni-blue"
                            : "border-[#F5F4F0] hover:border-geni-blue"
                        }`}
                      >
                        <div className="w-full px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-full bg-white">
                          <Image
                            src={paymentMethod.logo}
                            alt={paymentMethod.name}
                            width={28}
                            height={28}
                            className="w-[28px] h-[28px] object-contain rounded-lg"
                          />
                          <span className="text-lg text-center font-bold truncate">
                            {paymentMethod.description}
                          </span>
                        </div>
                      </button>
                    </HoverCardTrigger>
                    {/* @ts-ignore */}
                    <HoverCardContent className="max-w-min w-auto whitespace-nowrap py-2">
                      <p>{paymentMethod.description}</p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            ) : (
              <div className="text-center text-[#6F6F6F] py-8">
                Төлбөрийн хэрэгсэл байхгүй байна
              </div>
            )}
          </div>

          {/* Invoice Option */}
          <div className="border border-[#F5F4F0] p-6 rounded-3xl">
            <span className="text-[#6F6F6F] text-base sm:text-xl font-bold mb-4 block">
              Нэхэмжлэхээр төлөх
            </span>
            <button
              onClick={handleInvoiceClick}
              className={`w-full max-w-[189px] border-[2px] transition-all duration-150 flex flex-col justify-center items-center rounded-full bg-[#F5F4F0] p-1 ${
                selectedPayment === "invoice"
                  ? "border-geni-blue"
                  : "border-[#F5F4F0] hover:border-geni-blue"
              }`}
            >
              <div className="w-full px-4 py-2 flex flex-row items-center justify-center gap-2 rounded-full bg-white">
                <span className="text-3xl text-center font-bold truncate">
                  PDF
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      <Dialog open={shouldShowQR} onOpenChange={setShouldShowQR}>
        <DialogContent className="max-w-lg rounded-3xl w-full">
          <DialogHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
            <DialogTitle className="text-2xl sm:text-3xl">
              {selectedPaymentMethod?.description}
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 w-full items-center">
            {selectedPaymentMethod?.link ? (
              <div className="flex flex-col w-full items-center">
                {(selectedPaymentMethod.name.toLowerCase().includes("qpay") ||
                  selectedPaymentMethod.description
                    .toLowerCase()
                    .includes("qpay") ||
                  selectedPaymentMethod.name.toLowerCase() === "qpay") &&
                subscribeData?.QrImage ? (
                  <Image
                    src={`data:image/png;base64,${subscribeData.QrImage}`}
                    width={300}
                    height={300}
                    alt="QR Code"
                    className="w-full aspect-square rounded-xl"
                  />
                ) : (
                  <div className="w-full aspect-square bg-white p-4 rounded-2xl">
                    <QRCodeSVG
                      value={selectedPaymentMethod.link}
                      level="H"
                      includeMargin={false}
                      className="w-full h-full rounded-xl"
                    />
                  </div>
                )}
                <div className="flex flex-col gap-1 text-center text-sm text-[#6F6F6F] mb-4">
                  <p>QR код уншуулж төлбөр төлнө үү</p>
                  <p>Эсвэл доорх холбоосыг дарж төлнө үү:</p>
                </div>
                <a
                  href={selectedPaymentMethod.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4D55F5] text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-3 hover:bg-[#3D45E5] transition-colors"
                >
                  {selectedPaymentMethod.description}-р төлөх
                </a>
              </div>
            ) : (
              <div className="text-center text-[#6F6F6F] py-8">
                QR код байхгүй байна
              </div>
            )}
            <DialogClose className="bg-gray-200 text-gray-800 font-bold rounded-lg w-full text-center py-3 hover:bg-gray-300 transition-colors">
              Хаах
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Step5;
