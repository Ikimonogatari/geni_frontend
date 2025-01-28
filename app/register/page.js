"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useBrandRegisterMutation,
  useSendOtpToEmailMutation,
} from "../services/service";
import toast from "react-hot-toast";
import Verification from "./Verification";
import { Input } from "@/components/ui/input";

function Page() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [brandRegisterFinished, setBrandRegisterFinished] = useState(false); // Track registration success

  const handleMouseDownNewPassword = () => setShowNewPassword(true);
  const handleMouseUpNewPassword = () => setShowNewPassword(false);

  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(true);
  const handleMouseUpConfirmPassword = () => setShowConfirmPassword(false);

  const [
    brandRegister,
    {
      data: brandRegisterData,
      error: brandRegisterError,
      isLoading: brandRegisterLoading,
      isSuccess: brandRegisterSuccess,
    },
  ] = useBrandRegisterMutation();

  const [
    brandVerification,
    {
      data: brandVerificationData,
      error: brandVerificationError,
      isLoading: brandVerificationLoading,
      isSuccess: brandVerificationSuccess,
    },
  ] = useSendOtpToEmailMutation();

  const registerForm = useFormik({
    initialValues: {
      Email: "",
      Password: "",
      ConfirmPassword: "",
      OTP: "",
    },
    validationSchema: Yup.object({
      Email: Yup.string()
        .email("Зөв имэйл хаяг оруулна уу")
        .required("Required"),
      Password: Yup.string().required("Required"),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Нууц үг таарсангүй")
        .required("Required"),
      OTP: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      setBrandRegisterFinished(false);
      brandRegister({
        Email: values.Email,
        Password: values.Password,
        OTP: values.OTP,
        Channel: "smtp",
      });
    },
  });

  const handleSendOtp = () => {
    const { Email, Password, ConfirmPassword } = registerForm.values;

    if (!Email) {
      toast.error("Имэйл хаягаа оруулна уу");
      return;
    }

    if (!Password) {
      toast.error("Нууц үгээ оруулна уу");
      return;
    }

    if (Password !== ConfirmPassword) {
      toast.error("Нууц үг таарахгүй байна");
      return;
    }

    brandVerification({
      To: Email,
      UserType: "Brand",
      Channel: "smtp",
      Type: "register",
    });
  };

  useEffect(() => {
    if (brandVerificationSuccess) {
      toast.success("Таны мэйл рүү нэг удаагийн код илгээгдлээ");
      setDialogOpen(true);
    } else if (brandVerificationError) {
      toast.error(brandVerificationError?.data?.error);
    }
  }, [brandVerificationSuccess, brandVerificationError]);

  useEffect(() => {
    if (brandRegisterSuccess) {
      toast.success("Амжилттай бүртгэгдлээ");
      setBrandRegisterSuccess(true);
    } else if (brandRegisterError) {
      toast.error(brandRegister?.data?.error);
    }
  }, [brandRegisterSuccess, brandRegisterError]);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-20 sm:mt-32">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <form
            onSubmit={brandRegister.handleSubmit}
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

              <Input
                id="Email"
                name="Email"
                type="Email"
                className="w-full outline-none text-sm sm:text-base"
                onChange={registerForm.handleChange}
                value={registerForm.values.Email}
                errorText={registerForm.errors.Email}
                errorVisible={
                  registerForm.touched.Email && registerForm.errors.Email
                }
                label={"Имэйл хаяг"}
                labelClassName="text-base sm:text-lg font-normal"
              />

              <Input
                name="Password"
                id="Password"
                type={showNewPassword ? "text" : "password"}
                placeholder=""
                className="w-full outline-none text-sm sm:text-base"
                onChange={registerForm.handleChange}
                value={registerForm.values.Password}
                errorText={registerForm.errors.Password}
                errorVisible={
                  registerForm.touched.Password && registerForm.errors.Password
                }
                label={"Нууц үг"}
                labelClassName="text-base sm:text-lg font-normal"
                rightSection={
                  <button
                    type="button"
                    onMouseDown={handleMouseDownNewPassword}
                    onMouseUp={handleMouseUpNewPassword}
                    onMouseLeave={handleMouseUpNewPassword}
                    onTouchStart={handleMouseDownNewPassword}
                    onTouchEnd={handleMouseUpNewPassword}
                    className={`${
                      registerForm.values.Password === "" ? "hidden" : "block"
                    } text-sm opacity-90`}
                  >
                    <Image
                      src={showNewPassword ? "/hide-pwd.png" : "/show-pwd.png"}
                      width={24}
                      height={24}
                      alt={""}
                      className="w-6 h-6"
                    />
                  </button>
                }
              />

              <Input
                name="ConfirmPassword"
                id="ConfirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder=""
                className="w-full outline-none text-sm sm:text-base"
                onChange={registerForm.handleChange}
                value={registerForm.values.ConfirmPassword}
                errorText={registerForm.errors.ConfirmPassword}
                errorVisible={
                  registerForm.touched.ConfirmPassword &&
                  registerForm.errors.ConfirmPassword
                }
                label="Нууц үг давтах"
                labelClassName="text-base sm:text-lg font-normal"
                rightSection={
                  <button
                    type="button"
                    onMouseDown={handleMouseDownConfirmPassword}
                    onMouseUp={handleMouseUpConfirmPassword}
                    onMouseLeave={handleMouseUpConfirmPassword}
                    onTouchStart={handleMouseDownConfirmPassword}
                    onTouchEnd={handleMouseUpConfirmPassword}
                    className={`${
                      registerForm.values.ConfirmPassword === ""
                        ? "hidden"
                        : "block"
                    } text-sm opacity-90`}
                  >
                    <Image
                      src={
                        showConfirmPassword ? "/hide-pwd.png" : "/show-pwd.png"
                      }
                      width={24}
                      height={24}
                      alt=""
                      className="w-6 h-6"
                    />
                  </button>
                }
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className={`bg-[#4D55F5] shadow-[0.25rem_0.25rem_#1920B4] mx-auto w-full max-w-sm sm:max-w-md aspect-[448/90] mt-4 text-white text-lg font-bold cursor-pointer border border-[#2D262D] rounded-md transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-row items-center justify-center gap-2`}
              >
                Бүртгүүлэх
              </button>
              <Verification
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                handleSendOtp={handleSendOtp}
                registerForm={registerForm}
                brandRegisterFinished={brandRegisterFinished}
                brandVerificationData={brandVerificationData}
                brandVerificationSuccess={brandVerificationSuccess}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
