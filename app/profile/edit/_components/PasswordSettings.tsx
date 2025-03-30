import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

interface PasswordSettingsProps {
  showNewPassword: boolean;
  setNewPassword: (value: string) => void;
  newPassword: string;
  handleMouseDownNewPassword: () => void;
  handleMouseUpNewPassword: () => void;
  handleChangePassword: () => void;
  showOldPassword: boolean;
  setOldPassword: (value: string) => void;
  oldPassword: string;
  handleMouseDownOldPasswrod: () => void;
  handleMouseUpOldPassword: () => void;
}

function PasswordSettings({
  showNewPassword,
  setNewPassword,
  newPassword,
  handleMouseDownNewPassword,
  handleMouseUpNewPassword,
  handleChangePassword,
  showOldPassword,
  setOldPassword,
  oldPassword,
  handleMouseDownOldPasswrod,
  handleMouseUpOldPassword,
}: PasswordSettingsProps) {
  return (
    <div className="flex flex-col gap-4">
      <Input
        id="oldPassword"
        name="oldPassword"
        type={showOldPassword ? "text" : "password"}
        label="Хуучин нууц үг"
        onChange={(e) => setOldPassword(e.target.value)}
        value={oldPassword}
        labelClassName="text-[#6F6F6F] text-lg font-normal"
        className="bg-[#F5F4F0] text-base sm:text-xl"
        layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
        wrapperClassName="w-1/2"
        rightSection={
          <button
            type="button"
            onMouseDown={handleMouseDownOldPasswrod}
            onMouseUp={handleMouseUpOldPassword}
            onMouseLeave={handleMouseUpOldPassword} // For when the user moves the mouse away from the button
            onTouchStart={handleMouseDownOldPasswrod} // For mobile
            onTouchEnd={handleMouseUpOldPassword} // For mobile
            className={`${
              oldPassword === "" ? "hidden" : "block"
            } text-sm opacity-90`}
          >
            <Image
              src={"/show-pwd.png"}
              width={24}
              height={24}
              alt=""
              className="min-w-4 min-h-4 sm:min-w-6 sm:min-h-6"
            />
          </button>
        }
      />

      <div className="flex flex-row gap-5 items-center w-full">
        <Input
          id="newPassword"
          name="newPassword"
          type={showNewPassword ? "text" : "password"}
          onChange={(e) => setNewPassword(e.target.value)}
          value={newPassword}
          labelClassName="text-[#6F6F6F] text-lg font-normal"
          className="bg-[#F5F4F0] text-base sm:text-xl"
          layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
          wrapperClassName="w-1/2"
          rightSection={
            <button
              type="button"
              onMouseDown={handleMouseDownNewPassword}
              onMouseUp={handleMouseUpNewPassword}
              onMouseLeave={handleMouseUpNewPassword} // For when the user moves the mouse away from the button
              onTouchStart={handleMouseDownNewPassword} // For mobile
              onTouchEnd={handleMouseUpNewPassword} // For mobile
              className={`${
                newPassword === "" ? "hidden" : "block"
              } text-sm opacity-90`}
            >
              <Image
                src={"/show-pwd.png"}
                width={24}
                height={24}
                alt=""
                className="min-w-4 min-h-4 sm:min-w-6 sm:min-h-6"
              />
            </button>
          }
        />

        <div
          onClick={handleChangePassword}
          className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
        >
          Өөрчлөх
        </div>
      </div>
    </div>
  );
}

export default PasswordSettings;
