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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import LoginButton from "./LoginButton";
import OtpTimeLeft from "./OtpTimeLeft";

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

      if (userType === "Creator") {
        router.push("/creator-profile");
      } else if (userType === "Brand") {
        router.push("/brand-profile");
      } else if (userType === "Student") {
        router.push("/student-profile");
      }
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
            <div className="rounded-2xl max-w-3xl w-full">
              <Image
                src={"/brand-login-image.png"}
                width={584}
                height={378}
                alt="login"
                className="w-full h-full lg:min-h-[378px]"
              />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl xl:max-w-md">
              <span className="text-lg sm:text-xl font-bold">
                Geni Брэнд Бүртгүүлэх
              </span>

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
              <span className="text-base sm:text-lg">Нууц үг давтах</span>
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
              <LoginButton
                width={`mx-auto w-full max-w-sm sm:max-w-md aspect-[448/90] mt-2`}
                text={"Бүртгүүлэх"}
                shadowbg={"shadow-[0.25rem_0.25rem_#1920B4]"}
                bg={"bg-[#4D55F5]"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
