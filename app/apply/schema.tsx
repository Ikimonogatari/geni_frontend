import * as Yup from "yup";

const addCreatorDetailsSchema = Yup.object({
  FirstName: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Зөвхөн Кирилл үсэг оруулна уу")
    .required("Заавал бөглөнө үү"),
  LastName: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Зөвхөн Кирилл үсэг оруулна уу")
    .required("Заавал бөглөнө үү"),
  Nickname: Yup.string().required("Заавал бөглөнө үү"),
  Email: Yup.string()
    .email("И-мэйл хаяг буруу байна")
    .required("Заавал бөглөнө үү"),
  PhoneNo: Yup.string()
    .required("Заавал бөглөнө үү")
    .length(8, "Утасны дугаар 8 оронтой байх ёстой"),
  Birthday: Yup.string().required("Заавал бөглөнө үү"),
  WorkInfo: Yup.string().required("Заавал бөглөнө үү"),
  EssentialToolInfo: Yup.string().required("Заавал бөглөнө үү"),
  ApplicationPurpose: Yup.string().required("Заавал бөглөнө үү"),
  ContentLink: Yup.string().nullable(),
  ContentFileId: Yup.mixed().nullable(),
}).test(
  "content-required",
  "Контент линк эсвэл файл оруулна уу",
  function (values) {
    return Boolean(values.ContentLink) || Boolean(values.ContentFileId);
  }
);

export { addCreatorDetailsSchema };
