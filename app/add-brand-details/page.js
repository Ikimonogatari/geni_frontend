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
import BrandDetails from "./BrandDetails";
import BrandDetailsSubmit from "./BrandDetailsSubmit";
import BrandDetailsSuccess from "./BrandDetailsSuccess";

function Page() {
  const router = useRouter();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const [step, setStep] = useState(1);

  const handleNextStep = async () => {
    if (step === 1) {
      await formik.validateField("Name");
      await formik.validateField("Bio");
      console.log("hello");
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
    validationSchema: Yup.object({
      Name: Yup.string().required("Заавал бөглөнө үү"),
      PhoneNumber: Yup.string().required("Заавал бөглөнө үү"),
      Bio: Yup.string().required("Заавал бөглөнө үү"),
      Website: Yup.string().required("Заавал бөглөнө ү"),
      RegNo: Yup.string().required("Заавал бөглөнө үү"),
      Address: Yup.string().required("Заавал бөглөнө үү"),
      AvgPrice: Yup.number().required("Заавал бөглөнө үү"),
      AvgProductSalesMonthly: Yup.number().required("Заавал бөглөнө үү"),
    }),
    onSubmit: async (values) => {
      console.log(values, "VALUES");
      try {
        console.log("SUBMITTED");
        await editBrandProfile(values).unwrap();
        await requestReview();
        setStep(3);
      } catch (error) {
        toast.error("Алдаа гарлаа");
        console.error("Error submitting the form", error);
      }
    },
  });

  useEffect(() => {
    if (isSuccess || requestReviewSuccess) {
      toast.success("Амжилттай");
    }
    if (error || requestReviewError) {
      toast.error(error?.data?.error || requestReviewError?.data?.error);
    }
  }, [data, error, requestReviewSuccess, requestReviewError]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <BrandDetails
            formik={formik}
            parsedUserInfo={parsedUserInfo}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <BrandDetailsSubmit
            formik={formik}
            handlePreviousStep={handlePreviousStep}
            parsedUserInfo={parsedUserInfo}
          />
        );
      case 3:
        return <BrandDetailsSuccess router={router} />;
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

export default Page;
