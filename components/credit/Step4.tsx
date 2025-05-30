import React, { useState } from "react";
import Image from "next/image";
import { useListPaymentPlansQuery } from "@/app/services/service";
import PriceFormatter from "@/components/common/FormatPrice";
import { Input } from "@/components/ui/input";
import FadeInAnimation from "@/components/common/FadeInAnimation";

function Step4({
  selectedPackageIndex,
  selectedPayment,
  setSelectedPayment,
  formik = null,
  calculateCouponData = null,
  selectedPackageData = null,
}) {
  const {
    data: listPaymentPlansData,
    error: listPaymentPlansError,
    isLoading: listPaymentPlansLoading,
  } = useListPaymentPlansQuery({});

  // Use provided selectedPackageData or fallback to local data
  const packageData =
    selectedPackageData ||
    (listPaymentPlansData ? listPaymentPlansData[selectedPackageIndex] : null);

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Идэвхжүүлэх багцын мэдээлэл
      </span>

      <div className="w-full mt-2 sm:mt-4 bg-[#F5F4F0] rounded-3xl p-3 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-14">
        <Image
          src={`/brand-bundle-${selectedPackageIndex + 1}.png`}
          width={200}
          height={200}
          alt=""
          className="w-auto lg:w-[200px] lg:h-[200px]"
        />
        <div className="w-auto md:w-full flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-5">
          <div className="w-full grid grid-cols-2 items-start gap-2">
            <div className="flex flex-col text-[#6F6F6F] col-span-1">
              <span>Geni кредит:</span>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
                {packageData?.Credit}
              </span>
            </div>
            <div className="flex flex-col text-[#6F6F6F] col-span-1">
              <span>Контентийн үнэ: </span>
              <span className="text-base sm:text-lg md:text-xl lg:text-2xl">
                <PriceFormatter price={packageData?.ContentPrice} />
              </span>
            </div>
            <div className="flex flex-col col-span-1">
              <span className="text-sm sm:text-base">Нийт үнэ:</span>
              <span className="text-xl sm:text-2xl">
                <PriceFormatter price={packageData?.Price || 0} />
              </span>
              <FadeInAnimation visible={calculateCouponData ? true : false}>
                <span className="text-geni-green text-sm">
                  Купон хөнгөлөлт:{" "}
                  <PriceFormatter
                    price={
                      (packageData?.Price || 0) -
                      (calculateCouponData?.Amount || 0)
                    }
                  />
                </span>
              </FadeInAnimation>
            </div>

            <div className="flex flex-col col-span-1">
              <span className="text-sm sm:text-base">Төлөх дүн: </span>
              <span className="text-xl sm:text-2xl">
                <PriceFormatter
                  price={calculateCouponData?.Amount || packageData?.Price || 0}
                />
              </span>
            </div>
          </div>
          {formik && (
            <Input
              id="couponCode"
              name="couponCode"
              type="text"
              className="text-base sm:text-xl w-full"
              wrapperClassName="w-full md:max-w-[262px] col-span-1"
              labelClassName="text-lg font-normal"
              layoutClassName="h-full p-2 w-full"
              label="Купон код оруулах"
              rightSection={
                <button
                  onClick={() => formik.handleSubmit()}
                  type="button"
                  className="bg-geni-green rounded-lg border-primary border text-white text-sm px-2 py-2"
                >
                  Идэвхжүүлэх
                </button>
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.couponCode}
              errorText={formik.errors.couponCode}
              errorVisible={
                formik.touched.couponCode && formik.errors.couponCode
              }
            />
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between w-full sm:items-center">
        <div className="flex flex-col gap-2">
          <span className="text-[#6F6F6F] text-base sm:text-xl font-bold">
            Та төлбөр төлөх нөхцөлөө сонгоно уу
          </span>
          <button
            onClick={() => setSelectedPayment("qpay")}
            className={`w-[172px] h-[72px] border-[2px] transition-all duration-150 ${
              selectedPayment === "qpay"
                ? "border-[#4D55F5]"
                : "border-[#F5F4F0]"
            } flex justify-center items-center rounded-3xl bg-[#F5F4F0]`}
          >
            <Image
              src={"/qpay.png"}
              width={96}
              height={36}
              alt="payment"
              className="w-[64px] h-[24px] sm:w-[96px] sm:h-[36px]"
            />
          </button>
        </div>
        <div className="flex flex-col gap-2 border-l-0 sm:border-l-[1px] border-geni-gray sm:pl-10">
          <span className="text-[#6F6F6F] text-base sm:text-xl font-bold">
            Нэхэмжлэх авах
          </span>
          <button
            onClick={() => setSelectedPayment("invoice")}
            className={`w-[172px] h-[72px] border-[2px] transition-all duration-150 ${
              selectedPayment === "invoice"
                ? "border-[#4D55F5]"
                : "border-[#F5F4F0]"
            } text-primary text-2xl sm:text-4xl font-extrabold flex justify-center items-center rounded-3xl bg-[#F5F4F0]`}
          >
            PDF
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step4;
