import Image from "next/image";
import {
  Content,
  CurrentStepStatus,
  GetContentProcessResponse,
  getCurrentStepColor,
} from "../content.services";
import Stepper from "@/components/Stepper";
import Cookies from "js-cookie";
import { SetStateAction, Dispatch } from "react";

type ProgressStepperProps = {
  content: Content;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  contentProcess: GetContentProcessResponse;
  overdueProcess?: any;
  getContentProcess?: (params) => void;
  isLoadingContentProcess?: boolean;
};

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  content,
  activeStep,
  setActiveStep,
  contentProcess,
  overdueProcess,
  getContentProcess,
  isLoadingContentProcess,
}) => {
  const userType = Cookies.get("userType");

  const steps = [
    <Image
      src={"/content-status-icon1.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon2.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon3.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon4.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
    <Image
      src={"/content-status-icon7.png"}
      width={24}
      height={24}
      alt=""
      className="w-5 h-5 brightness-0 invert"
    />,
  ];

  return (
    <div className="flex flex-col gap-6 h-fit w-full">
      <div className="flex flex-row items-center gap-4 w-full h-full bg-[#F5F4F0] rounded-2xl p-4">
        <div className="basis-1/3 lg:flex-none">
          <Image
            src={content.ProductPics?.length > 0 ? content.ProductPics[0].Url : "/no-product-image.png"}
            alt=""
            width={150}
            height={150}
            className="rounded-2xl aspect-square object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 basis-2/3 lg:grow">
          <div className="flex flex-row gap-2 items-center justify-start">
            <Image
              src={
                (userType === "brand"
                  ? (content.CreatorProfilePic || '/dummy-creator.png')
                  : (content.BrandProfileLink || "/dummy-brand.png"))
              }
              alt=""
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="text-xl font-bold">{content.Nickname}</p>
          </div>
          <p className="text-lg">{content.ProductName}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full border-[1px] border-[#E6E6E6] rounded-xl p-5 lg:p-10">
        <Stepper
          steps={steps}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          currentStepStatus={
            getCurrentStepColor(
              content.CurrentStepName?.String
            ) as CurrentStepStatus
          }
          horizontal={true}
          getContentProcess={getContentProcess}
          content={content}
          isLoadingContentProcess={isLoadingContentProcess}
        />
        <div className="flex flex-row gap-8 w-full">
          <div className="flex-none mx-5 lg:mx-24">
            <Stepper
              steps={contentProcess?.map((_, index) => (
                <div key={index} />
              ))}
              contentProcess={contentProcess}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              currentStepStatus={
                getCurrentStepColor(
                  content.CurrentStepName?.String
                ) as CurrentStepStatus
              }
              horizontal={false}
              hasBg={false}
              content={content}
              overdueProcess={overdueProcess}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
