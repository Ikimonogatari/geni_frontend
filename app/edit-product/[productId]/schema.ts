import * as Yup from "yup";

const editProductSchema = Yup.object({
  productPics: Yup.array().required("Заавал бөглөнө үү"),
  productTypes: Yup.array().required("Заавал бөглөнө үү"),
  productName: Yup.string().required("Заавал бөглөнө үү"),
  contentInfo: Yup.array()
    .of(
      Yup.object().shape({
        Type: Yup.string(),
        Name: Yup.string(),
      })
    )
    .required("Заавал бөглөнө үү")
    .test("custom-validation", function (contentInfo) {
      const hasOutcome = contentInfo?.some((item) => item.Type === "Type");
      const hasResult = contentInfo?.some((item) => item.Type === "Result");

      if (!hasOutcome || !hasResult) {
        return this.createError({
          path: this.path,
          message: `Контентын төрөл болон үр дүнгээс дор хаяж нэгийг сонгоно уу`,
        });
      }

      return true;
    }),
  addInfoSource: Yup.string().required("Заавал бөглөнө үү"),
  information: Yup.string().required("Заавал бөглөнө үү"),
  amount: Yup.string().required("Заавал бөглөнө үү"),
  requestForCreators: Yup.string().required("Заавал бөглөнө үү"),
  creditUsage: Yup.number()
    .integer()
    .min(0)
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Заавал бөглөнө үү"),
  price: Yup.number()
    .min(0)
    .transform((value) => (isNaN(value) ? undefined : value))
    .required("Заавал бөглөнө үү"),
  totalPrice: Yup.string()
    .required("Заавал бөглөнө үү")
    .test(
      "totalPrice-test",
      "Та 30’000 төгрөгнөөс доош үнийн дүнтэй бүтээгдэхүүн оруулж болохгүй бөгөөд бага үнийн үнтэй бүтээгдэхүүн байгаа бол тоо ширхэгийг нь нэмж илгээх хэрэгтэй.",
      function (value) {
        return parseFloat(value) >= 30000;
      }
    ),
});

export { editProductSchema };
