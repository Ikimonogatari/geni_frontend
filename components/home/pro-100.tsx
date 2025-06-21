"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialogc";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import clsx from "clsx";
import { Loader2 } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { SlidingNumber } from "../motion-primitives/sliding-number";
import { AspectRatio } from "../ui/aspect-ratio";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  createPaymentStatusMonitor,
  closePaymentMonitor,
} from "@/utils/sseUtils";

import Step1Pic from "../../public/pro100/step-1.png";
import Step2Pic from "../../public/pro100/step-2.png";
import Step3Pic from "../../public/pro100/step-3.png";
import Step4Pic from "../../public/pro100/step-4.png";

import Feature1Pic from "../../public/pro100/feature-1.png";
import Feature2Pic from "../../public/pro100/feature-2.png";
import Feature3Pic from "../../public/pro100/feature-3.png";
import Feature4Pic from "../../public/pro100/feature-4.png";

type ModalStep = "order" | "payment" | "success";

const ElevatedButton = ({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        "relative flex items-center justify-start border border-primary px-14 py-6 rounded-[30px] bg-geni-pink text-white cursor-pointer shadow-[2px_3px_0px_#9C44DA,2px_3px_0px_1px_#2D262D] transition duration-150 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const features = [
  {
    src: Feature1Pic,
    title: "Geni Платформоор дамжуулан 100% онлайнаар гэрээсээ ажилладаг",
  },
  {
    src: Feature2Pic,
    title: "Хүссэн үедээ Брэндүүдтэй контент бүтээж хамтардаг",
  },
  {
    src: Feature3Pic,
    title: "Үнэгүй бүтээгдэхүүн хүргүүлэн авдаг",
  },
  {
    src: Feature4Pic,
    title: "Хамтрал бүрээсээ мөнгөн урамшуулал авдаг",
  },
];

const steps = [
  {
    src: Step1Pic,
    title: "Geni Сурагч болж контент бүтээгчийн чадварт суралцаад",
  },
  {
    src: Step2Pic,
    title: "Даалгавар илгээн тэнцэж албан ёсны контент бүтээгч болоод",
  },
  {
    src: Step3Pic,
    title: "Брэндүүдтэй хамтран ажиллаж 1000 XP оноо цуглуулаад",
  },
  { src: Step4Pic, title: "Энхий 100 ПРО контент бүтээгчийн нэг болоорой" },
];

const Step = ({
  isLast,
  src,
  title,
}: {
  isLast: boolean;
  src: StaticImageData;
  title: string;
}) => {
  return (
    <div className="flex md:flex-col gap-6 md:gap-0 items-center text-center relative">
      <div className="size-6 rounded-full bg-geni-pink mt-[7px] mb-3 md:hidden">
        <div
          className={clsx(
            "bg-geni-pink absolute w-0.5 top-1/2 left-2.5 right-0",
            isLast ? "h-[0px]" : "h-[calc(100%+5.5rem)]"
          )}
        />
      </div>
      <div className="flex-1 flex flex-col items-center relative">
        <div className="flex-1 flex justify-center mb-4 md:mb-0">
          <Image
            src={src}
            alt="Feature"
            priority
            height={0}
            width={0}
            sizes="100vw"
            className="h-full w-full min-w-32 min-h-36 max-w-52 max-h-36 object-contain lg:object-cover"
          />
        </div>
        <div className="size-6 rounded-full bg-geni-pink mt-[7px] mb-3 hidden md:block relative">
          <div
            className={clsx(
              "bg-geni-pink absolute h-0.5 top-1/2 left-0 right-0",
              isLast ? "w-0" : "md:w-48 lg:w-[260px]"
            )}
          />
        </div>
        <p className="flex-1 text-lg md:text-sm md:w-3/4">{title}</p>
      </div>
    </div>
  );
};

const Feature = ({ src, title }: { src: StaticImageData; title: string }) => {
  return (
    <div className="flex flex-col text-center items-center">
      <div className="flex-1 flex justify-center mb-4">
        <Image
          src={src}
          alt="Feature"
          priority
          height={0}
          width={0}
          sizes="100vw"
          className="h-full w-full min-w-32 min-h-36 max-w-52 max-h-36 object-contain lg:object-cover"
        />
      </div>
      <p className="flex-1 text-lg md:text-sm w-4/5 md:w-full">{title}</p>
    </div>
  );
};

interface OrderModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function OrderModal({ open, onOpenChange }: OrderModalProps) {
  const [currentStep, setCurrentStep] = useState<ModalStep>("order");
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [qpayImage, setQpayImage] = useState("");
  const [callBackUrl, setCallBackUrl] = useState("");
  const [qpayUrls, setQpayUrls] = useState([]);
  const [txId, setTxId] = useState<string | null>(null);
  const paymentMonitorRef = useRef(null);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Та зөвхөн кирилл үсгээр бичнэ үү";
    } else if (!/^[\u0400-\u04FF-]+$/.test(formData.name)) {
      newErrors.name = "Та зөвхөн кирилл үсгээр бичнэ үү";
    }

    if (!formData.surname.trim()) {
      newErrors.surname = "Та зөвхөн кирилл үсгээр бичнэ үү";
    } else if (!/^[\u0400-\u04FF-]+$/.test(formData.surname)) {
      newErrors.surname = "Та зөвхөн кирилл үсгээр бичнэ үү";
    }
    if (!formData.surname.trim())
      newErrors.surname = "Та зөвхөн кирилл үсгээр бичнэ үү";

    if (!formData.email.trim()) {
      newErrors.email = "Имэйл хаяг оруулна уу";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Имэйл хаяг буруу байна";
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Утасны дугаараа оруулна уу";
    } else if (!/^\+?[0-9\s-()]{8,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "8 оронтой тоо оруулна уу";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AWS_URL}api/web/public/student/apply`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: formData.email,
              FirstName: formData.name,
              LastName: formData.surname,
              PhoneNumber: formData.phoneNumber,
            }),
          }
        );

        if (!response.ok) {
          const data = await response.json();
          toast.error(data.error);
          throw new Error("Failed to submit application");
        }

        // If successful, move to payment step
        const data = await response.json();
        setQpayImage(data.QrImage ?? "");
        setCallBackUrl(data.CallBackUrl ?? "");
        setQpayUrls(data.Urls ?? []);

        // Extract transaction ID if available
        if (data.UserTxnId) {
          setTxId(data.UserTxnId);

          // Start payment status monitoring via SSE
          paymentMonitorRef.current = createPaymentStatusMonitor(
            data.UserTxnId,
            () => {
              // On payment success
              setCurrentStep("success");
              toast.success("Төлбөр амжилттай төлөгдлөө");
            },
            (error) => {
              // On error
              console.error("Payment monitoring error:", error);
              toast.error("Төлбөр шалгахад алдаа гарлаа");
            }
          );
        }

        setCurrentStep("payment");
      } catch (error) {
        console.error("Failed to submit application:", error);
      }
    }
  };

  const checkPaymentStatus = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(callBackUrl);
      const data = await response.json();
      setIsLoading(false);
      if (data.IsPaid) {
        setCurrentStep("success");
      } else {
        toast.error("Төлбөр төлөгдөөгүй байна.");
      }
    } catch (error) {
      console.error("Payment status check failed:", error);
      toast.error("Төлбөр шалгахад алдаа гарлаа. Дахин оролдоно уу.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
    });
    setErrors({});
    setCurrentStep("order");
  };

  // Cleanup payment monitor when dialog closes or step changes
  useEffect(() => {
    if (currentStep !== "payment") {
      closePaymentMonitor(paymentMonitorRef.current);
    }

    return () => {
      closePaymentMonitor(paymentMonitorRef.current);
    };
  }, [currentStep]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Close payment monitor and reset form when dialog is closed
      closePaymentMonitor(paymentMonitorRef.current);
      setTimeout(() => {
        resetForm();
      }, 300); // Wait for dialog close animation
    }
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={clsx(
          "sm:max-w-3xl bg-white !rounded-[30px] md:pt-10 md:px-16",
          currentStep === "payment" && "px-14 sm:max-w-lg",
          currentStep === "success" && "px-10 sm:max-w-md"
        )}
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        {currentStep === "order" && (
          <>
            <DialogHeader>
              <DialogTitle className="text-4xl font-bold">
                УРЬДЧИЛСАН ЗАХИАЛГА ХИЙХ
              </DialogTitle>
              <DialogDescription className="sr-only">
                Please provide your details to proceed with the order.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-0.5">
                  <Label htmlFor="surname" className="text-lg">
                    Овог
                  </Label>
                  <Input
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleInputChange}
                    className={errors.surname ? "border-red-700" : ""}
                  />
                  {errors.surname && (
                    <p className="text-red-700 text-sm">{errors.surname}</p>
                  )}
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="name" className="text-lg">
                    Нэр
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-700" : ""}
                  />
                  {errors.name && (
                    <p className="text-red-700 text-sm">{errors.name}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-0.5">
                  <Label htmlFor="email" className="text-lg">
                    Имэйл хаяг
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-700" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-700 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="phoneNumber" className="text-lg">
                    Утасны дугаар
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className={errors.phoneNumber ? "border-red-700" : ""}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-700 text-sm">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>
              <DialogFooter className="!mt-12">
                <ElevatedButton
                  type="submit"
                  className="flex-1 flex justify-center py-5"
                >
                  <p className="text-xl font-bold">Төлбөр төлөх ✨</p>
                </ElevatedButton>
              </DialogFooter>
            </form>
          </>
        )}

        {currentStep === "payment" && (
          <>
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl font-bold">
                QPay Payment
              </DialogTitle>
              <DialogDescription className="sr-only">
                Please provide your details to proceed with the order.
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="apps" className="items-center">
              <TabsList className="w-full mb-3 gap-1 bg-transparent">
                <TabsTrigger
                  value="qr"
                  className="data-[state=active]:bg-geni-blue data-[state=active]:text-white rounded-full data-[state=active]:shadow-none"
                >
                  QR
                </TabsTrigger>
                <TabsTrigger
                  value="apps"
                  className="data-[state=active]:bg-geni-blue data-[state=active]:text-white rounded-full data-[state=active]:shadow-none"
                >
                  Аппликейшн
                </TabsTrigger>
              </TabsList>
              <TabsContent value="qr">
                <div className="max-w-sm">
                  <AspectRatio ratio={1}>
                    <Image
                      src={`data:image/png;base64,${qpayImage}`}
                      alt="QPay"
                      height={0}
                      width={0}
                      sizes="100vw"
                      className="w-full h-full object-contain select-none"
                    />
                  </AspectRatio>
                </div>
              </TabsContent>
              <TabsContent value="apps">
                <div className="grid grid-cols-4 gap-2 gap-y-4">
                  {qpayUrls.map((url) => {
                    const bankName =
                      url.name === "Trade and Development bank"
                        ? "TDB"
                        : url.name === "National investment bank"
                        ? "NIBank"
                        : url.name === "Chinggis khaan bank"
                        ? "Chinggis khaan"
                        : url.name;

                    return (
                      <Link
                        className="col-span-1 flex flex-col items-center justify-start gap-1 text-center text-xs"
                        href={url.link}
                      >
                        <div className="size-10">
                          <Image
                            src={url.logo}
                            alt={url.description}
                            height={0}
                            width={0}
                            sizes="100vw"
                            className="w-full h-full object-contain select-none"
                          />
                        </div>
                        {bankName}
                      </Link>
                    );
                  })}
                </div>
              </TabsContent>
            </Tabs>

            <DialogFooter className="flex-1 justify-center sm:justify-center my-6">
              <ElevatedButton
                onClick={checkPaymentStatus}
                disabled={isLoading}
                className="flex-1 py-5 justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Төлбөр шалгаж байна...
                  </>
                ) : (
                  <p className="text-xl font-bold">Төлбөр шалгах ✨</p>
                )}
              </ElevatedButton>
            </DialogFooter>
          </>
        )}

        {currentStep === "success" && (
          <>
            <DialogHeader className="mt-8">
              <DialogTitle className="text-4xl md:text-5xl font-black text-geni-green text-center">
                АМЖИЛТТАЙ ТӨЛӨГДЛӨӨ
              </DialogTitle>
              <DialogDescription className="sr-only">
                Your order has been processed successfully.
              </DialogDescription>
            </DialogHeader>
            <div className="text-center py-8">
              <div className="mx-auto size-48 flex items-center justify-center mb-4">
                <Image
                  src="/pro100/check.png"
                  alt="Check"
                  priority
                  height={0}
                  width={0}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-base text-center">
                Та Geni сурагчийн хөтөлбөрийг 80% хөнгөлөлттэй авах эхний 1000
                хүний нэг боллоо.
                <br />
                <br />4 сарын 5-ны өдөр Geni platform-н шинэчлэгдсэн хувилбар
                ашиглалтад орсноор таны сурагчийн хаяг нээгдэж бүртгүүлсэн{""}
                <br />
                <Link
                  href={`mailto:${formData.email}`}
                  className="text-geni-blue underline"
                >
                  {formData.email}
                </Link>
                <br />
                мэйл хаягт мэдэгдэл очих болно.
                <br />
                <br />
                Таньд амжилт хүсье!
              </p>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

const Pro100: React.FC = () => {
  const [preOrderData, setPreOrderData] = useState<{
    Applied: number;
    BasePrice: string;
    CalculatedPrice: string;
    DiscountPerc: string;
    ExpiresAt: string;
    Limit: number;
    PicFileUrl: string;
  }>(null);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchPreOrderStatus = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_AWS_URL}api/web/public/pre-order/active`
        );
        const data = await response.json();

        if (data.ExpiresAt) {
          const expiresAt = new Date(data.ExpiresAt);
          const now = new Date();
          const diffMs = expiresAt.getTime() - now.getTime();

          const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
          const diffHours = Math.floor(
            (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const diffMinutes = Math.floor(
            (diffMs % (1000 * 60 * 60)) / (1000 * 60)
          );

          setDays(diffDays);
          setHours(diffHours);
          setMinutes(diffMinutes);
        }

        setPreOrderData(data);
      } catch (error) {
        console.error("Failed to fetch pre-order status:", error);
      }
    };

    fetchPreOrderStatus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (minutes > 0) {
        setMinutes(minutes - 1);
      } else {
        setMinutes(59);
        if (hours > 0) {
          setHours(hours - 1);
        } else {
          setHours(23);
          if (days > 0) {
            setDays(days - 1);
          } else {
            clearInterval(timer);
          }
        }
      }
    }, 60000);

    return () => clearInterval(timer);
  }, [days, hours, minutes]);

  return (
    <>
      <div className="max-w-6xl mx-auto pt-14 px-4">
        <div className="flex flex-col items-center">
          {/* Left Side - Logo */}
          <div className="flex flex-col md:flex-row items-center justify-between md:px-10 py-4">
            {/* Logo Section */}
            <div className="relative md:flex-1 h-[266px] w-screen md:h-full md:w-full">
              {/* w-[366px] h-[266px] */}
              <Image
                src="/pro100/1.png"
                alt="pro-100"
                priority
                height={0}
                width={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                className="px-6 md:px-11 object-contain max-h-full"
              />
            </div>

            {/* Separator Line */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-40 bg-gray-200 mx-8"
            />
            {/* Countdown Section */}
            <div className="flex-1 hidden md:flex">
              <div className="flex flex-col items-center md:ml-8">
                <h2 className="text-xl font-bold mb-6">
                  Урьдчилсан захиалга дуусахад
                </h2>
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-geni-blue">
                        <SlidingNumber value={days} padStart={true} />
                      </span>
                    </div>
                    <span className="text-gray-500">Өдөр</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-geni-blue">
                        <SlidingNumber value={hours} padStart={true} />
                      </span>
                    </div>
                    <span className="text-gray-500">Цаг</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-geni-blue">
                        <SlidingNumber value={minutes} padStart={true} />
                      </span>
                    </div>
                    <span className="text-gray-500">Минут</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pre-order Info */}
          <div className="flex-1 max-w-2xl text-center flex flex-col items-center px-2 md:px-0">
            <div className="w-full mb-4">
              <div className="flex justify-center mb-2">
                <div className="text-base font-bold md:text-2xl md:font-medium flex">
                  <SlidingNumber value={preOrderData?.Applied ?? 0} />
                  /
                  <SlidingNumber value={preOrderData?.Limit ?? 0} />
                </div>
              </div>
              <Progress
                value={(preOrderData?.Applied * 100) / preOrderData?.Limit}
                className="h-6 border border-primary"
              />
            </div>

            <p className="text-lg mb-4">
              Geni Platform дээр ПРО 100 контент бүтээгчийн нэг болох Geni
              сурагчийн хөтөлбөр зөвхөн эхний Урьдчилсан захиалга хийсэн 1000
              хүнд 80% хөнгөлөлттэй.
            </p>

            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 mb-6">
              <span className="text-3xl font-medium line-through">
                ₮480'000
              </span>
              <span className="text-3xl font-medium text-geni-green">
                ₮96'000
              </span>
            </div>

            {/* Mobile countdown section */}
            <div className="flex-1 flex md:hidden">
              <div className="flex flex-col items-center md:ml-8">
                <h2 className="text-xl font-bold mb-6">
                  Урьдчилсан захиалга дуусахад
                </h2>
                <div className="flex justify-between gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-geni-blue">
                        <SlidingNumber value={days} padStart={true} />
                      </span>
                    </div>
                    <span className="text-gray-500">Өдөр</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-geni-blue">
                        <SlidingNumber value={hours} padStart={true} />
                      </span>
                    </div>
                    <span className="text-gray-500">Цаг</span>
                  </div>

                  <div className="flex flex-col items-center">
                    <div className="w-20 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mb-2">
                      <span className="text-5xl font-bold text-geni-blue">
                        <SlidingNumber value={minutes} padStart={true} />
                      </span>
                    </div>
                    <span className="text-gray-500">Минут</span>
                  </div>
                </div>
              </div>
            </div>
            <ElevatedButton
              className="mt-6 md:mt-0 px-12 sm:px-14"
              onClick={() => setShowModal(true)}
            >
              <p className="text-xl font-bold">Урьдчилсан захиалга хийх</p>
            </ElevatedButton>
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-16 mb-6 border border-primary rounded-xl p-6 px-5 mx-3 sm:mx-10 md:mx-16 pb-8 bg-primary-bg">
          <h2 className="text-xl font-semibold mb-8 w-2/3">
            Geni ПРО Бүтээгч гэж хэн бэ?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Feature key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        {/* Benefits Section */}
        <section className="mb-16 border border-primary rounded-xl p-6 px-5 mx-3 sm:mx-10 md:mx-16 pb-8 bg-primary-bg">
          <h2 className="text-xl font-semibold mb-8 w-2/3">
            Хэрхэн Geni ПРО Бүтээгч болох вэ?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-24 md:gap-6 px-5 md:px-0 relative z-10">
            {steps.map((step, index) => (
              <Step
                key={step.title}
                {...step}
                isLast={steps.length - 1 === index}
              />
            ))}
          </div>
        </section>
      </div>
      <OrderModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
};

export default Pro100;
