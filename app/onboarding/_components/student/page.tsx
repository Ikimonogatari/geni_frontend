"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEditCreatorProfileMutation, useGetUserInfoQuery } from "@/app/services/service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import StudentDetails from "./StudentDetails";
import StudentDetailsSubmit from "./StudentDetailsSubmit";
import { addStudentDetailsSchema } from "./schema";

function StudentOnboarding() {
  const router = useRouter();
  const { data: userInfoData, error: userInfoError } = useGetUserInfoQuery();
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
      FirstName: userInfoData ? userInfoData?.FirstName : "",
      LastName: userInfoData ? userInfoData?.LastName : "",
      Nickname: userInfoData ? userInfoData?.Nickname : "",
      Bio: userInfoData ? userInfoData?.Bio : "",
      PhoneNumber: userInfoData ? userInfoData?.PhoneNumber : "",
      Location: userInfoData ? userInfoData?.Location : "",
      RegNo: userInfoData ? userInfoData?.RegNo : "",
      EbarimtConsumerNo: "9876543211",
      Birthday:
        userInfoData?.Birthday &&
        userInfoData.Birthday !== "0001-01-01T00:00:00Z"
          ? new Date(userInfoData.Birthday).toISOString().split("T")[0]
          : "",
      Gender: userInfoData ? userInfoData?.Gender : "",
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
            parsedUserInfo={userInfoData}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <StudentDetailsSubmit
            formik={formik}
            handlePreviousStep={handlePreviousStep}
            parsedUserInfo={userInfoData}
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
