"use client";

import { Dispatch, SetStateAction } from "react";
import {
  Content,
  CurrentStepStatus,
  GetContentProcessResponse,
  getCurrentStepColor,
  STATUS_LIST,
  STATUS_STEPPER_MESSAGES,
} from "./content-progress/content.services";
import moment from "moment";

type StepperProps = {
  steps: React.ReactNode[];
  activeStep: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
  hasNavigation?: boolean;
  currentStepStatus?: CurrentStepStatus;
  horizontal?: boolean;
  hasBg?: boolean;
  contentProcess?: GetContentProcessResponse;
  content?: Content;
  overdueProcess?: any;
};

const Stepper: React.FC<StepperProps> = (props) => {
  const {
    steps,
    contentProcess,
    activeStep,
    setActiveStep,
    hasNavigation = false,
    currentStepStatus = "yellow",
    horizontal = true,
    hasBg = true,
    content,
    overdueProcess,
  } = props;

  const getColor = (colorName: string, isTextColor = false) => {
    switch (colorName) {
      case "yellow":
        return isTextColor ? "text-[#F49D19]" : "bg-[#F49D19]";
      case "green":
        return isTextColor ? "text-green-500" : "bg-green-500";
      case "red":
        return isTextColor ? "text-red-500" : "bg-red-500";
      default:
        return isTextColor ? "text-yellow-500" : "bg-yellow-500";
    }
  };

  const getStepColor = (index: number, isTextColor = false) => {
    if (index < activeStep) {
      return isTextColor ? "text-green-500" : "bg-green-500";
    }

    if (index === activeStep) {
      return getColor(currentStepStatus, isTextColor);
    }

    return isTextColor ? "text-gray-300" : "bg-gray-300";
  };

  const getHorizontalStepColor = (
    index: number,
    length: number,
    statusString: string,
    isTextColor = false
  ) => {
    const colorName = getCurrentStepColor(statusString);
    if (colorName !== "red" && index < length - 1) {
      return isTextColor ? "text-green-500" : "bg-green-500";
    }

    return getColor(colorName, isTextColor);
  };

  const getLineColor = (index: number) => {
    if (index < activeStep) {
      return "bg-green-500";
    }
    return "bg-[#E6E6E6]";
  };

  if (!horizontal) {
    return (
      <div className="flex flex-col items-start w-full text-xs">
        {steps.map((step, index) => {
          const status = contentProcess[index].ContentStepStatusCode
            .String as STATUS_LIST;
          return (
            <div key={index} className="flex items-start gap-6">
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex items-center justify-center w-4 h-4 rounded-full ${getHorizontalStepColor(
                    index,
                    contentProcess?.length || 0,
                    status
                  )}`}
                >
                  {step}
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`w-[2px] h-10 ${getHorizontalStepColor(
                      index,
                      contentProcess?.length || 0,
                      status
                    )}`}
                  />
                )}
              </div>

              {contentProcess && (
                <div className="flex flex-col gap-1 -mt-1">
                  <span
                    className={`${getHorizontalStepColor(
                      index,
                      contentProcess.length,
                      status,
                      true
                    )} font-medium text-base`}
                  >
                    {contentProcess[index].Desc.String}
                  </span>
                  {contentProcess[index].CreatedAt && (
                    <div className="flex flex-col text-sm text-gray-600">
                      <span>
                        {STATUS_STEPPER_MESSAGES?.[status] ? (
                          <>
                            {STATUS_STEPPER_MESSAGES?.[status]}
                            <b>
                              {status == STATUS_LIST.ContentPending &&
                                content?.Deadline &&
                                moment(content.Deadline).format("MM.DD.YYYY")}
                              {status == STATUS_LIST.ContentOverDue &&
                                overdueProcess?.Days}
                            </b>
                          </>
                        ) : (
                          moment(contentProcess[index].CreatedAt).format(
                            "YYYY-MM-DD HH:mm"
                          )
                        )}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full p-6">
      <div className="flex items-center w-full max-w-2xl">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center ${
              index !== steps.length - 1 ? "flex-1" : ""
            }`}
          >
            <div
              className={`relative flex items-center justify-center ${
                hasBg ? "w-10 h-10 rounded-lg" : "w-6 h-6"
              } ${getStepColor(index)} [&>svg]:text-white`}
            >
              {step}
            </div>

            {index !== steps.length - 1 && (
              <div className={`flex-1 h-[2px] ${getLineColor(index)}`} />
            )}
          </div>
        ))}
      </div>

      {hasNavigation && (
        <div className="mt-6 flex gap-4">
          <button
            className="px-4 py-2 border rounded-md bg-gray-200 disabled:opacity-50"
            onClick={() => setActiveStep?.((prev) => Math.max(prev - 1, 0))}
            disabled={activeStep === 0}
          >
            Previous
          </button>
          <button
            className="px-4 py-2 border rounded-md bg-blue-500 text-white disabled:opacity-50"
            onClick={() =>
              setActiveStep?.((prev) => Math.min(prev + 1, steps.length - 1))
            }
            disabled={activeStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Stepper;
