import * as React from "react";
import { cn } from "@/lib/utils";
import { FormikErrors } from "formik";

interface ErrorTextProps extends React.ComponentProps<"div"> {
  visible: boolean;
  text?:
    | string
    | React.ReactNode
    | string
    | string[]
    | FormikErrors<any>
    | FormikErrors<any>[];
}

const ErrorText = React.forwardRef<HTMLDivElement, ErrorTextProps>(
  ({ className, text, visible, ...props }, ref) => {
    if (!visible) return null;
    return (
      <div
        className={cn("text-red-500 text-sm", className)}
        ref={ref}
        {...props}
      >
        {React.isValidElement(text) ? text : String(text)}
      </div>
    );
  }
);

ErrorText.displayName = "ErrorText";

export { ErrorText };
