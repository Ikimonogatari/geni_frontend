import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import { withdrawCreditSchema } from "./schema";
import { Input } from "@/components/ui/input";
import SuccessModal from "@/components/common/SuccessModal";
import Image from "next/image";
import { ErrorText } from "@/components/ui/error-text";
import FadeInAnimation from "@/components/common/FadeInAnimation";
import { useCreatorWithdrawMutation } from "@/app/services/service";
import { toast } from "react-hot-toast";

interface WithdrawCreditProps {
  walletInfo: any;
  bankList: any;
  connectedAccount: any;
}

function WithdrawCredit({
  walletInfo,
  bankList,
  connectedAccount,
}: WithdrawCreditProps) {
  console.log(walletInfo?.CurrBal, "WALLET INFO");
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [creatorWithdraw, { isSuccess }] = useCreatorWithdrawMutation();

  const formik = useFormik({
    initialValues: {
      amount: "0",
    },
    validationSchema: withdrawCreditSchema,
    onSubmit: async (values) => {
      try {
        await creatorWithdraw(values);
      } catch (error) {
        toast.error("Алдаа гарлаа");
      }
    },
  });

  const bankName = bankList?.find(
    (bank) => bank.BankCode === connectedAccount?.BankCode
  );

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="aspect-[200/50] text-sm sm:text-base w-[200px] rounded-lg border-[1px] border-[#2D262D] flex justify-center items-center">
        Шилжүүлэг хийх
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-4 sm:gap-2 max-h-[739px] w-full lg:w-full max-w-xl rounded-3xl">
        {/* @ts-ignore */}
        <DialogTitle className="text-2xl sm:text-3xl xl:text-4xl font-bold">
          Шилжүүлэг хийх
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-4 mt-5 w-full">
            <div className="flex flex-row items-center justify-between px-3 py-2 h-12 w-full rounded-xl bg-primary-bg text-lg sm:text-xl">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={"/khan-bank-logo.png"}
                  alt=""
                  width={42}
                  height={42}
                  className="aspect-square max-w-10 max-h-10"
                />
                <span className="text-base sm:text-lg whitespace-nowrap">
                  {bankName?.Name}
                </span>
              </div>
              <span className="">{connectedAccount?.AcntNo}</span>
            </div>

            <Input
              id="amount"
              name="amount"
              type="string"
              className="no-spinner bg-primary-bg text-lg sm:text-xl"
              label="Шилжүүлэг хийх мөнгөн дүн"
              labelClassName="font-normal text-base sm:text-lg"
              layoutClassName="bg-primary-bg rounded-xl border-none px-3 gap-2"
              placeholder="50'000"
              leftSection="₮"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.amount}
              errorText={formik.errors.amount}
              errorVisible={!!formik.touched.amount && !!formik.errors.amount}
            />
            <div className="ml-auto text-geni-blue text-sm sm:text-base">
              Шилжүүлэг хийх доод дүн ₮50'000
            </div>
            <FadeInAnimation
              className="w-full flex justify-center"
              visible={
                parseFloat(walletInfo?.CurrBal || "0") <
                parseFloat(formik.values.amount.replace(/[^0-9.]/g, "") || "0")
              }
            >
              <ErrorText
                className="text-white bg-geni-red text-sm inline-flex items-center justify-center gap-3 rounded-lg p-2"
                text={"Таны шилжүүлэг хийх доод дүн хүрэлцэхгүй байна"}
                visible={
                  parseFloat(walletInfo?.CurrBal || "0") <
                  parseFloat(
                    formik.values.amount.replace(/[^0-9.]/g, "") || "0"
                  )
                }
                leftSection={
                  <Image
                    src={"/warning-icon.png"}
                    width={24}
                    height={24}
                    alt=""
                    className="w-6 h-6 aspect-square"
                  />
                }
              />
            </FadeInAnimation>
          </div>
          <SuccessModal
            setIsSuccessDialogOpen={setDialogOpen}
            modalImage="/geni-pink-image1.png"
            modalTitle="ШИЛЖҮҮЛЭГ АМЖИЛТТАЙ ХИЙГДЛЭЭ"
            modalTriggerText="Шилжүүлэх"
            imageClassName="w-[180px] h-[264px]"
            isSuccessDialogOpen={isSuccess}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default WithdrawCredit;
