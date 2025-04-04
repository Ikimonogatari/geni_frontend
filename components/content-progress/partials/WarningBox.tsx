type WarningBoxProps = {
  title: string;
  children?: React.ReactNode;
};

const WarningBox: React.FC<WarningBoxProps> = ({ children, title }) => {
  return (
    <div className="w-full flex flex-col gap-2 border-[2px] border-[#F49D19] rounded-xl p-5 mt-2">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm bg-[#F5F4F0] rounded-lg p-4">{children}</p>
    </div>
  );
};

export default WarningBox;
