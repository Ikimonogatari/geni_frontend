"use client";
import React, { useEffect, useState } from "react";
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
} from "@/app/services/service";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { useUserInfo } from "../context/UserInfoContext";
function Page() {
  const router = useRouter();
  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  console.log(parsedUserInfo);

  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });

  const [email, setEmail] = useState(
    parsedUserInfo ? parsedUserInfo?.BusinessEmail : ""
  );

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const { setShouldRefetchUserInfo } = useUserInfo();

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
      firstName: parsedUserInfo ? parsedUserInfo?.FirstName : "",
      lastName: parsedUserInfo ? parsedUserInfo?.LastName : "",
      nickname: parsedUserInfo ? parsedUserInfo?.Nickname : "",
      bio: parsedUserInfo ? parsedUserInfo?.Bio : "",
      RegNo: "temp-regno",
      phoneNumber: "temp-phone",
      AdditionalPhoneNum: "temp-additionalPhone",
      location: parsedUserInfo ? parsedUserInfo?.Location : "",
      EbarimtConsumerNo: "temp-ebarimtNumber",
      Birthday: "temb-bday",
      eduId: 1,
      Gender: "temp-gender",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      bio: Yup.string().required("Required"),
      location: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      editCreatorProfile(values).unwrap();
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
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
              FileType: id,
            });
          }
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      toast.success("Амжилттай");
    }
    if (error) {
      toast.error("Алдаа гарлаа");
    }
  }, [data, error]);

  useEffect(() => {
    if (uploadFileError) {
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (changeProfilePictureData) {
      setShouldRefetchUserInfo(true);
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  useEffect(() => {
    if (changePasswordData) {
      console.log("Success:", data);
      toast.success("Амжилттай");
    }
    if (changePasswordError) {
      toast.error("Нууц үг солиход алдаа гарлаа");
    }
  }, [changePasswordData, changePasswordError]);

  const handleChangeEmail = async () => {
    try {
      await changeEmail({ email: email }).unwrap();
      toast.success("Имэйл амжилттай солигдлоо");
    } catch (err) {
      toast.error("Имэйл солиход алдаа гарлаа");
    }
  };

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
      setShouldRefetchUserInfo(true);

      toast.success("Амжилттай хадгаллаа");
    } catch (err) {
      toast.error("Алдаа гарлаа");
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32 mb-12">
        <div className="max-w-4xl min-h-screen mx-auto px-7 py-11 container">
          <button
            onClick={() => router.back()}
            className="w-12 sm:w-14 h-12 sm:h-14 bg-[#F5F4F0] rounded-lg p-4"
          >
            <Image
              src={"/arrow-left.png"}
              width={24}
              height={24}
              alt="arrow-left"
            />
          </button>
          <p className="text-4xl sm:text-5xl xl:text-6xl font-bold my-7">
            Edit profile
          </p>

          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-7">
              {parsedUserInfo ? (
                <Image
                  src={parsedUserInfo?.ProfileLink}
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-xl w-[194px] h-[194px] xl:w-[258px] xl:h-[258px]"
                  alt=""
                />
              ) : (
                <></>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-lg">
                    Creator point: &nbsp;
                    {parsedUserInfo ? parsedUserInfo.Point : ""} xp
                  </span>
                  <button>
                    <Image
                      src={"/Info.png"}
                      width={24}
                      height={24}
                      alt="info"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <span className="text-lg">Verified creator</span>
                  <Image
                    src={"/verified-icon.png"}
                    width={24}
                    height={24}
                    alt="verified-icon"
                    className="w-6 h-6"
                  />
                </div>
                <div
                  {...getRootProps()}
                  className="cursor-pointer mt-2 py-3 text-center bg-[#CA7FFE] border border-[#2D262D] rounded-lg text-white text-xl font-bold"
                >
                  <input {...getInputProps()} />
                  {parsedUserInfo && parsedUserInfo.ProfileLink
                    ? "Change picture"
                    : "Add picture"}
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
                <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3 w-full">
                <label className="text-[#6F6F6F] text-lg" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-1/2">
              <label className="text-[#6F6F6F] text-lg" htmlFor="nickname">
                Username
              </label>
              <input
                id="nickname"
                name="nickname"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nickname}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.nickname && formik.errors.nickname && (
                <div className="text-red-500 text-sm">
                  {formik.errors.nickname}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="email">
                Email
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => setEmail(e.target.value)}
                  value={email}
                  className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                />
                <div
                  onClick={handleChangeEmail}
                  className="cursor-pointer py-4 w-[128px] text-center bg-[#F5F4F0] rounded-lg text-xl border border-[#2D262D]"
                >
                  Өөрчлөх
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                rows={4}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.bio && formik.errors.bio && (
                <div className="text-red-500 text-sm">{formik.errors.bio}</div>
              )}
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
                  Social channels
                </label>
                <div className="flex flex-row gap-4 w-full items-start">
                  <div className="flex flex-col gap-3 w-1/2">
                    <div className="p-4 bg-[#F5F4F0] rounded-lg border text-xl flex flex-row items-center gap-3">
                      <Image
                        src={"/Instagram.png"}
                        width={24}
                        height={24}
                        alt="fb"
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
                          setSocials({ ...socials, instagram: e.target.value })
                        }
                      />
                    </div>
                    <div className="p-4 bg-[#F5F4F0] rounded-lg border text-xl flex flex-row items-center gap-3">
                      <Image
                        src={"/Facebook.png"}
                        width={24}
                        height={24}
                        alt="fb"
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
                    className="cursor-pointer bg-[#F5F4F0] h-auto py-4 w-[128px] text-center rounded-lg border border-[#2D262D] text-xl"
                  >
                    Хадгалах
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="oldPassword">
                Old Password
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  onBlur={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="w-1/2 p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="newPassword">
                New Password
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className="w-1/2 p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                />
                <div
                  onClick={handleChangePassword}
                  className="cursor-pointer py-4 w-[128px] text-center bg-[#F5F4F0] rounded-lg text-xl border border-[#2D262D]"
                >
                  Өөрчлөх
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="location">
                Address
              </label>
              <textarea
                id="location"
                name="location"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.location}
                rows={4}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.location && formik.errors.location && (
                <div className="text-red-500 text-sm">
                  {formik.errors.location}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#CA7FFE] rounded-2xl border border-[#2D262D] text-white py-4 text-xl"
            >
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
