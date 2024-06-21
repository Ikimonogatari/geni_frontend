"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

function Page() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      name: "",

      files: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      // Handle form submission
      console.log(values);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      formik.setFieldValue("files", [...formik.values.files, ...acceptedFiles]);
    },
  });

  const [contentTypeOption, setContentTypeOption] = useState("");
  const [contentOutcomeOption, setContentOutcomeOption] = useState("");

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="max-w-7xl min-h-screen mx-auto px-7 py-11 container">
          <button
            onClick={() => router.back()}
            className="w-14 h-14 bg-[#F5F4F0] rounded-lg p-4"
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
              {formik.values.files.length < 1 && (
                <div
                  {...getRootProps()}
                  className="bg-[#F5F4F0] rounded-2xl sm:max-w-[554px] lg:max-h-[554px] p-5 h-full w-full flex flex-col justify-center items-center gap-4"
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

              {formik.values.files.length > 0 && (
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
                      {formik.values.files.map((file) => (
                        <SwiperSlide key={file.name}>
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
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
                  Контент бүтээгчээс хүсэх хүсэлт
                </label>
                <textarea
                  id="request"
                  name="request"
                  placeholder="Бүтээгчээс хүсэх нэмэлт зүйлс"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.request}
                  rows={4} // Adjust the number of rows as needed
                  className="p-2 border border-[#CDCDCD] rounded-lg" // You can adjust other styles as needed
                />
                {formik.touched.request && formik.errors.request ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.request}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Контентоос хүлээж буй гол үр дүн
                </label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Сонгох" />
                  </SelectTrigger>
                  <SelectContent>
                    {contentOptions1.map((c, i) => (
                      <SelectItem
                        key={i}
                        value={c}
                        className={`border-[#CDCDCD] border rounded-lg min-h-12 my-1 text-start p-4`}
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
                  id="amount"
                  name="amount"
                  type="text"
                  placeholder="0"
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
                <label className="font-bold" htmlFor="name">
                  Үнэ
                </label>
                <input
                  id="value"
                  name="value"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.value}
                  className="p-2 border border-[#CDCDCD] rounded-lg h-12"
                />
                {formik.touched.value && formik.errors.value ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.value}
                  </div>
                ) : null}
              </div>

              <div className="mt-8 block relative w-full h-[70px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#131aaf]">
                <Dialog>
                  <DialogTrigger
                    type="submit"
                    className="absolute -top-[8px] -left-[6px] z-50 text-white text-xl font-bold w-full h-[70px] rounded-xl border-[1px] border-[#2D262D] bg-[#4D55F5] flex items-center justify-center"
                  >
                    Бүтээгдэхүүн нэмэх
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center gap-2">
                    <span className="text-[#4FB755] text-5xl text-center font-bold">
                      БҮТЭЭГДЭХҮҮН НЭМЭГДЛЭЭ
                    </span>
                    <Image
                      src={"/product-added-alert-image.png"}
                      width={209}
                      height={220}
                      alt="product-added"
                    />
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-row justify-between items-start bg-[#F5F4F0] rounded-3xl p-5">
                        <div className="flex flex-row items-center gap-5">
                          <Image
                            src={"/lhamour.png"}
                            width={77}
                            height={77}
                            alt="lhamour"
                            className="rounded-full border border-[#2D262D]"
                          />
                          <div className="flex flex-col gap-2">
                            <span className="font-bold">lhamour</span>
                            <span className="text-lg">
                              Нүүрний чийгшүүлэг тос
                            </span>
                          </div>
                        </div>
                        <div className="bg-[#CA7FFE] text-xs rounded-full px-4 py-2">
                          Beauty
                        </div>
                      </div>
                      <span className="bg-[#F49D19] text-white rounded-2xl text-lg p-4">
                        Geni танай бүтээгдэхүүнийг дээрх тоо ширхэгийн дагуу
                        баталгаажуулж, агуулахдаа хүлээн авсны дараа платформ
                        дээр бүтээгчдэд санал болгох болно. Баярлалаа.
                      </span>
                      <DialogClose>
                        <button className="w-full py-4 text-white font-bold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl">
                          Баярлалаа
                        </button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
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
