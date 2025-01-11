import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useUpdateSocialChannelMutation,
  useCreateSocialChannelMutation,
} from "@/app/services/service";
import toast from "react-hot-toast";

function BrandDetailsSubmit({ formik, handlePreviousStep, parsedUserInfo }) {
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
    <div
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-start justify-between w-full gap-6 sm:gap-11"
    >
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-7 xl:gap-10 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg" htmlFor="RegNo">
            Регистрийн дугаар
          </label>
          <input
            id="RegNo"
            name="RegNo"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.RegNo}
            className="p-3 sm:p-4 bg-white rounded-lg border text-base sm:text-xl w-full"
          />
          {formik.touched.RegNo && formik.errors.RegNo && (
            <div className="text-red-500 text-sm">{formik.errors.RegNo}</div>
          )}
        </div>
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg" htmlFor="phoneNumber">
            Утасны дугаар
          </label>
          <input
            id="PhoneNumber"
            name="PhoneNumber"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.PhoneNumber}
            className="p-3 sm:p-4 bg-white rounded-lg border text-base sm:text-xl w-full"
          />
          {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
            <div className="text-red-500 text-sm">
              {formik.errors.PhoneNumber}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center gap-4 sm:gap-7 xl:gap-10 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg" htmlFor="Website">
            Вэбсайт
          </label>
          <input
            id="Website"
            name="Website"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.Website}
            className="p-3 sm:p-4 bg-white rounded-lg border text-base sm:text-xl w-full"
          />
          {formik.touched.Website && formik.errors.Website && (
            <div className="text-red-500 text-sm">{formik.errors.Website}</div>
          )}
        </div>
        <div className="hidden sm:block w-full"></div>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
            Сошиал хаягууд
          </label>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-7 xl:gap-10 w-full items-start">
            <div className="w-full p-3 sm:p-4 bg-white rounded-lg border text-base sm:text-xl flex flex-row items-center justify-between gap-3">
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
            <div className="w-full p-3 sm:p-4 bg-white rounded-lg border text-base sm:text-xl flex flex-row items-center justify-between gap-3">
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
      <div className="flex flex-row items-center gap-4 sm:gap-7 xl:gap-10 w-full">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="mt-8 sm:mt-16 w-full flex flex-row items-center
    justify-center gap-2 bg-inherit text-[#2D262D] rounded-lg sm:rounded-xl border
    border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl"
        >
          <Image
            src={"/arrow-forward-icon.png"}
            width={20}
            height={20}
            className="w-5 h-5 rotate-180"
            alt=""
          />
          Буцах
        </button>
        <button
          type="submit"
          className="mt-8 sm:mt-16 w-full flex flex-row items-center
    justify-center gap-2 bg-inherit text-[#2D262D] rounded-lg sm:rounded-xl border
    border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl"
        >
          Илгээх
          <Image
            src={"/arrow-forward-icon.png"}
            width={20}
            height={20}
            className="w-5 h-5"
            alt=""
          />
        </button>
      </div>
    </div>
  );
}

export default BrandDetailsSubmit;
