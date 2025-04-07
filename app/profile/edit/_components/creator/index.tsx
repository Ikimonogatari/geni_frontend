"use client";
import React, { useEffect, useState } from "react";
import { Mail, User, Lock, Share2, LogOut } from "lucide-react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  useChangeProfilePictureMutation,
  useEditCreatorProfileMutation,
  useUpdateSocialChannelMutation,
  useCreateSocialChannelMutation,
  useUploadFileMutation,
  useChangePasswordMutation,
  useSendOtpToEmailMutation,
  useChangeEmailMutation,
  geniApi,
  useGetUserInfoQuery,
} from "@/app/services/service";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useUserInfo } from "@/app/context/UserInfoContext";
import { Sidebar } from "@/components/common/Sidebar";
import PasswordSettings from "../PasswordSettings";
import EmailSettings from "../EmailSettings";
import SocialsSettings from "../SocialsSettings";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import BackButton from "@/components/common/BackButton";

function EditProfileCreator() {
  const router = useRouter();
  const { setShouldRefetchUserInfo } = useUserInfo();

  const { data: userInfoData } = useGetUserInfoQuery({});

  const parsedUserInfo = userInfoData;

  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });
  const userType = Cookies.get("userType");

  const [newEmail, setNewEmail] = useState(
    parsedUserInfo ? parsedUserInfo?.Email : ""
  );
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleMouseDownOldPasswrod = () => setShowOldPassword(true);
  const handleMouseUpOldPassword = () => setShowOldPassword(false);

  const handleMouseDownNewPassword = () => setShowNewPassword(true);
  const handleMouseUpNewPassword = () => setShowNewPassword(false);

  const [editCreatorProfile, { data, error, isLoading }] =
    useEditCreatorProfileMutation();

  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
    },
  ] = useUploadFileMutation();

  const [
    changeProfilePicture,
    {
      data: changeProfilePictureData,
      error: changeProfilePictureError,
      isLoading: changeProfilePictureLoading,
    },
  ] = useChangeProfilePictureMutation();

  const [
    changePassword,
    {
      data: changePasswordData,
      error: changePasswordError,
      isLoading: changePasswordLoading,
    },
  ] = useChangePasswordMutation();

  const [
    sendOtpToEmail,
    {
      data: sendOtpToEmailData,
      error: sendOtpToEmailError,
      isLoading: sendOtpToEmailLoading,
      isSuccess: sendOtpToEmailSuccess,
    },
  ] = useSendOtpToEmailMutation();

  const [
    changeEmail,
    {
      data: changeEmailData,
      error: changeEmailError,
      isLoading: changeEmailLoading,
      isSuccess: changeEmailSuccess,
    },
  ] = useChangeEmailMutation();

  const [
    updateSocialChannel,
    {
      data: updateSocialChannelData,
      error: updateSocialChannelError,
      isLoading: updateSocialChannelLoading,
    },
  ] = useUpdateSocialChannelMutation();

  const [
    createSocialChannel,
    {
      data: createSocialChannelData,
      error: createSocialChannelError,
      isLoading: createSocialChannelLoading,
    },
  ] = useCreateSocialChannelMutation();

  const [activeSection, setActiveSection] = useState("general");

  const formik = useFormik({
    initialValues: {
      FirstName: parsedUserInfo?.FirstName ? parsedUserInfo?.FirstName : "",
      LastName: parsedUserInfo?.LastName ? parsedUserInfo?.LastName : "",
      Nickname: parsedUserInfo?.Nickname ? parsedUserInfo?.Nickname : "",
      Bio: parsedUserInfo?.Bio ? parsedUserInfo?.Bio : "",
      RegNo: parsedUserInfo?.RegNo ? parsedUserInfo?.RegNo : "",
      PhoneNumber: parsedUserInfo?.PhoneNumber ? parsedUserInfo?.PhoneNumber : "",
      AdditionalPhoneNum: "+12345678902",
      Location: parsedUserInfo?.Location ? parsedUserInfo?.Location : "",
      EbarimtConsumerNo: "9876543211",
      Birthday:
        parsedUserInfo?.Birthday &&
        parsedUserInfo.Birthday !== "0001-01-01T00:00:00Z"
          ? parsedUserInfo.Birthday
          : new Date().toISOString().split("T")[0],
      EduId: 3,
      Gender: parsedUserInfo?.Gender ? parsedUserInfo?.Gender : "F",
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("Заавал бөглөнө үү"),
      LastName: Yup.string().required("Заавал бөглөнө үү"),
      PhoneNumber: Yup.string().required("Заавал бөглөнө үү"),
      Bio: Yup.string().required("Заавал бөглөнө үү"),
      Location: Yup.string().required("Заавал бөглөнө үү"),
      RegNo: Yup.string().required("Заавал бөглөнө үү"),
    }),
    onSubmit: async (values) => {
      editCreatorProfile(values).unwrap();
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
    onDrop: (acceptedFiles) => {
      // Handle only the first file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]; // Take the first file
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "profile-pic");
        uploadFile(formData).then((response) => {
          if (response.data) {
            const id = response.data.FileId;
            changeProfilePicture({
              FileId: id,
            });
          }
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      toast.success("Амжилттай хадгаллаа");
    }
    if (error) {
      //@ts-ignore
      toast.error(error?.data?.error);
    }
  }, [data, error]);

  useEffect(() => {
    if (uploadFileError) {
      //@ts-ignore
      toast.error(uploadFileError?.data?.error);
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (changeProfilePictureData) {
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      //@ts-ignore
      toast.error(changeProfilePictureError?.data?.error);
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  useEffect(() => {
    if (changePasswordData) {
      toast.success("Амжилттай");
    }
    if (changePasswordError) {
      //@ts-ignore
      toast.error(changePasswordError?.data?.error);
    }
  }, [changePasswordData, changePasswordError]);

  useEffect(() => {
    if (sendOtpToEmailSuccess) {
      setIsOtpSent(true);
      toast.success("Таны хуучин мэйл рүү нэг удаагийн код илгээгдлээ");
    } else if (sendOtpToEmailError) {
      //@ts-ignore
      toast.error(sendOtpToEmailError?.data?.error);
    }
  }, [sendOtpToEmailSuccess, sendOtpToEmailError]);

  useEffect(() => {
    if (changeEmailSuccess) {
      setIsOtpSent(false);
      toast.success("Имэйл шинэчлэгдлээ");
    } else if (changeEmailError) {
      //@ts-ignore
      toast.error(changeEmailError?.data?.error);
    }
  }, [changeEmailSuccess, changeEmailError]);

  const handleChangePassword = async () => {
    try {
      await changePassword({
        OldPassword: oldPassword,
        NewPassword: newPassword,
      }).unwrap();
      toast.success("Нууц үг амжилттай солигдлоо");
    } catch (err) {
      toast.error("Нууц үг солиход алдаа гарлаа");
    }
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

  const handleSendOtp = async () => {
    sendOtpToEmail({
      To: newEmail,
      UserType: userType, //Sys, Brand, Creator
      Channel: "smtp", //smtp, sms
      Type: "changeemail",
    });
  };

  const handleChangeEmail = () => {
    changeEmail({
      OTP: otp,
      NewEmail: newEmail,
    });
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    Cookies.remove("userType");
    geniApi.util.invalidateTags(["UserInfo"]);
    setShouldRefetchUserInfo(true);

    router.refresh();
    router.replace("/");
  };

  const sidebarItems = [
    {
      title: "Ерөнхий мэдээлэл",
      href: "#general",
      icon: <User className="h-4 w-4" />,
      onClick: () => setActiveSection("general"),
    },
    {
      title: "Имэйл",
      href: "#email",
      icon: <Mail className="h-4 w-4" />,
      onClick: () => setActiveSection("email"),
    },
    {
      title: "Нууц үг",
      href: "#password",
      icon: <Lock className="h-4 w-4" />,
      onClick: () => setActiveSection("password"),
    },
    {
      title: "Сошиал холбоосууд",
      href: "#socials",
      icon: <Share2 className="h-4 w-4" />,
      onClick: () => setActiveSection("socials"),
    },
    {
      title: "Гарах",
      href: "#",
      icon: <LogOut className="h-4 w-4" />,
      onClick: handleLogout,
    },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "general":
        return (
          <>
            <div className="flex flex-row items-start justify-between w-full">
              <div className="flex flex-row items-center gap-7">
                {parsedUserInfo ? (
                  <Image
                    src={parsedUserInfo?.ProfileLink || "/dummy-creator.png"}
                    width={194}
                    height={194}
                    loading="lazy"
                    className="object-cover rounded-full sm:rounded-xl border-[1px] border-[#2D262D] w-[100px] h-[100px] aspect-square sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"
                    alt=""
                  />
                ) : (
                  <div className="w-[100px] h-[100px] sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]" />
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-sm sm:text-lg">
                      Бүтээгчийн оноо: &nbsp;
                      {parsedUserInfo ? parsedUserInfo.Point : 0} xp
                    </span>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Link href="/profile/point-board">
                            <Image
                              src={"/info-icon.png"}
                              width={24}
                              height={24}
                              className="w-5 h-5 sm:w-6 sm:h-6 rounded-full"
                              alt=""
                            />
                          </Link>
                        </TooltipTrigger>
                        {/* @ts-ignore */}
                        <TooltipContent>
                          <span>Таны онооны самбар</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <div
                    {...getRootProps()}
                    className="cursor-pointer mt-2 py-2 sm:py-3 text-center bg-[#CA7FFE] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
                  >
                    <input {...getInputProps()} />
                    {parsedUserInfo?.ProfileLink
                      ? "Зургаа солих"
                      : "Зураг оруулах"}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row items-start gap-4 w-full">
                <Input
                  id="FirstName"
                  name="FirstName"
                  type="text"
                  label="Нэр"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.FirstName}
                  errorText={formik.errors.FirstName?.toString()}
                  errorVisible={
                    !!formik.touched.FirstName && !!formik.errors.FirstName
                  }
                  labelClassName="text-[#6F6F6F] text-lg font-normal"
                  wrapperClassName="w-full sm:auto"
                  className="bg-[#F5F4F0] text-base sm:text-xl cursor-not-allowed"
                  layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
                  disabled={true}
                />
                <Input
                  id="LastName"
                  name="LastName"
                  type="text"
                  label="Овог"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.LastName}
                  errorText={formik.errors.LastName?.toString()}
                  errorVisible={
                    !!formik.touched.LastName && !!formik.errors.LastName
                  }
                  labelClassName="text-[#6F6F6F] text-lg font-normal"
                  wrapperClassName="w-full sm:auto"
                  className="bg-[#F5F4F0] text-base sm:text-xl cursor-not-allowed"
                  layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
                  disabled={true}
                />
              </div>
              <Input
                id="Nickname"
                name="Nickname"
                type="text"
                label="Хэрэглэгчийн нэр"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Nickname}
                errorText={formik.errors.Nickname?.toString()}
                errorVisible={
                  !!formik.touched.Nickname && !!formik.errors.Nickname
                }
                labelClassName="text-[#6F6F6F] text-lg font-normal"
                className="bg-[#F5F4F0] text-base sm:text-xl"
                layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
              />
              <Input
                id="RegNo"
                name="RegNo"
                type="text"
                label="Регистрийн дугаар"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.RegNo}
                errorText={formik.errors.RegNo?.toString()}
                errorVisible={!!formik.touched.RegNo && !!formik.errors.RegNo}
                labelClassName="text-[#6F6F6F] text-lg font-normal"
                className="bg-[#F5F4F0] text-base sm:text-xl"
                layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
              />
              <Input
                id="PhoneNumber"
                name="PhoneNumber"
                type="text"
                label="Утасны дугаар"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.PhoneNumber}
                errorText={formik.errors.PhoneNumber?.toString()}
                errorVisible={
                  !!formik.touched.PhoneNumber && !!formik.errors.PhoneNumber
                }
                labelClassName="text-[#6F6F6F] text-lg font-normal"
                className="bg-[#F5F4F0] text-base sm:text-xl"
                layoutClassName="bg-[#F5F4F0] p-3 sm:p-4 h-auto"
              />
              <Textarea
                id="Bio"
                name="Bio"
                placeholder="Миний тухай"
                label="Миний тухай"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Bio}
                rows={5}
                maxLength={600}
                charCount={formik.values.Bio.length}
                errorText={formik.errors.Bio?.toString()}
                errorVisible={!!formik.touched.Bio && !!formik.errors.Bio}
                labelClassName="text-[#6F6F6F] text-lg font-normal"
                layoutClassName="bg-[#F5F4F0] p-3 sm:p-4"
                className="bg-[#F5F4F0] text-base sm:text-xl"
              />
              <Textarea
                id="Location"
                name="Location"
                placeholder="Хаяг"
                label="Хаяг"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Location}
                rows={4}
                errorText={formik.errors.Location?.toString()}
                errorVisible={
                  !!formik.touched.Location && !!formik.errors.Location
                }
                labelClassName="text-[#6F6F6F] text-lg font-normal"
                layoutClassName="bg-[#F5F4F0] p-3 sm:p-4"
                className="bg-[#F5F4F0] text-base sm:text-xl"
              />
              <button
                type="submit"
                className="bg-[#CA7FFE] rounded-2xl border border-[#2D262D] text-white py-4 font-bold text-base sm:text-xl"
              >
                Хадгалах
              </button>
            </div>
          </>
        );
      case "email":
        return (
          <EmailSettings
            newEmail={newEmail}
            setNewEmail={setNewEmail}
            handleSendOtp={handleSendOtp}
            isOtpSent={isOtpSent}
            otp={otp}
            setOtp={setOtp}
            handleChangeEmail={handleChangeEmail}
          />
        );
      case "password":
        return (
          <PasswordSettings
            showNewPassword={showNewPassword}
            setNewPassword={setNewPassword}
            newPassword={newPassword}
            handleMouseDownNewPassword={handleMouseDownNewPassword}
            handleMouseUpNewPassword={handleMouseUpNewPassword}
            handleChangePassword={handleChangePassword}
            showOldPassword={showOldPassword}
            setOldPassword={setOldPassword}
            oldPassword={oldPassword}
            handleMouseDownOldPasswrod={handleMouseDownOldPasswrod}
            handleMouseUpOldPassword={handleMouseUpOldPassword}
          />
        );
      case "socials":
        return (
          <SocialsSettings
            parsedUserInfo={parsedUserInfo}
            socials={socials}
            setSocials={setSocials}
            handleSaveOrUpdateSocialChannels={handleSaveOrUpdateSocialChannels}
          />
        );
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-20 sm:mt-32 mb-12 py-11 container mx-auto">
        <BackButton />
        <div className="flex flex-row items-center md:items-start gap-3 sm:gap-7 mt-7 sm:my-7">
          <Sidebar
            className="!text-lg md:hidden"
            items={sidebarItems}
            activeSection={activeSection}
          />
          <p className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold">
            Хуудас тохиргоо
          </p>
        </div>
        <div className="flex flex-col md:flex-row bg-white">
          <Sidebar
            className="!text-lg hidden md:block"
            items={sidebarItems}
            activeSection={activeSection}
          />
          <div className="w-full md:pl-10 md:border-l mt-5 sm:mt-0">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileCreator;
