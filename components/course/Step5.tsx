import { useState, useEffect, useRef } from "react";
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
import {
  createPaymentStatusMonitor,
  closePaymentMonitor,
} from "@/utils/sseUtils";
import { useGetStudentCoursesQuery } from "@/app/services/service";
import { useIsMobile } from "@/hooks/use-mobile";
import toast from "react-hot-toast";

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
    UserTxnId?: string;
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
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const paymentMonitorRef = useRef(null);
  const isMobile = useIsMobile();

  // Get access to the student courses query to refetch after payment
  const { refetch: refetchStudentCourses } = useGetStudentCoursesQuery(
    {},
    {
      skip: true, // Skip on first render
    }
  );

  const handlePaymentMethodClick = (paymentMethod: PaymentUrl) => {
    setSelectedPaymentMethod(paymentMethod);
    onPaymentMethodSelect(paymentMethod);
    setSelectedPayment("qpay");

    // Don't redirect immediately on mobile - wait for continue button
    // Removed the immediate redirect logic
  };

  const handleInvoiceClick = () => {
    setSelectedPaymentMethod(null);
    onPaymentMethodSelect(null);
    setSelectedPayment("invoice");
  };

  const handleCheckPayment = async () => {
    if (!subscribeData?.UserTxnId) {
      toast.error("Transaction ID not found");
      return;
    }

    setIsCheckingPayment(true);
    try {
      const response = await fetch(
        `/api/payment-check?txId=${subscribeData.UserTxnId}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.isPaid) {
          setIsPaymentSuccess(true);
          toast.success("Төлбөр амжилттай төлөгдлөө");
          // Refetch student courses when payment is successful
          await refetchStudentCourses();
        } else {
          toast.error("Төлбөр төлөгдөөгүй байна");
        }
      } else {
        toast.error(data.error || "Алдаа гарлаа");
      }
    } catch (error) {
      console.error("Payment check error:", error);
      toast.error("Төлбөр шалгахад алдаа гарлаа");
    } finally {
      setIsCheckingPayment(false);
    }
  };

  useEffect(() => {
    // Only show QR modal on desktop when QPay is selected
    if (
      shouldShowQR &&
      selectedPayment === "qpay" &&
      selectedPaymentMethod &&
      !isMobile
    ) {
      // Start payment status monitoring via SSE if we have a transaction ID
      if (subscribeData?.UserTxnId) {
        paymentMonitorRef.current = createPaymentStatusMonitor(
          subscribeData.UserTxnId,
          async () => {
            // On payment success
            setIsPaymentSuccess(true);
            toast.success("Төлбөр амжилттай төлөгдлөө");
            // Refetch student courses when payment is successful
            await refetchStudentCourses();
            setShouldShowQR(false);
          },
          (error) => {
            // On error
            console.error("Payment monitoring error:", error);
            toast.error("Төлбөр шалгахад алдаа гарлаа");
          }
        );
      }
    }
  }, [
    shouldShowQR,
    selectedPayment,
    selectedPaymentMethod,
    subscribeData?.UserTxnId,
    refetchStudentCourses,
    setShouldShowQR,
    isMobile,
  ]);

  // Close payment monitor when the dialog is closed or payment succeeds
  useEffect(() => {
    if (!shouldShowQR || isPaymentSuccess) {
      closePaymentMonitor(paymentMonitorRef.current);
    }
  }, [shouldShowQR, isPaymentSuccess]);

  // Cleanup function to close the payment monitor when unmounting
  useEffect(() => {
    return () => {
      closePaymentMonitor(paymentMonitorRef.current);
    };
  }, []);

  const handleContinue = () => {
    if (selectedPayment === "qpay" && selectedPaymentMethod) {
      if (isMobile) {
        // On mobile, redirect to payment app when continue is pressed
        if (selectedPaymentMethod.link) {
          window.open(selectedPaymentMethod.link, "_blank");

          // Start payment monitoring for mobile
          if (subscribeData?.UserTxnId) {
            paymentMonitorRef.current = createPaymentStatusMonitor(
              subscribeData.UserTxnId,
              async () => {
                // On payment success
                setIsPaymentSuccess(true);
                toast.success("Төлбөр амжилттай төлөгдлөө");
                // Refetch student courses when payment is successful
                await refetchStudentCourses();
              },
              (error) => {
                // On error
                console.error("Payment monitoring error:", error);
                toast.error("Төлбөр шалгахад алдаа гарлаа");
              }
            );
          }
        }
      } else {
        // On desktop, show QR modal
        setShouldShowQR(true);
      }
    }
    onContinue();
  };

  const handleCloseQR = () => {
    closePaymentMonitor(paymentMonitorRef.current);
    setShouldShowQR(false);
    setIsPaymentSuccess(false);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 w-full">
        <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
          Төлбөр төлөх
        </span>

        <div className="w-full flex flex-col gap-5">
          {/* Mobile Payment Options - Show all payment methods */}
          {isMobile && subscribeData?.Urls && subscribeData.Urls.length > 0 && (
            <>
              <span className="text-[#6F6F6F] text-base sm:text-xl font-bold block">
                Та төлбөр төлөх нөхцөлөө сонгоно уу
              </span>
              <div className="border border-[#F5F4F0] p-6 rounded-3xl">
                <div className="grid grid-cols-2 gap-4">
                  {subscribeData.Urls.map((paymentMethod, index) => (
                    <HoverCard key={index}>
                      <HoverCardTrigger className="w-full">
                        <button
                          key={index}
                          onClick={() =>
                            handlePaymentMethodClick(paymentMethod)
                          }
                          className={`w-full border-[2px] transition-all duration-150 flex flex-col justify-center items-center rounded-full bg-[#F5F4F0] p-1 ${
                            selectedPayment === "qpay" &&
                            selectedPaymentMethod?.name === paymentMethod.name
                              ? "border-geni-blue"
                              : "border-[#F5F4F0] hover:border-geni-blue"
                          }`}
                        >
                          <div className="w-full px-2 py-1 flex flex-row items-center justify-center gap-1 rounded-full bg-white">
                            <Image
                              src={paymentMethod.logo}
                              alt={paymentMethod.name}
                              width={16}
                              height={16}
                              className="w-[16px] h-[16px] object-contain rounded-lg"
                            />
                            <span className="text-xs text-center font-bold truncate">
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
              </div>
            </>
          )}

          {/* Desktop QPay Payment Options - Show only QPay */}
          {!isMobile && (
            <>
              <span className="text-[#6F6F6F] text-base sm:text-xl font-bold block">
                Та төлбөр төлөх нөхцөлөө сонгоно уу
              </span>
              <div className="border border-[#F5F4F0] p-6 rounded-3xl">
                {subscribeData?.Urls && subscribeData.Urls.length > 0 ? (
                  <div className="flex flex-wrap gap-4">
                    {/* Show only QPay option on desktop */}
                    {subscribeData.Urls.filter(
                      (method) =>
                        method.name.toLowerCase().includes("qpay") ||
                        method.description.toLowerCase().includes("qpay")
                    ).map((paymentMethod, index) => (
                      <HoverCard key={index}>
                        <HoverCardTrigger className="max-w-[189px] w-full">
                          <button
                            key={index}
                            onClick={() =>
                              handlePaymentMethodClick(paymentMethod)
                            }
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
            </>
          )}

          {/* Invoice Option */}
          <div className="border border-[#F5F4F0] p-3 sm:p-6 rounded-3xl">
            <span className="text-[#6F6F6F] text-base sm:text-xl font-bold mb-3 sm:mb-4 block">
              Нэхэмжлэхээр төлөх
            </span>
            <button
              onClick={handleInvoiceClick}
              className={`w-full max-w-[120px] sm:max-w-[189px] border-[2px] transition-all duration-150 flex flex-col justify-center items-center rounded-2xl sm:rounded-full bg-[#F5F4F0] p-1 ${
                selectedPayment === "invoice"
                  ? "border-geni-blue"
                  : "border-[#F5F4F0] hover:border-geni-blue"
              }`}
            >
              <div className="w-full px-3 py-2 sm:px-4 sm:py-2 flex flex-row items-center justify-center gap-2 rounded-xl sm:rounded-full bg-white">
                <span className="text-xl sm:text-3xl text-center font-bold truncate">
                  PDF
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Modal - Only show on desktop */}
      {!isMobile && (
        <Dialog open={shouldShowQR} onOpenChange={setShouldShowQR}>
          <DialogContent className="max-w-lg rounded-3xl w-full">
            <DialogHeader className="flex flex-col space-y-1.5 text-center sm:text-left">
              <DialogTitle className="text-2xl sm:text-3xl">
                {isPaymentSuccess
                  ? "Төлбөр амжилттай"
                  : selectedPaymentMethod?.description}
              </DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-4 w-full items-center">
              {!isPaymentSuccess ? (
                selectedPaymentMethod?.link ? (
                  <div className="flex flex-col w-full items-center">
                    {(selectedPaymentMethod.name
                      .toLowerCase()
                      .includes("qpay") ||
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
                    </div>
                    <button
                      onClick={handleCheckPayment}
                      disabled={isCheckingPayment}
                      className="bg-[#4D55F5] text-white font-bold border-[1px] border-[#2D262D] rounded-lg w-full text-center py-3 hover:bg-[#3D45E5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCheckingPayment ? "Шалгаж байна..." : "Төлбөр шалгах"}
                    </button>
                  </div>
                ) : (
                  <div className="text-center text-[#6F6F6F] py-8">
                    QR код байхгүй байна
                  </div>
                )
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
              )}
              <DialogClose
                onClick={handleCloseQR}
                className="bg-gray-200 text-gray-800 font-bold rounded-lg w-full text-center py-3 hover:bg-gray-300 transition-colors"
              >
                Хаах
              </DialogClose>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default Step5;
