import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import { addBankAccountSchema } from "./schema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ErrorText } from "@/components/ui/error-text";
import SuccessModal from "@/components/common/SuccessModal";
import FadeInAnimation from "@/components/common/FadeInAnimation";
import Image from "next/image";
import {
  useGetConnectedBankAccountQuery,
  useConnectBankAccountMutation,
  useUpdateBankAccountMutation,
  useCheckBankAccountNameMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import debounce from "lodash/debounce";
import Button from "@/components/ui/button";

interface AddBalanceProps {
  walletInfo: any;
  bankList: any;
  onTransactionComplete: () => Promise<void>;
  accountName: string;
  isCheckingName: boolean;
}

function AddBalance({
  bankList,
  onTransactionComplete,
  accountName,
  isCheckingName: parentIsCheckingName,
}: AddBalanceProps) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [hasConnectedAccount, setHasConnectedAccount] = useState(false);
  const [localIsCheckingName, setLocalIsCheckingName] = useState(false);
  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);
  // @ts-ignore
  const { data: connectedAccount } = useGetConnectedBankAccountQuery();
  const [connectBankAccount, { isSuccess: isConnectSuccess }] =
    useConnectBankAccountMutation();
  const [updateBankAccount, { isSuccess: isUpdateSuccess }] =
    useUpdateBankAccountMutation();
  const [checkBankAccountName] = useCheckBankAccountNameMutation();

  const formik = useFormik({
    initialValues: {
      bankName: "",
      bankAccountNumber: "",
      bankAccountOwner: "",
    },
    validationSchema: addBankAccountSchema,
    onSubmit: async (values) => {
      try {
        const accountData = {
          BankCode: values.bankName,
          AcntNo: values.bankAccountNumber,
        };

        if (hasConnectedAccount) {
          await updateBankAccount(accountData).unwrap();
        } else {
          await connectBankAccount(accountData).unwrap();
        }

        toast.success("Данс амжилттай холбогдлоо");
        await onTransactionComplete();
      } catch (error) {
        toast.error("Алдаа гарлаа");
      }
    },
  });

  useEffect(() => {
    if (connectedAccount) {
      setHasConnectedAccount(true);
      formik.setValues({
        bankName: connectedAccount.BankCode,
        bankAccountNumber: connectedAccount.AcntNo,
        bankAccountOwner: accountName,
      });
    }
  }, [connectedAccount, accountName]);

  useEffect(() => {
    if (isConnectSuccess || isUpdateSuccess) {
      // setIsSuccessDialogOpen(true);
    }
  }, [isConnectSuccess, isUpdateSuccess]);

  const checkAccountName = useCallback(
    debounce(async (bankCode: string, accountNumber: string) => {
      if (accountNumber.length >= 8 && bankCode) {
        setLocalIsCheckingName(true);
        try {
          const response = await checkBankAccountName({
            BankCode: bankCode,
            AcntNo: accountNumber,
          }).unwrap();
          formik.setFieldValue("bankAccountOwner", response.Name);
        } catch (error) {
          toast.error("Дансны нэр олдсонгүй");
        } finally {
          setLocalIsCheckingName(false);
        }
      }
    }, 500),
    []
  );

  const handleAccountNumberChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    formik.setFieldValue("bankAccountNumber", value);
    checkAccountName(formik.values.bankName, value);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="aspect-[200/50] text-sm sm:text-base w-[200px] rounded-lg border-[1px] border-[#2D262D] flex justify-center items-center">
        Данс холбох
      </DialogTrigger>
      {/* @ts-ignore */}
      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-4 sm:gap-2 max-h-[739px] w-full lg:w-full max-w-3xl rounded-3xl">
        {/* @ts-ignore */}
        <DialogTitle className="text-2xl sm:text-3xl xl:text-4xl font-bold">
          Данс холбох
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5 w-full">
            <div className="flex flex-col gap-3">
              <span className="font-normal text-base sm:text-lg">
                Банкны нэр
              </span>
              <Select
                value={formik.values.bankName}
                onValueChange={(value) => {
                  formik.setFieldValue("bankName", value);
                  formik.setFieldValue("bankAccountNumber", "");
                  formik.setFieldValue("bankAccountOwner", "");
                }}
              >
                {/* @ts-ignore */}
                <SelectTrigger className="bg-primary-bg rounded-xl h-12 border-none px-3 w-full text-base sm:text-lg">
                  <SelectValue placeholder="Банк сонгох" />
                </SelectTrigger>
                {/* @ts-ignore */}
                <SelectContent>
                  {bankList?.map((bank) => (
                    // @ts-ignore
                    <SelectItem
                      className="text-base sm:text-lg"
                      key={bank.BankCode}
                      value={bank.BankCode}
                    >
                      <div className="flex flex-row gap-2 items-center">
                        <Image
                          src={bank.Image}
                          width={36}
                          height={36}
                          alt={bank.Name}
                          className="w-9 h-9 rounded-lg object-contain"
                        />
                        {bank.Name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorText
                text={formik.errors.bankName}
                visible={!!formik.touched.bankName && !!formik.errors.bankName}
              />
            </div>
            <Input
              id="bankAccountNumber"
              name="bankAccountNumber"
              type="number"
              min={0}
              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none bg-primary-bg text-lg sm:text-xl"
              label="Дансны дугаар"
              labelClassName="font-normal text-base sm:text-lg"
              layoutClassName="bg-primary-bg rounded-xl border-none px-3"
              placeholder="0000 0000 0000"
              onChange={handleAccountNumberChange}
              onBlur={formik.handleBlur}
              value={formik.values.bankAccountNumber}
              errorText={formik.errors.bankAccountNumber}
              errorVisible={
                !!formik.touched.bankAccountNumber &&
                !!formik.errors.bankAccountNumber
              }
            />
            <Input
              id="bankAccountOwner"
              name="bankAccountOwner"
              type="text"
              min={0}
              className="no-spinner bg-primary-bg text-lg sm:text-xl cursor-not-allowed"
              label="Данс эзэмшигчийн нэр"
              labelClassName="font-normal text-base sm:text-lg"
              layoutClassName="bg-primary-bg rounded-xl border-none px-3"
              value={formik.values.bankAccountOwner}
              readOnly
              disabled={localIsCheckingName || parentIsCheckingName}
            />
          </div>
          <FadeInAnimation
            className="w-full flex justify-center"
            visible={false}
          >
            <ErrorText
              className="text-white bg-geni-red text-sm inline-flex items-center justify-center gap-3 rounded-lg p-2"
              text={"Таны шилжүүлэг хийх доод дүн хүрэлцэхгүй байна"}
              visible={false}
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
          <Button
            type="submit"
            className={`w-full py-4 text-white text-lg sm:text-xl font-bold rounded-lg border border-[#2D262D] bg-[#CA7FFE]`}
          >
            Холбох
          </Button>
          <SuccessModal
            setIsSuccessDialogOpen={setIsSuccessDialogOpen}
            modalImage="/payment-success.png"
            modalTitle="ДАНС АМЖИЛТТАЙ ХОЛБОГДЛОО"
            imageClassName="w-[342px] h-[261px]"
            isSuccessDialogOpen={isSuccessDialogOpen}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBalance;
