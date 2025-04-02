"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEditCreatorProfileMutation } from "@/app/services/service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import StudentDetails from "./StudentDetails";
import StudentDetailsSubmit from "./StudentDetailsSubmit";
import { addStudentDetailsSchema } from "./schema";

function StudentOnboarding() {
  const router = useRouter();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const [step, setStep] = useState(1);

  const handleNextStep = async () => {
    await formik.validateForm();
    if (step === 1) {
      await formik.validateField("LastName");
      await formik.validateField("FirstName");
      await formik.validateField("Nickname");
      await formik.validateField("Bio");
      if (
        !formik.errors.LastName &&
        !formik.errors.FirstName &&
        !formik.errors.Nickname &&
        !formik.errors.Bio
      ) {
        setStep(2);
      }
    } else if (step === 2) {
      await formik.validateForm();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const [editCreatorProfile, { data, error, isLoading, isSuccess }] =
    useEditCreatorProfileMutation();

  const formik = useFormik({
    initialValues: {
      FirstName: parsedUserInfo ? parsedUserInfo?.FirstName : "",
      LastName: parsedUserInfo ? parsedUserInfo?.LastName : "",
      Nickname: parsedUserInfo ? parsedUserInfo?.Nickname : "",
      Bio: parsedUserInfo ? parsedUserInfo?.Bio : "",
      PhoneNumber: parsedUserInfo ? parsedUserInfo?.PhoneNumber : "",
      Location: parsedUserInfo ? parsedUserInfo?.Location : "",
      RegNo: parsedUserInfo ? parsedUserInfo?.RegNo : "",
      EbarimtConsumerNo: "9876543211",
      Birthday:
        parsedUserInfo?.Birthday &&
        parsedUserInfo.Birthday !== "0001-01-01T00:00:00Z"
          ? new Date(parsedUserInfo.Birthday).toISOString().split("T")[0]
          : "",
      Gender: parsedUserInfo ? parsedUserInfo?.Gender : "",
    },
    validationSchema: addStudentDetailsSchema,
    onSubmit: async (values) => {
      try {
        await editCreatorProfile(values).unwrap();
        // @ts-ignore
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Амжилттай");
      router.push("/profile");
    }
    if (error) {
      // @ts-ignore
      toast.error(error?.data?.error);
    }
  }, [isSuccess, error]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <StudentDetails
            formik={formik}
            parsedUserInfo={parsedUserInfo}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <StudentDetailsSubmit
            formik={formik}
            handlePreviousStep={handlePreviousStep}
            parsedUserInfo={parsedUserInfo}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-36 sm:mt-48 mb-12 px-5">
        <form
          onSubmit={formik.handleSubmit}
          className="max-w-5xl min-h-screen mx-auto px-7 sm:px-14 py-5 sm:py-11 container bg-[#F5F4F0] rounded-3xl"
        >
          <div className="flex flex-row justify-between items-center gap-5 my-7 w-full">
            <p className="text-xl sm:text-3xl xl:text-4xl font-bold">
              Хэрэглэгчийн мэдээлэл оруулах
            </p>
            <span className="text-[#6F6F6F] text-base sm:text-lg xl:text-xl">
              Алхам {step}/2
            </span>
          </div>
          {renderStepContent()}
        </form>
      </div>
    </div>
  );
}

export default StudentOnboarding;
