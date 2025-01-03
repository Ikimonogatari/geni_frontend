"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBrandRegisterMutation } from "../services/service";
import toast from "react-hot-toast";
import Verification from "./Verification";

function Page() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  const registerForm = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Зөв имэйл хаяг оруулна уу")
        .required("Required"),
      newPassword: Yup.string().required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Нууц үг таарч байх ёстой")
        .required("Required"),
    }),
    onSubmit: (values) => {
      brandRegister({
        Email: values.email,
        NewPassword: values.newPassword,
        ConfirmPassword: values.confirmPassword,
      });
    },
  });

  useEffect(() => {
    if (brandRegisterSuccess) {
      toast.success("Амжилттай бүртгэгдлээ");
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

              <span className="text-base sm:text-lg">Имэйл хаяг</span>
              <div className="flex flex-row items-center justify-between border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder=""
                  className="w-full outline-none text-sm sm:text-base"
                  onChange={registerForm.handleChange}
                  value={registerForm.values.email}
                />
              </div>

              {registerForm.touched.email && registerForm.errors.email ? (
                <div className="text-red-500 text-sm">
                  {registerForm.errors.email}
                </div>
              ) : null}
              <span className="text-base sm:text-lg">Нууц үг</span>
              <div className="flex flex-row items-center justify-between border-[2px] border-[#CDCDCD] rounded-lg h-14 p-4">
                <input
                  name="newPassword"
                  id="newPassword"
                  type={showNewPassword ? "text" : "password"}
                  placeholder=""
                  className="w-full outline-none text-sm sm:text-base"
                  onChange={registerForm.handleChange}
                  value={registerForm.values.newPassword}
                />
                <button
                  type="button"
                  onMouseDown={handleMouseDownNewPassword}
                  onMouseUp={handleMouseUpNewPassword}
                  onMouseLeave={handleMouseUpNewPassword} // For when the user moves the mouse away from the button
                  onTouchStart={handleMouseDownNewPassword} // For mobile
                  onTouchEnd={handleMouseUpNewPassword} // For mobile
                  className={`${
                    registerForm.values.newPassword === "" ? "hidden" : "block"
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
                  name="confirmPassword"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder=""
                  className="w-full outline-none text-sm sm:text-base"
                  onChange={registerForm.handleChange}
                  value={registerForm.values.confirmPassword}
                />
                <button
                  type="button"
                  onMouseDown={handleMouseDownConfirmPassword}
                  onMouseUp={handleMouseUpConfirmPassword}
                  onMouseLeave={handleMouseUpConfirmPassword} // For when the user moves the mouse away from the button
                  onTouchStart={handleMouseDownConfirmPassword} // For mobile
                  onTouchEnd={handleMouseUpConfirmPassword} // For mobile
                  className={`${
                    registerForm.values.confirmPassword === ""
                      ? "hidden"
                      : "block"
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
              {registerForm.touched.confirmPassword &&
              registerForm.errors.confirmPassword ? (
                <div className="text-red-500 text-sm">
                  {registerForm.errors.confirmPassword}
                </div>
              ) : null}
              <Verification
                width={`mx-auto w-full max-w-sm sm:max-w-md aspect-[448/90] mt-2`}
                text={"Нууц үг сэргээх"}
                shadowbg={"shadow-[0.25rem_0.25rem_#1920B4]"}
                bg={"bg-[#4D55F5]"}
                brandRegisterSuccess={brandRegisterSuccess}
                brandRegisterData={brandRegisterData}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
