import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Content } from "../content.services";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type PaymentProps = {
  content: Content;
};

const Payment = ({ content }: PaymentProps) => {
  const [qpayImage, setQpayImage] = useState("");
  const [qpayUrls, setQpayUrls] = useState([
    {
      name: "Trade and Development bank",
      link: "https://www.tdb.mn/",
      logo: "/images/tdb.png",
      description: "Trade and Development bank",
    },
  ]);

  return (
    <div className="w-full p-2">
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
    </div>
  );
};

export default Payment;
