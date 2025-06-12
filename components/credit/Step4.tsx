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
      <div className="flex flex-col md:flex-row gap-6 mt-2 sm:mt-4 w-full">
        <div className="w-full bg-[#F5F4F0] rounded-3xl p-3 sm:p-8 flex flex-col sm:flex-row items-center gap-4">
          <Image
            src={`/brand-bundle-${selectedPackageIndex + 1}.png`}
            width={200}
            height={200}
            alt=""
            className="w-auto lg:w-[200px] lg:h-[200px]"
          />
          <div className="w-auto md:w-full flex flex-col md:flex-row items-start md:items-center gap-4 sm:gap-5">
            <div className="w-full flex flex-col gap-2">
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
            </div>
          </div>
        </div>
        <div className="border p-3 sm:p-8 rounded-3xl w-full">
          <div className="flex flex-col justify-between gap-4 w-full">
            <div className="flex flex-col w-full">
              <div className="flex flex-row justify-between">
                <span>Geni кредит тоо: </span>
                <span>{packageData?.Credit}</span>
              </div>
              <div className="flex flex-row justify-between">
                <span>Нийт багцын үнэ:</span>
                <span>
                  <PriceFormatter price={packageData?.Price} />
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {formik && (
                <Input
                  id="couponCode"
                  name="couponCode"
                  type="text"
                  className="text-base sm:text-xl w-full"
                  wrapperClassName="w-full"
                  labelClassName=""
                  layoutClassName="h-full p-2 w-full rounded-full"
                  label="Купон код оруулах"
                  rightSection={
                    <button
                      onClick={() => formik.handleSubmit()}
                      type="button"
                      className="bg-geni-blue rounded-3xl border-primary border text-white text-sm px-2 py-2"
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
              <div className="flex flex-col w-full">
                {calculateCouponData?.Amount && (
                  <FadeInAnimation
                    className="flex flex-row justify-between border-b pb-2"
                    visible={calculateCouponData ? true : false}
                  >
                    <span>Купон хөнгөлөлт:</span>
                    <span className="text-geni-red">
                      -
                      <PriceFormatter
                        price={calculateCouponData?.Amount || 0}
                      />
                    </span>
                  </FadeInAnimation>
                )}
                <div className="flex flex-row justify-between">
                  <span>Төлөх дүн:</span>
                  <span>
                    <PriceFormatter
                      price={
                        (packageData?.Price || 0) -
                        (calculateCouponData?.Amount || 0)
                      }
                    />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Step4;
