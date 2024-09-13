"use client";
import React, { useEffect, useState } from "react";
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
import { useRouter, useParams } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  useGetPublicProductByIdQuery,
  useRequestProductContentMutation,
} from "@/app/services/service";
import Cookies from "js-cookie";

function Page() {
  const router = useRouter();
  const params = useParams();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const userType = Cookies.get("userType");
  const { id } = params;
  const [productContentRequestMsg, setProductContentRequestMsg] = useState("");
  const {
    data: getPublicProductByIdData,
    error: getPublicProductByIdError,
    isLoading: getPublicProductByIdLoading,
  } = useGetPublicProductByIdQuery(id);
  if (getPublicProductByIdData) {
    console.log(getPublicProductByIdData);
  }
  const [
    requestProductContent,
    {
      data: requestProductContentData,
      error: requestProductContentError,
      isLoading: requestProductContentLoading,
    },
  ] = useRequestProductContentMutation();

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

  const [contentTypeOption, setContentTypeOption] = useState("");
  const [contentOutcomeOption, setContentOutcomeOption] = useState("");
  const [requestState, setRequestState] = useState("not-sent");
  const [swiper, setSwiper] = useState(null);
  const goNext = () => {
    swiper.slideNext();
  };
  const goPrev = () => {
    swiper.slidePrev();
  };

  const handleProductContentRequest = () => {
    requestProductContent({
      ProductId: id,
      RequestReason: productContentRequestMsg,
    });
  };

  useEffect(() => {
    if (requestProductContentData) {
      setRequestState("sent");
    }
  }, [requestProductContentData, requestProductContentError]);

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32">
        <div className="max-w-8xl min-h-screen mx-auto px-7 py-11 container">
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
            className="mt-11 flex flex-col lg:flex-row items-start gap-10"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-row items-center gap-4 w-1/2">
                <button onClick={goPrev}>
                  <Image
                    src={"/creators-swipe-button.png"}
                    width={42}
                    height={42}
                    alt="swipe-button"
                    className="hidden sm:block min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
                  />
                </button>
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
                  onSwiper={(s) => {
                    setSwiper(s);
                  }}
                  modules={[Pagination]}
                >
                  {getPublicProductByIdData ? (
                    getPublicProductByIdData?.ProductPics.map((p, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          src={p.Url}
                          alt={""}
                          layout="responsive"
                          width={554}
                          height={554}
                          className="object-cover rounded-2xl max-w-[554px] max-h-[554px]"
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <></>
                  )}
                </Swiper>
                <button onClick={goNext}>
                  <Image
                    src={"/creators-swipe-button.png"}
                    width={42}
                    height={42}
                    alt="swipe-button"
                    className="hidden sm:block rotate-180 min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
                  />
                </button>
              </div>
              <div className="flex flex-row items-center gap-4">
                <span className="px-7 py-3 bg-[#F5F4F0] rounded-3xl">
                  <b>Үлдэгдэл: </b>
                  {getPublicProductByIdData?.LeftStock}/
                  {getPublicProductByIdData?.Quantity}
                </span>
                <span className="px-7 py-3 bg-[#F5F4F0] rounded-3xl">
                  <b>Үнэ:</b> ₮{getPublicProductByIdData?.Price}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 w-full lg:w-1/2">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={"/lhamour.png"}
                  width={77}
                  height={77}
                  alt="dummy"
                  className="border border-[#2D262D] rounded-full"
                />
                <div className="flex flex-col gap-2">
                  <span className="text-xl font-bold">
                    {getPublicProductByIdData ? (
                      getPublicProductByIdData.BrandName
                    ) : (
                      <></>
                    )}
                  </span>
                  <span className="text-lg">
                    {getPublicProductByIdData ? (
                      getPublicProductByIdData.ProductName
                    ) : (
                      <></>
                    )}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {getPublicProductByIdData &&
                  getPublicProductByIdData.ProductTypes != null ? (
                    getPublicProductByIdData?.ProductTypes?.map((t, i) => (
                      <div
                        key={i}
                        className="bg-[#CA7FFE] text-xs rounded-full px-4 py-2"
                      >
                        {t.TypeName}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 text-lg mt-10">
                <span className="font-bold">
                  Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл
                </span>
                <span className="text-[#757575]">
                  {getPublicProductByIdData ? (
                    getPublicProductByIdData.Information
                  ) : (
                    <></>
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-3 text-lg max-w-sm">
                <span className="font-bold">
                  Брэндийн хүсэж буй контентийн төрөл
                </span>
                <div className="flex flex-col gap-3">
                  {getPublicProductByIdData &&
                  getPublicProductByIdData.ContentType != null ? (
                    getPublicProductByIdData?.ContentType.map((c, i) => (
                      <div
                        key={i}
                        onClick={() => setContentTypeOption(c.Val)}
                        className={`${
                          contentTypeOption === c.Val
                            ? "border-[#4D55F5] border-[2px]"
                            : "border-[#CDCDCD] border-[2px]"
                        } rounded-lg p-4 cursor-pointer transition-all duration-150`}
                      >
                        {c.Name}
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-3 text-lg max-w-sm">
                <label className="font-bold" htmlFor="name">
                  Контент бүтээгчээс хүсэх хүсэлт
                </label>
                <p className="p-4 border border-[#CDCDCD] rounded-lg">
                  {getPublicProductByIdData ? (
                    getPublicProductByIdData.RequestForCreators
                  ) : (
                    <></>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-3 text-lg max-w-sm">
                <span className="font-bold">
                  Контентоос хүлээж буй гол үр дүн
                </span>
                {getPublicProductByIdData &&
                getPublicProductByIdData.ContentResult != null ? (
                  getPublicProductByIdData?.ContentResult.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => setContentOutcomeOption(c.Val)}
                      className={`${
                        contentOutcomeOption === c.Val
                          ? "border-[#4D55F5] border-[2px]"
                          : "border-[#CDCDCD] border-[2px]"
                      } rounded-lg p-4 cursor-pointer transition-all duration-150`}
                    >
                      {c.Name}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col gap-3 text-lg max-w-sm">
                <span className="font-bold">Тоо ширхэг</span>
                <span className="p-4 border border-[#CDCDCD] rounded-lg">
                  {getPublicProductByIdData ? (
                    getPublicProductByIdData.Quantity
                  ) : (
                    <></>
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-3 text-lg max-w-sm">
                <span className="font-bold">Үнэ</span>
                <span className="p-4 border border-[#CDCDCD] rounded-lg">
                  ₮
                  {getPublicProductByIdData &&
                  getPublicProductByIdData.Price != null ? (
                    getPublicProductByIdData.Price
                  ) : (
                    <></>
                  )}
                </span>
              </div>

              {userType === "Creator" ? (
                <div className="mt-8 block relative w-full h-[70px] shadow-2xl rounded-xl border-[1px] border-[#2D262D] bg-[#9C44DA]">
                  <Dialog>
                    <DialogTrigger
                      onClick={() => setRequestState("not-sent")}
                      type="submit"
                      className="absolute -top-[8px] -left-[6px] z-50 text-white text-xl font-bold w-full h-[70px] rounded-xl border-[1px] border-[#2D262D] bg-[#CA7FFE] flex items-center justify-center"
                    >
                      Бүтээгдэхүүн авах
                    </DialogTrigger>

                    {requestState === "sent" ? (
                      <DialogContent className="max-w-lg flex flex-col items-center gap-2">
                        <span className="text-[#4FB755] text-5xl text-center font-bold">
                          ХҮСЭЛТ ИЛГЭЭГДЛЭЭ
                        </span>
                        <Image
                          src={"/request-received.png"}
                          width={209}
                          height={220}
                          alt="recieved"
                        />

                        <div className="flex flex-col gap-5">
                          <div className="flex flex-row justify-between items-start bg-[#F5F4F0] rounded-3xl p-5">
                            <div className="w-full flex flex-row items-center gap-5">
                              {parsedUserInfo ? (
                                <Image
                                  src={
                                    parsedUserInfo.ProfilePic
                                      ? "/dummy-creator.png"
                                      : "/dummy-profile.jpg"
                                  }
                                  width={128}
                                  height={128}
                                  alt=""
                                  className="w-[128px] h-[128px] rounded-2xl"
                                />
                              ) : (
                                <></>
                              )}

                              <div className="w-full flex flex-col gap-2">
                                <div className="w-full flex flex-row items-center gap-3">
                                  <span className="font-bold text-xl">
                                    {parsedUserInfo?.FirstName}
                                    {parsedUserInfo?.Name}
                                  </span>
                                  <Image
                                    src={"/verified-icon.png"}
                                    width={24}
                                    height={24}
                                    alt="verified"
                                    className="w-6 h-6"
                                  />
                                </div>

                                <span className="text-lg">
                                  {parsedUserInfo ? parsedUserInfo?.Point : 0}
                                  xp
                                </span>
                              </div>
                            </div>
                          </div>

                          <DialogClose>
                            <button className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl">
                              Баярлалаа
                            </button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    ) : (
                      <DialogContent className="flex flex-col max-w-2xl">
                        <span className="text-2xl font-bold">
                          Хүсэлт илгээх
                        </span>
                        <span className="text-xl mt-6">
                          Бүтээгдэхүүнийг сонирхож буй шалтгаан болон тухайн
                          бүтээгдэхүүнд зориулан хийх контент санаагаа товч
                          хуваалцаарай.
                        </span>
                        <textarea
                          onChange={(e) =>
                            setProductContentRequestMsg(e.target.value)
                          }
                          placeholder="Энд бичнэ үү"
                          className="bg-[#F5F4F0] rounded-lg mt-4 w-full p-4 min-h-[203px]"
                        />
                        <button
                          onClick={handleProductContentRequest}
                          className="mt-3 bg-[#CA7FFE] border-[#2D262D] border font-semibold rounded-lg text-center py-4 text-xl text-white w-full"
                        >
                          Хүсэлт илгээх
                        </button>
                      </DialogContent>
                    )}
                  </Dialog>
                </div>
              ) : (
                <></>
              )}
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
];

const contentOptions2 = [
  "Бүтээгдэхүүн үйлчилгээгээ таниулах",
  "Анхаарал татах",
  "Бусад",
];
