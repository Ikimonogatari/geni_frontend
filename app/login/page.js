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
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginButton from "./LoginButton";
import OtpTimeLeft from "@/components/OtpTimeLeft";

function Page() {
  const router = useRouter();
  const [userType, setUserType] = useState("Creator");
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
        .required("Required"),
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
        .required("Required"),
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
      newPassword: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Нууц үг таарч байх ёстой")
        .required("Required"),
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
      toast.error(forgotPassword?.data?.error);
    }
  }, [forgotPasswordSuccess, forgotPasswordError]);

  const handleUserType = (value) => {
    setUserType(value);
    login.setFieldValue("UserType", value);
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-20 sm:mt-32">
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
            <div className="flex flex-col gap-4 w-full max-w-3xl xl:max-w-md">
              <span className="text-lg sm:text-xl font-bold">Нэвтрэх</span>
              <div className="flex flex-row items-center gap-4 sm:gap-6 text-sm sm:text-base">
                <div
                  onClick={() => handleUserType("Creator")}
                  className={`transition-all duration-150 ${
                    userType === "Creator"
                      ? "border-[#CA7FFE]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-4 rounded-lg border-[2px] w-full text-center`}
                >
                  Creator
                </div>
                <div
                  onClick={() => handleUserType("Brand")}
                  className={`transition-all duration-150 ${
                    userType === "Brand"
                      ? "border-[#4D55F5]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-4 rounded-lg  border-[2px] w-full text-center`}
                >
                  Brand
                </div>
                <div
                  onClick={() => handleUserType("Student")}
                  className={`transition-all duration-150 ${
                    userType === "Student"
                      ? "border-[#4FB755]"
                      : "border-[#CDCDCD]"
                  } cursor-pointer py-3 px-4 rounded-lg  border-[2px] w-full text-center`}
                >
                  Student
                </div>
              </div>
              <span className="text-base sm:text-lg">Имэйл хаяг</span>
              <div className="flex flex-row items-center justify-between border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=""
                  className="w-full outline-none text-sm sm:text-base"
                  onChange={login.handleChange}
                  value={login.values.email}
                />
              </div>

              {login.touched.email && login.errors.email ? (
                <div className="text-red-500 text-sm">{login.errors.email}</div>
              ) : null}
              <span className="text-base sm:text-lg">Нууц үг</span>
              <div className="flex flex-row items-center justify-between border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4">
                <input
                  name="password"
                  id="password"
                  type={showLoginPassword ? "text" : "password"}
                  placeholder=""
                  className="w-full outline-none text-sm sm:text-base"
                  onChange={login.handleChange}
                  value={login.values.password}
                />
                <button
                  type="button"
                  onMouseDown={handleMouseDownLoginPassword}
                  onMouseUp={handleMouseUpLoginPassword}
                  onMouseLeave={handleMouseUpLoginPassword} // For when the user moves the mouse away from the button
                  onTouchStart={handleMouseDownLoginPassword} // For mobile
                  onTouchEnd={handleMouseUpLoginPassword} // For mobile
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

              <Dialog>
                <DialogTrigger className="text-black font-semibold underline">
                  Нууц үг сэргээх
                </DialogTrigger>
                <DialogContent className="rounded-3xl max-w-lg w-full flex flex-col items-center gap-2">
                  {forgotPasswordState === "1" ? (
                    <div className="flex flex-col gap-5">
                      <span className="text-3xl font-bold">
                        Нууц үг сэргээх
                      </span>
                      <span className="mt-6">
                        Та өөрийн имэйл хаягаа бичнэ үү. Имэйл хаягаар нэг
                        удаагын нууц код очих болно.
                      </span>
                      <form
                        onSubmit={emailForm.handleSubmit}
                        className="flex flex-col gap-4"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="p-3 flex flex-col gap-1 border-[2px] border-[#CDCDCD]  focus-within:border-[#4D55F5] focus-within:border-[2px] transition-all duration-200 rounded-xl">
                            <span className="text-[#6F6F6F] text-xs sm:text-sm">
                              Имэйл хаяг
                            </span>
                            <input
                              id="forgotEmail"
                              name="forgotEmail"
                              type="email"
                              onChange={emailForm.handleChange}
                              onBlur={emailForm.handleBlur}
                              value={emailForm.values.forgotEmail}
                              className="outline-none bg-transparent"
                            />
                          </div>
                          {emailForm.touched.forgotEmail &&
                          emailForm.errors.forgotEmail ? (
                            <div className="text-red-500 text-sm">
                              {emailForm.errors.forgotEmail}
                            </div>
                          ) : null}
                        </div>
                        <button
                          type="submit"
                          className={`w-full py-4 text-white text-lg font-bold rounded-lg border border-[#2D262D] bg-[#CA7FFE]`}
                        >
                          Илгээх
                        </button>
                      </form>
                    </div>
                  ) : forgotPasswordState === "2" ? (
                    <div className="flex flex-col gap-5">
                      <button
                        onClick={() => setForgotPasswordState("1")}
                        className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
                      >
                        <Image
                          src={"/arrow-left.png"}
                          width={24}
                          height={24}
                          alt="arrow-left"
                        />
                      </button>
                      <span className="text-3xl font-bold">
                        Нууц үг сэргээх
                      </span>
                      <span className="mt-2 sm:mt-6">
                        Имэйл хаягт очсон нэг удаагын нууц кодыг оруулна уу.
                      </span>
                      <form
                        onSubmit={otpForm.handleSubmit}
                        className="flex flex-col gap-2 sm:gap-4"
                      >
                        <div className="flex flex-col gap-2">
                          <div className="p-3 flex flex-col gap-1 border-[2px] border-[#CDCDCD]  focus-within:border-[#4D55F5] focus-within:border-[2px] transition-all duration-200 rounded-xl">
                            <span className="text-[#6F6F6F] text-xs :text-sm">
                              Нэг удаагын нууц код
                            </span>
                            <input
                              id="otp"
                              name="otp"
                              onChange={otpForm.handleChange}
                              onBlur={otpForm.handleBlur}
                              value={otpForm.values.otp}
                              className="outline-none bg-none"
                            />
                          </div>
                          {otpForm.touched.otp && otpForm.errors.otp ? (
                            <div className="text-red-500 text-sm">
                              {otpForm.errors.otp}
                            </div>
                          ) : null}
                        </div>
                        {sendOtpToEmailSuccess && (
                          <OtpTimeLeft
                            otpDuration={sendOtpToEmailData?.otpDuration}
                          />
                        )}

                        <button
                          onClick={emailForm.handleSubmit}
                          className="text-center text-xs sm:text-sm cursor-pointer text-[#4D55F5] font-semibold"
                        >
                          Нууц код дахин авах
                        </button>
                        <button
                          type="submit"
                          className={`mt-2 w-full py-4 text-lg text-white font-bold rounded-lg border border-[#2D262D] bg-[#CA7FFE]`}
                        >
                          Баталгаажуулах
                        </button>
                      </form>
                    </div>
                  ) : (
                    forgotPasswordState === "3" && (
                      <div className="flex flex-col gap-5 w-full">
                        <button
                          onClick={() => setForgotPasswordState("2")}
                          className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
                        >
                          <Image
                            src={"/arrow-left.png"}
                            width={24}
                            height={24}
                            alt="arrow-left"
                          />
                        </button>
                        <span className="text-3xl font-bold">Шинэ нууц үг</span>

                        <form
                          onSubmit={forgotPasswordForm.handleSubmit}
                          className="flex flex-col gap-4 w-full mt-6"
                        >
                          <div className="w-full flex flex-col gap-2">
                            <div className="p-3 flex flex-col gap-1 border-[2px] border-[#CDCDCD] focus-within:border-[#4D55F5] focus-within:border-[2px] transition-all duration-200 rounded-xl relative">
                              <span className="text-[#6F6F6F] text-xs sm:text-sm">
                                Шинэ нууц үгээ оруулна уу
                              </span>
                              <input
                                id="newPassword"
                                name="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                onChange={forgotPasswordForm.handleChange}
                                onBlur={forgotPasswordForm.handleBlur}
                                value={forgotPasswordForm.values.newPassword}
                                className="outline-none bg-transparent"
                              />
                              <button
                                type="button"
                                onMouseDown={handleMouseDownNewPassword}
                                onMouseUp={handleMouseUpNewPassword}
                                onMouseLeave={handleMouseUpNewPassword} // For when the user moves the mouse away from the button
                                onTouchStart={handleMouseDownNewPassword} // For mobile
                                onTouchEnd={handleMouseUpNewPassword} // For mobile
                                className="absolute right-3 top-9 text-sm text-gray-600"
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
                            {forgotPasswordForm.touched.newPassword &&
                            forgotPasswordForm.errors.newPassword ? (
                              <div className="text-red-500 text-sm">
                                {forgotPasswordForm.errors.newPassword}
                              </div>
                            ) : null}
                          </div>
                          <div className="w-full flex flex-col gap-2">
                            <div className="p-3 flex flex-col gap-1 border-[2px] border-[#CDCDCD] focus-within:border-[#4D55F5] focus-within:border-[2px] transition-all duration-200 rounded-xl relative">
                              <span className="text-[#6F6F6F] text-xs sm:text-sm">
                                Шинэ нууц үгээ давтан оруулна уу
                              </span>
                              <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                onChange={forgotPasswordForm.handleChange}
                                onBlur={forgotPasswordForm.handleBlur}
                                value={
                                  forgotPasswordForm.values.confirmPassword
                                }
                                className="outline-none bg-transparent"
                              />
                              <button
                                type="button"
                                onMouseDown={handleMouseDownConfirmPassword}
                                onMouseUp={handleMouseUpConfirmPassword}
                                onMouseLeave={handleMouseUpConfirmPassword} // For when the user moves the mouse away from the button
                                onTouchStart={handleMouseDownConfirmPassword} // For mobile
                                onTouchEnd={handleMouseUpConfirmPassword} // For mobile
                                className="absolute right-3 top-9 text-sm text-gray-600"
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
                            {forgotPasswordForm.touched.confirmPassword &&
                            forgotPasswordForm.errors.confirmPassword ? (
                              <div className="text-red-500 text-sm">
                                {forgotPasswordForm.errors.confirmPassword}
                              </div>
                            ) : null}
                          </div>
                          <button
                            type="submit"
                            className={`w-full py-4 text-white text-lg font-bold rounded-lg border border-[#2D262D] bg-[#CA7FFE]`}
                          >
                            Хадгалах
                          </button>
                        </form>
                      </div>
                    )
                  )}
                </DialogContent>
              </Dialog>
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
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
