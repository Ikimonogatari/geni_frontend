"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  geniApi,
  useCreatorLoginMutation,
  useForgotPasswordMutation,
  useSendOtpToEmailMutation,
} from "../services/service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import LoginButton from "./LoginButton";
import ForgetPasswordModal from "./ForgetPasswordModal";

function Page() {
  const router = useRouter();
  const [userType, setUserType] = useState("Student");
  const [forgotPasswordState, setForgotPasswordState] = useState("1");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const handleMouseDownLoginPassword = () => setShowLoginPassword(true);
  const handleMouseUpLoginPassword = () => setShowLoginPassword(false);

  const handleMouseDownNewPassword = () => setShowNewPassword(true);
  const handleMouseUpNewPassword = () => setShowNewPassword(false);

  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(true);
  const handleMouseUpConfirmPassword = () => setShowConfirmPassword(false);

  const [loginRequest, { data, error, isLoading }] = useCreatorLoginMutation();
  const [
    sendOtpToEmail,
    {
      data: sendOtpToEmailData,
      error: sendOtpToEmailError,
      isLoading: sendOtpToEmailLoading,
      isSuccess: sendOtpToEmailSuccess,
    },
  ] = useSendOtpToEmailMutation();

  const [
    forgotPassword,
    {
      data: forgotPasswordData,
      error: forgotPasswordError,
      isLoading: forgotPasswordLoading,
      isSuccess: forgotPasswordSuccess,
    },
  ] = useForgotPasswordMutation();

  const emailForm = useFormik({
    initialValues: {
      forgotEmail: "",
    },
    validationSchema: Yup.object({
      forgotEmail: Yup.string()
        .email("Зөв имэйл хаяг оруулна уу")
        .required("Заавал бөглөнө үү"),
    }),
    onSubmit: (value) => {
      sendOtpToEmail({
        To: value.forgotEmail,
        UserType: userType, //Student, Brand, Creator
        Channel: "smtp", //smtp, sms
        Type: "forgotpassword",
      });
    },
  });
  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{4}$/, "Зөв код оруулна уу")
        .required("Заавал бөглөнө үү"),
    }),
    onSubmit: () => {
      setForgotPasswordState("3");
    },
  });
  const forgotPasswordForm = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Заавал бөглөнө үү"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Нууц үг таарч байх ёстой")
        .required("Заавал бөглөнө үү"),
    }),
    onSubmit: (values) => {
      forgotPassword({
        UserType: userType, //Brand, Creator, Student
        Channel: "smtp", //smtp, sms
        OTP: otpForm.values.otp,
        To: emailForm.values.forgotEmail,
        NewPassword: values.newPassword,
      });
    },
  });

  const login = useFormik({
    initialValues: {
      email: "",
      password: "",
      UserType: userType,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Заавал бөглөнө үү"),
      password: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: (values) => {
      Cookies.remove("auth");
      Cookies.remove("userType");
      loginRequest(values);
    },
  });

  useEffect(() => {
    if (data) {
      // Set cookies first
      Cookies.set("auth", data.JWT, { expires: 1 / 24 });
      Cookies.set("userType", userType, { expires: 1 / 24 });

      // Invalidate cache after cookies are set
      geniApi.util.invalidateTags(["UserInfo"]);

      // Ensure navigation only after cookies are set
      router.push("/profile");
    } else if (error) {
      toast.error(error?.data?.error);
    }
  }, [data, error]);

  useEffect(() => {
    if (sendOtpToEmailSuccess) {
      toast.success("Таны мэйл рүү нэг удаагийн код илгээгдлээ");
      setForgotPasswordState("2");
    } else if (sendOtpToEmailError) {
      toast.error(sendOtpToEmailError?.data?.error);
    }
  }, [sendOtpToEmailSuccess, sendOtpToEmailError]);

  useEffect(() => {
    if (forgotPasswordSuccess) {
      toast.success("Нууц үг шинэчлэгдлээ");
      setForgotPasswordState("1");
    } else if (forgotPasswordError) {
      toast.error(forgotPasswordError?.data?.error);
    }
  }, [forgotPasswordSuccess, forgotPasswordError]);

  const handleUserType = (value) => {
    setUserType(value);
    login.setFieldValue("UserType", value);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <form
            onSubmit={login.handleSubmit}
            className="sm:mt-11 flex flex-col xl:flex-row items-center gap-6 sm:gap-16"
          >
            <div className="bg-[#F5F4F0] rounded-2xl px-12 py-16 lg:px-10 lg:py-32 max-w-3xl w-full">
              <Image
                src={"/login-image.svg"}
                width={584}
                height={378}
                alt="login"
                className="w-full h-full lg:min-h-[378px]"
              />
            </div>
            <div className="flex flex-col w-full max-w-3xl xl:max-w-md">
              <span className="text-xl sm:text-3xl font-bold mb-2">
                Нэвтрэх
              </span>

              <div className="z-50 -mb-[1px] flex flex-row text-sm sm:text-base w-full">
                <div
                  onClick={() => handleUserType("Student")}
                  className={`w-full p-2 cursor-pointer text-center rounded-t-[30px] ${
                    userType === "Student"
                      ? "bg-white border border-[#CDCDCD] border-b-0 text-[#4FB755] font-medium"
                      : " border border-x-[1px] border-transparent"
                  }`}
                >
                  <div
                    className={`font-bold w-full text-center px-4 py-2 rounded-full ${
                      userType === "Student"
                        ? "bg-[#4FB755] border border-[#4FB755] text-white"
                        : "border border-black"
                    }`}
                  >
                    Student
                  </div>
                </div>
                <div
                  onClick={() => handleUserType("Creator")}
                  className={`w-full p-2 cursor-pointer text-center rounded-t-[30px] ${
                    userType === "Creator"
                      ? "bg-white border border-[#CDCDCD] border-b-0 text-[#CA7FFE] font-medium"
                      : "border border-x-[1px] border-transparent"
                  }`}
                >
                  <div
                    className={`font-bold w-full text-center px-4 py-2 rounded-full ${
                      userType === "Creator"
                        ? "bg-[#CA7FFE] border border-[#CA7FFE] text-white"
                        : "border border-black"
                    }`}
                  >
                    Creator
                  </div>
                </div>
                <div
                  onClick={() => handleUserType("Brand")}
                  className={`w-full p-2 cursor-pointer text-center rounded-t-[30px] ${
                    userType === "Brand"
                      ? "bg-white border border-[#CDCDCD] border-b-0 text-[#4D55F5] font-medium"
                      : "border border-x-[1px] border-transparent"
                  }`}
                >
                  <div
                    className={`font-bold w-full text-center px-4 py-2 rounded-full ${
                      userType === "Brand"
                        ? "bg-[#4D55F5] border border-[#4D55F5] text-white"
                        : "border border-black"
                    }`}
                  >
                    Brand
                  </div>
                </div>
              </div>

              <div
                className={`border border-[#CDCDCD] rounded-[30px] ${
                  userType === "Student"
                    ? "rounded-tl-none"
                    : userType === "Creator"
                    ? ""
                    : "rounded-tr-none"
                } p-4`}
              >
                <div className="flex flex-col gap-4">
                  <span className="">Имэйл хаяг</span>
                  <div className="flex flex-row items-center justify-between bg-[#F5F4F0] rounded-lg h-14 p-4">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder=""
                      className="w-full outline-none text-sm sm:text-base bg-inherit"
                      onChange={login.handleChange}
                      value={login.values.email}
                    />
                  </div>

                  {login.touched.email && login.errors.email ? (
                    <div className="text-red-500 text-sm">
                      {login.errors.email}
                    </div>
                  ) : null}
                  <span className="">Нууц үг</span>
                  <div className="flex flex-row items-center justify-between bg-[#F5F4F0] rounded-lg h-14 p-4">
                    <input
                      name="password"
                      id="password"
                      type={showLoginPassword ? "text" : "password"}
                      placeholder=""
                      className="w-full outline-none text-sm sm:text-base bg-inherit"
                      onChange={login.handleChange}
                      value={login.values.password}
                    />
                    <button
                      type="button"
                      onMouseDown={handleMouseDownLoginPassword}
                      onMouseUp={handleMouseUpLoginPassword}
                      onMouseLeave={handleMouseUpLoginPassword}
                      onTouchStart={handleMouseDownLoginPassword}
                      onTouchEnd={handleMouseUpLoginPassword}
                      className={`${
                        login.values.password === "" ? "hidden" : "block"
                      } text-sm opacity-90`}
                    >
                      <Image
                        src={"/show-pwd.png"}
                        width={24}
                        height={24}
                        alt=""
                        className="w-6 h-6"
                      />
                    </button>
                  </div>
                  {login.touched.password && login.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {login.errors.password}
                    </div>
                  ) : null}
                  <ForgetPasswordModal
                    forgotPasswordForm={forgotPasswordForm}
                    setForgotPasswordState={setForgotPasswordState}
                    showNewPassword={showNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    handleMouseDownNewPassword={handleMouseDownNewPassword}
                    handleMouseUpNewPassword={handleMouseUpNewPassword}
                    handleMouseDownConfirmPassword={
                      handleMouseDownConfirmPassword
                    }
                    handleMouseUpConfirmPassword={handleMouseUpConfirmPassword}
                    sendOtpToEmailSuccess={sendOtpToEmailSuccess}
                    sendOtpToEmailData={sendOtpToEmailData}
                    onClickEmailForm={emailForm.handleSubmit}
                    onClickOtpForm={otpForm.handleSubmit}
                    onClickForgotPasswordForm={forgotPasswordForm.handleSubmit}
                    emailForm={emailForm}
                    otpForm={otpForm}
                    forgotPasswordState={forgotPasswordState}
                  />

                  <LoginButton
                    width={`mx-auto w-full max-w-sm sm:max-w-md aspect-[448/90] mt-2`}
                    text={"Нэвтрэх"}
                    shadowbg={
                      userType === "Creator"
                        ? "shadow-[0.25rem_0.25rem_#9c44da]"
                        : userType === "Brand"
                        ? "shadow-[0.25rem_0.25rem_#1920B4]"
                        : "shadow-[0.25rem_0.25rem_#3A8F44]"
                    }
                    bg={
                      userType === "Creator"
                        ? "bg-[#CA7FFE]"
                        : userType === "Brand"
                        ? "bg-[#4D55F5]"
                        : "bg-[#4FB755]"
                    }
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
