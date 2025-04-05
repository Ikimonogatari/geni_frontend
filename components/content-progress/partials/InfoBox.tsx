type InfoBoxProps = {
  title: string;
  children?: React.ReactNode;
  type?: "warning" | "info" | "gray";
  list?: boolean;
  className?: string;
  titleClassName?: string;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  children,
  title,
  type = "warning",
  list = false,
  className,
  titleClassName,
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 border-[2px] ${
        type === "warning"
          ? "border-[#F49D19]"
          : type === "info"
          ? "border-[#CA7FFE]"
          : "border-[#E6E6E6]"
      } rounded-xl p-5 mt-2 ${className}`}
    >
      <h3 className={`text-lg font-semibold ${titleClassName}`}>{title}</h3>
      <div className={`text-sm ${!list && "bg-[#F5F4F0]"}rounded-lg p-4`}>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
