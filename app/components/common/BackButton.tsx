import Image from "next/image";
import { useRouter } from "next/navigation";

export interface BackButtonProps {}

const BackButton: React.FC<BackButtonProps> = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
    >
      <Image src={"/arrow-left.png"} width={24} height={24} alt="arrow-left" />
    </button>
  );
};

export default BackButton;
