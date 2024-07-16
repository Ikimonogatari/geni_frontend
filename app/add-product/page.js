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
} from "../services/service";
import toast from "react-hot-toast";

function Page() {
  const router = useRouter();
  const [contentTypeOption, setContentTypeOption] = useState("");
  const [contentOutcomeOption, setContentOutcomeOption] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const formik = useFormik({
    initialValues: {
      brandId: "",
      productName: "",
      information: "",
      requestForCreators: "",
      quantity: "",
      price: "",
      contentInfo: "",
      productTypes: [],
      files: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      createPro;
      console.log(values);
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

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      const fileUploadPromises = acceptedFiles.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "product-pic");

        const response = await uploadFile(formData);
        if (response.data) {
          return response.data.Url; // Assuming response.data.fileUrl contains the uploaded file URL
        } else {
          return null;
        }
      });

      Promise.all(fileUploadPromises).then((urls) => {
        const validUrls = urls.filter((url) => url !== null);
        setImageUrls((prev) => [...prev, ...validUrls]);
        formik.setFieldValue("files", [...formik.values.files, ...validUrls]);
      });
    },
  });

  useEffect(() => {
    if (uploadFileError) {
      toast.error(uploadFileError.error);
      console.log("Error:", uploadFileError);
    }
    if (uploadFileData) {
      toast.success("");
      console.log("Success", uploadFileData);
      console.log(imageUrls);
    }
  }, [uploadFileData, uploadFileError]);

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
            className="mt-11 flex flex-col lg:flex-row gap-4"
          >
            <div className="flex flex-col w-full">
              {imageUrls.length < 1 && (
                <div
                  {...getRootProps()}
                  className="bg-[#F5F4F0] rounded-2xl min-h-[320px] sm:max-w-[554px] lg:max-h-[554px] p-5 h-full w-full flex flex-col justify-center items-center gap-4"
                >
                  <input {...getInputProps()} />
                  <Image
                    src={"/add-product-button.png"}
                    width={54}
                    height={54}
                    alt="add-product-button"
                  />
                  <p>Зураг оруулах</p>
                </div>
              )}

              {imageUrls.length > 0 && (
                <div className="flex flex-col gap-10 w-full">
                  <div className="w-full max-w-[554px]">
                    <Swiper
                      style={{
                        "--swiper-pagination-color": "#CA7FFE",
                        "--swiper-pagination-bullet-inactive-color": "#CDCDCD",
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
                    className="bg-[#F5F4F0] rounded-2xl p-5 max-w-[554px] max-h-[554px] w-full flex flex-col justify-center items-center gap-4"
                  >
                    <input {...getInputProps()} />
                    <Image
                      src={"/add-product-button.png"}
                      width={54}
                      height={54}
                      alt="add-product-button"
                    />
                    <p>Нэмэлт зураг оруулах</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col gap-4 w-full lg::max-w-lg">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={"/lhamour.png"}
                  width={44}
                  height={44}
                  alt="dummy"
                  className="border border-[#2D262D] rounded-full"
                />
                <span className="text-xl font-bold">lhamour</span>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний нэр
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="p-2 border border-[#CDCDCD] rounded-lg h-12"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний төрөл
                </label>
                <div className="flex flex-row items-center gap-2">
                  <div className="bg-[#CA7FFE] text-xs rounded-full px-4 py-2">
                    Beauty
                  </div>
                  <button className="bg-[#CA7FFE] text-xs rounded-full w-8 h-8 flex items-center justify-center">
                    <Image src={"/plus.png"} width={7} height={16} alt="+" />
                  </button>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл
                </label>
                <textarea
                  id="details"
                  name="details"
                  placeholder="Хэрэглэх зориулалт болон заавар, орц найрлага, ач холбогдол, анхаарах зүйлс"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.details}
                  rows={4} // Adjust the number of rows as needed
                  className="p-2 border border-[#CDCDCD] rounded-lg" // You can adjust other styles as needed
                />
                {formik.touched.details && formik.errors.details ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.details}
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
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentOptions1.map((c, i) => (
                      <SelectItem
                        key={i}
                        value={c}
                        className={`border-[#CDCDCD] border rounded-lg min-h-12 my-1 w-full text-start p-4`}
                      >
                        <div onClick={() => setContentTypeOption(c)}>{c}</div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Контентийн гаралт
                </label>
                <p className="underline text-sm">
                  Та нэг болон түүнээс дээш гаралт сонгох боломжтой бөгөөд
                  бүтээгч таны илүүд үзсэн контент хийцлэлийн төрлийг харгалзан
                  контентоо бүтээнэ.
                </p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentOptions2.map((c, i) => (
                      <SelectItem
                        key={i}
                        value={c}
                        className={`border-[#CDCDCD] border rounded-lg min-h-12 my-1 w-full text-start p-4`}
                      >
                        <div onClick={() => setContentOutcomeOption(c)}>
                          {c}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Контентийн дэлгэрэнгүй мэдээлэл
                </label>
                <textarea
                  id="contentInfo"
                  name="contentInfo"
                  placeholder="Хэрхэн пост болгох санаа, хүлээлт зэргээ дэлгэрэнгүй тайлбарлана уу."
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.contentInfo}
                  rows={4} // Adjust the number of rows as needed
                  className="p-2 border border-[#CDCDCD] rounded-lg" // You can adjust other styles as needed
                />
                {formik.touched.contentInfo && formik.errors.contentInfo ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.contentInfo}
                  </div>
                ) : null}
              </div>{" "}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;

const contentOptions1 = [
  "Хэрэглэгчийн сэтгэгдэл яриа",
  "Хэрэглэгчийн сэтгэгдлээ бичгэн хэлбэрээр илэрхийлсэн",
  "Бүтээгдэхүүний үзэмжит дүрсээс бүтсэн",
  "Хэрэглэж буй үе шат харуулсан",
  "Бүтээгдэхүүний ач холбогдол тайлбарласан",
  "Өөр хэрэгтэй мэдээлэлтэй холбосон",
  "Шинэлэг сошиал трэнд ая ашигласан",
  "Сонирхолтой зохиолтой",
  "Unboxing",
  "Чөлөөт",
  "Бусад",
];

const contentOptions2 = [
  "Бүтээгдэхүүн үйлчилгээгээ таниулах",
  "Анхаарал татах",
  "Сошиал дагагчаа өсгөх",
  "Контентоо олон хүнд хүргэх",
  "Шинэлэг хэрэгцээт мэдээлэл өгөх",
  "Борлуулалтаа өсгөх",
  "Бусад",
];
