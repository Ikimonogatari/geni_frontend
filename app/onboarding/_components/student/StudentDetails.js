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

function StudentDetails({ parsedUserInfo, formik, handleNextStep }) {
  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
      isSuccess: uploadFileSuccess,
    },
  ] = useUploadFileMutation();

  const [
    changeProfilePicture,
    {
      data: changeProfilePictureData,
      error: changeProfilePictureError,
      isLoading: changeProfilePictureLoading,
      isSuccess: changeProfilePictureSuccess,
    },
  ] = useChangeProfilePictureMutation();

  useEffect(() => {
    if (uploadFileError) {
      toast.error(uploadFileError?.data?.error);
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (changeProfilePictureSuccess) {
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      toast.error(changeProfilePictureError?.data?.error);
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  const [profileImage, setProfileImage] = useState(
    parsedUserInfo?.ProfileLink || "/dummy-student.png"
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "profile-pic");

        try {
          const response = await uploadFile(formData);
          if (response.data) {
            const id = response.data.FileId;
            const profileChangeRes = await changeProfilePicture({ FileId: id });

            setProfileImage(profileChangeRes?.data?.url);
          }
        } catch (error) {
          console.error("File upload or profile picture update failed:", error);
        }
      }
    },
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-11">
        <div className="flex flex-col items-center gap-4 sm:gap-7 w-full sm:max-w-[194px] xl:max-w-[258px]">
          {parsedUserInfo ? (
            <Image
              src={profileImage}
              width={194}
              height={194}
              loading="lazy"
              className="object-cover rounded-xl border-[1px] border-[#2D262D] w-full aspect-square sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"
              alt=""
            />
          ) : (
            <div className="w-[100px] h-[100px] sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"></div>
          )}
          <div
            {...getRootProps()}
            className="cursor-pointer mt-2 py-2 sm:py-3 w-full text-center bg-geni-green border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
          >
            <input {...getInputProps()} />
            {parsedUserInfo && parsedUserInfo.ProfileLink
              ? "Зураг солих"
              : "Зураг оруулах"}
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 w-full">
          <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
            <Input
              id="LastName"
              name="LastName"
              type="text"
              className="text-base sm:text-xl w-full"
              wrapperClassName="w-full"
              labelClassName="text-[#6F6F6F] text-lg font-normal"
              layoutClassName="h-full p-4 sm:p-5 w-full"
              label="Овог"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.LastName}
              errorText={formik.errors.LastName}
              errorVisible={formik.touched.LastName && formik.errors.LastName}
            />
            <Input
              id="FirstName"
              name="FirstName"
              type="text"
              className="text-base sm:text-xl w-full"
              wrapperClassName="w-full"
              labelClassName="text-[#6F6F6F] text-lg font-normal"
              layoutClassName="h-full p-4 sm:p-5 w-full"
              label="Нэр"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.FirstName}
              errorText={formik.errors.FirstName}
              errorVisible={formik.touched.FirstName && formik.errors.FirstName}
            />
          </div>
          <Input
            id="Nickname"
            name="Nickname"
            type="text"
            className="text-base sm:text-xl w-full"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Хэрэглэгчийн нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Nickname}
            errorText={formik.errors.Nickname}
            errorVisible={formik.touched.Nickname && formik.errors.Nickname}
          />

          <Textarea
            id="Bio"
            name="Bio"
            className="text-base sm:text-xl w-full"
            layoutClassName="bg-white p-4 sm:p-5"
            wrapperClassName="w-full"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            label="Товч танилцуулга /Bio/"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Bio}
            rows={4}
            maxLength={150}
            charCount={formik.values.Bio.length}
            errorText={formik.errors.Bio}
            errorVisible={formik.touched.Bio && formik.errors.Bio}
          />
        </div>
      </div>
      <button
        onClick={handleNextStep}
        type="button"
        className="mt-8 sm:mt-16 w-full flex flex-row items-center
justify-center gap-2 bg-inherit text-[#2D262D] rounded-lg sm:rounded-xl border
border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl"
      >
        Дараах
        <Image
          src={"/arrow-forward-icon.png"}
          width={20}
          height={20}
          className="w-5 h-5"
          alt=""
        />
      </button>
    </>
  );
}

export default StudentDetails;
