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
  useCreatorRequestMutation,
} from "@/app/services/service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function CreatorOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const [profileImage, setProfileImage] = useState("/dummy-creator.png");
  const [contentFile, setContentFile] = useState<File | null>(null);
  const [contentFileName, setContentFileName] = useState("");

  const [uploadFile, { isLoading: uploadFileLoading }] =
    useUploadFileMutation();
  const [changeProfilePicture, { isLoading: changeProfilePictureLoading }] =
    useChangeProfilePictureMutation();
  const [
    creatorRequest,
    {
      isLoading: creatorRequestLoading,
      isSuccess: creatorRequestSuccess,
      error: creatorRequestError,
    },
  ] = useCreatorRequestMutation();

  // Validation schema
  const validationSchema = Yup.object({
    // Step 1 fields - Personal Information
    LastName: Yup.string().required("Овог оруулна уу"),
    FirstName: Yup.string().required("Нэр оруулна уу"),
    RegNo: Yup.string().required("Регистерийн дугаар оруулна уу"),
    Birthday: Yup.string().required("Төрсөн он/сар/өдөр оруулна уу"),
    PhoneNumber: Yup.string().required("Утасны дугаар оруулна уу"),
    Gender: Yup.string().required("Хүйс сонгоно уу"),

    // Step 2 fields - Registration Information
    Nickname: Yup.string().required("Хэрэглэгчийн нэр оруулна уу"),
    IgLink: Yup.string().url("Зөв Instagram хаяг оруулна уу"),
    FbLink: Yup.string().url("Зөв Facebook хаяг оруулна уу"),
    ShortInfo: Yup.string()
      .required("Богино танилцуулга оруулна уу")
      .max(600, "600 тэмдэгтээс хэтрэхгүй"),

    // Step 3 fields - Q&A
    CurrentWorkQA: Yup.string().required("Асуултад хариулна уу"),
    TechsQA: Yup.string().required("Технологийн платформын талаар бичнэ үү"),
    WhyGeniCreatorQA: Yup.string().required(
      "Geni creator болох шалтгаанаа бичнэ үү"
    ),

    // Step 4 fields - Content Upload
    ContentLink: Yup.string().url("Зөв URL хаяг оруулна уу"),
  });

  // Formik instance
  const formik = useFormik({
    initialValues: {
      // Step 1 fields
      LastName: "",
      FirstName: "",
      RegNo: "",
      Birthday: "",
      PhoneNumber: "",
      Gender: "",

      // Step 2 fields
      Nickname: "",
      IgLink: "",
      FbLink: "",
      ShortInfo: "",

      // Step 3 fields
      CurrentWorkQA: "",
      TechsQA: "",
      WhyGeniCreatorQA: "",

      // Step 4 fields
      ContentLink: "http://",
      ContentFileId: null,
      ProfilePictureId: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        // Ensure either ContentLink or ContentFileId is provided
        if (!values.ContentLink || values.ContentLink === "http://") {
          if (!values.ContentFileId) {
            toast.error("Контент линк эсвэл файл оруулна уу");
            return;
          }
        }

        await creatorRequest({
          LastName: values.LastName,
          FirstName: values.FirstName,
          RegNo: values.RegNo,
          Birthday: values.Birthday,
          PhoneNumber: values.PhoneNumber,
          Gender: values.Gender,
          Nickname: values.Nickname,
          IgLink: values.IgLink,
          FbLink: values.FbLink,
          ShortInfo: values.ShortInfo,
          CurrentWorkQA: values.CurrentWorkQA,
          TechsQA: values.TechsQA,
          WhyGeniCreatorQA: values.WhyGeniCreatorQA,
          ContentLink:
            values.ContentLink !== "http://" ? values.ContentLink : "",
          ContentFileId: values.ContentFileId || 0,
          ProfilePictureId: values.ProfilePictureId || 0,
        }).unwrap();
      } catch (error) {
        console.error("Creator request failed:", error);
      }
    },
  });

  // Handle API success/error
  useEffect(() => {
    if (creatorRequestSuccess) {
      toast.success("Таны хүсэлт амжилттай илгээгдлээ!");
      router.push("/profile");
    }
    if (creatorRequestError) {
      // @ts-ignore
      toast.error(creatorRequestError?.data?.error || "Алдаа гарлаа");
    }
  }, [creatorRequestSuccess, creatorRequestError, router]);

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

            // Update the profile image state and formik
            if (profileChangeRes?.data?.url) {
              setProfileImage(profileChangeRes.data.url);
              formik.setFieldValue("ProfilePictureId", id);
            }
          }
        } catch (error) {
          console.error("File upload failed:", error);
          toast.error("Зураг хуулахад алдаа гарлаа");
        }
      }
    },
  });

  // Handle file upload for content
  const handleContentFileUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "content");

    try {
      const response = await uploadFile(formData);
      if (response.data) {
        const id = response.data.FileId;
        setContentFile(file);
        setContentFileName(file.name);
        formik.setFieldValue("ContentFileId", id);
      }
    } catch (error) {
      console.error("Content file upload failed:", error);
      toast.error("Файл хуулахад алдаа гарлаа");
    }
  };

  const steps = [
    "Хувийн мэдээлэл",
    "Бүртгэлийн мэдээлэл",
    "Асуулт хариулах",
    "Контент оруулах",
  ];

  const handleNextStep = () => {
    if (step < totalSteps) {
      // Validate current step
      let fieldsToValidate: string[] = [];

      if (step === 1) {
        fieldsToValidate = [
          "LastName",
          "FirstName",
          "RegNo",
          "Birthday",
          "PhoneNumber",
          "Gender",
        ];
      } else if (step === 2) {
        fieldsToValidate = ["Nickname", "ShortInfo"];
      } else if (step === 3) {
        fieldsToValidate = ["CurrentWorkQA", "TechsQA", "WhyGeniCreatorQA"];
      } else if (step === 4) {
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
              <div className="bg-[#CA7FFE] p-3 rounded-xl">
                <Image
                  src="/creator-icon-white.png"
                  width={32}
                  height={32}
                  alt="Creator"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Creator Бүртгэл
                </h1>
                <p className="text-gray-500">
                  {step}/{totalSteps} - {steps[step - 1]}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#CA7FFE] h-2 rounded-full transition-all duration-300"
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
                    name="LastName"
                    label="Овог"
                    placeholder="Овог"
                    value={formik.values.LastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.LastName}
                    errorVisible={
                      !!(formik.touched.LastName && formik.errors.LastName)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="FirstName"
                    label="Нэр"
                    placeholder="Нэр"
                    value={formik.values.FirstName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.FirstName}
                    errorVisible={
                      !!(formik.touched.FirstName && formik.errors.FirstName)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="RegNo"
                    label="Регистерийн дугаар"
                    placeholder="Регистерийн дугаар"
                    value={formik.values.RegNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.RegNo}
                    errorVisible={
                      !!(formik.touched.RegNo && formik.errors.RegNo)
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
                    name="PhoneNumber"
                    label="Утасны дугаар"
                    placeholder="+976 99112233"
                    value={formik.values.PhoneNumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.PhoneNumber}
                    errorVisible={
                      !!(
                        formik.touched.PhoneNumber && formik.errors.PhoneNumber
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
                          className="w-4 h-4 text-[#CA7FFE]"
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
                          className="w-4 h-4 text-[#CA7FFE]"
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
                    className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9B4BD8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
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
                      alt="Creator Profile"
                    />
                    <div
                      {...getRootProps()}
                      className="cursor-pointer mt-2 py-2 sm:py-3 w-full text-center bg-[#CA7FFE] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
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
                    <div className="flex flex-col gap-3 w-full">
                      <label className="text-[#6F6F6F] text-lg font-normal">
                        Сошиал хаяг
                      </label>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                          name="IgLink"
                          placeholder="Instagram хаяг"
                          value={formik.values.IgLink}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          errorText={formik.errors.IgLink}
                          errorVisible={
                            !!(formik.touched.IgLink && formik.errors.IgLink)
                          }
                          layoutClassName="rounded-full"
                          className="text-base sm:text-xl w-full"
                          leftSection={
                            <Image
                              src="/Instagram.png"
                              width={24}
                              height={24}
                              alt="Instagram"
                              className="w-6 h-6"
                            />
                          }
                        />
                        <Input
                          name="FbLink"
                          placeholder="Facebook хаяг"
                          value={formik.values.FbLink}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          errorText={formik.errors.FbLink}
                          errorVisible={
                            !!(formik.touched.FbLink && formik.errors.FbLink)
                          }
                          layoutClassName="rounded-full"
                          className="text-base sm:text-xl w-full"
                          leftSection={
                            <Image
                              src="/Facebook.png"
                              width={24}
                              height={24}
                              alt="Facebook"
                              className="w-6 h-6"
                            />
                          }
                        />
                      </div>
                    </div>
                    <Textarea
                      name="ShortInfo"
                      label="Богино танилцуулга"
                      placeholder="Өөрийн тухай богино мэдээлэл бичнэ үү..."
                      value={formik.values.ShortInfo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.ShortInfo}
                      errorVisible={
                        !!(formik.touched.ShortInfo && formik.errors.ShortInfo)
                      }
                      rows={4}
                      maxLength={600}
                      charCount={formik.values.ShortInfo.length}
                      className="text-base sm:text-xl w-full"
                      layoutClassName="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#CA7FFE]"
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
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9B4BD8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Q&A */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Асуулт хариулах</h2>
                  <p className="text-sm text-gray-500">
                    Доорх асуултуудад хариулна уу
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <Textarea
                    name="CurrentWorkQA"
                    label="Одоо ажил эрхэлдэг үү?"
                    placeholder="Та одоо ямар ажил эрхэлж байгаа талаараа дэлгэрэнгүй бичнэ үү. Хэрэв ажилгүй бол яагаад ажилгүй байгаа шалтгаанаа бичнэ үү."
                    value={formik.values.CurrentWorkQA}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.CurrentWorkQA}
                    errorVisible={
                      !!(
                        formik.touched.CurrentWorkQA &&
                        formik.errors.CurrentWorkQA
                      )
                    }
                    rows={4}
                    className="text-base sm:text-xl w-full"
                    layoutClassName="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#CA7FFE]"
                    wrapperClassName="w-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                  />
                  <Textarea
                    name="TechsQA"
                    label="Өөрийн өдөр тутамдаа хамгийн түгээмэл ашигладаг технологийн платформ, гар утасны апп зэргээ хуваалцаарай"
                    placeholder="Жишээ: Instagram, TikTok, Canva, Adobe Photoshop, гэх мэт..."
                    value={formik.values.TechsQA}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.TechsQA}
                    errorVisible={
                      !!(formik.touched.TechsQA && formik.errors.TechsQA)
                    }
                    rows={4}
                    className="text-base sm:text-xl w-full"
                    layoutClassName="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#CA7FFE]"
                    wrapperClassName="w-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                  />
                  <Textarea
                    name="WhyGeniCreatorQA"
                    label={`Та яагаад Geni creator болохыг зорьж байна вэ? Хувийн "яагаад"-аа бидэнд хуваалцаарай`}
                    placeholder="Та яагаад Geni creator болохыг хүсч байгаа шалтгаанаа дэлгэрэнгүй бичнэ үү..."
                    value={formik.values.WhyGeniCreatorQA}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.WhyGeniCreatorQA}
                    errorVisible={
                      !!(
                        formik.touched.WhyGeniCreatorQA &&
                        formik.errors.WhyGeniCreatorQA
                      )
                    }
                    rows={4}
                    className="text-base sm:text-xl w-full"
                    layoutClassName="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#CA7FFE]"
                    wrapperClassName="w-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                  />
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
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9B4BD8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Content Upload */}
            {step === 4 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold text-[#CA7FFE]">
                    Бүтээгчийн чадварын сорилт
                  </h2>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      Та энэхүү хэсэгт өөрийн бүтээсэн контентыг илгээх ёстой.
                      Энэ нь таны бүтээлч чадварыг үнэлэх зорилготой юм.
                    </p>
                    <p>
                      Контент нь UGC (User Generated Content) маягийн байх ёстой
                      бөгөөд брэнд/бүтээгдэхүүний талаарх танын үнэн бодол санаа
                      тусах ёстой.
                    </p>
                  </div>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 font-medium">
                      Доорх 2 төрлийн аль нэгээр нь контентоо оруулна уу
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="text-[#6F6F6F] text-lg font-normal block mb-2">
                      Контентын хаяг (URL)
                    </label>
                    <Input
                      name="ContentLink"
                      placeholder="http://"
                      value={formik.values.ContentLink}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.ContentLink}
                      errorVisible={
                        !!(
                          formik.touched.ContentLink &&
                          formik.errors.ContentLink
                        )
                      }
                      layoutClassName="rounded-full"
                      className="text-base sm:text-xl w-full"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-[#6F6F6F] text-lg font-normal block mb-2">
                      Контент файл оруулах
                    </label>
                    <div className="w-full bg-white rounded-full border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center overflow-hidden h-12">
                      <div className="flex items-center gap-3 px-4 py-4 flex-1">
                        <span className="text-gray-500">
                          {contentFileName || ""}
                        </span>
                      </div>
                      <label className="h-full aspect-square bg-[#CA7FFE] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#B666F0]">
                        <input
                          type="file"
                          accept="video/*,image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleContentFileUpload(file);
                            }
                          }}
                          className="hidden"
                        />
                        <Image
                          src={"/plus-icon-white.png"}
                          width={20}
                          height={20}
                          className="w-5 h-5"
                          alt="Upload"
                        />
                      </label>
                    </div>
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
                    disabled={creatorRequestLoading}
                    className="bg-[#CA7FFE] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#9B4BD8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {creatorRequestLoading ? "Илгээж байна..." : "Илгээх"}
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
