import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorText } from "./error-text";
import InfoHover from "../common/InfoHover";

interface InputProps extends React.ComponentProps<"input"> {
  errorText?: React.ReactNode;
  errorVisible?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  label?: React.ReactNode;
  hoverInfo?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
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
      <div className={cn("flex flex-col gap-3", className)} ref={ref}>
        <div className="flex justify-between">
          {labelComponent}
          {hoverInfo && <InfoHover contentText={hoverInfo} />}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex gap-1 items-center p-2 border border-[#CDCDCD] rounded-lg h-12">
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
            <ErrorText text={errorText} visible={errorVisible} />
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
