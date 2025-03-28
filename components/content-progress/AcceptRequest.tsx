import React from "react";
import { FormikProps } from "formik";
import { FormikTypes } from "./content.services";
import { Textarea } from "../ui/textarea";

type AcceptRequestProps = {
  formik: FormikProps<FormikTypes>;
};

const AcceptRequest: React.FC<AcceptRequestProps> = ({ formik }) => {
  return (
    <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
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
                    ★
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
                    ★
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
                    ★
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
              <label className="flex items-center justify-between p-2 border rounded-xl">
                <span>
                  Контент бүтээгч өөрийн сувaг дээр пост хийх /Instagram,
                  Facebook/
                </span>
                <input
                  type="checkbox"
                  name="sharePost"
                  checked={formik.values.sharePost}
                  onChange={formik.handleChange}
                  className="w-5 h-5"
                />
              </label>
              <label className="flex items-center justify-between p-2 border rounded-xl">
                <span>"Collab" пост хийх /Instagram, Facebook/</span>
                <input
                  type="checkbox"
                  name="collabPost"
                  checked={formik.values.collabPost}
                  onChange={formik.handleChange}
                  className="w-5 h-5"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-4 mt-auto border-t">
        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 font-bold rounded-xl"
        >
          Хүлээж авах
        </button>
      </div>
    </div>
  );
};

export default AcceptRequest;
