"use client";
import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  geniApi,
  useCreatorLoginMutation,
  useForgotPasswordMutation,
  useSendOtpToEmailMutation,
  useGetPasswordPolicyQuery,
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
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");
  const [timeLeft, setTimeLeft] = useState({ minutes: 0, seconds: 0 });

  const { data: passwordPolicy, isSuccess: passwordPolicySuccess } =
    useGetPasswordPolicyQuery({});

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

  const { connectWebSocket } = useWebSocket();

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
      // Only send a new OTP if there's no active timer or if the user is in the first step
      if (
        forgotPasswordState === "1" ||
        (timeLeft && timeLeft.minutes === 0 && timeLeft.seconds === 0)
      ) {
        sendOtpToEmail({
          To: value.forgotEmail,
          UserType: userType, //Student, Brand, Creator
          Channel: "smtp", //smtp, sms
          Type: "forgotpassword",
        });
      }
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

  useEffect(() => {
    if (passwordPolicySuccess && passwordPolicy) {
      const {
        MinLen,
        MinUpper,
        MinLower,
        MinDigit,
        MinSpecial,
        AllowedSpecial,
      } = passwordPolicy;

      let message = `Нууц үг доод тал нь ${MinLen} тэмдэгт байх`;
      if (MinUpper > 0) message += `, ${MinUpper} том үсэг`;
      if (MinLower > 0) message += `, ${MinLower} жижиг үсэг`;
      if (MinDigit > 0) message += `, ${MinDigit} тоо`;
      if (MinSpecial > 0)
        message += `, ${MinSpecial} тусгай тэмдэгт (${AllowedSpecial})`;

      setPasswordValidationMessage(message);
    }
  }, [passwordPolicySuccess, passwordPolicy]);

  const createPasswordSchema = () => {
    if (!passwordPolicy) {
      // Default validation if policy not loaded
      return Yup.string().required("Заавал бөглөнө үү");
    }

    const {
      MinLen,
      MinUpper,
      MinLower,
      MinDigit,
      MinSpecial,
      AllowedSpecial,
      NotUserName,
      Prohibited,
      MaxLen,
    } = passwordPolicy;

    let schema = Yup.string().required("Заавал бөглөнө үү");

    // Length validation
    schema = schema.min(
      MinLen,
      `Нууц үг доод тал нь ${MinLen} тэмдэгт байх ёстой`
    );

    if (MaxLen > 0) {
      schema = schema.max(
        MaxLen,
        `Нууц үг дээд тал нь ${MaxLen} тэмдэгт байх ёстой`
      );
    }

    // Uppercase validation
    if (MinUpper > 0) {
      schema = schema.test(
        "has-uppercase",
        `Дор хаяж ${MinUpper} том үсэг агуулсан байх ёстой`,
        (value) =>
          value ? (value.match(/[A-Z]/g) || []).length >= MinUpper : false
      );
    }

    // Lowercase validation
    if (MinLower > 0) {
      schema = schema.test(
        "has-lowercase",
        `Дор хаяж ${MinLower} жижиг үсэг агуулсан байх ёстой`,
        (value) =>
          value ? (value.match(/[a-z]/g) || []).length >= MinLower : false
      );
    }

    // Digit validation
    if (MinDigit > 0) {
      schema = schema.test(
        "has-digit",
        `Дор хаяж ${MinDigit} тоо агуулсан байх ёстой`,
        (value) =>
          value ? (value.match(/[0-9]/g) || []).length >= MinDigit : false
      );
    }

    // Special character validation
    if (MinSpecial > 0 && AllowedSpecial) {
      const escapedSpecialChars = AllowedSpecial.split("")
        .map((char) => {
          // Escape regex special characters
          return char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        })
        .join("");

      const specialCharsRegex = new RegExp(`[${escapedSpecialChars}]`, "g");

      schema = schema.test(
        "has-special",
        `Дор хаяж ${MinSpecial} тусгай тэмдэгт агуулсан байх ёстой`,
        (value) =>
          value
            ? (value.match(specialCharsRegex) || []).length >= MinSpecial
            : false
      );
    }

    // Prohibited passwords validation
    if (Prohibited) {
      const prohibitedList = Prohibited.split(",").map((item) =>
        item.trim().toLowerCase()
      );
      schema = schema.test(
        "not-prohibited",
        `Нууц үг хэт энгийн байна`,
        (value) =>
          value ? !prohibitedList.includes(value.toLowerCase()) : true
      );
    }

    return schema;
  };

  const forgotPasswordForm = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: createPasswordSchema(),
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
        .email("Зөв имэйл хаяг оруулна уу")
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
      connectWebSocket(data.JWT);
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

  // Memoize the callback function to prevent infinite loops
  const handleTimeUpdate = useCallback((time) => {
    setTimeLeft(time);
  }, []);

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

              <div className="z-40 -mb-[1px] flex flex-row text-sm sm:text-base w-full">
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
                    forgotPasswordState={forgotPasswordState}
                    setForgotPasswordState={setForgotPasswordState}
                    showNewPassword={showNewPassword}
                    showConfirmPassword={showConfirmPassword}
                    handleMouseDownNewPassword={handleMouseDownNewPassword}
                    handleMouseUpNewPassword={handleMouseUpNewPassword}
                    handleMouseDownConfirmPassword={
                      handleMouseDownConfirmPassword
                    }
                    handleMouseUpConfirmPassword={handleMouseUpConfirmPassword}
                    emailForm={emailForm}
                    otpForm={otpForm}
                    forgotPasswordForm={forgotPasswordForm}
                    sendOtpToEmailSuccess={sendOtpToEmailSuccess}
                    sendOtpToEmailData={sendOtpToEmailData}
                    onClickEmailForm={emailForm.handleSubmit}
                    onClickOtpForm={otpForm.handleSubmit}
                    onClickForgotPasswordForm={forgotPasswordForm.handleSubmit}
                    passwordValidationMessage={passwordValidationMessage}
                    timeLeft={timeLeft}
                    onTimeUpdate={handleTimeUpdate}
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
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 w-full max-w-sm sm:max-w-md mx-auto mt-4 py-2 px-4 border border-gray-300 rounded-xl shadow-sm bg-white hover:bg-gray-100 transition-colors"
                  onClick={() => {
                    // TODO: Implement Google login logic here
                    // For example, redirect to your backend's Google OAuth endpoint
                    window.location.href =
                      process.env.NEXT_PUBLIC_AWS_URL +
                      "/api/web/public/oauthlogin";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="1em"
                    style={{ flex: "none", lineHeight: "1" }}
                    viewBox="0 0 24 24"
                    width="1em"
                  >
                    <title>Google</title>
                    <path
                      d="M23 12.245c0-.905-.075-1.565-.236-2.25h-10.54v4.083h6.186c-.124 1.014-.797 2.542-2.294 3.569l-.021.136 3.332 2.53.23.022C21.779 18.417 23 15.593 23 12.245z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12.225 23c3.03 0 5.574-.978 7.433-2.665l-3.542-2.688c-.948.648-2.22 1.1-3.891 1.1a6.745 6.745 0 01-6.386-4.572l-.132.011-3.465 2.628-.045.124C4.043 20.531 7.835 23 12.225 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.175A6.65 6.65 0 015.463 12c0-.758.138-1.491.361-2.175l-.006-.147-3.508-2.67-.115.054A10.831 10.831 0 001 12c0 1.772.436 3.447 1.197 4.938l3.642-2.763z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12.225 5.253c2.108 0 3.529.892 4.34 1.638l3.167-3.031C17.787 2.088 15.255 1 12.225 1 7.834 1 4.043 3.469 2.197 7.062l3.63 2.763a6.77 6.77 0 016.398-4.572z"
                      fill="#EB4335"
                    />
                  </svg>
                  <span className="font-medium text-gray-700">
                    Google-ээр нэвтрэх
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
