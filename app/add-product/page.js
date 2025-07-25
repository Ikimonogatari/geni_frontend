"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";

import toast from "react-hot-toast";
import {
  useCreateProductMutation,
  useListProductDictsQuery,
  useListProductTypesQuery,
  useGetUserInfoQuery,
} from "../services/service";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import BackButton from "@/components/common/BackButton";
import HandleButton from "@/components/common/HandleButton";
import InfoHover from "@/components/common/InfoHover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ProductAddedSuccessModal from "./ProductAddedSuccessModal";
import MediaUploader from "@/components/common/MediaUploader";
import { addProductSchema } from "./schema";
import { MinusIcon, PlusIcon } from "lucide-react";
import { ErrorText } from "@/components/ui/error-text";
import FadeInAnimation from "@/components/common/FadeInAnimation";
import CreditPurchase from "@/components/credit/CreditPurchaseModal";
import Loader from "@/components/common/Loader";

function Page() {
  const [selectedContentTypes, setSelectedContentTypes] = useState([]);
  const [selectedContentOutcomes, setSelectedContentOutcomes] = useState([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [createProductSuccess, setCreateProductSuccess] = useState(false);
  const [productTypes, setProductTypes] = useState([]);
  const [availableProductTypes, setAvailableProductTypes] = useState([]);

  // Add state for "Бусад" (Other) options
  const [customTypeInputs, setCustomTypeInputs] = useState([]);
  const [customOutcomeInputs, setCustomOutcomeInputs] = useState([]);

  const {
    data: userInfo,
    isLoading: userInfoLoading,
    refetch: refetchUserInfo,
  } = useGetUserInfoQuery({});

  // TODO product type remove add formik error fix, product edit fix
  const formik = useFormik({
    initialValues: {
      productName: "",
      information: "",
      requestForCreators: "",
      amount: "",
      addInfoSource: "",
      credit: "",
      creditUsage: "",
      quantity: "",
      price: "",
      totalPrice: "",
      contentInfo: [],
      productTypes: [],
      productPics: [],
    },
    validationSchema: addProductSchema,
    onSubmit: async (values) => {
      const { credit, creditUsage, totalPrice, ...restValues } = values;
      const calculatedQuantity = creditUsage * credit;

      const modifiedValues = {
        ...restValues,
        credit: credit,
        creditUsage: creditUsage,
        quantity: calculatedQuantity,
      };

      await createProduct(modifiedValues);
    },
    validateOnMount: true,
  });

  const [
    createProduct,
    {
      data: createProductData,
      error: createProductError,
      isLoading: createProductLoading,
    },
  ] = useCreateProductMutation();

  const {
    data: listProductTypesData,
    error: listProductTypesError,
    isLoading: listProductTypesLoading,
  } = useListProductTypesQuery();

  const {
    data: listProductDictsTypeData,
    error: listProductDictsTypeError,
    isLoading: listProductDictsTypeLoading,
  } = useListProductDictsQuery("Type");

  const {
    data: listProductDictsResultData,
    error: listProductDictsResultError,
    isLoading: listProductDictsResultLoading,
  } = useListProductDictsQuery("Result");

  useEffect(() => {
    if (createProductError) {
      toast.error(createProductError?.data?.error);
    }
    if (createProductData) {
      setCreateProductSuccess(true);
    }
  }, [createProductData, createProductError]);

  useEffect(() => {
    if (listProductTypesData) {
      setAvailableProductTypes(listProductTypesData);
    }
  }, [listProductTypesData]);

  const handleProductType = (newType) => {
    if (!productTypes.some((p) => p.TypeName === newType.TypeName)) {
      setProductTypes((prev) => [...prev, newType]);

      // Remove from available product types
      setAvailableProductTypes((prev) =>
        prev.filter((p) => p.TypeName !== newType.TypeName)
      );
    }
    formik.setFieldValue("productTypes", [
      ...formik.values.productTypes,
      newType.ProductTypeId,
    ]);
  };

  const handleRemoveProductType = (typeNameToRemove) => {
    setProductTypes((prev) =>
      prev.filter((p) => p.TypeName !== typeNameToRemove)
    );

    // Re-add the type back to available product types
    const removedType = { TypeName: typeNameToRemove };
    setAvailableProductTypes((prev) => [...prev, removedType]);
    formik.setFieldValue(
      "productTypes",
      formik.values.productTypes.filter(
        (id) => id !== typeNameToRemove.ProductTypeId
      )
    );
  };

  const handleContentTypeOption = (value) => {
    const selectedItem = listProductDictsTypeData.find((c) => c.Val === value);

    // Add or remove selected content types
    if (selectedItem) {
      setSelectedContentTypes((prev) => {
        // If already selected, remove it; otherwise, add it
        if (prev.includes(selectedItem.Name)) {
          return prev.filter((name) => name !== selectedItem.Name);
        } else {
          return [...prev, selectedItem.Name];
        }
      });

      // Update formik values for contentInfo
      const newContentInfoItem = {
        Type: "Type", // Assuming Type is "Type" for this section
        Name: selectedItem.Name,
      };
      const contentInfoExists = formik.values.contentInfo.some(
        (item) => item.Name === selectedItem.Name && item.Type === "Type"
      );

      if (!contentInfoExists) {
        formik.setFieldValue("contentInfo", [
          ...formik.values.contentInfo,
          newContentInfoItem,
        ]);
      }
    }
  };

  const handleContentOutcomeOption = (value) => {
    const selectedItem = listProductDictsResultData.find(
      (c) => c.Val === value
    );

    // Add or remove selected content outcomes
    if (selectedItem) {
      setSelectedContentOutcomes((prev) => {
        // If already selected, remove it; otherwise, add it
        if (prev.includes(selectedItem.Name)) {
          return prev.filter((name) => name !== selectedItem.Name);
        } else {
          return [...prev, selectedItem.Name];
        }
      });

      // Update formik values for contentInfo
      const newContentInfoItem = {
        Type: "Result", // Assuming Type is "Result" for this section
        Name: selectedItem.Name,
      };
      const contentInfoExists = formik.values.contentInfo.some(
        (item) => item.Name === selectedItem.Name && item.Type === "Result"
      );

      if (!contentInfoExists) {
        formik.setFieldValue("contentInfo", [
          ...formik.values.contentInfo,
          newContentInfoItem,
        ]);
      }
    }
  };

  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value);
    const creditUsage = parseInt(formik.values.creditUsage, 10);

    if (!isNaN(creditUsage) && !isNaN(price)) {
      formik.setFieldValue("price", e.target.value);
      formik.setFieldValue("totalPrice", (price * creditUsage).toString());
      formik.setFieldTouched("totalPrice", true);
    } else {
      formik.setFieldValue("price", e.target.value);
      formik.setFieldValue("totalPrice", "0");
      formik.setFieldTouched("totalPrice", true);
    }
  };

  const handleCreditUsageChange = (e) => {
    const creditUsage = parseInt(e.target.value, 10);
    const price = parseFloat(formik.values.price);

    if (!isNaN(creditUsage) && !isNaN(price)) {
      formik.setFieldValue("creditUsage", creditUsage);
      formik.setFieldValue("totalPrice", (price * creditUsage).toString());
      formik.setFieldTouched("totalPrice", true);
    } else {
      formik.setFieldValue("creditUsage", creditUsage);
      formik.setFieldValue("totalPrice", "0");
      formik.setFieldTouched("totalPrice", true);
    }
  };

  const isFormDisabled =
    !formik.dirty ||
    !formik.isValid ||
    formik.isSubmitting ||
    !formik.values.productTypes.length ||
    !formik.values.productPics.length;

  if (userInfoLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="">
        <div className="max-w-6xl min-h-screen mx-auto px-7 py-11 container">
          <BackButton />
          <form
            onSubmit={formik.handleSubmit}
            className="mt-11 flex flex-col lg:flex-row gap-10"
          >
            <MediaUploader
              onDrop={({ ids }) => {
                formik.setFieldValue("productPics", [
                  ...formik.values.productPics,
                  ...ids,
                ]);
              }}
              onRemove={(fileId) => {
                const updatedPics = formik.values.productPics.filter(
                  (id) => id !== fileId
                );
                formik.setFieldValue("productPics", updatedPics);
              }}
            />
            <div className="flex flex-col gap-4 w-full lg::max-w-lg">
              <div className="flex flex-row items-center gap-3">
                <Image
                  src={
                    userInfo?.ProfileLink
                      ? userInfo?.ProfileLink
                      : "/dummy-brand.png"
                  }
                  width={44}
                  height={44}
                  alt=""
                  className="border border-primary rounded-full w-11 h-11"
                />
                <span className="text-xl font-bold">{userInfo?.Name}</span>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="productName">
                  Бүтээгдэхүүний нэр
                </label>
                <Input
                  id="productName"
                  name="productName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.productName}
                  errorText={formik.errors.productName}
                  errorVisible={
                    formik.touched.productName && formik.errors.productName
                  }
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-bold" htmlFor="name">
                  Бүтээгдэхүүний төрөл
                </label>
                <div className="relative flex flex-row flex-wrap items-center gap-2">
                  {productTypes?.map((p, i) => (
                    <div
                      key={i}
                      className="flex flex-row whitespace-nowrap justify-between items-center bg-geni-blue text-white text-center text-xs rounded-full pl-4 pr-0.5 py-0.5 gap-2"
                    >
                      {p.TypeName}
                      <button
                        type="button"
                        className="rounded-full w-6 h-6 bg-white"
                        onClick={() => handleRemoveProductType(p.TypeName)}
                      >
                        <MinusIcon color="black" />
                      </button>
                    </div>
                  ))}
                  <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="cursor-pointer outline-none bg-geni-blue text-xs rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    <PlusIcon color="white" />
                  </div>
                  <div
                    className={`${
                      dropdownOpen && availableProductTypes.length > 0
                        ? `top-full opacity-100 visible`
                        : "top-[110%] invisible opacity-0"
                    } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                  >
                    {!listProductTypesError
                      ? availableProductTypes?.map((p) => (
                          <div
                            key={p.TypeName}
                            onClick={() => handleProductType(p)}
                            className="cursor-pointer mt-1 bg-geni-blue text-white text-center text-xs rounded-full px-4 py-2"
                          >
                            {p.TypeName}
                          </div>
                        ))
                      : null}
                  </div>
                  <ErrorText
                    text={formik.errors.productTypes}
                    visible={
                      formik.touched.productTypes && formik.errors.productTypes
                    }
                  />
                </div>
              </div>

              <Textarea
                id="information"
                name="information"
                placeholder="Хэрэглэх зориулалт болон заавар, орц найрлага, ач холбогдол, анхаарах зүйлс"
                label="Бүтээгдэхүүний дэлгэрэнгүй мэдээлэл"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.information}
                rows={5}
                maxLength={1000}
                charCount={formik.values.information.length}
                errorText={formik.errors.information}
                errorVisible={
                  formik.touched.information && formik.errors.information
                }
              />

              <Input
                id="addInfoSource"
                name="addInfoSource"
                type="text"
                label="Нэмэлт мэдээлэл авах сурвалж"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.addInfoSource}
                errorText={formik.errors.addInfoSource}
                errorVisible={
                  formik.touched.addInfoSource && formik.errors.addInfoSource
                }
              />

              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="contentType"
                >
                  Контентийн төрөл
                  <InfoHover
                    contentText={
                      "Та нэг болон түүнээс дээш төрөл сонгох боломжтой бөгөөд бүтээгч таны сонгосон контент хийцлэлийн төрлийг харгалзан контентоо бүтээнэ."
                    }
                  />
                </label>

                {/* Show selected content types */}
                {selectedContentTypes.map((selected) => (
                  <div
                    key={selected}
                    className="px-3 py-2 text-sm ring-offset-white h-10 w-full bg-white border-2 border-geni-blue rounded-md flex flex-row items-center justify-between"
                  >
                    {selected}
                    <button
                      type="button"
                      className="w-6 h-6 bg-geni-blue rounded-full aspect-square"
                      onClick={() => {
                        // Remove from selectedContentTypes
                        setSelectedContentTypes((prev) =>
                          prev.filter((item) => item !== selected)
                        );
                        // Remove from formik values
                        formik.setFieldValue(
                          "contentInfo",
                          formik.values.contentInfo.filter(
                            (item) =>
                              !(item.Type === "Type" && item.Name === selected)
                          )
                        );
                      }}
                    >
                      <MinusIcon color="white" />
                    </button>
                  </div>
                ))}

                {/* Show custom input fields */}
                {customTypeInputs.map((input, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-sm ring-offset-white min-h-10 w-full bg-white border-2 border-geni-blue rounded-md flex flex-row items-center justify-between"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => {
                        const newInputs = [...customTypeInputs];
                        newInputs[index] = e.target.value;
                        setCustomTypeInputs(newInputs);
                      }}
                      placeholder="Контентийн төрлөө энд бичнэ үү"
                      className="flex-1 outline-none bg-transparent"
                    />
                    <div className="flex flex-row gap-2">
                      <button
                        type="button"
                        className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded-full aspect-square flex items-center justify-center"
                        onClick={() => {
                          const trimmedText = input.trim();
                          if (trimmedText) {
                            // Add to selectedContentTypes
                            setSelectedContentTypes((prev) => [
                              ...prev,
                              trimmedText,
                            ]);

                            // Add to contentInfo
                            formik.setFieldValue("contentInfo", [
                              ...formik.values.contentInfo,
                              {
                                Type: "Type",
                                Name: trimmedText,
                              },
                            ]);

                            // Remove this input from the array
                            const newInputs = [...customTypeInputs];
                            newInputs.splice(index, 1);
                            setCustomTypeInputs(newInputs);
                          }
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="w-6 h-6 bg-geni-blue rounded-full aspect-square flex items-center justify-center"
                        onClick={() => {
                          // Remove this input from the array
                          const newInputs = [...customTypeInputs];
                          newInputs.splice(index, 1);
                          setCustomTypeInputs(newInputs);
                        }}
                      >
                        <MinusIcon color="white" />
                      </button>
                    </div>
                  </div>
                ))}

                <Select
                  name="contentType"
                  value=""
                  onValueChange={(value) => {
                    if (value === "custom_other") {
                      // Add a new empty input
                      setCustomTypeInputs((prev) => [...prev, ""]);
                    } else {
                      handleContentTypeOption(value);
                    }
                  }}
                >
                  <SelectTrigger>Сонгох</SelectTrigger>
                  <SelectContent>
                    {listProductDictsTypeData
                      ?.filter(
                        (c) =>
                          c.Type === "Type" &&
                          !selectedContentTypes.includes(c.Name)
                      )
                      .map((c) => (
                        <SelectItem
                          key={c.Val}
                          value={c.Val}
                          className="border border-geni-gray rounded-lg min-h-12 my-1 w-full text-start p-4"
                        >
                          {c.Name}
                        </SelectItem>
                      ))}
                    {/* Always show Бусад option */}
                    <SelectItem
                      value="custom_other"
                      className="border border-geni-gray rounded-lg min-h-12 my-1 w-full text-start p-4"
                    >
                      Бусад (Custom)
                    </SelectItem>
                  </SelectContent>
                </Select>

                <ErrorText
                  text={
                    typeof formik.errors.contentInfo === "string"
                      ? formik.errors.contentInfo
                      : null
                  }
                  visible={
                    formik.touched.contentInfo && formik.errors.contentInfo
                  }
                />
              </div>

              <Textarea
                id="requestForCreators"
                name="requestForCreators"
                placeholder="Контент агуулга болон хийцлэлтэй холбоотой бүтээгчээс хүсэх нэмэлт зүйлс"
                label="Контент бүтээгчээс хүсэх хүсэлт"
                hoverInfo="Контентийн агуулга болон хийцлэлтэй хамааралтай брэндийн чиглүүлэг болон бүтээгчээс хүсэх хүсэлтээ бичсэнээр таны хүсэж буй контент гарах магадлал ихсэнэ."
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.requestForCreators}
                rows={5}
                maxLength={1000}
                charCount={formik.values.requestForCreators.length}
                errorText={formik.errors.requestForCreators}
                errorVisible={
                  formik.touched.requestForCreators &&
                  formik.errors.requestForCreators
                }
              />

              <div className="flex flex-col gap-3">
                <label
                  className="font-bold flex flex-row items-center justify-between"
                  htmlFor="contentOutcome"
                >
                  Контентоос хүлээж буй гол үр дүн
                  <InfoHover
                    contentText={
                      "Хийлгэж буй контентоо ашиглаж хүрэх үр дүнгээ оруулсанаар контент бүтээгч таны зорилгыг илүү сайн мэдэж контентдоо шингээх болно."
                    }
                  />
                </label>

                {/* Show selected content outcomes */}
                {selectedContentOutcomes.map((selected) => (
                  <div
                    key={selected}
                    className="px-3 py-2 text-sm ring-offset-white h-10 w-full bg-white border-2 border-geni-blue rounded-md flex flex-row items-center justify-between"
                  >
                    {selected}
                    <button
                      type="button"
                      className="w-6 h-6 bg-geni-blue rounded-full aspect-square"
                      onClick={() => {
                        // Remove from selectedContentOutcomes
                        setSelectedContentOutcomes((prev) =>
                          prev.filter((item) => item !== selected)
                        );
                        // Remove from formik values
                        formik.setFieldValue(
                          "contentInfo",
                          formik.values.contentInfo.filter(
                            (item) =>
                              !(
                                item.Type === "Result" && item.Name === selected
                              )
                          )
                        );
                      }}
                    >
                      <MinusIcon color="white" />
                    </button>
                  </div>
                ))}

                {/* Show custom input fields */}
                {customOutcomeInputs.map((input, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 text-sm ring-offset-white min-h-10 w-full bg-white border-2 border-geni-blue rounded-md flex flex-row items-center justify-between"
                  >
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => {
                        const newInputs = [...customOutcomeInputs];
                        newInputs[index] = e.target.value;
                        setCustomOutcomeInputs(newInputs);
                      }}
                      placeholder="Контентоос хүлээж буй үр дүнгээ энд бичнэ үү"
                      className="flex-1 outline-none bg-transparent"
                    />
                    <div className="flex flex-row gap-2">
                      <button
                        type="button"
                        className="w-6 h-6 bg-green-500 hover:bg-green-600 rounded-full aspect-square flex items-center justify-center"
                        onClick={() => {
                          const trimmedText = input.trim();
                          if (trimmedText) {
                            // Add to selectedContentOutcomes
                            setSelectedContentOutcomes((prev) => [
                              ...prev,
                              trimmedText,
                            ]);

                            // Add to contentInfo
                            formik.setFieldValue("contentInfo", [
                              ...formik.values.contentInfo,
                              {
                                Type: "Result",
                                Name: trimmedText,
                              },
                            ]);

                            // Remove this input from the array
                            const newInputs = [...customOutcomeInputs];
                            newInputs.splice(index, 1);
                            setCustomOutcomeInputs(newInputs);
                          }
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="w-6 h-6 bg-geni-blue rounded-full aspect-square flex items-center justify-center"
                        onClick={() => {
                          // Remove this input from the array
                          const newInputs = [...customOutcomeInputs];
                          newInputs.splice(index, 1);
                          setCustomOutcomeInputs(newInputs);
                        }}
                      >
                        <MinusIcon color="white" />
                      </button>
                    </div>
                  </div>
                ))}

                <Select
                  name="contentOutcome"
                  value=""
                  onValueChange={(value) => {
                    if (value === "custom_other") {
                      // Add a new empty input
                      setCustomOutcomeInputs((prev) => [...prev, ""]);
                    } else {
                      handleContentOutcomeOption(value);
                    }
                  }}
                >
                  <SelectTrigger>Сонгох</SelectTrigger>
                  <SelectContent>
                    {listProductDictsResultData
                      ?.filter(
                        (c) =>
                          c.Type === "Result" &&
                          !selectedContentOutcomes.includes(c.Name)
                      )
                      .map((c) => (
                        <SelectItem
                          key={c.Val}
                          value={c.Val}
                          className="border-geni-gray border rounded-lg min-h-12 my-1 w-full text-start p-4"
                        >
                          {c.Name}
                        </SelectItem>
                      ))}
                    {/* Always show Бусад option */}
                    <SelectItem
                      value="custom_other"
                      className="border-geni-gray border rounded-lg min-h-12 my-1 w-full text-start p-4"
                    >
                      Бусад (Custom)
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* Remove old state variable references */}
                <ErrorText
                  text={formik.errors.contentInfo}
                  visible={
                    formik.touched.contentInfo && formik.errors.contentInfo
                  }
                />
              </div>

              <Input
                id="amount"
                name="amount"
                type="text"
                label="Хэмжээ"
                hoverInfo={
                  <>
                    Таны бүтээгдэхүүн ямар хэмжих нэгжтэйгээс хамаарч энд
                    ойлгомжтой оруулна уу. <br />
                    <br />
                    Жишээ: XL, L, 1 хайрцаг: 24 ширхэг, 2 литр гэх мэт
                  </>
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.amount}
                errorText={formik.errors.amount}
                errorVisible={formik.touched.amount && formik.errors.amount}
              />
              <Input
                id="price"
                name="price"
                type="number"
                min={0}
                className="no-spinner"
                label="Бүтээгчид илгээх нэгж бүтээгдэхүүний үнийн дүн"
                hoverInfo="Нэг бүтээгчид санал болгож буй бүтээгдэхүүнийхээ үнийг оруулна. Нэг бүтээгчид нэгээс дээш бүтээгдэхүүн илгээж байгаа бол нийт үнийг оруулна."
                onChange={handlePriceChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
                leftSection="₮"
                errorText={formik.errors.price}
                errorVisible={formik.touched.price && formik.errors.price}
              />
              <Input
                id="creditUsage"
                name="creditUsage"
                type="number"
                min={0}
                className="no-spinner"
                label="1 бүтээгчид илгээх бүтээгдэхүүний тоо"
                hoverInfo="Энд та нэг бүтээгчид илгээж буй бүтээгдэхүүнийхээ тоо ширхэгийг оруулна."
                onChange={handleCreditUsageChange}
                onBlur={formik.handleBlur}
                value={formik.values.creditUsage}
                errorText={formik.errors.creditUsage}
                errorVisible={
                  formik.touched.creditUsage && formik.errors.creditUsage
                }
              />
              <Input
                disabled={true}
                id="totalPrice"
                name="totalPrice"
                type="number"
                min={0}
                className="no-spinner"
                label="1 бүтээгчид илгээж буй нийт бүтээгдэхүүний үнийн дүн"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.totalPrice}
                leftSection="₮"
                errorText={formik.errors.totalPrice}
                errorVisible={
                  formik.touched.totalPrice && formik.errors.totalPrice
                }
              />

              <Input
                id="credit"
                name="credit"
                type="number"
                min={0}
                className="no-spinner"
                label="Нийт хэдэн бүтээгчидтэй хамтрах вэ?"
                hoverInfo="/1 хамтрал = 1 credit/"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.credit}
                errorText={formik.errors.credit}
                errorVisible={formik.touched.credit && formik.errors.credit}
              />
              <div className="flex flex-col gap-2 border-primary border p-3 sm:p-4 bg-primary-bg rounded-xl">
                <span className="font-bold">
                  Таны Geni Credit Үлдэгдэл:{" "}
                  {userInfo?.Credit ? userInfo?.Credit : 0}
                </span>
                <FadeInAnimation
                  visible={userInfo?.Credit < formik.values.credit}
                >
                  <ErrorText
                    text={
                      "Таны Geni Credit үлдэгдэл хүрэлцэхгүй байна. Та Geni Credit-ээ цэнэглэнэ үү."
                    }
                    visible={true}
                  />
                </FadeInAnimation>
                <CreditPurchase
                  buttonText={"Geni Credit цэнэглэх"}
                  buttonIconSize={"w-4 h-4"}
                  className={
                    "text-lg flex flex-row items-center justify-center py-4 w-full"
                  }
                  onCreditPurchase={() => {
                    // Refetch user info
                    refetchUserInfo();
                  }}
                />
              </div>
              <HandleButton
                type="submit"
                disabled={isFormDisabled}
                text={"Бүтээгдэхүүн нэмэх"}
                className={"text-lg"}
                bg={`bg-geni-blue ${
                  isFormDisabled
                    ? "bg-primary-bg cursor-not-allowed text-[#CDCDCD]"
                    : "bg-geni-blue cursor-pointer"
                }`}
                shadowbg={`${
                  isFormDisabled
                    ? "shadow-[0.25rem_0.25rem_#CDCDCD] cursor-not-allowed"
                    : "shadow-[0.25rem_0.25rem_#131AAF] cursor-pointer"
                }`}
                width={"mt-3 w-full max-w-[403px] h-[90px]"}
              />

              <ProductAddedSuccessModal
                setCreateProductSuccess={setCreateProductSuccess}
                createProductData={createProductData}
                createProductSuccess={createProductSuccess}
                userInfo={userInfo}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
