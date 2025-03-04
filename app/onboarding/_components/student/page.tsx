"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {
  useEditBrandProfileMutation,
  useBrandRequestReviewMutation,
} from "@/app/services/service";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import StudentDetails from "./StudentDetails";
import StudentDetailsSubmit from "./StudentDetailsSubmit";
import StudentDetailsSuccess from "./StudentDetailsSuccess";
import { addBrandDetailsSchema } from "./schema";

function StudentOnboarding() {
  const router = useRouter();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const [step, setStep] = useState(1);

  const handleNextStep = async () => {
    if (step === 1) {
      await formik.validateField("Name");
      await formik.validateField("Bio");
      if (!formik.errors.Name && !formik.errors.Bio) {
        setStep(2);
      }
    } else if (step === 2) {
      await formik.validateForm();
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const [editBrandProfile, { data, error, isLoading, isSuccess }] =
    useEditBrandProfileMutation();

  const [
    requestReview,
    {
      data: requestReviewData,
      error: requestReviewError,
      isLoading: requestReviewLoading,
      isSuccess: requestReviewSuccess,
    },
  ] = useBrandRequestReviewMutation();

  const formik = useFormik({
    initialValues: {
      Name: parsedUserInfo ? parsedUserInfo?.Name : "",
      Bio: parsedUserInfo ? parsedUserInfo?.Bio : "",
      Website: parsedUserInfo ? parsedUserInfo?.Website : "",
      PhoneNumber: parsedUserInfo ? parsedUserInfo?.PhoneNumber : "",
      RegNo: parsedUserInfo ? parsedUserInfo?.RegNo : "",
      Address: parsedUserInfo ? parsedUserInfo?.Address : "",
      BrandAoADescription: "temp-desc",
      HasMarketingPersonel: false,
      AvgProductSalesMonthly: parsedUserInfo
        ? parsedUserInfo?.AvgProductSalesMonthly
        : 0,
      AvgPrice: parsedUserInfo ? parsedUserInfo?.AvgPrice : 0,
    },
    validationSchema: addBrandDetailsSchema,
    onSubmit: async (values) => {
      try {
        await editBrandProfile(values).unwrap();
        // @ts-ignore
        await requestReview();
        setStep(3);
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess && requestReviewSuccess) {
      toast.success("Амжилттай");
    }
    if (error || requestReviewError) {
      // @ts-ignore
      toast.error(error?.data?.error || requestReviewError?.data?.error);
    }
  }, [data, error, requestReviewSuccess, requestReviewError]);

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
      case 3:
        return <StudentDetailsSuccess router={router} />;
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
              Мэдээлэл оруулах
            </p>
            <span className="text-[#6F6F6F] text-base sm:text-lg xl:text-xl">
              Алхам {step}/3
            </span>
          </div>
          {renderStepContent()}
        </form>
      </div>
    </div>
  );
}

export default StudentOnboarding;
