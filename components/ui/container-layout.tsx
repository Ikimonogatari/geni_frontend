import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerLayoutProps = {
  className?: string;
  children?: ReactNode;
};

const ContainerLayout: React.FC<ContainerLayoutProps> = ({
  className,
  children,
}) => {
  return <div className={cn("py-10 w-full", className)}>{children}</div>;
};

export default ContainerLayout;
