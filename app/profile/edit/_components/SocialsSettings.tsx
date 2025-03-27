import React from "react";
import Image from "next/image";
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
                className="bg-transparent outline-none"
                value={socials.instagram}
                onChange={(e) =>
                  setSocials({
                    ...socials,
                    instagram: e.target.value,
                  })
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
                value={socials.facebook}
                className="bg-transparent outline-none"
                onChange={(e) =>
                  setSocials({ ...socials, facebook: e.target.value })
                }
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
