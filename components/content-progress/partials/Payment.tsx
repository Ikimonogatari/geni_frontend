import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Content } from "../content.services";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useQpayDeliveryPaymentMutation } from "@/app/services/service";
import { Loader2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type PaymentProps = {
  content: Content;
};

const Payment = ({ content }: PaymentProps) => {
  const router = useRouter();
  const [qpayDeliveryPayment, { isLoading, data }] =
    useQpayDeliveryPaymentMutation();

  useEffect(() => {
    if (content) {
      qpayDeliveryPayment(content.ContentId);
    }
  }, [content]);

  useEffect(() => {
    if (data) {
      console.log("dasta", data);
    }
  }, [data]);

  const paymentCheck = () => {
    console.log("data", data?.CallBackUrl);
    if (data?.CallBackUrl) {
      axios.get(data.CallBackUrl).then((res) => {
        if (res.status === 200) {
          if (res.data.IsPaid) {
            toast.success("Төлбөр төлөгдсөн байна.");
            router.refresh();
          } else {
            toast.error("Төлбөр төлөгдөөгүй байна.");
          }
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );
  }

  return (
    data && (
      <div className="w-full p-4 flex flex-col items-center h-full gap-4">
        <Tabs defaultValue="apps" className="items-center w-full">
          <div className="flex items-center justify-center">
            <TabsList className="mb-3 gap-1 bg-transparent">
              <TabsTrigger
                value="qr"
                className="p-2 data-[state=active]:bg-geni-blue data-[state=active]:text-white rounded-xl data-[state=active]:shadow-none"
              >
                QR
              </TabsTrigger>
              <TabsTrigger
                value="apps"
                className="p-2 data-[state=active]:bg-geni-blue data-[state=active]:text-white rounded-xl data-[state=active]:shadow-none"
              >
                Аппликейшн
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="qr">
            <div className="w-full h-full flex justify-center">
              {/* <AspectRatio ratio={1}> */}
              <Image
                src={`data:image/png;base64,${data.QrImage}`}
                alt="QPay"
                height={220}
                width={220}
                className="w-auto h-full object-contain select-none aspect-square"
              />
              {/* </AspectRatio> */}
            </div>
          </TabsContent>
          <TabsContent value="apps">
            <div className="grid grid-cols-4 gap-2 gap-y-4">
              {data.Urls?.map((url, index) => {
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
                    key={index}
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
        <button
          type="button"
          className="w-full bg-secondary text-white px-4 py-2 rounded-xl"
          onClick={paymentCheck}
        >
          Төлбөр шалгах
        </button>
      </div>
    )
  );
};

export default Payment;
