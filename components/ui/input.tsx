import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorText } from "./error-text";
import InfoHover from "../common/InfoHover";
import FadeInAnimation from "../common/FadeInAnimation";

interface InputProps extends React.ComponentProps<"input"> {
  errorText?: React.ReactNode;
  errorVisible?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  label?: React.ReactNode;
  hoverInfo?: string;
  labelClassName?: string;
  layoutClassName?: string;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      wrapperClassName,
      className,
      layoutClassName,
      hoverInfo,
      leftSection,
      rightSection,
      label,
      labelClassName,
      type,
      errorText,
      errorVisible,
      ...props
    },
    ref
  ) => {
    const labelComponent =
      typeof label === "string" ? (
        <label className={cn("font-bold", labelClassName)} htmlFor={props.name}>
          {label}
        </label>
      ) : (
        label
      );
    return (
      <div className={cn("flex flex-col gap-3", wrapperClassName)} ref={ref}>
        <div className="flex justify-between">
          {labelComponent}
          {hoverInfo && <InfoHover contentText={hoverInfo} />}
        </div>

        <div className="flex flex-col gap-1 sm:gap-2">
          <div
            className={cn(
              "bg-white flex gap-1 items-center p-2 border-[1px] border-[#CDCDCD] rounded-lg h-12",
              layoutClassName
            )}
          >
            {leftSection && leftSection}
            <input
              type={type}
              className={cn("size-full outline-none", className)}
              ref={ref}
              {...props}
            />
            {rightSection && rightSection}
          </div>
          {errorVisible && (
            <FadeInAnimation visible={errorVisible}>
              <ErrorText text={errorText} visible={errorVisible} />
            </FadeInAnimation>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
