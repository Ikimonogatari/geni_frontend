import React from "react";
import Image from "next/image";
import PriceFormatter from "@/components/common/FormatPrice";
import { Input } from "@/components/ui/input";
import FadeInAnimation from "@/components/common/FadeInAnimation";

function Step3({
  selectedPayment,
  setSelectedPayment,
  formik,
  courseData = null,
  calculateCouponData = null
}) {

  console.log("Coupon data:", calculateCouponData || "No coupon data available");
  console.log("Course data:", courseData || "No course data available");
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <span className="text-xl sm:text-2xl xl:text-3xl font-bold">
        Идэвхжүүлэх багцын мэдээлэл
      </span>

      <div className="w-full mt-2 sm:mt-4 bg-[#F5F4F0] rounded-3xl p-3 sm:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-14 lg:gap-20">
        <Image
          src={`/creator-image1.png`}
          width={200}
          height={256}
          alt=""
          className="w-auto lg:w-[200px] lg:h-[256px]"
        />
        <div className="w-auto md:w-full grid grid-cols-1 lg:grid-cols-2 items-start md:items-center gap-4 sm:gap-5">
          <div className="w-full flex flex-col items-start gap-2 col-span-1">
            <span className="text-xl sm:text-2xl font-bold text-center whitespace-nowrap">
              Geni Creator Course
            </span>
            <div className="flex flex-col">
              <span className="text-sm sm:text-base">Нийт үнэ:</span>
              <span className="text-xl sm:text-2xl">
                <PriceFormatter price={courseData?.coursePrice || 0} />
              </span>
              <FadeInAnimation visible={calculateCouponData ? true : false}>
                <span className="text-geni-green">
                  Купон хөнгөлөлт: <PriceFormatter price={(courseData?.coursePrice || 0) - (calculateCouponData?.Amount || 0)} />
                </span>
              </FadeInAnimation>
            </div>

            <div className="flex flex-col">
              <span className="text-sm sm:text-base">Төлөх дүн: </span>
              <span className="text-xl sm:text-2xl">
                <PriceFormatter price={calculateCouponData?.Amount || courseData?.coursePrice || 0} />
              </span>
            </div>
          </div>
          <Input
            id="couponCode"
            name="couponCode"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full max-w-[262px] col-span-1"
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
            errorVisible={formik.touched.couponCode && formik.errors.couponCode}
          />
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
      </div>
    </div>
  );
}

export default Step3;
