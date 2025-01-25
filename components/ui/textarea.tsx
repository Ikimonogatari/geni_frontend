import * as React from "react";
import { cn } from "@/lib/utils";
import { ErrorText } from "./error-text";
import InfoHover from "../common/InfoHover";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  errorText?: string | React.ReactNode;
  errorVisible?: boolean;
  charCount?: number | string;
  label?: React.ReactNode;
  hoverInfo?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      className,
      label,
      hoverInfo,
      charCount,
      errorText,
      errorVisible,
      ...props
    },
    ref
  ) => {
    const labelComponent =
      typeof label === "string" ? (
        <label className="font-bold" htmlFor={props.name}>
          {label}
        </label>
      ) : (
        label
      );
    return (
      <div className="flex flex-col gap-3">
        <div className="flex flex-1 justify-between">
          {labelComponent}
          {hoverInfo && <InfoHover contentText={hoverInfo} />}
        </div>
        <div className="flex flex-col gap-1">
          <div className="p-2 border border-geni-gray rounded-lg flex flex-col">
            <textarea
              ref={ref}
              className={cn("overflow-y-auto outline-none", className)}
              {...props}
            />
            <div className="text-[#6F6F6F] text-sm border-t-[1px] pt-2 border-[#6F6F6F]">
              {charCount !== undefined && `Тэмдэгтийн тоо: ${charCount}/600`}
            </div>
          </div>
          {errorVisible && (
            <ErrorText text={errorText} visible={errorVisible} />
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
