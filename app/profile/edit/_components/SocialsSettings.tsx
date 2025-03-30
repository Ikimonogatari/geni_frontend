import React, { useEffect } from "react";
import Image from "next/image";
import { formatSocialMediaUrl, extractUsername } from "@/utils/socialMedia";

interface SocialsSettingsProps {
  parsedUserInfo: any;
  socials: any;
  setSocials: (value: any) => void;
  handleSaveOrUpdateSocialChannels: () => void;
}

function SocialsSettings({
  parsedUserInfo,
  socials,
  setSocials,
  handleSaveOrUpdateSocialChannels,
}: SocialsSettingsProps) {
  // Initialize display values with usernames
  const [displayValues, setDisplayValues] = React.useState({
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

  const handleSocialChange = (
    platform: "instagram" | "facebook",
    value: string
  ) => {
    // Update display value immediately
    setDisplayValues((prev) => ({ ...prev, [platform]: value }));

    // Format URL for storage
    const formattedUrl = formatSocialMediaUrl(platform, value);
    setSocials((prev) => ({ ...prev, [platform]: formattedUrl }));
  };

  return (
    <div className="flex flex-row gap-4 w-full">
      <div className="flex flex-col gap-3 w-full">
        <label className="text-[#6F6F6F] text-lg" htmlFor="SocialChannels">
          Сошиал хаягууд
        </label>
        <div className="flex flex-row gap-4 w-full items-start">
          <div className="flex flex-col gap-3 w-2/3 sm:w-1/2">
            <div className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl flex flex-row items-center gap-3">
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
            <div className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl flex flex-row items-center gap-3">
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
                onChange={(e) => handleSocialChange("facebook", e.target.value)}
              />
            </div>
          </div>
          <div
            onClick={handleSaveOrUpdateSocialChannels}
            className="cursor-pointer bg-[#F5F4F0] h-auto py-4 w-1/3 sm:w-[128px] text-center rounded-lg border border-[#2D262D] text-sm sm:text-xl"
          >
            Хадгалах
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialsSettings;
