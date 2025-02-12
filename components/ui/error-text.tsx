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
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
}

const ErrorText = React.forwardRef<HTMLDivElement, ErrorTextProps>(
  ({ className, text, visible, leftSection, rightSection, ...props }, ref) => {
    if (!visible) return null;
    return (
      <div
        className={cn("text-geni-red text-sm", className)}
        ref={ref}
        {...props}
      >
        {" "}
        {leftSection && leftSection}
        {React.isValidElement(text) ? text : String(text)}
        {rightSection && rightSection}
      </div>
    );
  }
);

ErrorText.displayName = "ErrorText";

export { ErrorText };
