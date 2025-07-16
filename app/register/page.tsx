"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useSendOtpToEmailMutation,
  useGetPasswordPolicyQuery,
  useBrandRegisterMutation,
} from "../services/service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Verification from "./Verification";

function Page() {
  const router = useRouter();
  const [userType, setUserType] = useState("Student");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState("");

  const { data: passwordPolicy, isSuccess: passwordPolicySuccess } =
    useGetPasswordPolicyQuery({});

  const [
    sendOtpToEmail,
    {
      data: sendOtpToEmailData,
      error: sendOtpToEmailError,
      isSuccess: sendOtpToEmailSuccess,
    },
  ] = useSendOtpToEmailMutation();

  const [
    brandRegister,
    {
      data: brandRegisterData,
      error: brandRegisterError,
      isSuccess: brandRegisterSuccess,
    },
  ] = useBrandRegisterMutation();

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
        .required("Заавал бөглөнө үү")
        .oneOf([Yup.ref("Password")], "Нууц үг таарахгүй байна"),
      OTP: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: (values) => {
      brandRegister({
        Email: values.Email,
        Password: values.Password,
        OTP: values.OTP,
        Channel: "smtp",
      });
    },
  });

  useEffect(() => {
    if (sendOtpToEmailSuccess) {
      toast.success("Таны мэйл рүү нэг удаагийн код илгээгдлээ");
      setDialogOpen(true);
    } else if (sendOtpToEmailError) {
      // @ts-ignore
      toast.error(sendOtpToEmailError?.data?.error);
    }
  }, [sendOtpToEmailSuccess, sendOtpToEmailError]);

  useEffect(() => {
    if (brandRegisterSuccess) {
      toast.success("Амжилттай бүртгэгдлээ");
      setDialogOpen(false);
      router.push("/login");
    } else if (brandRegisterError) {
      // @ts-ignore
      toast.error(brandRegisterError?.data?.error);
    }
  }, [brandRegisterSuccess, brandRegisterError]);

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
        sendOtpToEmail({
          To: Email,
          UserType: userType,
          Channel: "smtp",
          Type: "register",
        });
      } else {
        toast.error("Та бүх талбарыг зөв бөглөнө үү");
      }
    } catch (error) {
      toast.error("Алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <form
            onSubmit={registerForm.handleSubmit}
            className="sm:mt-11 flex flex-col xl:flex-row items-center gap-6 sm:gap-16"
          >
            <div className="bg-[#F5F4F0] rounded-2xl px-12 py-16 lg:px-10 lg:py-32 max-w-3xl aspect-square w-full">
              <Image
                src={"/login-image.svg"}
                width={584}
                height={378}
                alt="login"
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col w-full max-w-3xl xl:max-w-md">
              <span className="text-xl sm:text-3xl font-bold mb-2">
                Бүртгүүлэх
              </span>

              <div className={`border border-[#CDCDCD] rounded-[30px] p-4`}>
                <button
                  type="button"
                  className="flex items-center justify-center gap-4 w-full max-w-sm sm:max-w-md aspect-[448/90] mx-auto bg-[#F5F4F0] border-[1px] border-black rounded-[30px] shadow-[0.25rem_0.25rem_#B0B0B0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-bold text-lg"
                  onClick={() => {
                    window.location.href =
                      process.env.NEXT_PUBLIC_AWS_URL +
                      "/api/web/public/oauthregister";
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 24 24"
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
                  <span>Google-ээр бүртгүүлэх</span>
                </button>
                <div className="flex flex-row items-center gap-4 my-4">
                  <span className="">Эсвэл</span>
                  <div className="h-[1px] w-full bg-[#CDCDCD]"></div>
                  <div className="h-[1px] w-full bg-[#CDCDCD]"></div>
                </div>
                <div className="flex flex-col gap-4">
                  <Input
                    id="Email"
                    name="Email"
                    type="email"
                    placeholder=""
                    label="Имэйл хаяг"
                    layoutClassName="rounded-full"
                    className="bg-inherit"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.Email}
                    errorText={registerForm.errors.Email}
                    errorVisible={
                      registerForm.touched.Email && !!registerForm.errors.Email
                    }
                  />

                  <Input
                    name="Password"
                    id="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder=""
                    label="Нууц үг"
                    layoutClassName="rounded-full"
                    className="bg-inherit"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.Password}
                    errorText={registerForm.errors.Password}
                    errorVisible={
                      registerForm.touched.Password &&
                      !!registerForm.errors.Password
                    }
                    rightSection={
                      registerForm.values.Password !== "" && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="text-sm opacity-90"
                        >
                          <Image
                            src={"/show-pwd.png"}
                            width={24}
                            height={24}
                            alt=""
                            className="w-6 h-6"
                          />
                        </button>
                      )
                    }
                  />

                  <span className="text-sm text-red-500">
                    Нууц үг доод тал нь 8 тэмдэгт байх, 1 том үсэг, 1 жижиг
                    үсэг, 1 тоо, 1 тусгай тэмдэгт{" "}
                    {"(!#$%&()*+,-./:;<=>?@[]^_{|})"}
                  </span>

                  <Input
                    name="ConfirmPassword"
                    id="ConfirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder=""
                    label="Нууц үг давтах"
                    layoutClassName="rounded-full"
                    className="bg-inherit"
                    onChange={registerForm.handleChange}
                    value={registerForm.values.ConfirmPassword}
                    errorText={registerForm.errors.ConfirmPassword}
                    errorVisible={
                      registerForm.touched.ConfirmPassword &&
                      !!registerForm.errors.ConfirmPassword
                    }
                    rightSection={
                      registerForm.values.ConfirmPassword !== "" && (
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="text-sm opacity-90"
                        >
                          <Image
                            src={"/show-pwd.png"}
                            width={24}
                            height={24}
                            alt=""
                            className="w-6 h-6"
                          />
                        </button>
                      )
                    }
                  />
                  <Button
                    type="button"
                    className="w-full max-w-sm sm:max-w-md aspect-[448/90] mx-auto bg-primary border-[1px] border-black !rounded-[30px] shadow-[0.25rem_0.25rem_#B0B0B0] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all font-bold text-white !text-lg"
                    onClick={handleSendOtp}
                  >
                    <span className="">Хаяг үүсгэх</span>
                  </Button>
                </div>
              </div>
              <p className="text-center mt-4">
                Та &nbsp;
                <Link href="/login" className="font-semibold underline">
                  Нэвтрэх үү?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Verification
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        handleSendOtp={handleSendOtp}
        colorTheme={"bg-geni-blue"}
        registerForm={registerForm}
        verificationData={sendOtpToEmailData}
        verificationSuccess={sendOtpToEmailSuccess}
      />
    </div>
  );
}

export default Page;
