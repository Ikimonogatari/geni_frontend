import React from "react";
import { Content, FormikTypes } from "./content.services";
import { FormikProps } from "formik";
import { Textarea } from "../ui/textarea";

type EditRequestProps = {
  content: Content;
  formik: FormikProps<FormikTypes>;
};

const MAX_REASONS = 3;

const EditRequest: React.FC<EditRequestProps> = ({ content, formik }) => {
  const addReason = () => {
    if (formik.values.reasons.length < MAX_REASONS) {
      formik.setFieldValue("reasons", [...formik.values.reasons, ""]);
    }
  };

  const removeReason = (index: number) => {
    formik.setFieldValue(
      "reasons",
      formik.values.reasons.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="h-[calc(700px-40px)] lg:h-[calc(539px-40px)] w-full flex flex-col p-4">
      <div className="flex-1 overflow-y-auto pr-2">
        <p className="text-xl font-bold mb-3">Контент засах хүсэлт илгээх</p>
        <div className="flex flex-col gap-3">
          {formik.values.reasons.map((_, index) => (
            <div key={index} className="flex items-center gap-2">
              <Textarea
                rows={2}
                charCount={formik.values.reasons[index].length}
                maxLength={600}
                name={`reasons.${index}`}
                value={formik.values.reasons[index]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Та өөр шалтгаанаа энд бичнэ үү."
                errorText={formik.errors.reasons?.[index]}
                errorVisible={
                  formik.touched.reasons?.[index] &&
                  !!formik.errors.reasons?.[index]
                }
                wrapperClassName="w-full"
              />
              {/* <button
                type="button"
                onClick={() => removeReason(index)}
                disabled={formik.values.reasons.length === 1}
              >
                ✖
              </button> */}
            </div>
          ))}
          <button
            type="button"
            onClick={addReason}
            disabled={formik.values.reasons.length >= MAX_REASONS}
            className={`w-full border border-geni-gray rounded-xl py-3 flex items-center justify-center hover:bg-gray-50 ${
              formik.values.reasons.length >= MAX_REASONS
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <span className="text-[#6F6F6F]">➕</span>
          </button>

          <p className="text-sm text-[#6F6F6F] text-center text-white bg-[#F49D19] rounded-lg p-2">
            Та хамгийн ихдээ {MAX_REASONS} засвар илгээх боломжтой.
          </p>
          {/* {formik.values.reasons.length == MAX_REASONS && (
          )} */}
        </div>
      </div>
      <div className="pt-4 mt-auto border-t">
        <button
          type="submit"
          className="w-full bg-secondary text-white py-3 font-bold rounded-xl"
        >
          Засвар илгээх
        </button>
      </div>
    </div>
  );
};

export default EditRequest;
