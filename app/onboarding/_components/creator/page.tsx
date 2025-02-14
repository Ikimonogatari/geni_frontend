"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BackButton from "@/components/common/BackButton";
import Image from "next/image";
import CreatorDetails from "./CreatorDetails";
import Cookies from "js-cookie";
import { useEditCreatorProfileMutation } from "@/app/services/service";

function CreatorOnboarding() {
  const [step, setStep] = useState(1);

  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const sidebarNavs = ["Ерөнхий мэдээлэл", "Асуулт", "Контент нэмэх"];

  const [editCreatorProfile, { data, error, isLoading, isSuccess }] =
    useEditCreatorProfileMutation();

  const formik = useFormik({
    initialValues: {
      FirstName: parsedUserInfo ? parsedUserInfo?.FirstName : "",
      LastName: parsedUserInfo ? parsedUserInfo?.FirstName : "",
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <CreatorDetails
            parsedUserInfo={parsedUserInfo}
            formik={formik}
            setStep={setStep}
          />
        );
      case 2:
        return (
          <p className="text-lg sm:text-xl font-semibold">
            Асуултын хэсгийн агуулга энд байна.
          </p>
        );
      case 3:
        return (
          <p className="text-lg sm:text-xl font-semibold">
            Контент нэмэх хэсгийн агуулга энд байна.
          </p>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-36 sm:mt-48 mb-12 px-5">
        <div className="max-w-5xl min-h-screen mx-auto px-7 sm:px-14 py-5 sm:py-11 container">
          <BackButton />
          <div className="flex flex-row justify-between items-center gap-5 my-7 w-full">
            <p className="text-xl sm:text-3xl xl:text-4xl font-bold">
              Geni Creator болох өргөдөл
            </p>
          </div>
          <div className="flex flex-row items-start gap-10">
            <div className="flex flex-col gap-5">
              {sidebarNavs.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-row items-center gap-3"
                  onClick={() => setStep(i + 1)}
                >
                  <Image
                    src={`/creator-onboarding-icon${i + 1}.png`}
                    width={24}
                    height={24}
                    className="w-6 h-6 aspect-square"
                    alt=""
                  />
                  <span className="text-base sm:text-lg">{s}</span>
                </div>
              ))}
            </div>
            <div className="bg-geni-gray h-[835px] w-[1px] py-1"></div>
            {renderStepContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatorOnboarding;
