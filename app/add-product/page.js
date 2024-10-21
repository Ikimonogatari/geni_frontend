"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
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
  useUploadFileMutation,
  useCreateProductMutation,
  useListProductTypesQuery,
  useListProductDictsQuery,
} from "../services/service";
import toast from "react-hot-toast";

import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

function Page() {
  const router = useRouter();

  const [selectedContentTypes, setSelectedContentTypes] = useState([]);
  const [selectedContentOutcomes, setSelectedContentOutcomes] = useState([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [createProductSuccess, setCreateProductSuccess] = useState(false);

  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  console.log(parsedUserInfo);

  const formik = useFormik({
    initialValues: {
      brandId: parsedUserInfo ? parsedUserInfo?.UserId : null,
      productName: "",
      information: "",
      requestForCreators: "",
      quantity: "",
      price: "",
      contentInfo: [],
      productTypes: [],
      productPics: [],
    },
    validationSchema: Yup.object({
      productName: Yup.string().required("Required"),
      contentInfo: Yup.array()
        .of(Yup.string())
        .min(1, "At least one content type must be selected")
        .required("Content info is required"),
      information: Yup.string().required("Required"),
      requestForCreators: Yup.string().required("Required"),
      quantity: Yup.string().required("Required"),
      price: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const modifiedValues = {
        ...values,
        quantity: parseInt(values.quantity, 10),
      };
      createProduct(modifiedValues);
    },
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
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (createProductError) {
      toast.error("Алдаа гарлаа");
    }
    if (createProductData) {
      console.log(createProductData);
      setCreateProductSuccess(true);
    }
  }, [createProductData, createProductError]);

  const handleProductType = (value) => {
    setProductTypes((prev) => {
      if (!prev.some((type) => type.TypeName === value.TypeName)) {
        return [...prev, value];
      }
      return prev;
    });
    formik.setFieldValue("productTypes", [
      ...formik.values.productTypes,
      value.ProductTypeId,
    ]);
  };

  const handleContentTypeOption = (value) => {
    const selectedItem = listProductDictsTypeData.find((c) => c.Val === value);
    if (selectedItem && !selectedContentTypes.includes(selectedItem.Name)) {
      setSelectedContentTypes((prev) => [...prev, selectedItem.Name]);
    }
    if (!formik.values.contentInfo.includes(value)) {
      formik.setFieldValue("contentInfo", [
        ...formik.values?.contentInfo,
        value,
      ]);
    }
  };

  const handleContentOutcomeOption = (value) => {
    const selectedItem = listProductDictsResultData.find(
      (c) => c.Val === value
    );
    if (selectedItem && !selectedContentOutcomes.includes(selectedItem.Name)) {
      setSelectedContentOutcomes((prev) => [...prev, selectedItem.Name]);
    }
    if (!formik.values.contentInfo.includes(value)) {
      formik.setFieldValue("contentInfo", [
        ...formik.values?.contentInfo,
        value,
      ]);
    }
  };

  const handleThanks = () => {
    setCreateProductSuccess(false);
    router.push("/brand-profile");
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
                              className="object-cover rounded-lg max-w-[554px] max-h-[554px]"
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
                      className="bg-[#4D55F5] text-white text-center text-xs rounded-full px-4 py-2"
                    >
                      {p.TypeName}
                    </div>
                  ))}
                  <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="cursor-pointer outline-none bg-[#4D55F5] text-xs rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <Image src={"/plus.png"} width={7} height={16} alt="+" />
                  </div>
                  <div
                    className={`${
                      dropdownOpen
                        ? `top-full opacity-100 visible`
                        : "top-[110%] invisible opacity-0"
                    } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                  >
                    {!listProductTypesError ? (
                      listProductTypesData?.map((p, i) => (
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
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл
                </label>
                <textarea
                  id="information"
                  name="information"
                  placeholder="Хэрэглэх зориулалт болон заавар, орц найрлага, ач холбогдол, анхаарах зүйлс"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.information}
                  rows={4} // Adjust the number of rows as needed
                  className="p-2 border border-[#CDCDCD] rounded-lg" // You can adjust other styles as needed
                />
                {formik.touched.information && formik.errors.information ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.information}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Контентийн төрөл
                </label>
                <p className="underline text-sm">
                  Та нэг болон түүнээс дээш төрөл сонгох боломжтой бөгөөд
                  бүтээгч таны илүүд үзсэн контент хийцлэлийн төрлийг харгалзан
                  контентоо бүтээнэ.
                </p>
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
                    className="px-3 py-2 text-sm ring-offset-white h-10 w-full bg-white border-[1px] border-[#4D55F5] rounded-md"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Контент бүтээгчээс хүсэх хүсэлт
                </label>
                <textarea
                  id="requestForCreators"
                  name="requestForCreators"
                  placeholder="Хэрэглэх зориулалт болон заавар, орц найрлага, ач холбогдол, анхаарах зүйлс"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.requestForCreators}
                  rows={4} // Adjust the number of rows as needed
                  className="p-2 border border-[#CDCDCD] rounded-lg" // You can adjust other styles as needed
                />
                {formik.touched.requestForCreators &&
                formik.errors.requestForCreators ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.requestForCreators}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Контентын гаралт
                </label>
                <p className="underline text-sm">
                  Та нэг болон түүнээс дээш гаралт сонгох боломжтой бөгөөд
                  бүтээгч таны илүүд үзсэн контент хийцлэлийн төрлийг харгалзан
                  контентоо бүтээнэ.
                </p>
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
                    className="px-3 py-2 text-sm ring-offset-white h-10 w-full bg-white border-[2px] border-[#CA7FFE] rounded-md"
                  >
                    {c}
                  </div>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Тоо ширхэг
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
                <label className="font-bold" htmlFor="name">
                  Үнийн санал
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
              <button
                type="submit"
                className={`ml-[6px] mt-3 relative transition-all duration-150 w-full max-w-[403px] h-[90px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#1920B4]`}
              >
                <div
                  className={`absolute -top-[8px] -left-[6px] transition-all duration-150 z-50 text-white text-lg font-bold w-full max-w-[403px] h-[90px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex items-center justify-center`}
                >
                  <span>Бүтээгдэхүүн нэмэх</span>
                </div>
              </button>
              <Dialog open={createProductSuccess}>
                <DialogContent className="max-w-lg w-full flex flex-col items-center gap-2 rounded-3xl">
                  <span className="text-[#4FB755] text-4xl sm:text-5xl text-center font-bold">
                    БҮТЭЭГДЭХҮҮН НЭМЭГДЛЭЭ
                  </span>
                  <Image
                    src={"/product-added.png"}
                    width={209}
                    height={220}
                    alt="recieved"
                  />

                  <div className="w-full flex flex-col gap-5">
                    <div className="w-full flex flex-row justify-between items-start bg-[#F5F4F0] rounded-3xl p-4 sm:p-5">
                      <div className="w-full flex flex-row items-center gap-5">
                        {parsedUserInfo ? (
                          <Image
                            src={
                              parsedUserInfo.ProfileLink
                                ? parsedUserInfo?.ProfileLink
                                : "/dummy-profile.jpg"
                            }
                            width={77}
                            height={77}
                            alt=""
                            className="aspect-square rounded-full border border-[#2D262D]"
                          />
                        ) : (
                          <></>
                        )}
                        <div className="flex flex-row w-full items-start justify-between">
                          <div className="w-full flex flex-col gap-1">
                            <span className="font-bold text-xl">
                              {parsedUserInfo?.Name}
                            </span>
                            <span className="text-lg">
                              {createProductData?.ProductName}
                            </span>
                          </div>
                          <div className="bg-[#4D55F5] text-white text-center font-medium text-xs rounded-3xl px-4 py-2">
                            {parsedUserInfo?.BrandTypes?.[0]?.TypeName}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-[#F49D19] p-4 text-white rounded-2xl">
                      Geni танай бүтээгдэхүүнийг дээрх тоо ширхэгийн дагуу
                      баталгаажуулж, агуулахдаа хүлээн авсны дараа платформ дээр
                      бүтээгчдэд санал болгох болно. Баярлалаа.
                    </div>
                    <button
                      onClick={handleThanks}
                      className="w-full py-4 text-white font-semibold bg-[#4D55F5] text-2xl border border-[#2D262D] rounded-2xl"
                    >
                      Баярлалаа
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
