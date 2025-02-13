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

function BrandDetails({ parsedUserInfo, formik, handleNextStep }) {
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [brandTypes, setBrandTypes] = useState([]);
  const [availableBrandTypes, setAvailableBrandTypes] = useState([]);

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

  const [
    changeBrandType,
    {
      data: changeBrandTypeData,
      error: changeBrandTypeError,
      isLoading: changeBrandTypeLoading,
      isSuccess: changeBrandTypeSuccess,
    },
  ] = useChangeBrandTypeMutation();

  const {
    data: listBrandTypesData,
    error: listBrandTypesError,
    isLoading: listBrandTypesLoading,
  } = useListBrandTypesQuery();

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

  useEffect(() => {
    if (changeBrandTypeSuccess) {
      toast.success("Амжилттай");
    }
    if (changeBrandTypeError) {
      toast.error(changeBrandTypeError?.data?.error);
    }
  }, [changeBrandTypeSuccess, changeBrandTypeError]);

  useEffect(() => {
    if (parsedUserInfo && parsedUserInfo.BrandTypes) {
      setBrandTypes(parsedUserInfo?.BrandTypes.map((p) => p));
    }
  }, []);

  useEffect(() => {
    if (listBrandTypesData) {
      setAvailableBrandTypes(listBrandTypesData);
    }
  }, [listBrandTypesData]);

  const [profileImage, setProfileImage] = useState(
    parsedUserInfo?.ProfileLink || "/dummy-brand.png"
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

  const handleBrandTypesChange = () => {
    const brandTypeIds = brandTypes.map(
      (brandType) => brandType.TypeId || brandType.BrandTypeId
    );

    changeBrandType({
      BrandTypeIds: brandTypeIds,
    });
  };

  const handleAddBrandTypes = (value) => {
    setBrandTypes((prev) => {
      if (!prev.some((type) => type.TypeName === value.TypeName)) {
        setAvailableBrandTypes((prevOptions) =>
          prevOptions.filter((option) => option.TypeName !== value.TypeName)
        );
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleRemoveBrandTypes = (value) => {
    setBrandTypes((prev) => {
      const updatedBrandTypes = prev.filter(
        (item) => item.TypeName !== value.TypeName
      );
      return updatedBrandTypes;
    });
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row items-start justify-between w-full gap-6 sm:gap-11">
        <div className="flex flex-col items-center gap-4 sm:gap-7 w-full sm:max-w-[194px] xl:max-w-[258px]">
          {parsedUserInfo ? (
            <Image
              // src={profileImage}
              src={
                parsedUserInfo?.ProfileLink
                  ? parsedUserInfo?.ProfileLink
                  : "/dummy-brand.png"
              }
              width={194}
              height={194}
              loading="lazy"
              className="object-cover rounded-xl border-[1px] border-[#2D262D] w-full aspect-square sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"
              alt="Brand Profile"
            />
          ) : (
            <div className="w-[100px] h-[100px] sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"></div>
          )}
          <div
            {...getRootProps()}
            className="cursor-pointer mt-2 py-2 sm:py-3 w-full text-center bg-[#4D55F5] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
          >
            <input {...getInputProps()} />
            {parsedUserInfo && parsedUserInfo.ProfileLink
              ? "Лого солих"
              : "Лого оруулах"}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
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

          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="type">
                Брэндийн төрөл
              </label>
              <div className="relative flex flex-row flex-wrap items-center gap-2">
                {brandTypes?.map((p, i) => (
                  <div
                    key={i}
                    className="bg-[#4D55F5] text-white text-center text-sm sm:text-lg rounded-full px-3 sm:px-5 py-1 sm:py-2 flex flex-row items-center justify-between gap-2"
                  >
                    {p.TypeName}
                    <button
                      type="button"
                      className="rounded-full w-6 h-6 text-center"
                      onClick={() => handleRemoveBrandTypes(p)}
                    >
                      <Image
                        src={"/product-remove-icon.png"}
                        width={24}
                        height={24}
                        className="rounded-full bg-white h-full aspect-square min-h-6 mih-w-6"
                        alt=""
                      />
                    </button>
                  </div>
                ))}
                <div className="flex flex-row items-center">
                  <div
                    onClick={() => setdropdownOpen(!dropdownOpen)}
                    className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-7 h-7 sm:w-11 sm:h-11 flex items-center justify-center"
                  >
                    <Image
                      src={"/plus-icon-black.png"}
                      width={24}
                      height={24}
                      className="aspect-square w-2 h-2 sm:w-3 sm:h-3"
                      alt=""
                    />
                  </div>
                  {brandTypes.length > 0 ? (
                    <div
                      onClick={handleBrandTypesChange}
                      className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-7 h-7 sm:w-11 sm:h-11 flex items-center justify-center"
                    >
                      <Image
                        src={"/check-icon.png"}
                        width={16}
                        height={16}
                        className="aspect-square w-3 h-3 sm:w-4 sm:h-4"
                        alt=""
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>

                <div
                  className={`${
                    dropdownOpen &&
                    availableBrandTypes?.filter(
                      (productType) =>
                        !brandTypes.some(
                          (brandType) =>
                            brandType.TypeName === productType.TypeName
                        )
                    ).length > 0
                      ? `top-full opacity-100 visible`
                      : "top-[110%] invisible opacity-0"
                  } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                >
                  {availableBrandTypes
                    ?.filter(
                      (productType) =>
                        !brandTypes.some(
                          (brandType) =>
                            brandType.TypeName === productType.TypeName
                        )
                    )
                    .map((p, i) => (
                      <div
                        onClick={() => handleAddBrandTypes(p)}
                        key={i}
                        className="cursor-pointer bg-[#4D55F5] text-white text-center text-sm rounded-full px-3 py-1"
                      >
                        {p.TypeName}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          <Textarea
            id="Bio"
            name="Bio"
            className="text-base sm:text-xl w-full"
            layoutClassName="bg-white p-4 sm:p-5"
            labelClassName="text-[#6F6F6F] text-lg font-normal"
            label=" Брэндийн богино танилцуулга"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Bio}
            rows={4}
            maxLength={600}
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

export default BrandDetails;
