"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function BrandOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    "Байгууллагын мэдээлэл",
    "Брэндийн мэдээлэл",
    "Нэмэлт мэдээлэл",
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
                  <span className="text-xs font-medium px-2 py-1 bg-[#EBEEFF] text-[#4D55F5] rounded-full">
                    BRAND
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
                            ? "bg-[#4D55F5] text-white"
                            : step === index + 1
                            ? "bg-[#4D55F5] text-white"
                            : "bg-[#F5F5F5] text-gray-400"
                        }`}
                    >
                      {step > index + 1 ? "✓" : index + 1}
                    </div>
                    <span
                      className={`text-sm ${
                        step === index + 1
                          ? "text-[#4D55F5] font-medium"
                          : "text-gray-400"
                      }`}
                    >
                      {stepName}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`h-[2px] mt-2 ${
                        index < step - 1 ? "bg-[#4D55F5]" : "bg-[#F5F5F5]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Organization Info */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Байгууллагын мэдээлэл</h2>
                <p className="text-sm text-gray-500">
                  Байгууллагын үндсэн мэдээллийг оруулна уу
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <Input
                  label="Регистерийн дугаар"
                  placeholder="Регистерийн дугаар"
                  layoutClassName="rounded-full"
                />
                <Input
                  label="Байгууллагын нэр"
                  placeholder="Байгууллагын нэр"
                  layoutClassName="rounded-full"
                />
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="font-bold">Хуулт илгээж буй хүний мэдээлэл</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    label="Албан тушаал"
                    placeholder="Албан тушаал"
                    layoutClassName="rounded-full"
                  />
                  <Input
                    label="Утасны дугаар"
                    placeholder="Утасны дугаар"
                    layoutClassName="rounded-full"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                >
                  Үргэлжлүүлэх →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Brand Info */}
          {step === 2 && (
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">Брэндийн мэдээлэл</h2>
                <p className="text-sm text-gray-500">
                  Брэндийн дэлгэрэнгүй мэдээлэл
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-32 h-32 bg-[#EBEEFF] rounded-full flex items-center justify-center">
                    <Image src="/logo.svg" width={64} height={64} alt="logo" />
                  </div>
                  <button className="text-[#4D55F5] font-medium">
                    Лого оруулах
                  </button>
                </div>
                <p className="text-sm text-center text-gray-500">
                  Брэндийн лого оруулна уу (0/100)
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
                  className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
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
                  Маркетинг сурталчилгааг хэрхэн хийх вэ?
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    Өөрийн гэсэн бүтээгдэхүүн байгаа юу?
                  </h3>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasProduct"
                        className="w-5 h-5 text-[#4D55F5] border-2 border-gray-300 focus:ring-[#4D55F5]"
                      />
                      <span>Тийм</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="hasProduct"
                        className="w-5 h-5 text-[#4D55F5] border-2 border-gray-300 focus:ring-[#4D55F5]"
                      />
                      <span>Үгүй</span>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-medium">Бүтээгдэхүүний төрөл</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Бүтээгдэхүүний нэр"
                      layoutClassName="rounded-full"
                    />
                    <Input
                      placeholder="Бүтээгдэхүүний төрөл"
                      layoutClassName="rounded-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-medium">
                    Маркетинг сурталчилгааны төсөв
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="Төсөв" layoutClassName="rounded-full" />
                    <Input
                      placeholder="Төсөв (₮)"
                      layoutClassName="rounded-full"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="text-gray-500 font-medium"
                >
                  ← Буцах
                </button>
                <button
                  onClick={() => {
                    /* Handle completion */
                  }}
                  className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
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
