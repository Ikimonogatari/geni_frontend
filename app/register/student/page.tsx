"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useSendOtpToEmailMutation,
  useStudentRegisterMutation,
  useGetPasswordPolicyQuery,
} from "../../services/service";
import toast from "react-hot-toast";
import Verification from "../Verification";
import { Input } from "@/components/ui/input";
import SuccessModal from "@/components/common/SuccessModal";

function StudentRegister() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const { data: passwordPolicy, isSuccess: passwordPolicySuccess } =
    useGetPasswordPolicyQuery({});

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

  const handleMouseDownNewPassword = () => setShowNewPassword(true);
  const handleMouseUpNewPassword = () => setShowNewPassword(false);

  const handleMouseDownConfirmPassword = () => setShowConfirmPassword(true);
  const handleMouseUpConfirmPassword = () => setShowConfirmPassword(false);

  const [
    studentRegister,
    {
      data: studentRegisterData,
      error: studentRegisterError,
      isLoading: studentRegisterLoading,
      isSuccess: studentRegisterSuccess,
    },
  ] = useStudentRegisterMutation();

  const [
    studentVerification,
    {
      data: studentVerificationData,
      error: studentVerificationError,
      isLoading: studentVerificationLoading,
      isSuccess: studentVerificationSuccess,
    },
  ] = useSendOtpToEmailMutation();

  // Dynamically create password validation schema based on policy
  const createPasswordSchema = () => {
    if (!passwordPolicy) {
      // Default validation if policy not loaded
      return Yup.string()
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
          "Нууц үг багадаа 8 тэмдэгттэй ба үсэг, тоо, тусгай тэмдэгт агуулсан байх шаардлагатай"
        )
        .required("Заавал бөглөнө үү");
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
        .required("Заавал бөглөнө үү"),
      Password: createPasswordSchema(),
      ConfirmPassword: Yup.string()
        .oneOf([Yup.ref("Password"), null], "Нууц үг таарсангүй")
        .required("Заавал бөглөнө үү"),
      OTP: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: (values) => {
      studentRegister({
        Email: values.Email,
        Password: values.Password,
        OTP: values.OTP,
        Channel: "smtp",
      });
    },
  });

  const handleSendOtp = async () => {
    try {
      // @ts-ignore
      await registerForm.validateForm({
        Email: registerForm.values.Email,
        Password: registerForm.values.Password,
        ConfirmPassword: registerForm.values.ConfirmPassword,
      });
      registerForm.setTouched({
        Email: true,
        Password: true,
        ConfirmPassword: true,
      });
      if (
        !registerForm.errors.Email &&
        !registerForm.errors.Password &&
        !registerForm.errors.ConfirmPassword
      ) {
        const { Email } = registerForm.values;
        studentVerification({
          To: Email,
          UserType: "Creator",
          Channel: "smtp",
          Type: "creatorregister",
        });
      } else {
        toast.error("Та бүх талбарыг зөв бөглөнө үү");
      }
    } catch (error) {
      toast.error("Валидацийн алдаа гарлаа");
    }
  };

  useEffect(() => {
    if (studentVerificationSuccess) {
      toast.success("Таны мэйл рүү нэг удаагийн код илгээгдлээ");
      setDialogOpen(true);
    } else if (studentVerificationError) {
      // @ts-ignore
      toast.error(studentVerificationError?.data?.error);
    }
  }, [studentVerificationSuccess, studentVerificationError]);

  useEffect(() => {
    if (studentRegisterSuccess) {
      toast.success("Амжилттай бүртгэгдлээ");
      setDialogOpen(false);
      setIsSuccessDialogOpen(true);
    } else if (studentRegisterError) {
      // @ts-ignore
      toast.error(studentRegisterError?.data?.error);
    }
  }, [studentRegisterSuccess, studentRegisterError]);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <form
            onSubmit={registerForm.handleSubmit}
            className="sm:mt-11 flex flex-col xl:flex-row items-center gap-6 sm:gap-16"
          >
            <div className="rounded-2xl max-w-3xl w-full">
              <Image
                src={"/student-register-image.png"}
                width={584}
                height={378}
                alt="login"
                className="w-full h-full lg:min-h-[378px]"
              />
            </div>
            <div className="flex flex-col gap-4 w-full max-w-3xl xl:max-w-md">
              <span className="text-lg sm:text-xl font-bold">
                Geni Сурагч Бүртгүүлэх
              </span>

              <Input
                id="Email"
                name="Email"
                type="Email"
                className="w-full outline-none text-sm sm:text-base"
                onChange={registerForm.handleChange}
                value={registerForm.values.Email}
                errorText={registerForm.errors.Email}
                // @ts-ignore
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
                // @ts-ignore
                errorVisible={
                  registerForm.touched.Password && registerForm.errors.Password
                }
                helperText={passwordValidationMessage}
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
                // @ts-ignore
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
                className={`bg-[#4FB755] shadow-[0.25rem_0.25rem_#3B7A3C] mx-auto w-full max-w-sm sm:max-w-md aspect-[448/90] mt-4 text-white text-lg font-bold cursor-pointer border border-[#2D262D] rounded-md transition-all transform translate-x-[-0.25rem] translate-y-[-0.25rem] active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-row items-center justify-center gap-2`}
              >
                Бүртгүүлэх
              </button>
              <Verification
                colorTheme={"bg-geni-green"}
                dialogOpen={dialogOpen}
                setDialogOpen={setDialogOpen}
                handleSendOtp={handleSendOtp}
                registerForm={registerForm}
                verificationData={studentVerificationData}
                verificationSuccess={studentVerificationSuccess}
              />
            </div>
          </form>
        </div>
      </div>
      <SuccessModal
        isSuccessDialogOpen={isSuccessDialogOpen}
        setIsSuccessDialogOpen={setIsSuccessDialogOpen}
        modalImage="/creator-image.png"
        modalTitle="амжилттай Бүртгэгдлээ"
        imageClassName="w-[209px] h-[220px]"
        context={
          <a
            href="/login"
            className="mt-8 w-full py-4 text-center text-white font-semibold bg-geni-green text-2xl border border-[#2D262D] rounded-2xl"
          >
            Нэвтрэх
          </a>
        }
      />
    </div>
  );
}

export default StudentRegister;
