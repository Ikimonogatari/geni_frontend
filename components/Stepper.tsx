"use client";

import { Dispatch, SetStateAction } from "react";
import { CheckCircle, Circle } from "lucide-react";

export type CurrentStepStatus = "yellow" | "green" | "red";

type StepperProps = {
  steps: React.ReactNode[];
  labels?: {
    title: string;
    subtitle?: string;
    date?: string;
  }[];
  activeStep: number;
  setActiveStep?: Dispatch<SetStateAction<number>>;
  hasNavigation?: boolean;
  currentStepStatus?: CurrentStepStatus;
  horizontal?: boolean;
  hasBg?: boolean;
};

const Stepper: React.FC<StepperProps> = (props) => {
  const {
    steps,
    labels,
    activeStep,
    setActiveStep,
    hasNavigation = false,
    currentStepStatus = "yellow",
    horizontal = true,
    hasBg = true,
  } = props;

  const getStepColor = (index: number) => {
    if (index < activeStep) {
      return "bg-green-500";
    }

    if (index === activeStep) {
      switch (currentStepStatus) {
        case "yellow":
          return "bg-[#F49D19]";
        case "green":
          return "bg-green-500";
        case "red":
          return "bg-red-500";
        default:
          return "bg-yellow-500";
      }
    }

    return "bg-gray-300";
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
        {steps.map((step, index) => (
          <div key={index} className="flex items-start gap-6">
            <div className="flex flex-col items-center">
              <div
                className={`relative flex items-center justify-center w-4 h-4 rounded-full ${getStepColor(
                  index
                )}`}
              >
                {step}
              </div>
              {index !== steps.length - 1 && (
                <div className={`w-[2px] h-10 ${getLineColor(index)}`} />
              )}
            </div>

            {labels && (
              <div className="flex flex-col gap-1 -mt-1">
                <span className="text-[#F49D19] font-medium text-base">
                  {labels[index].title}
                </span>
                {(labels[index].subtitle || labels[index].date) && (
                  <div className="flex flex-col text-sm text-gray-600">
                    {labels[index].subtitle && (
                      <span>{labels[index].subtitle}</span>
                    )}
                    {labels[index].date && <span>{labels[index].date}</span>}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
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
