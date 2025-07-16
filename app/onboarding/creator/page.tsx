"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function CreatorOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const steps = [
    "Хувийн мэдээлэл",
    "Контент мэдээлэл",
    "Нэмэлт мэдээлэл",
    "Хамтын ажиллагаа",
  ];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-7 py-11 container">
        <div className="flex flex-col gap-8">
          {/* Header with Progress */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image src="/logo.svg" width={89} height={32} alt="logo" />
                <div className="flex items-center gap-2">
                  <Image src="/logo.svg" width={51} height={18} alt="logo" />
                  <span className="text-xs font-medium px-2 py-1 bg-[#F9EBFF] text-[#CA7FFE] rounded-full">
                    CREATOR
                  </span>
                </div>
              </div>
              <Link href="/onboarding" className="text-sm text-gray-500">
                Буцах
              </Link>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center gap-2">
              {steps.map((stepName, index) => (
                <div key={index} className="flex-1">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                        ${
                          step > index + 1
                            ? "bg-[#CA7FFE] text-white"
                            : step === index + 1
                            ? "bg-[#CA7FFE] text-white"
                            : "bg-[#F5F5F5] text-gray-400"
                        }`}
                    >
                      {step > index + 1 ? "✓" : index + 1}
                    </div>
                    <span
                      className={`text-sm ${
                        step === index + 1
                          ? "text-[#CA7FFE] font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-[2px] mt-2 ${
                        index < step - 1 ? "bg-[#CA7FFE]" : "bg-[#F5F5F5]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Хувийн мэдээлэл</h2>
                <p className="text-sm text-gray-500">
                  Өөрийн мэдээллээ оруулна уу
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  label="Овог"
                  placeholder="Овог"
                  layoutClassName="rounded-full"
                />
                <Input
                  label="Нэр"
                  placeholder="Нэр"
                  layoutClassName="rounded-full"
                />
                <Input
                  label="Утасны дугаар"
                  placeholder="Утасны дугаар"
                  layoutClassName="rounded-full"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9C44DA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Үргэлжлүүлэх →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Content Info */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Контент мэдээлэл</h2>
                <p className="text-sm text-gray-500">
                  Контент бүтээгчийн мэдээлэл
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 bg-[#F9EBFF] rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-[#CA7FFE] rounded-full flex items-center justify-center">
                      <Image
                        src="/creator-character.svg"
                        width={64}
                        height={64}
                        alt="creator"
                      />
                    </div>
                  </div>
                  <button className="text-[#CA7FFE] font-medium">
                    Зураг оруулах
                  </button>
                </div>
                <p className="text-sm text-center text-gray-500">
                  Профайл зураг оруулна уу (0/100)
                </p>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-500 font-medium"
                >
                  ← Буцах
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9C44DA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Үргэлжлүүлэх →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Additional Info */}
          {step === 3 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Нэмэлт мэдээлэл</h2>
                <p className="text-sm text-gray-500">
                  Та өөрийн сошиал хаягуудаа оруулна уу
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  placeholder="Facebook хаяг"
                  layoutClassName="rounded-full"
                />
                <Input
                  placeholder="Instagram хаяг"
                  layoutClassName="rounded-full"
                />
                <Input
                  placeholder="Youtube суваг"
                  layoutClassName="rounded-full"
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-500 font-medium"
                >
                  ← Буцах
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9C44DA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Үргэлжлүүлэх →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Collaboration */}
          {step === 4 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Хамтын ажиллагаа</h2>
                <p className="text-sm text-gray-500">
                  Та хамтын ажиллагааны нөхцөлийг зөвшөөрч байна уу?
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="p-4 bg-[#F9EBFF] rounded-xl">
                  <p className="text-sm text-[#CA7FFE]">
                    Хамтын ажиллагааны нөхцөл нь таны болон бидний хоорондын
                    харилцааг зохицуулах баримт бичиг юм. Энэхүү нөхцөлийг
                    хүлээн зөвшөөрснөөр та манай платформын бүрэн эрхт гишүүн
                    болох юм.
                  </p>
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 text-[#CA7FFE] border-2 border-gray-300 rounded focus:ring-[#CA7FFE]"
                  />
                  <span className="text-sm">
                    Би хамтын ажиллагааны нөхцөлийг хүлээн зөвшөөрч байна
                  </span>
                </label>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(3)}
                  className="text-gray-500 font-medium"
                >
                  ← Буцах
                </button>
                <button
                  onClick={() => {
                    /* Handle completion */
                  }}
                  className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9C44DA] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Бүртгүүлэх
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
