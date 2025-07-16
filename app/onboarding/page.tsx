"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Page() {
  const router = useRouter();

  const handleUserType = (type: string) => {
    Cookies.set("userType", type, { expires: 1 / 24 });
    router.push("/register");
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-7 py-11 container">
        <div className="flex flex-col items-start gap-4">
          <Image src="/logo.svg" width={89} height={32} alt="logo" />
          <p className="text-sm">Сайн уу, dalmawork@gmail.com</p>
          <h1 className="text-2xl font-bold">
            Платформд нэгдэх төрлөө сонгоно уу
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-4">
            {/* Student Card */}
            <div className="bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4">
              <div className="relative aspect-square w-full bg-[#E8FFE9] rounded-2xl flex items-center justify-center">
                <Image
                  src="/student-character.svg"
                  width={120}
                  height={120}
                  alt="student"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#E8FFE9] text-[#4FB755] rounded-full">
                    STUDENT
                  </span>
                </div>
                <p className="text-sm">
                  Контент бүтээх чадвар өөрийн гэсэн үзэгч хүрээтэй байх
                  шаардлагагүй, Geni Student-ээр бүртгүүлнэ үү
                </p>
                <button
                  onClick={() => handleUserType("Student")}
                  className="w-full bg-[#4FB755] text-white font-bold py-4 px-6 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A8F44] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Сурагч болох →
                </button>
              </div>
            </div>

            {/* Creator Card */}
            <div className="bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4">
              <div className="relative aspect-square w-full bg-[#F9EBFF] rounded-2xl flex items-center justify-center">
                <Image
                  src="/creator-character.svg"
                  width={120}
                  height={120}
                  alt="creator"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#F9EBFF] text-[#CA7FFE] rounded-full">
                    CREATOR
                  </span>
                </div>
                <p className="text-sm">
                  Чадварлаг хэрнээ цахим орчинд өөрийн гэсэн үзэгч хүрээтэй байх
                  creator болж хамтран бүтээх эрмэлзэлтэй бол бүртгүүлнэ үү
                </p>
                <button
                  onClick={() => handleUserType("Creator")}
                  className="w-full bg-[#CA7FFE] text-white font-bold py-4 px-6 rounded-full border border-black shadow-[4px_4px_0px_0px_#9C44DA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Бүтээгч болох →
                </button>
              </div>
            </div>

            {/* Brand Card */}
            <div className="bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4">
              <div className="relative aspect-square w-full bg-[#EBEEFF] rounded-2xl flex items-center justify-center">
                <Image
                  src="/brand-character.svg"
                  width={120}
                  height={120}
                  alt="brand"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#EBEEFF] text-[#4D55F5] rounded-full">
                    BRAND
                  </span>
                </div>
                <p className="text-sm">
                  Бүтээгдэхүүнээ өргөжүүлэх зорилготой байгаа аж ахуйн нэгж, үр
                  дүнтэй маркетинг хийх эрхэм
                </p>
                <button
                  onClick={() => handleUserType("Brand")}
                  className="w-full bg-[#4D55F5] text-white font-bold py-4 px-6 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Брэнд болох →
                </button>
              </div>
            </div>

            {/* Coming Soon Card */}
            <div className="bg-white border border-[#CDCDCD] rounded-[30px] p-6 flex flex-col gap-4">
              <div className="relative aspect-square w-full bg-[#FFF6F6] rounded-2xl flex items-center justify-center">
                <Image
                  src="/coming-soon-character.svg"
                  width={120}
                  height={120}
                  alt="coming soon"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#FFF6F6] text-[#FF6B6B] rounded-full">
                    COMING SOON
                  </span>
                </div>
                <div className="h-[72px]" />
                <button
                  disabled
                  className="w-full bg-[#FFF6F6] text-[#FF6B6B] font-bold py-4 px-6 rounded-full border border-[#CDCDCD] cursor-not-allowed"
                >
                  Удахгүй
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
