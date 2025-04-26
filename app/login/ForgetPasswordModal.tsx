import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import OtpTimeLeft from "@/components/OtpTimeLeft";
import { FormikProps } from "formik";
import Image from "next/image";

interface EmailFormValues {
  forgotEmail: string;
}

interface OtpFormValues {
  otp: string;
}

interface PasswordFormValues {
  newPassword: string;
  confirmPassword: string;
}

interface ForgetPasswordModalProps {
  forgotPasswordState: string;
  emailForm: FormikProps<EmailFormValues>;
  otpForm: FormikProps<OtpFormValues>;
  forgotPasswordForm: FormikProps<PasswordFormValues>;
  setForgotPasswordState: (state: string) => void;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  handleMouseDownNewPassword: () => void;
  handleMouseUpNewPassword: () => void;
  handleMouseDownConfirmPassword: () => void;
  handleMouseUpConfirmPassword: () => void;
  sendOtpToEmailSuccess: boolean;
  sendOtpToEmailData: any;
  onClickEmailForm: () => void;
  onClickOtpForm: () => void;
  onClickForgotPasswordForm: () => void;
  passwordValidationMessage?: string;
}

function ForgetPasswordModal({
  forgotPasswordState,
  emailForm,
  otpForm,
  forgotPasswordForm,
  setForgotPasswordState,
  showNewPassword,
  showConfirmPassword,
  handleMouseDownNewPassword,
  handleMouseUpNewPassword,
  handleMouseDownConfirmPassword,
  handleMouseUpConfirmPassword,
  sendOtpToEmailSuccess,
  sendOtpToEmailData,
  onClickEmailForm,
  onClickOtpForm,
  onClickForgotPasswordForm,
  passwordValidationMessage,
}: ForgetPasswordModalProps) {
  return (
    <Dialog>
      <DialogTrigger className="text-black font-semibold underline">
        Нууц үг сэргээх
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent className="rounded-3xl max-w-lg w-full flex flex-col items-center gap-2">
        {forgotPasswordState === "1" ? (
          <div className="flex flex-col gap-5">
            <span className="text-3xl font-bold">Нууц үг сэргээх</span>
            <span className="mt-6">
              Та өөрийн имэйл хаягаа бичнэ үү. Имэйл хаягаар нэг удаагын нууц
              код очих болно.
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
            <span className="text-3xl font-bold">Нууц үг сэргээх</span>
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
                <OtpTimeLeft otpDuration={sendOtpToEmailData?.otpDuration} />
              )}

              <button
                //   @ts-ignore
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
                  {passwordValidationMessage && (
                    <div className="text-gray-600 text-sm mt-1">
                      {passwordValidationMessage}
                    </div>
                  )}
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
                      value={forgotPasswordForm.values.confirmPassword}
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
  );
}

export default ForgetPasswordModal;
