import * as Yup from "yup";

const addBrandDetailsSchema = Yup.object({
  Name: Yup.string().required("Заавал бөглөнө үү"),
  PhoneNumber: Yup.string().required("Заавал бөглөнө үү"),
  Bio: Yup.string().required("Заавал бөглөнө үү"),
  Website: Yup.string().required("Заавал бөглөнө ү"),
  RegNo: Yup.string().required("Заавал бөглөнө үү"),
  Address: Yup.string().required("Заавал бөглөнө үү"),
  AvgPrice: Yup.number().required("Заавал бөглөнө үү"),
  AvgProductSalesMonthly: Yup.number().required("Заавал бөглөнө үү"),
});

export { addBrandDetailsSchema };
