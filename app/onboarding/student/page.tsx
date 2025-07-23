"use client";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  useUploadFileMutation,
  useChangeProfilePictureMutation,
  useStudentRequestMutation,
} from "@/app/services/service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function StudentOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 2;
  const [profileImage, setProfileImage] = useState("/dummy-student.png");

  const [uploadFile, { isLoading: uploadFileLoading }] =
    useUploadFileMutation();
  const [changeProfilePicture, { isLoading: changeProfilePictureLoading }] =
    useChangeProfilePictureMutation();
  const [
    studentRequest,
    {
      isLoading: studentRequestLoading,
      isSuccess: studentRequestSuccess,
      error: studentRequestError,
    },
  ] = useStudentRequestMutation();

  // Validation schema
  const validationSchema = Yup.object({
    // Step 1 fields - Personal Information
    Lastname: Yup.string().required("Овог оруулна уу"),
    Firstname: Yup.string().required("Нэр оруулна уу"),
    Regno: Yup.string().required("Регистерийн дугаар оруулна уу"),
    Birthday: Yup.string().required("Төрсөн он/сар/өдөр оруулна уу"),
    Phonenumber: Yup.string().required("Утасны дугаар оруулна уу"),
    Gender: Yup.string().required("Хүйс сонгоно уу"),

    // Step 2 fields - Registration Information
    Nickname: Yup.string().required("Хэрэглэгчийн нэр оруулна уу"),
    Bio: Yup.string()
      .required("Богино танилцуулга оруулна уу")
      .max(600, "600 тэмдэгтээс хэтрэхгүй"),
  });

  // Formik instance
  const formik = useFormik({
    initialValues: {
      // Step 1 fields
      Lastname: "",
      Firstname: "",
      Regno: "",
      Birthday: "",
      Phonenumber: "",
      Gender: "",

      // Step 2 fields
      Nickname: "",
      Bio: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await studentRequest({
          Lastname: values.Lastname,
          Firstname: values.Firstname,
          Regno: values.Regno,
          Birthday: values.Birthday,
          Phonenumber: values.Phonenumber,
          Gender: values.Gender,
          Nickname: values.Nickname,
          Bio: values.Bio,
        }).unwrap();
      } catch (error) {
        console.error("Student request failed:", error);
      }
    },
  });

  // Handle API success/error
  useEffect(() => {
    if (studentRequestSuccess) {
      toast.success("Таны хүсэлт амжилттай илгээгдлээ!");
      router.push("/profile");
    }
    if (studentRequestError) {
      // @ts-ignore
      toast.error(studentRequestError?.data?.error || "Алдаа гарлаа");
    }
  }, [studentRequestSuccess, studentRequestError, router]);

  // Image upload functionality
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "profile-pic");

        try {
          const response = await uploadFile(formData);
          if (response.data) {
            const id = response.data.FileId;
            const profileChangeRes = await changeProfilePicture({ FileId: id });

            // Update the profile image state
            if (profileChangeRes?.data?.url) {
              setProfileImage(profileChangeRes.data.url);
            }
          }
        } catch (error) {
          console.error("File upload failed:", error);
          toast.error("Зураг хуулахад алдаа гарлаа");
        }
      }
    },
  });

  const steps = ["Хувийн мэдээлэл", "Бүртгэлийн мэдээлэл"];

  const handleNextStep = () => {
    if (step < totalSteps) {
      // Validate current step
      let fieldsToValidate: string[] = [];

      if (step === 1) {
        fieldsToValidate = [
          "Lastname",
          "Firstname",
          "Regno",
          "Birthday",
          "Phonenumber",
          "Gender",
        ];
      } else if (step === 2) {
        // Final validation before submission
        formik.handleSubmit();
        return;
      }

      // Mark fields as touched and validate
      const touchedFields = fieldsToValidate.reduce((acc, field) => {
        acc[field] = true;
        return acc;
      }, {} as any);

      formik.setTouched({ ...formik.touched, ...touchedFields });

      // Check if current step has validation errors
      const hasErrors = fieldsToValidate.some(
        (field) => formik.errors[field as keyof typeof formik.errors]
      );

      if (!hasErrors) {
        setStep(step + 1);
      }
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container text-[#2D262D] max-w-4xl mx-auto px-7 py-10">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-4">
              <div className="bg-[#4FB755] p-3 rounded-xl">
                <Image
                  src="/student-icon-white.png"
                  width={32}
                  height={32}
                  alt="Student"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Student Бүртгэл
                </h1>
                <p className="text-gray-500">
                  {step}/{totalSteps} - {steps[step - 1]}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#4FB755] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            {/* Step 1: Personal Information */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Хувийн мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Та өөрийн хувийн мэдээллээ оруулна уу
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="Lastname"
                    label="Овог"
                    placeholder="Овог"
                    value={formik.values.Lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.Lastname}
                    errorVisible={
                      !!(formik.touched.Lastname && formik.errors.Lastname)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="Firstname"
                    label="Нэр"
                    placeholder="Нэр"
                    value={formik.values.Firstname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.Firstname}
                    errorVisible={
                      !!(formik.touched.Firstname && formik.errors.Firstname)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="Regno"
                    label="Регистерийн дугаар"
                    placeholder="Регистерийн дугаар"
                    value={formik.values.Regno}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.Regno}
                    errorVisible={
                      !!(formik.touched.Regno && formik.errors.Regno)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="Birthday"
                    label="Төрсөн он/сар/өдөр"
                    placeholder="1990-01-01"
                    type="date"
                    value={formik.values.Birthday}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.Birthday}
                    errorVisible={
                      !!(formik.touched.Birthday && formik.errors.Birthday)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="Phonenumber"
                    label="Утасны дугаар"
                    placeholder="+976 99112233"
                    value={formik.values.Phonenumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.Phonenumber}
                    errorVisible={
                      !!(
                        formik.touched.Phonenumber && formik.errors.Phonenumber
                      )
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-[#6F6F6F] text-lg font-normal">
                      Хүйс
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="Gender"
                          value="M"
                          checked={formik.values.Gender === "M"}
                          onChange={formik.handleChange}
                          className="w-4 h-4 text-[#4FB755]"
                        />
                        <span>Эрэгтэй</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="Gender"
                          value="F"
                          checked={formik.values.Gender === "F"}
                          onChange={formik.handleChange}
                          className="w-4 h-4 text-[#4FB755]"
                        />
                        <span>Эмэгтэй</span>
                      </label>
                    </div>
                    {formik.touched.Gender && formik.errors.Gender && (
                      <span className="text-red-500 text-sm">
                        {formik.errors.Gender}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#4FB755] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A8F44] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Registration Information */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Бүртгэлийн мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Бүртгэлийн дэлгэрэнгүй мэдээлэл
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-11">
                  <div className="flex flex-col items-center gap-4 sm:gap-7 w-full sm:max-w-[194px] xl:max-w-[258px]">
                    <Image
                      src={profileImage}
                      width={194}
                      height={194}
                      className="object-cover rounded-xl border-[1px] border-[#2D262D] w-full aspect-square sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"
                      alt="Student Profile"
                    />
                    <div
                      {...getRootProps()}
                      className="cursor-pointer mt-2 py-2 sm:py-3 w-full text-center bg-[#4FB755] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
                    >
                      <input {...getInputProps()} />
                      Зураг оруулах
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 w-full">
                    <Input
                      name="Nickname"
                      label="Хэрэглэгчийн нэр"
                      placeholder="Хэрэглэгчийн нэр"
                      value={formik.values.Nickname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.Nickname}
                      errorVisible={
                        !!(formik.touched.Nickname && formik.errors.Nickname)
                      }
                      layoutClassName="rounded-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
                      className="text-base sm:text-xl w-full"
                      wrapperClassName="w-full"
                    />
                    <Textarea
                      name="Bio"
                      label="Богино танилцуулга"
                      placeholder="Өөрийн тухай богино мэдээлэл бичнэ үү..."
                      value={formik.values.Bio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.Bio}
                      errorVisible={!!(formik.touched.Bio && formik.errors.Bio)}
                      rows={4}
                      maxLength={600}
                      charCount={formik.values.Bio.length}
                      className="text-base sm:text-xl w-full"
                      layoutClassName="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#4FB755]"
                      wrapperClassName="w-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
                      max={true}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="text-gray-500 font-medium"
                  >
                    ← Буцах
                  </button>
                  <button
                    type="submit"
                    disabled={studentRequestLoading}
                    className="bg-[#4FB755] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A8F44] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {studentRequestLoading ? "Илгээж байна..." : "Бүртгүүлэх"}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
