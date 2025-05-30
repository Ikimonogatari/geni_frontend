import React, { useEffect } from "react";
import { FormikProps, useFormikContext } from "formik";
import { DictCode, FormikTypes, RefundReason } from "../content.services";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useDictListMutation } from "@/app/services/service";
import _ from "lodash";

const AcceptRequest: React.FC = () => {
  const formik = useFormikContext<FormikTypes>();
  const [dictList, { isLoading: isDictListLoading, data: dictListData }] =
    useDictListMutation();

  useEffect(() => {
    dictList({
      dictCode: DictCode.BRAND_FEEDBACK,
    });
  }, []);

  const handleBrandFeedBackChange = (dictId: number) => {
    if (formik.values.BrandFeedBack.includes(dictId)) {
      formik.setFieldValue(
        "BrandFeedBack",
        _.without(formik.values.BrandFeedBack, dictId)
      );
    } else {
      formik.setFieldValue(
        "BrandFeedBack",
        _.union(formik.values.BrandFeedBack, [dictId])
      );
    }
  };

  return (
    <div className="w-full flex flex-col p-4">
      <div className="flex-1 pr-2">
        <div className="flex flex-col gap-6">
          <p className="text-xl font-bold">Та контент бүтээгчид оноо өгнө үү</p>
          <div className="flex flex-col gap-4 border-[1px] border-[#E6E6E6] rounded-xl p-4">
            <div className="flex flex-col gap-2">
              <p>Брэндийн өгсөн чиглүүлгийн дагуу хийсэн эсэх</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => formik.setFieldValue("brandStar", star)}
                    className={`text-2xl ${
                      formik.values.brandStar >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <Image
                      src={
                        formik.values.brandStar >= star
                          ? "/star.png"
                          : "/empty-star.png"
                      }
                      alt="Star"
                      width={28}
                      height={28}
                    />
                    {/* ★ */}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p>Контентын агуулга</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => formik.setFieldValue("contentStar", star)}
                    className={`text-2xl ${
                      formik.values.contentStar >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <Image
                      src={
                        formik.values.contentStar >= star
                          ? "/star.png"
                          : "/empty-star.png"
                      }
                      alt="Star"
                      width={28}
                      height={28}
                    />
                    {/* ★ */}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p>Контентын хийцлэл</p>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      formik.setFieldValue("contentDesignStar", star)
                    }
                    className={`text-2xl ${
                      formik.values.contentDesignStar >= star
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                  >
                    <Image
                      src={
                        formik.values.contentDesignStar >= star
                          ? "/star.png"
                          : "/empty-star.png"
                      }
                      alt="Star"
                      width={28}
                      height={28}
                    />
                    {/* ★ */}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">
              Та контент бүтээгчид сэтгэгдлээ үлдээнэ үү
            </p>
            <Textarea
              rows={3}
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Энд бичнэ үү."
              maxLength={600}
              max={true}
              charCount={formik.values.comment?.length}
              wrapperClassName="w-full"
            />
          </div>

          <div className="flex flex-col gap-3 border-geni-gray border-[1px] rounded-xl p-4 pt-0">
            <div className="flex flex-col gap-2 bg-white rounded-xl p-4">
              <p className="text-xl font-bold mb-2">Контент пост хийх хүсэлт</p>
              {(dictListData as RefundReason[])?.map((item, index) => (
                <label
                  key={index}
                  className="flex items-center justify-between p-2 border rounded-xl"
                >
                  <span>{item.DictVal}</span>
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="BrandFeedBack"
                      id={`BrandFeedBack-${item.DictId}`}
                      className="peer hidden"
                      checked={formik.values.BrandFeedBack.includes(
                        item.DictId
                      )}
                      onChange={() => handleBrandFeedBackChange(item.DictId)}
                    />
                    <label
                      htmlFor={`BrandFeedBack-${item.DictId}`}
                      className="w-6 h-6 rounded-lg border-2 border-orange-300 flex items-center justify-center cursor-pointer transition-all peer-checked:border-green-500"
                    >
                      <span
                        className={`text-sm sm:text-base ${
                          formik.values.BrandFeedBack.includes(item.DictId)
                            ? "text-green-500"
                            : "hidden"
                        } text-center select-none peer-checked:inline-block w-3 h-5 border-white`}
                      >
                        ✓
                      </span>
                    </label>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcceptRequest;
