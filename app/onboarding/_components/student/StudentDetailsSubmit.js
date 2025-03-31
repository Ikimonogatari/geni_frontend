import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  useUpdateSocialChannelMutation,
  useCreateSocialChannelMutation,
} from "@/app/services/service";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { formatSocialMediaUrl, extractUsername } from "@/utils/socialMedia";

import toast from "react-hot-toast";

function StudentDetailsSubmit({ formik, handlePreviousStep, parsedUserInfo }) {
  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });

  // Initialize display values with usernames
  const [displayValues, setDisplayValues] = useState({
    instagram: "",
    facebook: "",
  });

  // Update display values when component mounts or socials change
  useEffect(() => {
    setDisplayValues({
      instagram: extractUsername("instagram", socials.instagram),
      facebook: extractUsername("facebook", socials.facebook),
    });
  }, [socials]);

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

  const handleSocialChange = (platform, value) => {
    // Update display value immediately
    setDisplayValues((prev) => ({ ...prev, [platform]: value }));

    // Format URL for storage
    const formattedUrl = formatSocialMediaUrl(platform, value);
    setSocials((prev) => ({ ...prev, [platform]: formattedUrl }));
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if there are any formik errors
    if (Object.keys(formik.errors).length > 0) {
      toast.error("Бүх талбарыг зөв бөглөнө үү");
      return;
    }

    // If no errors, proceed with form submission
    formik.handleSubmit(e);
  };

  return (
    <div className="flex flex-col items-start justify-between w-full gap-4">
      <div className="flex flex-col items-start sm:flex-row gap-4 w-full">
        <Input
          id="RegNo"
          name="RegNo"
          type="text"
          className="text-base sm:text-xl w-full"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full"
          label="Регистерийн дугаар"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.RegNo}
          errorText={formik.errors.RegNo}
          errorVisible={formik.touched.RegNo && formik.errors.RegNo}
        />
        <Input
          id="PhoneNumber"
          name="PhoneNumber"
          type="text"
          className="text-base sm:text-xl w-full no-spinner"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full"
          label="Утасны дугаар"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.PhoneNumber}
          errorText={formik.errors.PhoneNumber}
          errorVisible={formik.touched.PhoneNumber && formik.errors.PhoneNumber}
        />
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-4 w-full">
        <Input
          id="Birthday"
          name="Birthday"
          type="date"
          className="text-sm sm:text-xl w-full no-spinner h-5"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full"
          label="Төрсөн огноо"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Birthday}
          errorText={formik.errors.Birthday}
          errorVisible={formik.touched.Birthday && formik.errors.Birthday}
        />
        <div className="flex flex-col gap-1  w-full">
          <label className="text-[#6F6F6F] text-lg mb-2 block">Хүйс</label>
          <Select
            onValueChange={(value) =>
              formik.setFieldValue("HasMarketingPersonel", value === "true")
            }
            value={formik.values.HasMarketingPersonel?.toString() || ""}
          >
            <SelectTrigger className="w-full outline-none border border-[#CDCDCD] h-[50px] sm:h-[62px] text-base sm:text-xl">
              <SelectValue placeholder="Сонгоно уу" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                className="text-base sm:text-xl rounded-lg min-h-12 my-1 w-full text-start p-4"
                value="true"
              >
                Эм
              </SelectItem>
              <SelectItem
                className="text-base sm:text-xl rounded-lg min-h-12 my-1 w-full text-start p-4"
                value="false"
              >
                Эр
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-row gap-4 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg">Сошиал хаягууд</label>
          <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
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
                  value={displayValues.instagram}
                  onChange={(e) =>
                    handleSocialChange("instagram", e.target.value)
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
                  value={displayValues.facebook}
                  className="bg-transparent outline-none w-full"
                  onChange={(e) =>
                    handleSocialChange("facebook", e.target.value)
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
      <div className="flex flex-row items-center gap-4 w-full mt-10">
        <button
          type="button"
          onClick={handlePreviousStep}
          className="w-full flex flex-row items-center
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
          onClick={handleSubmit}
          className="w-full gap-2 bg-geni-green text-white rounded-lg sm:rounded-xl border border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl"
        >
          Дуусгах
        </button>
      </div>
    </div>
  );
}

export default StudentDetailsSubmit;
