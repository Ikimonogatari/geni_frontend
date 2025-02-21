"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import BackButton from "@/components/common/BackButton";
import Image from "next/image";
import CreatorDetails from "./CreatorDetails";
import Cookies from "js-cookie";
import { useEditCreatorProfileMutation } from "@/app/services/service";
import CreatorQuestions from "./CreatorQuestions";
import UploadSampleContent from "./UploadSampleContent";

function CreatorOnboarding() {
  const [step, setStep] = useState(0);

  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const sidebarNavs = ["Ерөнхий мэдээлэл", "Асуулт", "Контент нэмэх"];

  const [editCreatorProfile, { data, error, isLoading, isSuccess }] =
    useEditCreatorProfileMutation();

  const formik = useFormik({
    initialValues: {
      FirstName: parsedUserInfo ? parsedUserInfo?.FirstName : "",
      LastName: parsedUserInfo ? parsedUserInfo?.LastName : "",
      Email: parsedUserInfo ? parsedUserInfo?.Email : "",
      PhoneNumber: parsedUserInfo ? parsedUserInfo?.PhoneNumber : "",
      BirthDate: parsedUserInfo ? parsedUserInfo?.BirthDate : "",
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("Заавал бөглөнө үү"),
      LastName: Yup.string().required("Заавал бөглөнө үү"),
      Email: Yup.string().required("Заавал бөглөнө үү"),
      PhoneNumber: Yup.string().required("Заавал бөглөнө үү"),
      BirthDate: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: async (values) => {
      try {
        await editCreatorProfile(values).unwrap();
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });

  const questionsFormik = useFormik({
    initialValues: {
      Job: "",
      TechUsage: "",
      Motives: "",
    },
    validationSchema: Yup.object({
      Job: Yup.string().required("Заавал бөглөнө үү"),
      TechUsage: Yup.string().required("Заавал бөглөнө үү"),
      Motives: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: async (values) => {
      try {
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });
  const contentUploadFormik = useFormik({
    initialValues: {
      contentLink: "",
      content: [],
    },
    validationSchema: Yup.object({
      contentLink: Yup.string().required("Заавал бөглөнө үү"),
      content: Yup.array().required("Заавал бөглөнө үү"),
    }),
    onSubmit: async (values) => {
      try {
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });

  const renderStepContent = () => {
    switch (step) {
      case 0:
        return (
          <CreatorDetails
            parsedUserInfo={parsedUserInfo}
            formik={formik}
            setStep={setStep}
          />
        );
      case 1:
        return <CreatorQuestions formik={questionsFormik} />;
      case 2:
        return <UploadSampleContent formik={contentUploadFormik} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-24 sm:mt-36 mb-12">
        <div className="max-w-5xl min-h-screen mx-auto sm:px-14 py-5 sm:py-11 container">
          <BackButton />
          <div className="flex flex-row justify-between items-center gap-5 my-7 w-full">
            <p className="text-xl sm:text-3xl xl:text-4xl font-bold">
              Geni Creator болох өргөдөл
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-start gap-5 sm:gap-10">
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:gap-5 sm:max-w-[215px] w-full">
              {sidebarNavs.map((s, i) => (
                <div
                  key={i}
                  className={`${
                    i === step
                      ? "border border-primary text-primary"
                      : "border border-white text-[#6F6F6F]"
                  } transition-all duration-150 col-span-1 w-full rounded-lg p-2 flex flex-col sm:flex-row items-center gap-1 sm:gap-3`}
                  onClick={() => setStep(i)}
                >
                  <Image
                    src={`/creator-onboarding-icon${i + 1}.png`}
                    width={24}
                    height={24}
                    className="w-6 h-6 aspect-square"
                    alt=""
                  />
                  <span className="text-xs sm:text-lg text-center whitespace-normal sm:whitespace-nowrap">
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <div className="bg-geni-gray h-[1px] sm:h-[835px] w-full sm:w-[1px] sm:py-1"></div>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorOnboarding;
