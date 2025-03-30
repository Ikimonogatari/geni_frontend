import * as Yup from "yup";

const addBankAccountSchema = Yup.object({
  bankName: Yup.string().required("Заавал бөглөнө үү"),
  bankAccountNumber: Yup.number().required("Заавал бөглөнө үү"),
  bankAccountOwner: Yup.string().required("Заавал бөглөнө үү"),
});

const withdrawCreditSchema = Yup.object({
  Amount: Yup.number().required("Заавал бөглөнө үү"),
});

export { addBankAccountSchema, withdrawCreditSchema };
