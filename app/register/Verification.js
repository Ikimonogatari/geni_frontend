import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useBrandVerificationMutation } from "../services/service";
import RegisterSuccessModal from "./RegisterSuccessModal";

function Verification({
  text,
  bg,
  shadowbg,
  width,
  brandRegisterData,
  brandRegisterSuccess,
}) {
  const otpForm = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string()
        .matches(/^\d{4}$/, "Зөв код оруулна уу")
        .required("Хоосон байна"),
    }),
    onSubmit: (values) => {
      brandVerification({
        OTP: values.otp,
      });
    },
  });

  const [
    brandVerification,
    {
      data: brandVerificationData,
      error: brandVerificationError,
      isLoading: brandVerificationLoading,
      isSuccess: brandVerificationSuccess,
    },
  ] = useBrandVerificationMutation();

  return (
    <div>
      <Dialog>
        <DialogTrigger
          className={`${bg} ${width} ${shadowbg} text-white text-lg font-bold cursor-pointer border border-[#2D262D] rounded-md transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-row items-center justify-center gap-2`}
        >
          {text}
        </DialogTrigger>
        <DialogContent className="rounded-3xl max-w-md w-full flex flex-col items-center gap-2">
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-bold">Имэйл баталгаажуулах</span>
            <span className="">
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
              {brandRegisterSuccess && (
                <OtpTimeLeft otpDuration={brandRegisterData?.otpDuration} />
              )}
              <button
                type="submit"
                className={`mt-2 w-full py-4 text-lg text-white font-bold rounded-lg border border-[#2D262D] bg-[#4D55F5]`}
              >
                Баталгаажуулах
              </button>
              <RegisterSuccessModal
                brandVerificationSuccess={brandVerificationSuccess}
              />
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Verification;
