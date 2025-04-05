type InfoBoxProps = {
  title: string;
  children?: React.ReactNode;
  type?: "warning" | "info";
  list?: boolean;
};

const InfoBox: React.FC<InfoBoxProps> = ({
  children,
  title,
  type = "warning",
  list = false,
}) => {
  return (
    <div
      className={`w-full flex flex-col gap-2 border-[2px] ${
        type === "warning" ? "border-[#F49D19]" : "border-[#CA7FFE]"
      } rounded-xl p-5 mt-2`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className={`text-sm ${!list && "bg-[#F5F4F0]"}rounded-lg p-4`}>
        {children}
      </div>
    </div>
  );
};

export default InfoBox;
