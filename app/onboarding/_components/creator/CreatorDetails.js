"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  useChangeProfilePictureMutation,
  useUploadFileMutation,
  useListBrandTypesQuery,
  useChangeBrandTypeMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/button";

function CreatorDetails({ parsedUserInfo, formik, setStep }) {
  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
          <Input
            id="Name"
            name="Name"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Брэндийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            errorText={formik.errors.Name}
            errorVisible={formik.touched.Name && formik.errors.Name}
          />
          <Input
            id="Name"
            name="Name"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Брэндийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            errorText={formik.errors.Name}
            errorVisible={formik.touched.Name && formik.errors.Name}
          />
          <Input
            id="Name"
            name="Name"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Брэндийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            errorText={formik.errors.Name}
            errorVisible={formik.touched.Name && formik.errors.Name}
          />
          <Input
            id="Name"
            name="Name"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Брэндийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            errorText={formik.errors.Name}
            errorVisible={formik.touched.Name && formik.errors.Name}
          />
          <Input
            id="Name"
            name="Name"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Брэндийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            errorText={formik.errors.Name}
            errorVisible={formik.touched.Name && formik.errors.Name}
          />
          <Input
            id="Name"
            name="Name"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Брэндийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Name}
            errorText={formik.errors.Name}
            errorVisible={formik.touched.Name && formik.errors.Name}
          />
        </div>
        <Button
          onClick={() => setStep(2)}
          type="button"
          className="w-full bg-secondary text-white"
        >
          Хадгалах
        </Button>
      </div>
    </>
  );
}

export default CreatorDetails;
