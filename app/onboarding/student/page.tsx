"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useDropzone } from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  useUploadFileMutation,
  useChangeProfilePictureMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";

export default function StudentOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 2;

  // Image upload state
  const [profileImage, setProfileImage] = useState("/dummy-student.png");

  // API hooks
  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
      isSuccess: uploadFileSuccess,
    },
  ] = useUploadFileMutation();

  const [
    changeProfilePicture,
    {
      data: changeProfilePictureData,
      error: changeProfilePictureError,
      isLoading: changeProfilePictureLoading,
      isSuccess: changeProfilePictureSuccess,
    },
  ] = useChangeProfilePictureMutation();

  // Effects for API responses
  useEffect(() => {
    if (uploadFileError) {
      // @ts-ignore
      toast.error(uploadFileError?.data?.error);
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (changeProfilePictureSuccess) {
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      // @ts-ignore
      toast.error(changeProfilePictureError?.data?.error);
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  // Validation schema
  const validationSchema = Yup.object({
    // Step 1 fields
    lastName: Yup.string().required("Овог оруулна уу"),
    firstName: Yup.string().required("Нэр оруулна уу"),
    regNo: Yup.string().required("Регистерийн дугаар оруулна уу"),
    birthDate: Yup.string().required("Төрсөн он/сар/өдөр оруулна уу"),
    phoneNumber: Yup.string().required("Утасны дугаар оруулна уу"),
    gender: Yup.string().required("Хүйс сонгоно уу"),

    // Step 2 fields
    username: Yup.string().required("Хэрэглэгчийн нэр оруулна уу"),
    instagramUsername: Yup.string(),
    instagramChecked: Yup.boolean(),
    facebookUsername: Yup.string(),
    facebookChecked: Yup.boolean(),
    bio: Yup.string()
      .required("Богино танилцуулга оруулна уу")
      .max(600, "600 тэмдэгтээс хэтрэхгүй"),
  });

  // Formik instance
  const formik = useFormik({
    initialValues: {
      // Step 1 fields
      lastName: "",
      firstName: "",
      regNo: "",
      birthDate: "",
      phoneNumber: "",
      gender: "",

      // Step 2 fields
      username: "",
      instagramUsername: "",
      instagramChecked: false,
      facebookUsername: "",
      facebookChecked: false,
      bio: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      // Handle form submission here
    },
  });

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

            // Update the profile image state with the uploaded image URL
            if (profileChangeRes?.data?.url) {
              setProfileImage(profileChangeRes.data.url);
            }
          }
        } catch (error) {
          console.error("File upload or profile picture update failed:", error);
        }
      }
    },
  });

  // Step validation functions
  const validateStep1 = async () => {
    const step1Fields = [
      "lastName",
      "firstName",
      "regNo",
      "birthDate",
      "phoneNumber",
      "gender",
    ];

    // Touch all step 1 fields
    const touchedFields = {};
    step1Fields.forEach((field) => {
      touchedFields[field] = true;
    });
    formik.setTouched(touchedFields);

    // Validate step 1 fields
    await formik.validateForm();

    // Check if any step 1 fields have errors
    const step1Errors = step1Fields.some((field) => formik.errors[field]);
    return !step1Errors;
  };

  const validateStep2 = async () => {
    const step2Fields = ["username", "bio"];

    // Touch all step 2 fields
    const touchedFields = {};
    step2Fields.forEach((field) => {
      touchedFields[field] = true;
    });
    formik.setTouched({ ...formik.touched, ...touchedFields });

    // Validate step 2 fields
    await formik.validateForm();

    // Check if any step 2 fields have errors
    const step2Errors = step2Fields.some((field) => formik.errors[field]);
    return !step2Errors;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      const isValid = await validateStep1();
      if (isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      const isValid = await validateStep2();
      if (isValid) {
        // Can submit or go to next step
        formik.handleSubmit();
      }
    }
  };

  const steps = ["Хувийн мэдээлэл", "Нэмэлт мэдээлэл"];

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-7 py-11 container">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8">
            {/* Header with Progress */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Image src="/logo.svg" width={89} height={32} alt="logo" />
                  <div className="flex items-center gap-2">
                    <Image src="/logo.svg" width={51} height={18} alt="logo" />
                    <span className="text-xs font-medium px-2 py-1 bg-[#E8FFE9] text-[#4FB755] rounded-full">
                      STUDENT
                    </span>
                  </div>
                </div>
                Сайн уу, daimaawork@gmail.com
              </div>

              {/* Progress Steps */}
              <div className="flex items-center gap-2">
                {steps.map((stepName, index) => (
                  <div key={index} className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-sm
                        ${
                          step > index + 1
                            ? "bg-[#4FB755] text-white"
                            : step === index + 1
                            ? "bg-[#4FB755] text-white"
                            : "bg-[#F5F5F5] text-gray-400"
                        }`}
                      >
                        {step > index + 1 ? "✓" : index + 1}
                      </div>
                      <span
                        className={`text-sm ${
                          step === index + 1
                            ? "text-[#4FB755] font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {stepName}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-[2px] mt-2 ${
                          index < step - 1 ? "bg-[#4FB755]" : "bg-[#F5F5F5]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Хувийн мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Өөрийн мэдээллээ оруулна уу
                  </p>
                </div>

                {/* 6 inputs in 2 rows, 3 inputs per row */}
                <div className="flex flex-col gap-4">
                  {/* First row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="lastName"
                      label="Овог"
                      placeholder="Овог"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.lastName}
                      errorVisible={
                        !!(formik.touched.lastName && formik.errors.lastName)
                      }
                      layoutClassName="rounded-full"
                    />
                    <Input
                      name="firstName"
                      label="Нэр"
                      placeholder="Нэр"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.firstName}
                      errorVisible={
                        !!(formik.touched.firstName && formik.errors.firstName)
                      }
                      layoutClassName="rounded-full"
                    />
                    <Input
                      name="regNo"
                      label="Регистерийн дугаар"
                      placeholder="Регистерийн дугаар"
                      value={formik.values.regNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.regNo}
                      errorVisible={
                        !!(formik.touched.regNo && formik.errors.regNo)
                      }
                      layoutClassName="rounded-full"
                    />
                  </div>

                  {/* Second row */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      name="birthDate"
                      label="Төрсөн он/сар/өдөр"
                      placeholder="YYYY/MM/DD"
                      type="date"
                      value={formik.values.birthDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.birthDate}
                      errorVisible={
                        !!(formik.touched.birthDate && formik.errors.birthDate)
                      }
                      layoutClassName="rounded-full"
                    />
                    <Input
                      name="phoneNumber"
                      label="Утасны дугаар"
                      placeholder="Утасны дугаар"
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.phoneNumber}
                      errorVisible={
                        !!(
                          formik.touched.phoneNumber &&
                          formik.errors.phoneNumber
                        )
                      }
                      layoutClassName="rounded-full"
                    />
                    <div className="flex flex-col gap-3">
                      <label className="font-bold">Хүйс</label>
                      <select
                        name="gender"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="bg-white flex gap-1 items-center p-2 border-[1px] border-[#CDCDCD] rounded-full h-12 outline-none"
                      >
                        <option value="">Хүйс сонгоно уу</option>
                        <option value="male">Эрэгтэй</option>
                        <option value="female">Эмэгтэй</option>
                      </select>
                      {formik.touched.gender && formik.errors.gender && (
                        <div className="text-red-500 text-sm">
                          {formik.errors.gender}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#4FB755] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A8F44] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Additional Info */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Бүртгэлийн мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Бүртгэлийн дэлгэрэнгүй мэдээлэл
                  </p>
                </div>

                {/* Two column layout */}
                <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-11">
                  {/* Left column - Image upload */}
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

                  {/* Right column - Form fields */}
                  <div className="flex flex-col gap-4 w-full">
                    {/* First row - Username input */}
                    <Input
                      name="username"
                      label="Хэрэглэгчийн нэр"
                      placeholder="Хэрэглэгчийн нэр"
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.username}
                      errorVisible={
                        !!(formik.touched.username && formik.errors.username)
                      }
                      layoutClassName="rounded-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
                      className="text-base sm:text-xl w-full"
                      wrapperClassName="w-full"
                    />

                    {/* Second row - Social media */}
                    <div className="flex flex-col gap-3 w-full">
                      <label className="text-[#6F6F6F] text-lg font-normal">
                        Сошиал хаяг
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {/* Instagram input */}
                        <div className="flex-1">
                          <div className="w-full bg-white rounded-full border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center overflow-hidden">
                            <div className="flex items-center gap-3 px-4 py-4 flex-1">
                              <Image
                                src={"/Instagram.png"}
                                width={24}
                                height={24}
                                alt="Instagram"
                                className="w-6 h-6"
                              />
                              <input
                                type="text"
                                name="instagramUsername"
                                placeholder="Instagram хэрэглэгчийн нэр"
                                className="bg-transparent outline-none w-full"
                                value={formik.values.instagramUsername}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                formik.setFieldValue(
                                  "instagramChecked",
                                  !formik.values.instagramChecked
                                )
                              }
                              className={`h-full aspect-square flex items-center justify-center transition-colors ${
                                formik.values.instagramChecked
                                  ? "bg-green-500"
                                  : "bg-[#E6E6E6]"
                              }`}
                            >
                              <Image
                                src={"/check-icon.png"}
                                width={16}
                                height={16}
                                className={`w-4 h-4 ${
                                  formik.values.instagramChecked
                                    ? "brightness-0 invert"
                                    : "brightness-0"
                                }`}
                                alt="check"
                              />
                            </button>
                          </div>
                        </div>

                        {/* Facebook input */}
                        <div className="flex-1">
                          <div className="w-full bg-white rounded-full border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center overflow-hidden">
                            <div className="flex items-center gap-3 px-4 py-4 flex-1">
                              <Image
                                src={"/Facebook.png"}
                                width={24}
                                height={24}
                                alt="Facebook"
                                className="w-6 h-6"
                              />
                              <input
                                type="text"
                                name="facebookUsername"
                                placeholder="Facebook хэрэглэгчийн нэр"
                                className="bg-transparent outline-none w-full"
                                value={formik.values.facebookUsername}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() =>
                                formik.setFieldValue(
                                  "facebookChecked",
                                  !formik.values.facebookChecked
                                )
                              }
                              className={`h-full aspect-square flex items-center justify-center transition-colors ${
                                formik.values.facebookChecked
                                  ? "bg-green-500"
                                  : "bg-[#E6E6E6]"
                              }`}
                            >
                              <Image
                                src={"/check-icon.png"}
                                width={16}
                                height={16}
                                className={`w-4 h-4 ${
                                  formik.values.facebookChecked
                                    ? "brightness-0 invert"
                                    : "brightness-0"
                                }`}
                                alt="check"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Third row - Bio textarea */}
                    <Textarea
                      name="bio"
                      label="Богино танилцуулга"
                      placeholder="Өөрийн тухай богино мэдээлэл бичнэ үү..."
                      value={formik.values.bio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.bio}
                      errorVisible={!!(formik.touched.bio && formik.errors.bio)}
                      rows={4}
                      maxLength={600}
                      charCount={formik.values.bio.length}
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
                    onClick={() => setStep(1)}
                    className="text-gray-500 font-medium"
                  >
                    ← Буцах
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4FB755] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A8F44] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Бүртгүүлэх
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
