"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
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
import toast from "react-hot-toast";
import HandleButton from "@/app/components/common/HandleButton";

function Page() {
  const router = useRouter();
  const params = useParams();
  const userInfo = Cookies.get("user-info");
  console.log(userInfo ? userInfo : "");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  console.log(parsedUserInfo);
  const userType = Cookies.get("userType");
  const { id } = params;
  const [productContentRequestMsg, setProductContentRequestMsg] = useState("");
  const [otherAddress, setOtherAddress] = useState("");
  const [useOtherAddress, setUseOtherAddress] = useState(false);

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
  const [requestState, setRequestState] = useState("not-sent");
  const [swiper, setSwiper] = useState(null);
  const goNext = () => {
    swiper.slideNext();
  };
  const goPrev = () => {
    swiper.slidePrev();
  };

  const handleProductContentRequest = () => {
    const address = useOtherAddress ? otherAddress : parsedUserInfo?.Location;

    requestProductContent({
      ProductId: id,
      RequestReason: productContentRequestMsg,
      AdditionalAddress: address,
    });
  };

  useEffect(() => {
    if (requestProductContentData) {
      setRequestState("sent");
    }
    if (requestProductContentError) {
      toast.error(requestProductContentError?.data?.error);
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
            className="mt-11 flex flex-col md:flex-row items-start gap-10"
          >
            <div className="flex flex-col gap-6 w-full md:w-1/2">
              <div className="flex flex-row items-center gap-4 w-full">
                {getPublicProductByIdData &&
                getPublicProductByIdData?.ProductPics?.length > 1 ? (
                  <button onClick={goPrev}>
                    <Image
                      src={"/creators-swipe-button.png"}
                      width={42}
                      height={42}
                      alt="swipe-button"
                      className="hidden sm:block min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
                    />
                  </button>
                ) : (
                  <></>
                )}

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
                  className=""
                >
                  {getPublicProductByIdData ? (
                    getPublicProductByIdData?.ProductPics?.map((p, i) => (
                      <SwiperSlide key={i}>
                        <Image
                          src={p.Url}
                          alt={""}
                          width={554}
                          height={554}
                          className="aspect-square rounded-2xl w-full"
                        />
                      </SwiperSlide>
                    ))
                  ) : (
                    <></>
                  )}
                </Swiper>
                {getPublicProductByIdData &&
                getPublicProductByIdData?.ProductPics?.length > 1 ? (
                  <button onClick={goNext}>
                    <Image
                      src={"/creators-swipe-button.png"}
                      width={42}
                      height={42}
                      alt="swipe-button"
                      className="hidden sm:block rotate-180 min-w-[31px] min-h-[31px] lg:min-w-[42px] lg:min-h-[42px]"
                    />
                  </button>
                ) : (
                  <></>
                )}
              </div>
              {getPublicProductByIdData ? (
                <div className="flex flex-row items-center gap-4">
                  <span className="px-7 py-3 bg-[#F5F4F0] rounded-3xl">
                    <b>Үлдэгдэл: </b>
                    {getPublicProductByIdData?.LeftStock}/
                    {getPublicProductByIdData?.Quantity}
                  </span>
                  <span className="px-7 py-3 bg-[#F5F4F0] rounded-3xl">
                    <b>Үнэ:</b> ₮
                    {Number(getPublicProductByIdData?.Price).toLocaleString()}
                  </span>
                </div>
              ) : (
                <></>
              )}
            </div>

            <div className="flex flex-col gap-4 w-full md:w-1/2">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={getPublicProductByIdData?.BrandProfileUrl}
                  width={77}
                  height={77}
                  alt=""
                  className="border border-[#2D262D] rounded-full w-[77px] h-[77px]"
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
                        className="bg-[#CA7FFE] text-xs text-white rounded-full px-4 py-2"
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
              <div className="flex flex-col gap-3 text-lg md:max-w-sm">
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
              <div className="flex flex-col gap-3 text-lg md:max-w-sm">
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
              <div className="flex flex-col gap-3 text-lg md:max-w-sm">
                <span className="font-bold">
                  Контентоос хүлээж буй гол үр дүн
                </span>
                {getPublicProductByIdData &&
                getPublicProductByIdData.ContentResult != null ? (
                  getPublicProductByIdData?.ContentResult.map((c, i) => (
                    <div
                      key={i}
                      className={`border-[#CDCDCD] border-[2px] rounded-lg p-4 cursor-pointer transition-all duration-150`}
                    >
                      {c.Name}
                    </div>
                  ))
                ) : (
                  <></>
                )}
              </div>
              <div className="flex flex-col gap-3 text-lg md:max-w-sm">
                <span className="font-bold">Тоо ширхэг</span>
                <span className="p-4 border border-[#CDCDCD] rounded-lg">
                  {getPublicProductByIdData ? (
                    getPublicProductByIdData.Quantity
                  ) : (
                    <></>
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-3 text-lg md:max-w-sm">
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
                <Dialog>
                  <DialogTrigger
                    onClick={() => setRequestState("not-sent")}
                    type="submit"
                    className={
                      getPublicProductByIdData?.LeftStock === 0 && "opacity-55"
                    }
                  >
                    <HandleButton
                      disabled={getPublicProductByIdData?.LeftStock === 0}
                      width={`mt-8 w-full aspect-[371/84] md:max-w-sm`}
                      text={"Бүтээгдэхүүн авах"}
                      bg={"bg-[#CA7FFE]"}
                      shadowbg={"shadow-[0.25rem_0.25rem_#9c44da]"}
                    />
                  </DialogTrigger>

                  {requestState === "sent" ? (
                    <DialogContent className="w-full max-w-lg flex flex-col items-center gap-2 rounded-3xl">
                      <span className="text-[#4FB755] text-4xl sm:text-5xl text-center font-bold">
                        ХҮСЭЛТ ИЛГЭЭГДЛЭЭ
                      </span>
                      <Image
                        src={"/request-received.png"}
                        width={209}
                        height={220}
                        alt="recieved"
                      />
                      <DialogClose className="w-full">
                        <button
                          onClick={() => router.push("/creator-profile")}
                          className="w-full py-4 text-white font-semibold bg-[#CA7FFE] text-2xl border border-[#2D262D] rounded-2xl"
                        >
                          Баярлалаа
                        </button>
                      </DialogClose>
                    </DialogContent>
                  ) : (
                    <DialogContent className="w-full flex flex-col max-w-2xl rounded-3xl">
                      <span className="text-2xl font-bold">Хүсэлт илгээх</span>
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
                        className="bg-[#F5F4F0] rounded-lg mt-4 w-full p-4 min-h-[100px]"
                      />
                      <span className="text-xl">Хүргүүлэх хаяг:</span>

                      <label className="bg-[#F5F4F0] rounded-lg w-full p-4 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={!useOtherAddress}
                          onChange={() => setUseOtherAddress(false)}
                        />
                        <div className="w-5 h-5 bg-[#F5F4F0] border-2 border-[#CA7FFE] rounded flex items-center justify-center peer-checked:bg-[#CA7FFE] peer-checked:border-[#CA7FFE]">
                          <span className="text-[#F5F4F0] font-bold text-xl select-none">
                            ✓
                          </span>
                        </div>
                        <span className="text-base">
                          Бүртгэлтэй гэрийн хаяг
                        </span>
                      </label>

                      {/* Checkbox to use another address */}
                      <label className="bg-[#F5F4F0] rounded-lg w-full p-4 flex items-center space-x-2">
                        <input
                          type="checkbox"
                          className="hidden peer"
                          checked={useOtherAddress}
                          onChange={() => setUseOtherAddress(true)}
                        />
                        <div className="w-5 h-5 bg-[#F5F4F0] border-2 border-[#CA7FFE] rounded flex items-center justify-center peer-checked:bg-[#CA7FFE] peer-checked:border-[#CA7FFE]">
                          <span className="text-[#F5F4F0] font-bold text-xl select-none">
                            ✓
                          </span>
                        </div>
                        <span className="text-base">Бусад</span>
                      </label>

                      {/* Text area for the other address */}
                      {useOtherAddress && (
                        <textarea
                          value={otherAddress}
                          onChange={(e) => setOtherAddress(e.target.value)}
                          placeholder="Нэмэлт хаягаа энд бичнэ үү"
                          className="bg-[#F5F4F0] rounded-lg w-full p-4 min-h-[100px]"
                        />
                      )}
                      <button
                        onClick={handleProductContentRequest}
                        className="mt-3 bg-[#CA7FFE] border-[#2D262D] border font-semibold rounded-lg text-center py-4 text-xl text-white w-full"
                      >
                        Хүсэлт илгээх
                      </button>
                    </DialogContent>
                  )}
                </Dialog>
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
