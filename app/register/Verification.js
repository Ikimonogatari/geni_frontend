import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import RegisterSuccessModal from "./RegisterSuccessModal";
import OtpTimeLeft from "@/components/OtpTimeLeft";

function Verification({
  dialogOpen,
  setDialogOpen,
  brandRegisterFinished,
  brandVerificationData,
  brandVerificationSuccess,
  registerForm,
}) {
  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="rounded-3xl max-w-md w-full flex flex-col items-center">
          {!brandRegisterFinished ? (
            <div className="flex flex-col gap-5">
              <span className="text-3xl font-bold">Имэйл баталгаажуулах</span>
              <span className="">
                Имэйл хаягт очсон нэг удаагын нууц кодыг оруулна уу.
              </span>
              <form
                onSubmit={registerForm.handleSubmit}
                className="flex flex-col gap-2 sm:gap-4"
              >
                <div className="flex flex-col gap-2">
                  <div className="p-3 flex flex-col gap-1 border-[2px] border-[#CDCDCD]  focus-within:border-[#4D55F5] focus-within:border-[2px] transition-all duration-200 rounded-xl">
                    <span className="text-[#6F6F6F] text-xs :text-sm">
                      Нэг удаагын нууц код
                    </span>
                    <input
                      id="OTP"
                      name="OTP"
                      onChange={registerForm.handleChange}
                      onBlur={registerForm.handleBlur}
                      value={registerForm.values.OTP}
                      className="outline-none bg-none"
                    />
                  </div>
                  {registerForm.touched.OTP && registerForm.errors.OTP ? (
                    <div className="text-red-500 text-sm">
                      {registerForm.errors.OTP}
                    </div>
                  ) : null}
                </div>
                {brandVerificationSuccess && (
                  <OtpTimeLeft
                    otpDuration={brandVerificationData?.otpDuration}
                  />
                )}
                <button
                  type="submit"
                  className={`mt-2 w-full py-4 text-lg text-white font-bold rounded-lg border border-[#2D262D] bg-[#4D55F5]`}
                >
                  Баталгаажуулах
                </button>
              </form>
            </div>
          ) : (
            <RegisterSuccessModal />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Verification;
