"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";

function Page() {
  const [userType, setUserType] = useState("creator");

  const formik = useFormik({
    initialValues: {
      name: "",

      files: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <form
            onSubmit={formik.handleSubmit}
            className="mt-11 flex flex-col xl:flex-row items-center gap-16"
          >
            <div className="bg-[#F5F4F0] rounded-2xl px-24 py-32">
              <Image
                src={"/login-image.svg"}
                width={584}
                height={378}
                alt="lgn"
                className="lg:min-w-[584px] lg:min-h-[378px]"
              />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl xl:max-w-sm">
              <span className="text-xl font-bold">Нэвтрэх</span>
              <div className="flex flex-row items-center gap-6">
                <div
                  onClick={() => setUserType("creator")}
                  className={`transition-all duration-150 ${
                    userType === "creator"
                      ? "border-[#CA7FFE]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-8 rounded-lg border-[2px] w-full text-center`}
                >
                  Geni Creator
                </div>
                <div
                  onClick={() => setUserType("brand")}
                  className={`transition-all duration-150 ${
                    userType === "brand"
                      ? "border-[#CA7FFE]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-8 rounded-lg  border-[2px] w-full text-center`}
                >
                  Geni brand
                </div>
              </div>
              <span className="text-lg">И-мэйл</span>
              <input
                type="email"
                placeholder=""
                className="border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4"
              />
              <span className="text-lg">Нууц үг</span>
              <input
                type="text"
                placeholder=""
                className="border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4"
              />
              <button
                className={`ml-[6px] mt-3 relative w-full max-w-[403px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] ${
                  userType === "creator" ? "bg-[#9c44da]" : "bg-[#1920B4]"
                }`}
              >
                <div
                  className={`absolute -top-[8px] -left-[6px] z-50 text-white text-lg font-bold w-full max-w-[403px] h-[90px] rounded-xl border-[1px] border-[#2D262D] ${
                    userType === "creator" ? "bg-[#CA7FFE]" : "bg-[#4D55F5]"
                  } flex flex-row gap-2 items-center justify-center`}
                >
                  <span>Нэвтрэх</span>
                  <Image
                    src={"/arrow-right-icon.png"}
                    alt="arrow"
                    width={16}
                    height={16}
                  />
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
