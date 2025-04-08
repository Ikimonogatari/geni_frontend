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

function BrandDetailsSubmit({ formik, handlePreviousStep, userInfo }) {
  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });

  // Initialize display values with usernames
  const [displayValues, setDisplayValues] = useState({
    instagram: "",
    facebook: "",
  });

  // Initialize socials and display values from userInfo when component mounts
  useEffect(() => {
    if (userInfo?.SocialChannels) {
      const instagramChannel = userInfo.SocialChannels.find(
        (channel) => channel.PlatformId === 2
      );

      const facebookChannel = userInfo.SocialChannels.find(
        (channel) => channel.PlatformId === 1
      );

      // Set initial social values
      const initialSocials = {
        instagram: instagramChannel?.SocialAddress || "",
        facebook: facebookChannel?.SocialAddress || "",
      };

      setSocials(initialSocials);

      // Set initial display values
      setDisplayValues({
        instagram: extractUsername("instagram", initialSocials.instagram),
        facebook: extractUsername("facebook", initialSocials.facebook),
      });
    }
  }, [userInfo]);

  const [
    createSocialChannel,
    {
      data: createSocialChannelData,
      error: createSocialChannelError,
      isLoading: createSocialChannelLoading,
    },
  ] = useCreateSocialChannelMutation();

  const [
    updateSocialChannel,
    {
      data: updateSocialChannelData,
      error: updateSocialChannelError,
      isLoading: updateSocialChannelLoading,
    },
  ] = useUpdateSocialChannelMutation();

  const handleSocialChange = (platform, value) => {
    // Update display value immediately
    setDisplayValues((prev) => ({ ...prev, [platform]: value }));

    // Format URL for storage
    const formattedUrl = formatSocialMediaUrl(platform, value);
    setSocials((prev) => ({ ...prev, [platform]: formattedUrl }));
  };

  const updateSocialChannels = async () => {
    try {
      // Update Instagram
      if (socials.instagram.trim() !== "") {
        const hasExistingInstagram = userInfo?.SocialChannels?.some(
          (channel) => channel.PlatformId === 2
        );

        const existingInstagram = userInfo?.SocialChannels?.find(
          (channel) => channel.PlatformId === 2
        );
        const instagramChanged =
          !existingInstagram ||
          existingInstagram.SocialAddress !== socials.instagram;

        if (instagramChanged) {
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
      }

      // Update Facebook
      if (socials.facebook.trim() !== "") {
        const hasExistingFacebook = userInfo?.SocialChannels?.some(
          (channel) => channel.PlatformId === 1
        );

        const existingFacebook = userInfo?.SocialChannels?.find(
          (channel) => channel.PlatformId === 1
        );
        const facebookChanged =
          !existingFacebook ||
          existingFacebook.SocialAddress !== socials.facebook;

        if (facebookChanged) {
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
      }
    } catch (err) {
      console.error("Error updating social channels:", err);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure all fields are touched to show validation errors
    formik.setTouched({
      Name: true,
      Bio: true,
      Website: true,
      PhoneNumber: true,
      RegNo: true,
      Address: true,
      HasMarketingPersonel: true,
      AvgProductSalesMonthly: true,
      AvgPrice: true,
    });

    // Validate all fields
    await formik.validateForm();

    // If validation passes, first update social channels, then submit the form
    if (Object.keys(formik.errors).length === 0) {
      // Update social channels first
      const socialsUpdated = await updateSocialChannels();

      if (socialsUpdated) {
        // Then submit the form
        formik.handleSubmit(e);
      } else {
        toast.error("Сошиал хаяг шинэчлэхэд алдаа гарлаа");
      }
    } else {
      // Focus the first field with an error
      const firstErrorField = Object.keys(formik.errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        setTimeout(() => element.focus(), 500);
      }
    }
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
          label="Байгууллагын регистер"
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
          id="AvgProductSalesMonthly"
          name="AvgProductSalesMonthly"
          className="text-base sm:text-xl w-full no-spinner"
          type="number"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full"
          label="Сарын дундаж борлуулдаг бүтээгдэхүүны тоо"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.AvgProductSalesMonthly}
          errorText={formik.errors.AvgProductSalesMonthly}
          errorVisible={
            formik.touched.AvgProductSalesMonthly &&
            formik.errors.AvgProductSalesMonthly
          }
        />
        <div className="flex flex-col gap-1 w-full">
          <label className="text-[#6F6F6F] text-lg mb-2 block">
            Маркетинг хариуцсан баг эсвэл хүнтэй эсэх
          </label>
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
                Тийм
              </SelectItem>
              <SelectItem
                className="text-base sm:text-xl rounded-lg min-h-12 my-1 w-full text-start p-4"
                value="false"
              >
                Үгүй
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-4 w-full">
        <Input
          id="AvgPrice"
          name="AvgPrice"
          className="text-base sm:text-xl w-full no-spinner"
          type="number"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full max-h-[62px] p-4 sm:p-5 w-full"
          label="Бүтээгдэхүүний дундаж үнэ"
          leftSection={<span className="text-base sm:text-xl">₮</span>}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.AvgPrice}
          errorText={formik.errors.AvgPrice}
          errorVisible={formik.touched.AvgPrice && formik.errors.AvgPrice}
        />
        <Input
          id="Website"
          name="Website"
          type="text"
          className="text-base sm:text-xl w-full"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full"
          label="Вэбсайт"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Website}
          errorText={formik.errors.Website}
          errorVisible={formik.touched.Website && formik.errors.Website}
        />
      </div>
      <div className="flex flex-col items-start sm:flex-row gap-4 w-full">
        <Input
          id="Address"
          name="Address"
          type="text"
          className="text-base sm:text-xl w-full"
          wrapperClassName="w-full"
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full"
          label="Байршил"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Address}
          errorText={formik.errors.Address}
          errorVisible={formik.touched.Address && formik.errors.Address}
        />
        <div className="w-full"></div>
      </div>
      <div className="flex flex-row items-start gap-4 w-full">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
            Сошиал хаягууд
          </label>
          <div className="flex flex-col sm:flex-row gap-4 w-full items-start">
            <div className="w-full p-4 sm:p-5 bg-white rounded-lg border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center gap-3">
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
                  placeholder="Instagram хэрэглэгчийн нэр"
                  className="bg-transparent outline-none w-full"
                  value={displayValues.instagram}
                  onChange={(e) =>
                    handleSocialChange("instagram", e.target.value)
                  }
                />
              </div>
            </div>
            <div className="w-full p-4 sm:p-5 bg-white rounded-lg border border-[#CDCDCD] text-base sm:text-xl flex flex-row items-center gap-3">
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
                  placeholder="Facebook хэрэглэгчийн нэр"
                  value={displayValues.facebook}
                  className="bg-transparent outline-none w-full"
                  onChange={(e) =>
                    handleSocialChange("facebook", e.target.value)
                  }
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
          className="w-full gap-2 bg-geni-blue text-white rounded-lg sm:rounded-xl border border-[#2D262D] py-3 sm:py-4 font-bold text-base sm:text-xl"
        >
          Дуусгах
        </button>
      </div>
    </div>
  );
}

export default BrandDetailsSubmit;
