"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreatorLoginMutation, useLoginMutation } from "../services/service";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();
  const [userType, setUserType] = useState("Creator");
  const [login, { data, error, isLoading }] = useCreatorLoginMutation();

  const formik = useFormik({
    initialValues: {
      UserType: userType,
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),

    onSubmit: (values) => {
      Cookies.remove("auth");
      Cookies.remove("userType");
      Cookies.remove("user-info");
      login(values);
    },
  });

  useEffect(() => {
    if (data) {
      Cookies.set("auth", data.JWT, { expires: 1 });
      Cookies.set("userType", userType, { expires: 1 });
      router.push("/");
    }
    if (error) {
      toast.error(error.data.error);
    }
  }, [data, error]);

  const handleUserType = (value) => {
    setUserType(value);
    formik.setFieldValue("UserType", value);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <form
            onSubmit={formik.handleSubmit}
            className="mt-11 flex flex-col xl:flex-row items-center gap-16"
          >
            <div className="bg-[#F5F4F0] rounded-2xl px-12 py-16 lg:px-24 lg:py-32">
              <Image
                src={"/login-image.svg"}
                width={584}
                height={378}
                alt="login"
                className="w-full h-full lg:min-w-[584px] lg:min-h-[378px]"
              />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl xl:max-w-sm">
              <span className="text-xl font-bold">Нэвтрэх</span>
              <div className="flex flex-row items-center gap-6">
                <div
                  onClick={() => handleUserType("Creator")}
                  className={`transition-all duration-150 ${
                    userType === "Creator"
                      ? "border-[#CA7FFE]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-4 sm:px-8 rounded-lg border-[2px] w-full text-center`}
                >
                  Geni Creator
                </div>
                <div
                  onClick={() => handleUserType("Brand")}
                  className={`transition-all duration-150 ${
                    userType === "Brand"
                      ? "border-[#CA7FFE]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-4 sm:px-8 rounded-lg  border-[2px] w-full text-center`}
                >
                  Geni brand
                </div>
              </div>
              <span className="text-lg">И-мэйл</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder=""
                className="border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
              <span className="text-lg">Нууц үг</span>
              <input
                name="password"
                id="password"
                type="password"
                placeholder=""
                className="border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password}
                </div>
              ) : null}
              <button
                type="submit"
                className={`ml-[6px] mt-3 relative transition-all duration-150 w-full max-w-[403px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] ${
                  userType === "Creator" ? "bg-[#9c44da]" : "bg-[#1920B4]"
                }`}
              >
                <div
                  className={`absolute -top-[8px] -left-[6px] transition-all duration-150 z-50 text-white text-lg font-bold w-full max-w-[403px] h-[90px] rounded-xl border-[1px] border-[#2D262D] ${
                    userType === "Creator" ? "bg-[#CA7FFE]" : "bg-[#4D55F5]"
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
