import * as Yup from "yup";

const editProductSchema = Yup.object({
  productName: Yup.string().required("Заавал бөглөнө үү"),
  contentInfo: Yup.array()
    .of(
      Yup.object().shape({
        Type: Yup.string(),
        Name: Yup.string(),
      })
    )
    .required("Content info is required")
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

  information: Yup.string().required("Заавал бөглөнө үү"),
  amount: Yup.string().required("Заавал бөглөнө үү"),
  requestForCreators: Yup.string().required("Заавал бөглөнө үү"),
  quantity: Yup.string().required("Заавал бөглөнө үү"),
  price: Yup.string().required("Заавал бөглөнө үү"),
});

export { editProductSchema };
