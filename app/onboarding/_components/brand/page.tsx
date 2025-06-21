"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import {
  useEditBrandProfileMutation,
  useBrandRequestReviewMutation,
  useGetUserInfoQuery,
} from "@/app/services/service";
import toast from "react-hot-toast";
import BrandDetails from "./BrandDetails";
import BrandDetailsSubmit from "./BrandDetailsSubmit";
import BrandDetailsSuccess from "./BrandDetailsSuccess";
import { addBrandDetailsSchema } from "./schema";
import Loader from "@/components/common/Loader";

function BrandOnboarding() {
  const router = useRouter();
  const { data: userInfo, isLoading: userInfoLoading } = useGetUserInfoQuery(
    {}
  );

  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step === 1) {
      // Validate first page fields
      formik.validateField("Name");
      formik.validateField("Bio");

      // Mark fields as touched to show validation errors
      formik.setTouched({
        Name: true,
        Bio: true,
      });

      // Check if there are any errors in these fields
      if (!formik.errors.Name && !formik.errors.Bio) {
        setStep(2);
      }
    } else if (step === 2) {
      // Form submission is handled in BrandDetailsSubmit component
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
      Name: "",
      Bio: "",
      Website: "",
      PhoneNumber: "",
      RegNo: "",
      Address: "",
      BrandAoADescription: "temp-desc",
      HasMarketingPersonel: false,
      AvgProductSalesMonthly: 0,
      AvgPrice: 0,
    },
    validationSchema: addBrandDetailsSchema,
    onSubmit: async (values) => {
      await editBrandProfile(values).unwrap();
      await requestReview({}).unwrap();
      setStep(3);
    },
  });

  // Update formik values when userInfo data is loaded
  useEffect(() => {
    if (userInfo) {
      // Only update form values if they haven't been set yet or if they're empty
      const shouldUpdate = !formik.values.Name || !formik.values.Bio;

      if (shouldUpdate) {
        formik.setValues({
          Name: userInfo?.Name || "",
          Bio: userInfo?.Bio || "",
          Website: userInfo?.Website || "",
          PhoneNumber: userInfo?.PhoneNumber || "",
          RegNo: userInfo?.RegNo || "",
          Address: userInfo?.Address || "",
          BrandAoADescription: "temp-desc",
          HasMarketingPersonel: userInfo?.HasMarketingPersonel || false,
          AvgProductSalesMonthly: userInfo?.AvgProductSalesMonthly || 0,
          AvgPrice: userInfo?.AvgPrice || 0,
        });
      }
    }
  }, [userInfo]);

  useEffect(() => {
    if (isSuccess && requestReviewSuccess) {
      toast.success("Бренд мэдээлэл амжилттай хадгалагдлаа");
      setStep(3);
    }
    if (error) {
      // Handle error safely - check if it's an object with data property
      if (typeof error === "object" && error !== null) {
        // @ts-ignore - RTK query error types can be complex
        const errorData = error.data;
        if (errorData && errorData.fieldErrors) {
          // Set field-specific errors
          Object.keys(errorData.fieldErrors).forEach((field) => {
            if (field in formik.values) {
              formik.setFieldError(field, errorData.fieldErrors[field]);
            }
          });
        } else if (errorData && errorData.error) {
          toast.error(errorData.error);
        }
      } else {
        toast.error("Алдаа гарлаа");
      }
    }
    if (requestReviewError) {
      // @ts-ignore
      toast.error(
        // @ts-ignore
        requestReviewError?.data?.error || "Хүсэлт илгээх үед алдаа гарлаа"
      );
    }
  }, [data, error, requestReviewSuccess, requestReviewError]);

  // Show loader while fetching user data
  if (userInfoLoading) {
    return <Loader />;
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <BrandDetails
            formik={formik}
            userInfo={userInfo}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <BrandDetailsSubmit
            formik={formik}
            handlePreviousStep={handlePreviousStep}
            userInfo={userInfo}
          />
        );
      case 3:
        return <BrandDetailsSuccess router={router} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="py-14 px-5">
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

export default BrandOnboarding;
