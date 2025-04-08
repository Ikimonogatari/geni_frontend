import * as Yup from "yup";

const addBrandDetailsSchema = Yup.object({
  Name: Yup.string()
    .min(2, "Хэт богино нэр байна")
    .required("Брэндийн нэрээ оруулна уу"),
  PhoneNumber: Yup.string()
    .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой тоо байх ёстой")
    .required("Утасны дугаараа оруулна уу"),
  Bio: Yup.string()
    .max(300, "Танилцуулга 300-аас бага тэмдэгт байх ёстой")
    .required("Брэндийн товч танилцуулгаа оруулна уу"),
  Website: Yup.string()
    .matches(
      /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([/?#].*)?$/,
      "Зөв вэбсайтын хаяг оруулна уу"
    )
    .required("Вэбсайт хаягаа оруулна уу"),
  RegNo: Yup.string()
    .matches(/^[0-9]{7}$/, "Регистрийн дугаар 7 оронтой тоо байх ёстой")
    .required("Регистрийн дугаараа оруулна уу"),
  Address: Yup.string()
    .min(5, "Хаяг хэт богино байна")
    .required("Байршлаа оруулна уу"),
  AvgPrice: Yup.number()
    .min(1, "Дундаж үнэ 0-ээс их байх ёстой")
    .required("Бүтээгдэхүүний дундаж үнээ оруулна уу"),
  AvgProductSalesMonthly: Yup.number()
    .min(1, "Сарын борлуулалт 0-ээс их байх ёстой")
    .required("Сарын дундаж борлуулалтаа оруулна уу"),
});

export { addBrandDetailsSchema };
