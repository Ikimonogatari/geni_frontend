import React, { useState } from "react";
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

const bankOptions = [
  { label: "Bank of Mongolia", value: "bank_of_mongolia" },
  { label: "Golomt Bank", value: "golomt_bank" },
  { label: "Khan Bank", value: "khan_bank" },
  { label: "Trade and Development Bank", value: "trade_dev_bank" },
];

function AddBalance() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      bankName: "",
      bankAccountNumber: "",
      bankAccountOwner: "",
    },
    validationSchema: addBankAccountSchema,
    onSubmit: async (values) => {
      await createProduct(values);
    },
    validateOnMount: true,
  });

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger className="aspect-[200/50] text-sm sm:text-base w-[200px] rounded-lg border-[1px] border-[#2D262D] flex justify-center items-center">
        Данс холбох
      </DialogTrigger>

      <DialogContent className="overflow-y-auto flex flex-col items-center lg:items-start gap-4 sm:gap-2 max-h-[739px] w-full lg:w-full max-w-4xl rounded-3xl">
        <DialogTitle className="text-xl sm:text-3xl xl:text-4xl font-bold">
          Данс холбох
        </DialogTitle>
        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 w-full"
        >
          <div className="grid grid-cols-2 gap-4 mt-5 w-full">
            <div className="flex flex-col gap-3">
              <span className="font-normal text-base sm:text-lg">
                Банкны нэр
              </span>
              <Select
                value={formik.values.bankName}
                onValueChange={(value) =>
                  formik.setFieldValue("bankName", value)
                }
              >
                <SelectTrigger className="bg-primary-bg rounded-xl h-12 border-none px-3 w-full">
                  <SelectValue placeholder="Банкны нэр сонгох" />
                </SelectTrigger>
                <SelectContent>
                  {bankOptions.map((bank) => (
                    <SelectItem key={bank.value} value={bank.value}>
                      {bank.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ErrorText
                text={formik.errors.bankName}
                visible={formik.touched.bankName && formik.errors.bankName}
              />
            </div>
            <Input
              id="bankAccountNumber"
              name="bankAccountNumber"
              type="number"
              min={0}
              className="no-spinner bg-primary-bg"
              label="Дансны дугаар"
              labelClassName="font-normal text-base sm:text-lg"
              layoutClassName="bg-primary-bg rounded-xl border-none px-3"
              placeholder="0000 0000 0000"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bankAccountNumber}
              errorText={formik.errors.bankAccountNumber}
              errorVisible={
                formik.touched.bankAccountNumber &&
                formik.errors.bankAccountNumber
              }
            />
            <Input
              id="bankAccountOwner"
              name="bankAccountOwner"
              type="number"
              min={0}
              className="no-spinner bg-primary-bg"
              label="Данс эзэмшигчийн нэр"
              labelClassName="font-normal text-base sm:text-lg"
              layoutClassName="bg-primary-bg rounded-xl border-none px-3"
              placeholder="Дамдиндорж"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.bankAccountOwner}
              errorText={formik.errors.bankAccountOwner}
              errorVisible={
                formik.touched.bankAccountOwner &&
                formik.errors.bankAccountOwner
              }
            />
          </div>
          <button
            type="submit"
            className={`w-full py-4 text-white text-lg sm:text-xl font-bold rounded-lg border border-[#2D262D] bg-[#CA7FFE]`}
          >
            Холбох
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddBalance;
