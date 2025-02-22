import Button from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

function CreatorQuestions({ formik }) {
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full">
      <Textarea
        id="Job"
        name="Job"
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
        value={formik.values.Job}
        rows={5}
        maxLength={600}
        charCount={formik.values.Job.length}
        errorText={formik.errors.Job}
        errorVisible={formik.touched.Job && formik.errors.Job}
      />
      <Textarea
        id="TechUsage"
        name="TechUsage"
        placeholder="Хариулт"
        label="Өөрийн өдөр тутамдаа хамгийн түгээмэл ашигладаг технологийн платформ, гар утасны апп зэргээ хуваалцаарай"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.TechUsage}
        rows={5}
        maxLength={600}
        charCount={formik.values.TechUsage.length}
        errorText={formik.errors.TechUsage}
        errorVisible={formik.touched.TechUsage && formik.errors.TechUsage}
      />
      <Textarea
        id="Motives"
        name="Motives"
        placeholder="Хариулт"
        label='Та яагаад Geni creator болохыг зорьж байна вэ? Хувийн "яагаад"-аа бидэнд хуваалцаарай.'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Motives}
        rows={5}
        maxLength={600}
        charCount={formik.values.Motives.length}
        errorText={formik.errors.Motives}
        errorVisible={formik.touched.Motives && formik.errors.Motives}
      />
    </form>
  );
}

export default CreatorQuestions;
