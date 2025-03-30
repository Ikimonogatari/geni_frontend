import Image from "next/image";
import { Content, GetContentProcessResponse } from "./content.services";
import { getCurrentStepColor } from "./ContentProgressModal";
import Stepper, { CurrentStepStatus } from "../Stepper";
import { Dispatch, SetStateAction } from "react";
import moment from "moment";

type ProgressStepperProps = {
  content: Content;
  activeStep: number;
  setActiveStep: Dispatch<SetStateAction<number>>;
  steps: React.ReactNode[];
  contentProcess: GetContentProcessResponse;
};

const ProgressStepper: React.FC<ProgressStepperProps> = ({
  content,
  activeStep,
  setActiveStep,
  steps,
  contentProcess,
}) => {
  return (
    <div className="flex flex-col gap-6 h-full w-full">
      <div className="flex flex-row items-center gap-4 w-full h-full sm:min-w-[272px] bg-[#F5F4F0] rounded-2xl p-4 h-[180px]">
        <div className="basis-1/3 lg:flex-none">
          <Image
            src={content.ContentThumbnail || "/no-content-image.png"}
            alt=""
            width={150}
            height={150}
            className="rounded-2xl aspect-square object-cover"
          />
        </div>
        <div className="flex flex-col gap-2 basis-2/3 lg:grow">
          <div className="flex flex-row gap-2 items-center justify-start">
            <Image
              src={"/no-content-image.png"}
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
            getCurrentStepColor(content.Status) as CurrentStepStatus
          }
          horizontal={true}
        />
        <div className="flex flex-row gap-8 w-full">
          <div className="flex-none mx-5 lg:mx-24">
            <Stepper
              steps={contentProcess.map((_, index) => (
                <div key={index} />
              ))}
              labels={contentProcess.map((v) => ({
                title: v.Desc.String,
                // subtitle: "Контент илгээх сүүлийн хугацаа: 12.04.2025",
                date: moment(v.CreatedAt).format("DD.MM.YYYY"),
              }))}
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              currentStepStatus={
                getCurrentStepColor(content.Status) as CurrentStepStatus
              }
              horizontal={false}
              hasBg={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressStepper;
