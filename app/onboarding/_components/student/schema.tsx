import * as Yup from "yup";

const addStudentDetailsSchema = Yup.object({
  FirstName: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Нэрээ зөвхөн Кирилл үсгээр оруулна уу")
    .required("Нэрээ оруулна уу"),
  LastName: Yup.string()
    .matches(/^[\u0400-\u04FF]+$/, "Овогоо зөвхөн Кирилл үсгээр оруулна уу")
    .required("Овогоо оруулна уу"),
  Nickname: Yup.string()
    .min(2, "Хэрэглэгчийн нэр 2-оос дээш тэмдэгт байх ёстой")
    .required("Хэрэглэгчийн нэрээ оруулна уу"),
  Bio: Yup.string()
    .max(150, "Танилцуулга 150-аас бага тэмдэгт байх ёстой")
    .required("Товч танилцуулгаа оруулна уу"),
  PhoneNumber: Yup.string()
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой тоо байх ёстой")
    .required("Утасны дугаараа оруулна уу"),
  RegNo: Yup.string()
    .matches(/^[А-ЯӨҮЁ]{2}[0-9]{8}$/, "Регистр ҮҮ12345678 форматтай байх ёстой")
    .required("Регистерийн дугаараа оруулна уу"),
  Birthday: Yup.string().required("Төрсөн огноогоо оруулна уу"),
  Gender: Yup.string().required("Хүйсээ сонгоно уу"),
});

export { addStudentDetailsSchema };
