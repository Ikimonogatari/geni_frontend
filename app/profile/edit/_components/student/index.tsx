"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, User, Lock, Share2, LogOut } from "lucide-react";

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
} from "@/app/services/service";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useUserInfo } from "@/app/context/UserInfoContext";
import { Edit } from "lucide-react";
import { ErrorText } from "@/components/ui/error-text";
import { Sidebar } from "@/components/common/Sidebar";
import PasswordSettings from "../PasswordSettings";
import EmailSettings from "../EmailSettings";
import SocialsSettings from "../SocialsSettings";

function EditProfileStudent() {
  const router = useRouter();
  const { setShouldRefetchUserInfo } = useUserInfo();
  const [activeSection, setActiveSection] = useState("general");

  const userInfo = Cookies.get("user-info");
  const userType = Cookies.get("userType");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });
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

  const [editCreatorProfile, { data, error, isLoading, isSuccess }] =
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

  const formik = useFormik({
    initialValues: {
      FirstName: parsedUserInfo ? parsedUserInfo?.FirstName : "",
      LastName: parsedUserInfo ? parsedUserInfo?.LastName : "",
      Nickname: parsedUserInfo ? parsedUserInfo?.Nickname : "",
      Email: parsedUserInfo ? parsedUserInfo.Email : "",
      Bio: parsedUserInfo ? parsedUserInfo?.Bio : "",
      RegNo: parsedUserInfo ? parsedUserInfo?.RegNo : "",
      PhoneNumber: parsedUserInfo ? parsedUserInfo?.PhoneNumber : "",
      AdditionalPhoneNum: "+12345678902",
      Location: parsedUserInfo ? parsedUserInfo?.Location : "",
      EbarimtConsumerNo: "9876543211",
      Birthday: "1990-01-11",
      EduId: 3,
      Gender: "M",
    },
    validationSchema: Yup.object({
      FirstName: Yup.string().required("Required"),
      LastName: Yup.string().required("Required"),
      PhoneNumber: Yup.string().required("Required"),
      Bio: Yup.string().required("Required"),
      Location: Yup.string().required("Required"),
      RegNo: Yup.string().required("Required"),
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
    if (isSuccess) {
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
    Cookies.remove("user-info");
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
                    src={
                      parsedUserInfo?.ProfileLink
                        ? parsedUserInfo?.ProfileLink
                        : "/dummy-student.png"
                    }
                    width={194}
                    height={194}
                    loading="lazy"
                    className="object-cover rounded-full sm:rounded-xl border-[1px] border-[#2D262D] w-[100px] h-[100px] aspect-square sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"
                    alt=""
                  />
                ) : (
                  <div className="w-[100px] h-[100px] sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"></div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row items-center gap-3">
                    <span className="text-sm sm:text-lg">
                      Бүтээгчийн оноо: &nbsp;
                      {parsedUserInfo ? parsedUserInfo.Point : 0} xp
                    </span>
                    <button>
                      <Image
                        src={"/info-icon.png"}
                        width={24}
                        height={24}
                        alt="info"
                        className="w-6 h-6"
                      />
                    </button>
                  </div>

                  <div
                    {...getRootProps()}
                    className="cursor-pointer mt-2 py-2 sm:py-3 text-center bg-[#4FB755] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
                  >
                    <input {...getInputProps()} />
                    {parsedUserInfo && parsedUserInfo.ProfileLink
                      ? "Зургаа солих"
                      : "Зураг оруулах"}
                  </div>
                </div>
              </div>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="mt-11 flex flex-col gap-4"
            >
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-[#6F6F6F] text-lg" htmlFor="FirstName">
                    Нэр
                  </label>
                  <input
                    id="FirstName"
                    name="FirstName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.FirstName}
                    className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                  />
                  <ErrorText
                    text={formik.errors.FirstName}
                    visible={
                      !!formik.touched.FirstName && !!formik.errors.FirstName
                    }
                  />
                </div>
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-[#6F6F6F] text-lg" htmlFor="LastName">
                    Овог
                  </label>
                  <input
                    id="LastName"
                    name="LastName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.LastName}
                    className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                  />
                  <ErrorText
                    text={formik.errors.LastName}
                    visible={
                      !!formik.touched.LastName && !!formik.errors.LastName
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full sm:w-1/2">
                <label className="text-[#6F6F6F] text-lg" htmlFor="Nickname">
                  Хэрэглэгчийн нэр
                </label>
                <input
                  id="Nickname"
                  name="Nickname"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Nickname}
                  className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <ErrorText
                  text={formik.errors.Nickname}
                  visible={
                    !!formik.touched.Nickname && !!formik.errors.Nickname
                  }
                />
              </div>
              <div className="flex flex-col gap-3">
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
                  className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <ErrorText
                  text={formik.errors.RegNo}
                  visible={!!formik.touched.RegNo && !!formik.errors.RegNo}
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-[#6F6F6F] text-lg" htmlFor="PhoneNumber">
                  Утасны дугаар
                </label>
                <input
                  id="PhoneNumber"
                  name="PhoneNumber"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.PhoneNumber}
                  className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <ErrorText
                  text={formik.errors.PhoneNumber}
                  visible={
                    !!formik.touched.PhoneNumber && !!formik.errors.PhoneNumber
                  }
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-[#6F6F6F] text-lg" htmlFor="Bio">
                  Миний тухай
                </label>
                <textarea
                  id="Bio"
                  name="Bio"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Bio}
                  rows={4}
                  className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <ErrorText
                  text={formik.errors.Bio}
                  visible={!!formik.touched.Bio && !!formik.errors.Bio}
                />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-[#6F6F6F] text-lg" htmlFor="Location">
                  Хаяг
                </label>
                <textarea
                  id="Location"
                  name="Location"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Location}
                  rows={4}
                  className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <ErrorText
                  text={formik.errors.Location}
                  visible={
                    !!formik.touched.Location && !!formik.errors.Location
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-[#4FB755] rounded-2xl border border-[#2D262D] text-white py-4 font-bold text-base sm:text-xl"
              >
                Хадгалах
              </button>
            </form>
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
        <div className="flex flex-row items-start gap-4 sm:gap-7 my-7">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image src={"/arrow-left.png"} width={24} height={24} alt="" />
          </button>
          <p className="text-4xl sm:text-5xl xl:text-6xl font-bold">
            Хуудас тохиргоо
          </p>
        </div>
        <div className="flex flex-col md:flex-row bg-white">
          <Sidebar
            className="!text-lg"
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

export default EditProfileStudent;
