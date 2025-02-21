"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import {
  useUpdateSocialChannelMutation,
  useCreateSocialChannelMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

function CreatorDetails({ parsedUserInfo, formik, setStep }) {
  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });

  const [
    createSocialChannel,
    {
      data: createSocialChannelData,
      error: createSocialChannelError,
      isLoading: createSocialChannelLoading,
      isSuccess: createSocialChannelSuccess,
    },
  ] = useCreateSocialChannelMutation();

  const [
    updateSocialChannel,
    {
      data: updateSocialChannelData,
      error: updateSocialChannelError,
      isLoading: updateSocialChannelLoading,
      isSuccess: updateSocialChannelSuccess,
    },
  ] = useUpdateSocialChannelMutation();

  const handleSaveOrUpdateSocialChannels = async () => {
    try {
      if (socials.instagram.trim() !== "") {
        const hasExistingInstagram = parsedUserInfo?.SocialChannels?.some(
          (channel) => channel.PlatformId === 2
        );

        if (hasExistingInstagram) {
          await updateSocialChannel({
            PlatformId: 2,
            SocialAddress: socials.instagram,
          }).unwrap();
        } else {
          await createSocialChannel({
            PlatformId: 2,
            SocialAddress: socials.instagram,
          }).unwrap();
        }
      }

      if (socials.facebook.trim() !== "") {
        const hasExistingFacebook = parsedUserInfo?.SocialChannels?.some(
          (channel) => channel.PlatformId === 1
        );

        if (hasExistingFacebook) {
          await updateSocialChannel({
            PlatformId: 1,
            SocialAddress: socials.facebook,
          }).unwrap();
        } else {
          await createSocialChannel({
            PlatformId: 1,
            SocialAddress: socials.facebook,
          }).unwrap();
        }
      }

      toast.success("Амжилттай хадгаллаа");
    } catch (err) {
      toast.error("Алдаа гарлаа");
    }
  };
  return (
    <>
      <div className="flex flex-col w-full gap-5">
        <div className="grid grid-cols-2 gap-4 w-full">
          <Input
            id="FirstName"
            name="FirstName"
            type="text"
            className="text-sm sm:text-xl"
            wrapperClassName="col-span-1"
            labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Нэр"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.FirstName}
            errorText={formik.errors.FirstName}
            errorVisible={formik.touched.FirstName && formik.errors.FirstName}
          />
          <Input
            id="LastName"
            name="LastName"
            type="text"
            className="text-sm sm:text-xl"
            wrapperClassName="col-span-1"
            labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Овог"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.LastName}
            errorText={formik.errors.LastName}
            errorVisible={formik.touched.LastName && formik.errors.LastName}
          />
          <Input
            id="Email"
            name="Email"
            type="mail"
            className="text-sm sm:text-xl"
            wrapperClassName="col-span-1"
            labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Имэйл хаяг"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Email}
            errorText={formik.errors.Email}
            errorVisible={formik.touched.Email && formik.errors.Email}
          />
          <Input
            id="PhoneNumber"
            name="PhoneNumber"
            type="number"
            className="text-sm sm:text-xl no-spinner"
            wrapperClassName="col-span-1"
            labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Утасны дугаар"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PhoneNumber}
            errorText={formik.errors.PhoneNumber}
            errorVisible={
              formik.touched.PhoneNumber && formik.errors.PhoneNumber
            }
          />
          <div className="flex flex-row gap-4 w-full col-span-2">
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
                Сошиал хаягууд
              </label>
              <div className="flex flex-row gap-4 sm:gap-7 xl:gap-10 w-full items-start">
                <div className="w-full p-4 sm:p-5 bg-white rounded-lg border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center justify-between gap-3">
                  <div className="flex flex-row items-center gap-3 w-full">
                    <Image
                      src={"/Instagram.png"}
                      width={24}
                      height={24}
                      alt=""
                      className="w-6 h-6"
                    />
                    <input
                      type="text"
                      placeholder={
                        parsedUserInfo?.SocialChannels?.find(
                          (channel) => channel.PlatformId === 2
                        )?.SocialAddress || ""
                      }
                      className="bg-transparent outline-none w-full"
                      value={socials.instagram}
                      onChange={(e) =>
                        setSocials({ ...socials, instagram: e.target.value })
                      }
                    />
                  </div>
                  <div
                    onClick={handleSaveOrUpdateSocialChannels}
                    className="cursor-pointer outline-none text-xs aspect-square w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <Image
                      src={"/check-icon.png"}
                      width={16}
                      height={16}
                      className="w-full"
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-full p-4 sm:p-5 bg-white rounded-lg border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center justify-between gap-3">
                  <div className="flex flex-row items-center gap-3 w-full">
                    <Image
                      src={"/Facebook.png"}
                      width={24}
                      height={24}
                      alt=""
                      className="w-6 h-6"
                    />
                    <input
                      type="text"
                      placeholder={
                        parsedUserInfo?.SocialChannels?.find(
                          (channel) => channel.PlatformId === 1
                        )?.SocialAddress || ""
                      }
                      value={socials.facebook}
                      className="bg-transparent outline-none w-full"
                      onChange={(e) =>
                        setSocials({ ...socials, facebook: e.target.value })
                      }
                    />
                  </div>
                  <div
                    onClick={handleSaveOrUpdateSocialChannels}
                    className="cursor-pointer outline-none text-xs aspect-square w-3 h-3 sm:w-4 sm:h-4"
                  >
                    <Image
                      src={"/check-icon.png"}
                      width={16}
                      height={16}
                      className="w-full"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Input
            id="Birthday"
            name="Birthday"
            type="date"
            className="text-sm sm:text-xl w-full col-span-1 no-spinner"
            wrapperClassName="w-full col-span-1"
            labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
            layoutClassName="h-full p-4 sm:p-5 w-full"
            label="Төрсөн огноо"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Birthday}
            errorText={formik.errors.Birthday}
            errorVisible={formik.touched.Birthday && formik.errors.Birthday}
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
