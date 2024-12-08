"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../components/ui/hover-card";

import {
  useUploadFileMutation,
  useCreateProductMutation,
  useListProductTypesQuery,
  useListProductDictsQuery,
} from "../services/service";
import toast from "react-hot-toast";

import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import ProductAddedSuccessModal from "./ProductAddedSuccessModal";
import HandleButton from "../components/common/HandleButton";

function Page() {
  const router = useRouter();

  const [selectedContentTypes, setSelectedContentTypes] = useState([]);
  const [selectedContentOutcomes, setSelectedContentOutcomes] = useState([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [createProductSuccess, setCreateProductSuccess] = useState(false);

  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  // console.log(parsedUserInfo);
  // TODO product type remove add formik error fix, product edit fix
  const formik = useFormik({
    initialValues: {
      productName: "",
      information: "",
      requestForCreators: "",
      amount: "",
      addInfoSource: "",
      quantity: "",
      price: "",
      contentInfo: [],
      productTypes: [],
      productPics: [],
    },
    validationSchema: Yup.object({
      productPics: Yup.array().required("Заавал бөглөнө үү"),
      productTypes: Yup.array().required("Заавал бөглөнө үү"),
      productName: Yup.string().required("Заавал бөглөнө үү"),
      contentInfo: Yup.array()
        .of(
          Yup.object().shape({
            Type: Yup.string(),
            Name: Yup.string(),
          })
        )
        .required("Content info is required")
        .test("custom-validation", function (contentInfo) {
          const hasOutcome = contentInfo?.some((item) => item.Type === "Type");
          const hasResult = contentInfo?.some((item) => item.Type === "Result");

          if (!hasOutcome || !hasResult) {
            return this.createError({
              path: this.path,
              message: `Контентын төрөл болон үр дүнгээс дор хаяж нэгийг сонгоно уу`,
            });
          }

          return true;
        }),
      addInfoSource: Yup.string().required("Заавал бөглөнө үү"),
      information: Yup.string().required("Заавал бөглөнө үү"),
      amount: Yup.string().required("Заавал бөглөнө үү"),
      requestForCreators: Yup.string().required("Заавал бөглөнө үү"),
      quantity: Yup.string().required("Заавал бөглөнө үү"),
      price: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: (values) => {
      const modifiedValues = {
        ...values,
        quantity: parseInt(values.quantity, 10),
      };
      createProduct(modifiedValues);
    },
    validateOnMount: true,
  });

  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = useUploadFileMutation();

  const [
    createProduct,
    {
      data: createProductData,
      error: createProductError,
      isLoading: createProductLoading,
    },
  ] = useCreateProductMutation();

  const {
    data: listProductTypesData,
    error: listProductTypesError,
    isLoading: listProductTypesLoading,
  } = useListProductTypesQuery();

  const {
    data: listProductDictsTypeData,
    error: listProductDictsTypeError,
    isLoading: listProductDictsTypeLoading,
  } = useListProductDictsQuery("Type");

  const {
    data: listProductDictsResultData,
    error: listProductDictsResultError,
    isLoading: listProductDictsResultLoading,
  } = useListProductDictsQuery("Result");

  const [productTypes, setProductTypes] = useState([]);
  const [availableProductTypes, setAvailableProductTypes] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
    },
    onDrop: (acceptedFiles) => {
      const fileUploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "product-pic");

        const response = await uploadFile(formData);
        if (response.data) {
          return response.data;
        } else {
          return null;
        }
      });

      Promise.all(fileUploadPromises).then((responses) => {
        const validResponses = responses.filter(
          (response) => response !== null
        );
        const urls = validResponses.map((response) => response.Url);

        const ids = validResponses.map((response) => response.FileId);

        setImageUrls((prev) => [...prev, ...urls]);
        formik.setFieldValue("productPics", [
          ...formik.values.productPics,
          ...ids,
        ]);
      });
    },
  });

  useEffect(() => {
    if (uploadFileError) {
      toast.error(uploadFileError?.data?.error);
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (createProductError) {
      toast.error(createProductError?.data?.error);
    }
    if (createProductData) {
      console.log(createProductData);
      setCreateProductSuccess(true);
    }
  }, [createProductData, createProductError]);

  useEffect(() => {
    if (listProductTypesData) {
      setAvailableProductTypes(listProductTypesData);
    }
  }, [listProductTypesData]);

  const handleProductType = (newType) => {
    if (!productTypes.some((p) => p.TypeName === newType.TypeName)) {
      setProductTypes((prev) => [...prev, newType]);

      // Remove from available product types
      setAvailableProductTypes((prev) =>
        prev.filter((p) => p.TypeName !== newType.TypeName)
      );
    }
    formik.setFieldValue("productTypes", [
      ...formik.values.productTypes,
      newType.ProductTypeId,
    ]);
    console.log(formik.values.productTypes, "PROD TYPES");
  };

  const handleRemoveProductType = (typeNameToRemove) => {
    setProductTypes((prev) =>
      prev.filter((p) => p.TypeName !== typeNameToRemove)
    );

    // Re-add the type back to available product types
    const removedType = { TypeName: typeNameToRemove };
    setAvailableProductTypes((prev) => [...prev, removedType]);
    formik.setFieldValue(
      "productTypes",
      formik.values.productTypes.filter(
        (id) => id !== typeNameToRemove.ProductTypeId
      )
    );
    console.log(formik.values.productTypes, "PROD TYPES");
  };

  const handleContentTypeOption = (value) => {
    const selectedItem = listProductDictsTypeData.find((c) => c.Val === value);

    // Add or remove selected content types
    if (selectedItem) {
      setSelectedContentTypes((prev) => {
        // If already selected, remove it; otherwise, add it
        if (prev.includes(selectedItem.Name)) {
          return prev.filter((name) => name !== selectedItem.Name);
        } else {
          return [...prev, selectedItem.Name];
        }
      });

      // Update formik values for contentInfo
      const newContentInfoItem = {
        Type: "Type", // Assuming Type is "Type" for this section
        Name: selectedItem.Name,
      };
      const contentInfoExists = formik.values.contentInfo.some(
        (item) => item.Name === selectedItem.Name && item.Type === "Type"
      );

      if (!contentInfoExists) {
        formik.setFieldValue("contentInfo", [
          ...formik.values.contentInfo,
          newContentInfoItem,
        ]);
      }
    }
  };

  const handleContentOutcomeOption = (value) => {
    const selectedItem = listProductDictsResultData.find(
      (c) => c.Val === value
    );

    // Add or remove selected content outcomes
    if (selectedItem) {
      setSelectedContentOutcomes((prev) => {
        // If already selected, remove it; otherwise, add it
        if (prev.includes(selectedItem.Name)) {
          return prev.filter((name) => name !== selectedItem.Name);
        } else {
          return [...prev, selectedItem.Name];
        }
      });

      // Update formik values for contentInfo
      const newContentInfoItem = {
        Type: "Result", // Assuming Type is "Result" for this section
        Name: selectedItem.Name,
      };
      const contentInfoExists = formik.values.contentInfo.some(
        (item) => item.Name === selectedItem.Name && item.Type === "Result"
      );

      if (!contentInfoExists) {
        formik.setFieldValue("contentInfo", [
          ...formik.values.contentInfo,
          newContentInfoItem,
        ]);
      }
    }
  };

  const removeContentItem = (name) => {
    // Find the item in either listProductDictsTypeData or listProductDictsResultData
    const item =
      listProductDictsTypeData.find((c) => c.Name === name) ||
      listProductDictsResultData.find((c) => c.Name === name);

    if (item) {
      // Remove from formik values based on Name and Type
      formik.setFieldValue(
        "contentInfo",
        formik.values.contentInfo.filter(
          (info) => !(info.Name === item.Name && info.Type === item.Type)
        )
      );

      // Remove from state based on Val
      if (item.Type === "Type") {
        setSelectedContentTypes((prev) => prev.filter((n) => n !== item.Name));
      } else if (item.Type === "Result") {
        setSelectedContentOutcomes((prev) =>
          prev.filter((n) => n !== item.Name)
        );
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-11 flex flex-col lg:flex-row gap-10"
          >
            <div className="flex flex-col w-full">
              {imageUrls.length < 1 && !uploadFileLoading ? (
                <div
                  {...getRootProps()}
                  className="bg-[#F5F4F0] rounded-2xl min-h-[320px] sm:max-w-[554px] lg:max-h-[554px] p-5 h-full w-full flex flex-col justify-center items-center gap-4"
                >
                  <input {...getInputProps()} />
                  <div className="rounded-xl bg-[#4D55F5] w-14 h-14 flex justify-center items-center">
                    <Image
                      src={"/add-icon.png"}
                      width={24}
                      height={24}
                      alt=""
                      className="w-6 h-6"
                    />
                  </div>
                  <p>Зураг оруулах</p>
                  <p className="text-center w-full sm:w-2/3 text-xs sm:text-sm">
                    Зураг оруулахдаа зөвхөн 1х1 хэмжээтэй дөрвөлжин зураг
                    оруулна уу.
                  </p>
                </div>
              ) : (
                <></>
              )}

              {!uploadFileLoading ? (
                imageUrls.length > 0 && (
                  <div className="flex flex-col gap-10 w-full">
                    <div className="w-full max-w-[554px]">
                      <Swiper
                        style={{
                          "--swiper-pagination-color": "#CA7FFE",
                          "--swiper-pagination-bullet-inactive-color":
                            "#CDCDCD",
                          "--swiper-pagination-bullet-inactive-opacity": "1",
                          "--swiper-pagination-bullet-size": "10px",
                          "--swiper-pagination-bullet-horizontal-gap": "6px",
                        }}
                        spaceBetween={10}
                        slidesPerView={1}
                        pagination={{ clickable: true }}
                        modules={[Pagination]}
                      >
                        {imageUrls.map((url, index) => (
                          <SwiperSlide key={index}>
                            <Image
                              src={url}
                              alt={`Uploaded image ${index + 1}`}
                              layout="responsive"
                              width={554}
                              height={554}
                              className="object-cover aspect-square rounded-lg max-w-[554px] max-h-[554px] border shadow-lg"
                            />
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    <div
                      {...getRootProps()}
                      className="bg-[#F5F4F0] rounded-2xl p-5 max-w-[554px] max-h-[554px] min-h-[227px] w-full flex flex-col justify-center items-center gap-4"
                    >
                      <input {...getInputProps()} />
                      <div className="rounded-xl bg-[#4D55F5] w-14 h-14 flex justify-center items-center">
                        <Image
                          src={"/add-icon.png"}
                          width={24}
                          height={24}
                          alt=""
                          className="w-6 h-6"
                        />
                      </div>
                      <p>Нэмэлт зураг оруулах</p>
                    </div>
                  </div>
                )
              ) : (
                <div className="max-w-[554px] max-h-[554px] w-full h-full flex justify-center items-center">
                  <ClipLoader
                    loading={uploadFileLoading}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                    className=""
                    size={50}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full lg::max-w-lg">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={
                    parsedUserInfo?.ProfileLink
                      ? parsedUserInfo?.ProfileLink
                      : "/white-placeholder.png"
                  }
                  width={44}
                  height={44}
                  alt=""
                  className="border border-[#2D262D] rounded-full w-11 h-11"
                />
                <span className="text-xl font-bold">
                  {parsedUserInfo?.Name}
                </span>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний нэр
                </label>
                <input
                  id="productName"
                  name="productName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productName}
                  className="p-2 border border-[#CDCDCD] rounded-lg h-12"
                />
                {formik.touched.productName && formik.errors.productName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.productName}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний төрөл
                </label>
                <div className="relative flex flex-row flex-wrap items-center gap-2">
                  {productTypes?.map((p, i) => (
                    <div
                      key={i}
                      className="flex flex-row whitespace-nowrap justify-between items-center gap- bg-[#4D55F5] text-white text-center text-xs rounded-full pl-4 pr-[2px] py-[2px] gap-2"
                    >
                      {p.TypeName}
                      <button
                        className="rounded-full w-6 h-6 text-center"
                        onClick={() => handleRemoveProductType(p.TypeName)}
                      >
                        <Image
                          src={"/product-remove-icon.png"}
                          width={24}
                          height={24}
                          alt=""
                          className="rounded-full bg-white h-full aspect-square min-h-6 mih-w-6"
                        />
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="cursor-pointer outline-none bg-[#4D55F5] text-xs rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <Image
                      src={"/product-add-icon.png"}
                      width={24}
                      height={24}
                      className="w-6 h-6 aspect-square"
                      alt=""
                    />
                  </div>
                  <div
                    className={`${
                      dropdownOpen && availableProductTypes.length > 0
                        ? `top-full opacity-100 visible`
                        : "top-[110%] invisible opacity-0"
                    } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                  >
                    {!listProductTypesError ? (
                      availableProductTypes?.map((p, i) => (
                        <div
                          onClick={() => handleProductType(p)}
                          key={i}
                          className="cursor-pointer mt-1 bg-[#4D55F5] text-white text-center text-xs rounded-full px-4 py-2"
                        >
                          {p.TypeName}
                        </div>
                      ))
                    ) : (
                      <></>
                    )}
                  </div>
                  {formik.touched.productTypes && formik.errors.productTypes ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.productTypes}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл
                </label>
                <div className="p-2 border border-[#CDCDCD] rounded-lg flex flex-col">
                  <textarea
                    id="information"
                    name="information"
                    placeholder="Хэрэглэх зориулалт болон заавар, орц найрлага, ач холбогдол, анхаарах зүйлс"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.information}
                    rows={4} // Adjust the number of rows as needed
                    maxLength={600} // Set maximum characters
                    className="overflow-y-auto outline-none"
                  />

                  <div className="text-[#6F6F6F] text-sm border-t-[1px] pt-2 border-[#6F6F6F]">
                    Тэмдэгтийн тоо: {formik.values.information.length}/600
                  </div>
                </div>

                {formik.touched.information && formik.errors.information ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.information}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="addInfoSource">
                  Нэмэлт мэдээлэл авах сурвалж
                </label>
                <input
                  id="addInfoSource"
                  name="addInfoSource"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.addInfoSource}
                  className="p-2 border border-[#CDCDCD] rounded-lg h-12"
                />
                {formik.touched.addInfoSource && formik.errors.addInfoSource ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.addInfoSource}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="name"
                >
                  Контентийн төрөл
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
                      Та нэг болон түүнээс дээш төрөл сонгох боломжтой бөгөөд
                      бүтээгч таны сонгосон контент хийцлэлийн төрлийг харгалзан
                      контентоо бүтээнэ.
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <Select
                  onValueChange={(value) => handleContentTypeOption(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {listProductDictsTypeData ? (
                      listProductDictsTypeData
                        .filter((c) => c.Type === "Type")
                        .map((c, i) => (
                          <SelectItem
                            key={i}
                            value={c.Val}
                            className={`border-[#CDCDCD] border rounded-lg min-h-12 my-1 w-full text-start p-4`}
                          >
                            {c.Name}
                          </SelectItem>
                        ))
                    ) : (
                      <></>
                    )}
                  </SelectContent>
                </Select>
                {selectedContentTypes.map((c, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 text-sm ring-offset-white h-10 w-full bg-white border-[1px] border-[#4D55F5] rounded-md flex flex-row items-center justify-between"
                  >
                    {c}
                    <button onClick={() => removeContentItem(c)}>
                      <Image
                        src={"/remove-brandinfo-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 bg-[#4D55F5] rounded-full aspect-square"
                      />
                    </button>
                  </div>
                ))}
                {formik.touched.contentInfo && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.contentInfo &&
                    typeof formik.errors.contentInfo === "string"
                      ? formik.errors.contentInfo
                      : null}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="name"
                >
                  Контент бүтээгчээс хүсэх хүсэлт
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
                      Контентийн агуулга болон хийцлэлтэй хамааралтай брэндийн
                      чиглүүлэг болон бүтээгчээс хүсэх хүсэлтээ бичсэнээр таны
                      хүсэж буй контент гарах магадлал ихсэнэ.
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <div className="p-2 border border-[#CDCDCD] rounded-lg flex flex-col">
                  <textarea
                    id="requestForCreators"
                    name="requestForCreators"
                    placeholder="Контент агуулга болон хийцлэлтэй холбоотой бүтээгчээс хүсэх нэмэлт зүйлс"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.requestForCreators}
                    rows={4}
                    maxLength={600}
                    className="overflow-y-auto outline-none" // You can adjust other styles as needed
                  />

                  <div className="text-[#6F6F6F] text-sm border-t-[1px] pt-2 border-[#6F6F6F]">
                    Тэмдэгтийн тоо: {formik.values.requestForCreators.length}
                    /600
                  </div>
                </div>
                {formik.touched.requestForCreators &&
                formik.errors.requestForCreators ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.requestForCreators}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="name"
                >
                  Контентоос хүлээж буй гол үр дүн
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
                      Хийлгэж буй контентоо ашиглаж хүрэх үр дүнгээ оруулсанаар
                      контент бүтээгч таны зорилгыг илүү сайн мэдэж контентдоо
                      шингээх болно.
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <Select
                  onValueChange={(value) => handleContentOutcomeOption(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {listProductDictsResultData ? (
                      listProductDictsResultData
                        .filter((c) => c.Type === "Result")
                        .map((c, i) => (
                          <SelectItem
                            key={i}
                            value={c.Val}
                            className={`border-[#CDCDCD] border rounded-lg min-h-12 my-1 w-full text-start p-4`}
                          >
                            {c.Name}
                          </SelectItem>
                        ))
                    ) : (
                      <></>
                    )}
                  </SelectContent>
                </Select>
                {selectedContentOutcomes.map((c, i) => (
                  <div
                    key={i}
                    className="px-3 py-2 text-sm ring-offset-white h-10 w-full bg-white border-[2px] border-[#CA7FFE] rounded-md flex flex-row items-center justify-between"
                  >
                    {c}
                    <button onClick={() => removeContentItem(c)}>
                      <Image
                        src={"/remove-brandinfo-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 bg-[#CA7FFE] rounded-full aspect-square"
                      />
                    </button>
                  </div>
                ))}
                {formik.touched.contentInfo && formik.errors.contentInfo ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.contentInfo}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="amount"
                >
                  Бүтээгдэхүүний хэмжээ
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
                      Таны бүтээгдэхүүн ямар хэмжих нэгжтэйгээс хамаарч энд
                      ойлгомжтой оруулна уу. <br />
                      <br />
                      Жишээ: XL, L, 1 хайрцаг: 24 ширхэг, 2 литр гэх мэт
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <input
                  id="amount"
                  name="amount"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.amount}
                  className="p-2 border border-[#CDCDCD] rounded-lg h-12"
                />
                {formik.touched.amount && formik.errors.amount ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.amount}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="quantity"
                >
                  Бүтээгчдэд илгээх бүтээгдэхүүний тоо
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
                      Энд та хэдэн бүтээгчдэд бүтээгдэхүүнээ санал болгож байгаа
                      тоогоо оруулна. Энд оруулсан бүтээгдэхүүний тоогоор та
                      контент хүлээн авна.
                    </HoverCardContent>
                  </HoverCard>
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                  className="p-2 border border-[#CDCDCD] rounded-lg h-12"
                />
                {formik.touched.quantity && formik.errors.quantity ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.quantity}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="price"
                >
                  Бүтээгчдэд илгээж буй бүтээгдэхүүний үнэ
                  <HoverCard>
                    <HoverCardTrigger className="cursor-pointer">
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        className="w-6 h-6 rounded-full"
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="bg-[#F49D19] rounded-2xl p-3 text-white text-sm font-normal">
                      Нэг бүтээгчдэд санал болгож буй бүтээгдэхүүнийхээ үнийг
                      оруулна. Нэг бүтээгчид багц болгон илгээж байгаа бол
                      багцын үнийг оруулна.
                    </HoverCardContent>
                  </HoverCard>
                </label>

                <div className="flex flex-row gap-1 items-center border border-[#CDCDCD] rounded-lg h-12 p-2">
                  <span className="">₮</span>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                    className="flex-grow h-full border-none outline-none focus:ring-0"
                  />
                </div>
                {formik.touched.price && formik.errors.price ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.price}
                  </div>
                ) : null}
              </div>

              <HandleButton
                disabled={
                  !formik.dirty ||
                  !formik.isValid ||
                  formik.isSubmitting ||
                  !formik.values.productTypes ||
                  !formik.values.productPics
                }
                text={"Бүтээгдэхүүн нэмэх"}
                bg={`bg-[#4D55F5] ${
                  !formik.dirty ||
                  !formik.isValid ||
                  formik.isSubmitting ||
                  !formik.values.productTypes ||
                  !formik.values.productPics
                    ? "opacity-80 cursor-not-allowed"
                    : "opacity-100 cursor-pointer"
                }`}
                shadowbg={"shadow-[0.25rem_0.25rem_#131AAF]"}
                width={"w-full max-w-[403px] h-[90px]"}
              />

              <ProductAddedSuccessModal
                setCreateProductSuccess={setCreateProductSuccess}
                createProductData={createProductData}
                createProductSuccess={createProductSuccess}
                parsedUserInfo={parsedUserInfo}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
