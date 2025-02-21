import { Textarea } from "@/components/ui/textarea";
import React from "react";

function CreatorQuestions({ formik }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <Textarea
        id="Job"
        name="Job"
        placeholder="Контент агуулга болон хийцлэлтэй холбоотой бүтээгчээс хүсэх нэмэлт зүйлс"
        label="Контент бүтээгчээс хүсэх хүсэлт"
        hoverInfo="Контентийн агуулга болон хийцлэлтэй хамааралтай брэндийн чиглүүлэг болон бүтээгчээс хүсэх хүсэлтээ бичсэнээр таны хүсэж буй контент гарах магадлал ихсэнэ."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.requestForCreators}
        rows={5}
        maxLength={600}
        charCount={formik.values.Job.length}
        errorText={formik.errors.Job}
        errorVisible={formik.touched.Job && formik.errors.Job}
      />
      <Textarea
        id="TechUses"
        name="TechUses"
        placeholder="Контент агуулга болон хийцлэлтэй холбоотой бүтээгчээс хүсэх нэмэлт зүйлс"
        label="Контент бүтээгчээс хүсэх хүсэлт"
        hoverInfo="Контентийн агуулга болон хийцлэлтэй хамааралтай брэндийн чиглүүлэг болон бүтээгчээс хүсэх хүсэлтээ бичсэнээр таны хүсэж буй контент гарах магадлал ихсэнэ."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.TechUses}
        rows={5}
        maxLength={600}
        charCount={formik.values.TechUses.length}
        errorText={formik.errors.TechUses}
        errorVisible={formik.touched.TechUses && formik.errors.TechUses}
      />
      <Textarea
        id=""
        name="Motives"
        placeholder="Контент агуулга болон хийцлэлтэй холбоотой бүтээгчээс хүсэх нэмэлт зүйлс"
        label="Контент бүтээгчээс хүсэх хүсэлт"
        hoverInfo="Контентийн агуулга болон хийцлэлтэй хамааралтай брэндийн чиглүүлэг болон бүтээгчээс хүсэх хүсэлтээ бичсэнээр таны хүсэж буй контент гарах магадлал ихсэнэ."
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.Motives}
        rows={5}
        maxLength={600}
        charCount={formik.values.Motives.length}
        errorText={formik.errors.Motives}
        errorVisible={formik.touched.Motives && formik.errors.Motives}
      />
    </div>
  );
}

export default CreatorQuestions;
