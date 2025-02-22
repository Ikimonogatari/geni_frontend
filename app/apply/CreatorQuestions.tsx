import { Textarea } from "@/components/ui/textarea";
import React from "react";

function CreatorQuestions({ formik }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Textarea
        id="WorkInfo"
        name="WorkInfo"
        placeholder="Хариулт"
        label={
          <div className="flex flex-col">
            <span className="font-bold">Одоо ажил эрхэлдэг үү?</span>
            <span>
              Тийм бол ямар ажил эрхэлдэг вэ? Үгүй бол шалтгаанаа хуваалцана уу.
            </span>
          </div>
        }
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.WorkInfo}
        rows={5}
        maxLength={600}
        charCount={formik.values.WorkInfo.length}
        errorText={formik.errors.WorkInfo}
        errorVisible={formik.touched.WorkInfo && formik.errors.WorkInfo}
      />
      <Textarea
        id="EssentialToolInfo"
        name="EssentialToolInfo"
        placeholder="Хариулт"
        label="Өөрийн өдөр тутамдаа хамгийн түгээмэл ашигладаг технологийн платформ, гар утасны апп зэргээ хуваалцаарай"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.EssentialToolInfo}
        rows={5}
        maxLength={600}
        charCount={formik.values.EssentialToolInfo.length}
        errorText={formik.errors.EssentialToolInfo}
        errorVisible={
          formik.touched.EssentialToolInfo && formik.errors.EssentialToolInfo
        }
      />
      <Textarea
        id="ApplicationPurpose"
        name="ApplicationPurpose"
        placeholder="Хариулт"
        label='Та яагаад Geni creator болохыг зорьж байна вэ? Хувийн "яагаад"-аа бидэнд хуваалцаарай.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.ApplicationPurpose}
        rows={5}
        maxLength={600}
        charCount={formik.values.ApplicationPurpose.length}
        errorText={formik.errors.ApplicationPurpose}
        errorVisible={
          formik.touched.ApplicationPurpose && formik.errors.ApplicationPurpose
        }
      />
    </div>
  );
}

export default CreatorQuestions;
