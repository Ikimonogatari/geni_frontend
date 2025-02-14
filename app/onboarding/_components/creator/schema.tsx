import * as Yup from "yup";

const addCreatorDetailsSchema = Yup.object({
  FirstName: Yup.string().required("Заавал бөглөнө үү"),
  LastName: Yup.string().required("Заавал бөглөнө үү"),
  Email: Yup.string().required("Заавал бөглөнө үү"),
  PhoneNumber: Yup.string().required("Заавал бөглөнө үү"),
  BirthDate: Yup.string().required("Заавал бөглөнө үү"),
});

export { addCreatorDetailsSchema };
