"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import {
  useEditCreatorProfileMutation,
  useGetUserInfoQuery,
} from "@/app/services/service";
import toast from "react-hot-toast";
import StudentDetails from "./StudentDetails";
import StudentDetailsSubmit from "./StudentDetailsSubmit";
import { addStudentDetailsSchema } from "./schema";
import Loader from "@/components/common/Loader";

function StudentOnboarding() {
  const router = useRouter();
  const { data: userInfoData, isLoading: userInfoLoading } =
    useGetUserInfoQuery(
      {},
      {
        // Only refetch on mount, don't poll or refetch automatically
        refetchOnMountOrArgChange: true,
        refetchOnFocus: false,
        refetchOnReconnect: false,
      }
    );
  const [step, setStep] = useState(1);

  const handleNextStep = async () => {
    await formik.validateForm();
    if (step === 1) {
      await formik.validateField("LastName");
      await formik.validateField("FirstName");
      await formik.validateField("Nickname");
      await formik.validateField("Bio");

      // Check if there are any errors
      const hasErrors = !!(
        formik.errors.LastName ||
        formik.errors.FirstName ||
        formik.errors.Nickname ||
        formik.errors.Bio
      );

      // Mark fields as touched to show validation errors
      formik.setTouched({
        LastName: true,
        FirstName: true,
        Nickname: true,
        Bio: true,
      });

      if (!hasErrors) {
        setStep(2);
      }
    } else if (step === 2) {
      await formik.validateForm();
      // Mark all fields as touched to show validation errors
      formik.setTouched({
        FirstName: true,
        LastName: true,
        Nickname: true,
        Bio: true,
        PhoneNumber: true,
        Location: true,
        RegNo: true,
        EbarimtConsumerNo: true,
        Birthday: true,
        Gender: true,
      });
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep((prevStep) => prevStep - 1);
  };

  const [editCreatorProfile, { data, error, isLoading, isSuccess }] =
    useEditCreatorProfileMutation();

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Nickname: "",
      Bio: "",
      PhoneNumber: "",
      Location: "",
      RegNo: "",
      EbarimtConsumerNo: "9876543211",
      Birthday: "",
      Gender: "F", // Default to F for initial rendering
    },
    validationSchema: addStudentDetailsSchema,
    onSubmit: async (values) => {
      console.log(values);
      try {
        await editCreatorProfile(values).unwrap();
      } catch (err) {
        // Handle specific API validation errors if there are any
        if (typeof err === "object" && err !== null) {
          // @ts-ignore - RTK query error types can be complex
          const errorData = err.data;
          if (errorData && errorData.fieldErrors) {
            // Set field-specific errors
            Object.keys(errorData.fieldErrors).forEach((field) => {
              if (field in formik.values) {
                formik.setFieldError(field, errorData.fieldErrors[field]);
              }
            });
          } else if (errorData && errorData.error) {
            // Set general form error
            toast.error(errorData.error);
          }
        } else {
          toast.error("Форм илгээх үед алдаа гарлаа");
        }
      }
    },
  });

  // Update formik values when userInfoData is loaded
  useEffect(() => {
    if (userInfoData) {
      formik.setValues({
        FirstName: userInfoData?.FirstName || "",
        LastName: userInfoData?.LastName || "",
        Nickname: userInfoData?.Nickname || "",
        Bio: userInfoData?.Bio || "",
        PhoneNumber: userInfoData?.PhoneNumber || "",
        Location: userInfoData?.Location || "",
        RegNo: userInfoData?.RegNo || "",
        EbarimtConsumerNo: "9876543211",
        Birthday:
          userInfoData?.Birthday &&
          userInfoData.Birthday !== "0001-01-01T00:00:00Z"
            ? new Date(userInfoData.Birthday).toISOString().split("T")[0]
            : "",
        Gender: userInfoData?.Gender || "F",
      });
    }
  }, [userInfoData]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Хэрэглэгчийн мэдээлэл амжилттай хадгалагдлаа");
      router.push("/profile");
    }
    if (error) {
      // Handle error safely - check if it's an object with data property
      if (typeof error === "object" && error !== null) {
        // @ts-ignore - RTK query error types can be complex
        const errorData = error.data;
        if (errorData && errorData.error && !errorData.fieldErrors) {
          toast.error(errorData.error);
        }
      } else {
        toast.error("Алдаа гарлаа");
      }
    }
  }, [isSuccess, error, router]);

  // Show loader while fetching user data
  if (userInfoLoading) {
    return <Loader />;
  }

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
