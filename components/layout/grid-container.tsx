import { cn } from "@/lib/utils";

const GridContainer = ({
  className,
  children,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className="col-start-2 col-end-[16]">
      <div className={cn("grid grid-cols-[repeat(14,_1fr)] gap-4", className)}>
        {children}
      </div>
    </div>
  );
};
export default GridContainer;
