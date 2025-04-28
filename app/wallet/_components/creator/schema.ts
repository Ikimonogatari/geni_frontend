import * as Yup from "yup";

const addBankAccountSchema = Yup.object({
  bankName: Yup.string().required("Заавал бөглөнө үү"),
  bankAccountNumber: Yup.number().required("Заавал бөглөнө үү"),
  bankAccountOwner: Yup.string().required("Заавал бөглөнө үү"),
});

const withdrawCreditSchema = Yup.object({
  amount: Yup.string().test(
    "min-amount",
    "Шилжүүлэг хийх доод дүн ₮50'000",
    (value) => {
      if (!value) return false;
      const numericValue = parseInt(value.replace(/[^0-9]/g, ""));
      return numericValue >= 50000;
    }
  ),
});

export { addBankAccountSchema, withdrawCreditSchema };
