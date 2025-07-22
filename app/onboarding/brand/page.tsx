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
  useListBrandTypesQuery,
  useUploadFileMutation,
  useChangeProfilePictureMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";

export default function BrandOnboarding() {
  const [step, setStep] = useState(1);
  const totalSteps = 3;

  // Image and brand types state (not part of formik)
  const [profileImage, setProfileImage] = useState("/dummy-brand.png");
  const [brandTypes, setBrandTypes] = useState([]);
  const [availableBrandTypes, setAvailableBrandTypes] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // API hooks
  const {
    data: listBrandTypesData,
    error: listBrandTypesError,
    isLoading: listBrandTypesLoading,
  } = useListBrandTypesQuery({});

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
    if (listBrandTypesData) {
      setAvailableBrandTypes(listBrandTypesData);
    }
  }, [listBrandTypesData]);

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
    organizationType: Yup.string().required("Төрөл сонгоно уу"),
    regNo: Yup.string().required("Регистерийн дугаар оруулна уу"),
    organizationName: Yup.string().required("Байгууллагын нэр оруулна уу"),
    lastName: Yup.string().required("Овог оруулна уу"),
    firstName: Yup.string().required("Нэр оруулна уу"),
    position: Yup.string().required("Албан тушаал оруулна уу"),
    phoneNumber: Yup.string().required("Утасны дугаар оруулна уу"),

    // Step 2 fields
    brandName: Yup.string().required("Брэндийн нэр оруулна уу"),
    brandBio: Yup.string()
      .required("Брэндийн танилцуулга оруулна уу")
      .max(600, "600 тэмдэгтээс хэтрэхгүй"),

    // Step 3 fields
    avgProductSalesMonthly: Yup.number().min(0, "0-с их тоо оруулна уу"),
    avgPrice: Yup.number().min(0, "0-с их тоо оруулна уу"),
    hasMarketingPersonel: Yup.string().required("Сонголт хийнэ үү"),
    website: Yup.string().url("Зөв URL хаяг оруулна уу"),
  });

  // Formik instance
  const formik = useFormik({
    initialValues: {
      // Step 1 fields
      organizationType: "Байгуулага",
      regNo: "",
      organizationName: "",
      lastName: "",
      firstName: "",
      position: "",
      phoneNumber: "",

      // Step 2 fields
      brandName: "",
      brandBio: "",

      // Step 3 fields
      avgProductSalesMonthly: "",
      avgPrice: "",
      hasMarketingPersonel: "",
      instagramUsername: "",
      facebookUsername: "",
      website: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Form submitted:", values);
      console.log("Brand types:", brandTypes);
      console.log("Profile image:", profileImage);
      // Handle form submission here
    },
  });

  // Brand type management functions
  const handleAddBrandTypes = (value) => {
    setBrandTypes((prev) => {
      if (!prev.some((type) => type.TypeName === value.TypeName)) {
        setAvailableBrandTypes((prevOptions) =>
          prevOptions.filter((option) => option.TypeName !== value.TypeName)
        );
        return [...prev, value];
      }
      return prev;
    });
    setDropdownOpen(false);
  };

  const handleRemoveBrandTypes = (value) => {
    setBrandTypes((prev) => {
      const updatedBrandTypes = prev.filter(
        (item) => item.TypeName !== value.TypeName
      );
      // Add the removed type back to available options
      setAvailableBrandTypes((prevOptions) => [...prevOptions, value]);
      return updatedBrandTypes;
    });
  };

  // Step validation functions
  const validateStep1 = async () => {
    const step1Fields = [
      "organizationType",
      "regNo",
      "organizationName",
      "lastName",
      "firstName",
      "position",
      "phoneNumber",
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
    const step2Fields = ["brandName", "brandBio"];

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
        setStep(3);
      }
    }
  };

  const steps = [
    "Байгууллагын мэдээлэл",
    "Брэндийн мэдээлэл",
    "Нэмэлт мэдээлэл",
  ];

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

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="max-w-7xl mx-auto px-7 py-11 container">
        <form onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-8">
            {/* Header with Progress */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                Сайн уу, daimaawork@gmail.com
                <Link href="/onboarding" className="text-sm text-gray-500">
                  Буцах
                </Link>
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
                            ? "bg-[#4D55F5] text-white"
                            : step === index + 1
                            ? "bg-[#4D55F5] text-white"
                            : "bg-[#F5F5F5] text-gray-400"
                        }`}
                      >
                        {step > index + 1 ? "✓" : index + 1}
                      </div>
                      <span
                        className={`text-sm ${
                          step === index + 1
                            ? "text-[#4D55F5] font-medium"
                            : "text-gray-400"
                        }`}
                      >
                        {stepName}
                      </span>
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`h-[2px] mt-2 ${
                          index < step - 1 ? "bg-[#4D55F5]" : "bg-[#F5F5F5]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Organization Info */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Байгууллагын мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Байгууллагын үндсэн мэдээллийг оруулна уу
                  </p>
                </div>

                {/* Radio buttons for organization type */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="organizationType"
                      value="Байгуулага"
                      checked={formik.values.organizationType === "Байгуулага"}
                      onChange={formik.handleChange}
                      className="w-5 h-5 text-[#4D55F5] border-2 border-gray-300 focus:ring-[#4D55F5]"
                    />
                    <span>Байгуулага</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="organizationType"
                      value="Хувь хүн"
                      checked={formik.values.organizationType === "Хувь хүн"}
                      onChange={formik.handleChange}
                      className="w-5 h-5 text-[#4D55F5] border-2 border-gray-300 focus:ring-[#4D55F5]"
                    />
                    <span>Хувь хүн</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <Input
                    name="organizationName"
                    label="Байгууллагын нэр"
                    placeholder="Байгууллагын нэр"
                    value={formik.values.organizationName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.organizationName}
                    errorVisible={
                      !!(
                        formik.touched.organizationName &&
                        formik.errors.organizationName
                      )
                    }
                    layoutClassName="rounded-full"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <h3 className="font-bold">
                    Хүсэлт илгээж буй хүний мэдээлэл
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      name="position"
                      label="Албан тушаал"
                      placeholder="Албан тушаал"
                      value={formik.values.position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.position}
                      errorVisible={
                        !!(formik.touched.position && formik.errors.position)
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
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Brand Info */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Брэндийн мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Брэндийн дэлгэрэнгүй мэдээлэл
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
                      alt="Brand Profile"
                    />
                    <div
                      {...getRootProps()}
                      className="cursor-pointer mt-2 py-2 sm:py-3 w-full text-center bg-[#4D55F5] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
                    >
                      <input {...getInputProps()} />
                      Лого оруулах
                    </div>
                  </div>

                  {/* Right column - Form fields */}
                  <div className="flex flex-col gap-4 w-full">
                    {/* Brand name input */}
                    <Input
                      name="brandName"
                      label="Брэндийн нэр"
                      placeholder="Брэндийн нэр"
                      value={formik.values.brandName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.brandName}
                      errorVisible={
                        !!(formik.touched.brandName && formik.errors.brandName)
                      }
                      layoutClassName="rounded-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
                      className="text-base sm:text-xl w-full"
                      wrapperClassName="w-full"
                    />

                    {/* Brand type section */}
                    <div className="flex flex-col gap-3 w-full">
                      <label className="text-[#6F6F6F] text-lg">
                        Брэндийн төрөл
                      </label>
                      <div className="relative flex flex-row flex-wrap items-center gap-2">
                        {brandTypes?.map((p, i) => (
                          <div
                            key={i}
                            className="bg-[#4D55F5] text-white text-center text-sm sm:text-lg rounded-full px-3 sm:px-5 py-1 sm:py-2 flex flex-row items-center justify-between gap-2"
                          >
                            {p.TypeName}
                            <button
                              type="button"
                              className="rounded-full w-6 h-6 text-center"
                              onClick={() => handleRemoveBrandTypes(p)}
                            >
                              <Image
                                src={"/product-remove-icon.png"}
                                width={24}
                                height={24}
                                className="rounded-full bg-white h-full aspect-square min-h-6 mih-w-6"
                                alt=""
                              />
                            </button>
                          </div>
                        ))}

                        <div className="flex flex-row items-center gap-2">
                          <div
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-7 h-7 sm:w-11 sm:h-11 flex items-center justify-center"
                          >
                            <Image
                              src={"/plus-icon-black.png"}
                              width={24}
                              height={24}
                              className="aspect-square w-2 h-2 sm:w-3 sm:h-3"
                              alt=""
                            />
                          </div>
                        </div>

                        {/* Dropdown for available brand types */}
                        <div
                          className={`${
                            dropdownOpen &&
                            availableBrandTypes?.filter(
                              (productType) =>
                                !brandTypes.some(
                                  (brandType) =>
                                    brandType.TypeName === productType.TypeName
                                )
                            ).length > 0
                              ? `top-full opacity-100 visible`
                              : "top-[110%] invisible opacity-0"
                          } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                        >
                          {availableBrandTypes
                            ?.filter(
                              (productType) =>
                                !brandTypes.some(
                                  (brandType) =>
                                    brandType.TypeName === productType.TypeName
                                )
                            )
                            .map((p, i) => (
                              <div
                                onClick={() => handleAddBrandTypes(p)}
                                key={i}
                                className="cursor-pointer bg-[#4D55F5] text-white text-center text-sm rounded-full px-3 py-1"
                              >
                                {p.TypeName}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>

                    {/* Brand bio textarea */}
                    <Textarea
                      name="brandBio"
                      label="Брэндийн богино танилцуулга"
                      placeholder="Брэндийн танилцуулга бичнэ үү..."
                      value={formik.values.brandBio}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.brandBio}
                      errorVisible={
                        !!(formik.touched.brandBio && formik.errors.brandBio)
                      }
                      rows={4}
                      maxLength={600}
                      charCount={formik.values.brandBio.length}
                      className="text-base sm:text-xl w-full"
                      layoutClassName="bg-white p-4 sm:p-5"
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
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Additional Info */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Нэмэлт мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Маркетинг сурталчилгааг хэрхэн хийх вэ?
                  </p>
                </div>

                {/* First row - 3 columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    name="avgProductSalesMonthly"
                    label="Сарын дундаж борлуулдаг бүтээгдэхүүны тоо"
                    placeholder="Тоо оруулна уу"
                    type="number"
                    value={formik.values.avgProductSalesMonthly}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.avgProductSalesMonthly}
                    errorVisible={
                      !!(
                        formik.touched.avgProductSalesMonthly &&
                        formik.errors.avgProductSalesMonthly
                      )
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                    wrapperClassName="w-full"
                  />

                  <Input
                    name="avgPrice"
                    label="Бүтээгдэхүүний дундаж үнэ"
                    placeholder="Үнэ оруулна уу"
                    type="number"
                    value={formik.values.avgPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.avgPrice}
                    errorVisible={
                      !!(formik.touched.avgPrice && formik.errors.avgPrice)
                    }
                    leftSection={
                      <span className="text-base sm:text-xl">₮</span>
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                    wrapperClassName="w-full"
                  />

                  <div className="flex flex-col gap-3 w-full">
                    <label className="text-[#6F6F6F] text-lg font-normal">
                      Маркетинг хариуцсан баг эсвэл хүнтэй эсэх
                    </label>
                    <div className="flex items-center gap-6 mt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasMarketingPersonel"
                          value="true"
                          checked={
                            formik.values.hasMarketingPersonel === "true"
                          }
                          onChange={formik.handleChange}
                          className="w-5 h-5 text-[#4D55F5] border-2 border-gray-300 focus:ring-[#4D55F5]"
                        />
                        <span>Тийм</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="hasMarketingPersonel"
                          value="false"
                          checked={
                            formik.values.hasMarketingPersonel === "false"
                          }
                          onChange={formik.handleChange}
                          className="w-5 h-5 text-[#4D55F5] border-2 border-gray-300 focus:ring-[#4D55F5]"
                        />
                        <span>Үгүй</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Second row - Social media and website */}
                <div className="flex flex-col gap-4">
                  <label className="text-[#6F6F6F] text-lg font-normal">
                    Сошиал хаяг
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Instagram input */}
                    <div className="flex items-center gap-2">
                      <div className="w-full p-4 bg-white rounded-full border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center gap-3">
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
                        className="w-8 h-8 bg-[#4D55F5] rounded-full flex items-center justify-center"
                      >
                        <Image
                          src={"/check-icon.png"}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                          alt="check"
                        />
                      </button>
                    </div>

                    {/* Facebook input */}
                    <div className="flex items-center gap-2">
                      <div className="w-full p-4 bg-white rounded-full border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center gap-3">
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
                        className="w-8 h-8 bg-[#4D55F5] rounded-full flex items-center justify-center"
                      >
                        <Image
                          src={"/check-icon.png"}
                          width={16}
                          height={16}
                          className="w-4 h-4"
                          alt="check"
                        />
                      </button>
                    </div>

                    {/* Website input */}
                    <Input
                      name="website"
                      placeholder="Вэбсайт хаяг"
                      value={formik.values.website}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.website}
                      errorVisible={
                        !!(formik.touched.website && formik.errors.website)
                      }
                      layoutClassName="rounded-full"
                      className="text-base sm:text-xl w-full"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="text-gray-500 font-medium"
                  >
                    ← Буцах
                  </button>
                  <button
                    type="submit"
                    className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#1920B4] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Илгээх
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
