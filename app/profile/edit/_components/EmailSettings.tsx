import React from "react";

interface EmailSettingsProps {
  newEmail: string;
  setNewEmail: (value: string) => void;
  handleSendOtp: () => void;
  isOtpSent: boolean;
  otp: string;
  setOtp: (value: string) => void;
  handleChangeEmail: () => void;
}
function EmailSettings({
  newEmail,
  setNewEmail,
  handleSendOtp,
  isOtpSent,
  otp,
  setOtp,
  handleChangeEmail,
}: EmailSettingsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 w-full">
        <label className="text-[#6F6F6F] text-lg" htmlFor="newEmail">
          Имэйл
        </label>
        <div className="flex flex-row gap-5 items-center w-full">
          <input
            id="newEmail"
            name="newEmail"
            type="email"
            onChange={(e) => setNewEmail(e.target.value)}
            value={newEmail}
            className="w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
          />
          <div
            onClick={handleSendOtp}
            className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-primary rounded-lg text-sm sm:text-xl border border-[#2D262D] text-white"
          >
            Код илгээх
          </div>
        </div>
      </div>
      {isOtpSent && (
        <div className="flex flex-col gap-3 w-full">
          <label className="text-[#6F6F6F] text-lg" htmlFor="otp">
            Нэг удаагийн код
          </label>
          <div className="flex flex-row gap-5 items-center w-full">
            <input
              id="otp"
              name="otp"
              type="text"
              pattern="\d{4}"
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
              className="w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
            />
            <div
              onClick={handleChangeEmail}
              className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-primary rounded-lg text-sm sm:text-xl border border-[#2D262D] text-white"
            >
              Мэйл солих
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmailSettings;
