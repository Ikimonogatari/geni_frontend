import * as Yup from "yup";

const addBankAccountSchema = Yup.object({
  bankName: Yup.array().required("Заавал бөглөнө үү"),
  bankAccountNumber: Yup.array().required("Заавал бөглөнө үү"),
  bankAccountOwner: Yup.string().required("Заавал бөглөнө үү"),
});

export { addBankAccountSchema };
