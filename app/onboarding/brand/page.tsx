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
  useListBrandTypesQuery,
  useBrandRequestMutation,
} from "@/app/services/service";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";

export default function BrandOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [profileImage, setProfileImage] = useState("/dummy-brand.png");

  const [uploadFile, { isLoading: uploadFileLoading }] =
    useUploadFileMutation();
  const [changeProfilePicture, { isLoading: changeProfilePictureLoading }] =
    useChangeProfilePictureMutation();
  const [
    brandRequest,
    {
      isLoading: brandRequestLoading,
      isSuccess: brandRequestSuccess,
      error: brandRequestError,
    },
  ] = useBrandRequestMutation();

  // Fetch brand types
  const { data: brandTypesData, isLoading: brandTypesLoading } =
    useListBrandTypesQuery({});

  // Validation schema
  const validationSchema = Yup.object({
    // Step 1 fields - Organization Info
    IsOrg: Yup.boolean().required("Байгууллагын төрөл сонгоно уу"),
    OrgRegNo: Yup.string().required("Регистерийн дугаар оруулна уу"),
    OrgName: Yup.string().required("Байгууллагын нэр оруулна уу"),
    FirstName: Yup.string().required("Нэр оруулна уу"),
    LastName: Yup.string().required("Овог оруулна уу"),
    Position: Yup.string().required("Албан тушаал оруулна уу"),
    PhoneNumber: Yup.string().required("Утасны дугаар оруулна уу"),

    // Step 2 fields - Brand Info
    BrandName: Yup.string().required("Брэндийн нэр оруулна уу"),
    BrandTypes: Yup.array().min(1, "Дор хаяж нэг брэндийн төрөл сонгоно уу"),
    BrandDesc: Yup.string().required("Брэндийн танилцуулга оруулна уу"),

    // Step 3 fields - Sales & Marketing Info
    MonthlySales: Yup.number().required("Сарын дундаж борлуулалт оруулна уу"),
    ProductPrice: Yup.string().required("Бүтээгдэхүүний дундаж үнэ оруулна уу"),
    HasMarketingPerson: Yup.boolean().required(
      "Маркетинг хариуцсан хүн/баг байгаа эсэхийг сонгоно уу"
    ),
    IgLink: Yup.string().url("Зөв Instagram хаяг оруулна уу"),
    FbLink: Yup.string().url("Зөв Facebook хаяг оруулна уу"),
    WebLink: Yup.string().url("Зөв вэбсайт хаяг оруулна уу"),
  });

  // Formik instance
  const formik = useFormik({
    initialValues: {
      // Step 1 fields
      IsOrg: true,
      OrgRegNo: "",
      OrgName: "",
      FirstName: "",
      LastName: "",
      Position: "",
      PhoneNumber: "",

      // Step 2 fields
      BrandName: "",
      BrandTypes: [] as number[],
      BrandDesc: "",

      // Step 3 fields
      MonthlySales: 0,
      ProductPrice: "",
      HasMarketingPerson: true,
      IgLink: "",
      FbLink: "",
      WebLink: "",
      ProfilePictureId: null,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await brandRequest({
          IsOrg: values.IsOrg,
          OrgRegNo: values.OrgRegNo,
          OrgName: values.OrgName,
          FirstName: values.FirstName,
          LastName: values.LastName,
          Position: values.Position,
          PhoneNumber: values.PhoneNumber,
          Status: "Active",
          BrandName: values.BrandName,
          BrandDesc: values.BrandDesc,
          ProductPrice: values.ProductPrice,
          IgLink: values.IgLink,
          FbLink: values.FbLink,
          WebLink: values.WebLink,
          BrandTypes: values.BrandTypes,
          MonthlySales: values.MonthlySales,
          ProfilePictureId: values.ProfilePictureId || 0,
          HasMarketingPerson: values.HasMarketingPerson,
        }).unwrap();
      } catch (error) {
        console.error("Brand request failed:", error);
      }
    },
  });

  // Handle API success/error
  useEffect(() => {
    if (brandRequestSuccess) {
      toast.success("Таны хүсэлт амжилттай илгээгдлээ!");
      router.push("/profile");
    }
    if (brandRequestError) {
      // @ts-ignore
      toast.error(brandRequestError?.data?.error || "Алдаа гарлаа");
    }
  }, [brandRequestSuccess, brandRequestError, router]);

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

  // Brand types management
  const addBrandType = (brandTypeId: number) => {
    if (!formik.values.BrandTypes.includes(brandTypeId)) {
      formik.setFieldValue("BrandTypes", [
        ...formik.values.BrandTypes,
        brandTypeId,
      ]);
    }
  };

  const removeBrandType = (brandTypeId: number) => {
    formik.setFieldValue(
      "BrandTypes",
      formik.values.BrandTypes.filter((id) => id !== brandTypeId)
    );
  };

  const steps = [
    "Байгууллагын мэдээлэл",
    "Брэндийн мэдээлэл",
    "Борлуулалт & Маркетинг",
  ];

  const handleNextStep = () => {
    if (step < totalSteps) {
      // Validate current step
      let fieldsToValidate: string[] = [];

      if (step === 1) {
        fieldsToValidate = [
          "OrgRegNo",
          "OrgName",
          "FirstName",
          "LastName",
          "Position",
          "PhoneNumber",
        ];
      } else if (step === 2) {
        fieldsToValidate = ["BrandName", "BrandTypes", "BrandDesc"];
      } else if (step === 3) {
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
              <div className="bg-[#4D55F5] p-3 rounded-xl">
                <Image
                  src="/brand-icon-white.png"
                  width={32}
                  height={32}
                  alt="Brand"
                  className="w-8 h-8"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl sm:text-3xl font-bold">
                  Brand Бүртгэл
                </h1>
                <p className="text-gray-500">
                  {step}/{totalSteps} - {steps[step - 1]}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#4D55F5] h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
            {/* Step 1: Organization Information */}
            {step === 1 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Байгууллагын мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Байгууллагын үндсэн мэдээллийг оруулна уу
                  </p>
                </div>

                {/* Organization Type Radio Buttons */}
                <div className="flex flex-col gap-3">
                  <label className="text-[#6F6F6F] text-lg font-normal">
                    Байгууллагын төрөл
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="IsOrg"
                        value="true"
                        checked={formik.values.IsOrg === true}
                        onChange={() => formik.setFieldValue("IsOrg", true)}
                        className="w-4 h-4 text-[#4D55F5]"
                      />
                      <span>Байгуулага</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="IsOrg"
                        value="false"
                        checked={formik.values.IsOrg === false}
                        onChange={() => formik.setFieldValue("IsOrg", false)}
                        className="w-4 h-4 text-[#4D55F5]"
                      />
                      <span>Хувь хүн</span>
                    </label>
                  </div>
                </div>

                {/* Organization Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    name="OrgRegNo"
                    label="Регистерийн дугаар"
                    placeholder="Регистерийн дугаар"
                    value={formik.values.OrgRegNo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.OrgRegNo}
                    errorVisible={
                      !!(formik.touched.OrgRegNo && formik.errors.OrgRegNo)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="OrgName"
                    label="Байгууллагын нэр"
                    placeholder="Байгууллагын нэр"
                    value={formik.values.OrgName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.OrgName}
                    errorVisible={
                      !!(formik.touched.OrgName && formik.errors.OrgName)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                </div>

                {/* Contact Person Info */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-medium">
                    Хүсэлт илгээж буй хүний мэдээлэл
                  </h3>
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
                      name="Position"
                      label="Албан тушаал"
                      placeholder="Албан тушаал"
                      value={formik.values.Position}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.Position}
                      errorVisible={
                        !!(formik.touched.Position && formik.errors.Position)
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
                          formik.touched.PhoneNumber &&
                          formik.errors.PhoneNumber
                        )
                      }
                      layoutClassName="rounded-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
                      className="text-base sm:text-xl w-full"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A42CC] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Brand Information */}
            {step === 2 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Брэндийн мэдээлэл</h2>
                  <p className="text-sm text-gray-500">
                    Брэндийн дэлгэрэнгүй мэдээлэл
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-11">
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
                  <div className="flex flex-col gap-4 w-full">
                    <Input
                      name="BrandName"
                      label="Брэндийн нэр"
                      placeholder="Брэндийн нэр"
                      value={formik.values.BrandName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.BrandName}
                      errorVisible={
                        !!(formik.touched.BrandName && formik.errors.BrandName)
                      }
                      layoutClassName="rounded-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
                      className="text-base sm:text-xl w-full"
                      wrapperClassName="w-full"
                    />

                    {/* Brand Types */}
                    <div className="flex flex-col gap-3 w-full">
                      <label className="text-[#6F6F6F] text-lg font-normal">
                        Брэндийн төрөл
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {formik.values.BrandTypes.map((brandTypeId) => {
                          const brandType = brandTypesData?.find(
                            (bt: any) => bt.Id === brandTypeId
                          );
                          return brandType ? (
                            <div
                              key={brandTypeId}
                              className="flex items-center gap-2 bg-[#4D55F5] text-white px-3 py-1 rounded-full text-sm"
                            >
                              <span>{brandType.TypeName}</span>
                              <button
                                type="button"
                                onClick={() => removeBrandType(brandTypeId)}
                                className="text-white hover:text-red-200"
                              >
                                ×
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                      <select
                        onChange={(e) => {
                          const selectedId = parseInt(e.target.value);
                          if (
                            selectedId &&
                            !formik.values.BrandTypes.includes(selectedId)
                          ) {
                            addBrandType(selectedId);
                          }
                          e.target.value = "";
                        }}
                        className="bg-white border border-[#CDCDCD] rounded-full px-4 py-3 text-base sm:text-xl outline-none"
                      >
                        <option value="">Брэндийн төрөл нэмэх</option>
                        {brandTypesData?.map((brandType: any) => (
                          <option key={brandType.Id} value={brandType.Id}>
                            {brandType.TypeName}
                          </option>
                        ))}
                      </select>
                      {formik.touched.BrandTypes &&
                        formik.errors.BrandTypes && (
                          <span className="text-red-500 text-sm">
                            {formik.errors.BrandTypes}
                          </span>
                        )}
                    </div>

                    <Textarea
                      name="BrandDesc"
                      label="Брэндийн богино танилцуулга"
                      placeholder="Брэндийн тухай богино мэдээлэл бичнэ үү..."
                      value={formik.values.BrandDesc}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      errorText={formik.errors.BrandDesc}
                      errorVisible={
                        !!(formik.touched.BrandDesc && formik.errors.BrandDesc)
                      }
                      rows={4}
                      className="text-base sm:text-xl w-full"
                      layoutClassName="bg-white p-4 sm:p-5 rounded-xl border-2 border-[#4D55F5]"
                      wrapperClassName="w-full"
                      labelClassName="text-[#6F6F6F] text-lg font-normal"
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
                    className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A42CC] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
                  >
                    Үргэлжлүүлэх
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Sales & Marketing Information */}
            {step === 3 && (
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-bold">Борлуулалт & Маркетинг</h2>
                  <p className="text-sm text-gray-500">
                    Борлуулалт, маркетингийн мэдээлэл
                  </p>
                </div>

                {/* Sales Info Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Input
                    name="MonthlySales"
                    label="Сарын дундаж борлуулдаг бүтээгдэхүүний тоо"
                    placeholder="150000"
                    type="number"
                    value={formik.values.MonthlySales}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.MonthlySales}
                    errorVisible={
                      !!(
                        formik.touched.MonthlySales &&
                        formik.errors.MonthlySales
                      )
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                  />
                  <Input
                    name="ProductPrice"
                    label="Бүтээгдэхүүний дундаж үнэ"
                    placeholder="100000"
                    value={formik.values.ProductPrice}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.ProductPrice}
                    errorVisible={
                      !!(
                        formik.touched.ProductPrice &&
                        formik.errors.ProductPrice
                      )
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
                    rightSection={<span className="text-gray-500">₮</span>}
                  />
                  <div className="flex flex-col gap-2">
                    <label className="text-[#6F6F6F] text-lg font-normal">
                      Маркетинг хариуцсан баг эсвэл хүнтэй эсэх
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="HasMarketingPerson"
                          value="true"
                          checked={formik.values.HasMarketingPerson === true}
                          onChange={() =>
                            formik.setFieldValue("HasMarketingPerson", true)
                          }
                          className="w-4 h-4 text-[#4D55F5]"
                        />
                        <span>Тийм</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="HasMarketingPerson"
                          value="false"
                          checked={formik.values.HasMarketingPerson === false}
                          onChange={() =>
                            formik.setFieldValue("HasMarketingPerson", false)
                          }
                          className="w-4 h-4 text-[#4D55F5]"
                        />
                        <span>Үгүй</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Social Media & Website */}
                <div className="flex flex-col gap-4">
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
                  <Input
                    name="WebLink"
                    label="Вэбсайт"
                    placeholder="https://www.example.com"
                    value={formik.values.WebLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorText={formik.errors.WebLink}
                    errorVisible={
                      !!(formik.touched.WebLink && formik.errors.WebLink)
                    }
                    layoutClassName="rounded-full"
                    labelClassName="text-[#6F6F6F] text-lg font-normal"
                    className="text-base sm:text-xl w-full"
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
                    type="submit"
                    disabled={brandRequestLoading}
                    className="bg-[#4D55F5] text-white font-bold py-4 px-8 rounded-full border border-black shadow-[4px_4px_0px_0px_#3A42CC] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {brandRequestLoading ? "Илгээж байна..." : "Илгээх"}
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
