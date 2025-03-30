import * as Yup from "yup";

const addStudentDetailsSchema = Yup.object({
  FirstName: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Зөвхөн Кирилл үсэг оруулна уу")
    .required("Заавал бөглөнө үү"),
  LastName: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Зөвхөн Кирилл үсэг оруулна уу")
    .required("Заавал бөглөнө үү"),
  Nickname: Yup.string().required("Заавал бөглөнө үү"),
  Bio: Yup.string().required("Заавал бөглөнө үү"),
  PhoneNumber: Yup.string().required("Заавал бөглөнө үү"),
  RegNo: Yup.string().required("Заавал бөглөнө үү"),
  Birthday: Yup.string().required("Заавал бөглөнө үү"),
  Gender: Yup.string().required("Заавал бөглөнө үү"),
});

export { addStudentDetailsSchema };
