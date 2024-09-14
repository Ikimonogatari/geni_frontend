"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useChangeProfilePictureMutation,
  useEditBrandProfileMutation,
  useListProductTypesQuery,
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

  const [productTypes, setProductTypes] = useState([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const [editBrandProfile, { data, error, isLoading, isSuccess }] =
    useEditBrandProfileMutation();

  const [
    uploadFile,
    {
      data: uploadFileData,
      error: uploadFileError,
      isLoading: uploadFileLoading,
      isSuccess: uploadFileSuccess,
    },
  ] = useUploadFileMutation();

  const [
    changeProfilePicture,
    {
      data: changeProfilePictureData,
      error: changeProfilePictureError,
      isLoading: changeProfilePictureLoading,
      isSuccess: changeProfilePictureSuccess,
    },
  ] = useChangeProfilePictureMutation();

  const [
    changePassword,
    {
      data: changePasswordData,
      error: changePasswordError,
      isLoading: changePasswordLoading,
      isSuccess: changePasswordSuccess,
    },
  ] = useChangePasswordMutation();

  const {
    data: listProductTypesData,
    error: listProductTypesError,
    isLoading: listProductTypesLoading,
  } = useListProductTypesQuery();

  const [
    updateSocialChannel,
    {
      data: updateSocialChannelData,
      error: updateSocialChannelError,
      isLoading: updateSocialChannelLoading,
      isSuccess: updateSocialChannelSuccess,
    },
  ] = useUpdateSocialChannelMutation();

  const [
    createSocialChannel,
    {
      data: createSocialChannelData,
      error: createSocialChannelError,
      isLoading: createSocialChannelLoading,
      isSuccess: createSocialChannelSuccess,
    },
  ] = useCreateSocialChannelMutation();

  const formik = useFormik({
    initialValues: {
      Name: parsedUserInfo ? parsedUserInfo?.Name : "",
      Bio: parsedUserInfo ? parsedUserInfo?.Bio : "",
      Website: "temp-web",
      PhoneNumber: parsedUserInfo ? parsedUserInfo?.PhoneNumber : "",
      RegNo: parsedUserInfo ? parsedUserInfo?.RegNo : "",
      Address: parsedUserInfo ? parsedUserInfo?.Address : "",
      BrandAoADescription: "temp-desc",
      ProductTypes: [],
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      PhoneNumber: Yup.string().required("Required"),
      Bio: Yup.string().required("Required"),
      Address: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      editBrandProfile(values).unwrap();
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      // Handle only the first file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]; // Take the first file
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "profile-pic");

        try {
          const response = await uploadFile(formData); // Wait for file upload response
          if (response.data) {
            const id = response.data.FileId;
            await changeProfilePicture({ FileId: id }); // Update the profile picture with the file ID
            console.log("Profile picture updated successfully!");
          }
        } catch (error) {
          console.error("File upload or profile picture update failed:", error);
        }
      }
    },
  });

  useEffect(() => {
    if (isSuccess) {
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
    if (changeProfilePictureSuccess) {
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  useEffect(() => {
    if (changePasswordSuccess) {
      console.log("Success:", data);
      toast.success("Амжилттай");
    }
    if (changePasswordError) {
      toast.error("Нууц үг солиход алдаа гарлаа");
    }
  }, [changePasswordData, changePasswordError]);

  const handleProductType = (value) => {
    setProductTypes((prev) => {
      if (!prev.some((type) => type.TypeName === value.TypeName)) {
        return [...prev, value];
      }
      return prev;
    });
    formik.setFieldValue("ProductTypes", [
      ...formik.values.ProductTypes,
      value.ProductTypeId,
    ]);
  };

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

      toast.success("Амжилттай хадгаллаа");
    } catch (err) {
      toast.error("Алдаа гарлаа");
    }
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    Cookies.remove("userType");
    Cookies.remove("user-info");
    router.refresh();
    router.replace("/");
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
            Профайл засах
          </p>

          <div className="flex flex-row items-start justify-between w-full">
            <div className="flex flex-row items-center gap-7">
              {parsedUserInfo ? (
                <Image
                  src={
                    parsedUserInfo?.ProfileLink
                      ? parsedUserInfo?.ProfileLink
                      : "/dummy-profile.jpg"
                  }
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-full sm:rounded-xl border-[1px] border-[#2D262D] w-[100px] h-[100px] aspect-square sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"
                  alt=""
                />
              ) : (
                <div className="w-[100px] h-[100px] sm:w-[194px] sm:h-[194px] xl:w-[258px] xl:h-[258px]"></div>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-sm sm:text-lg">Баталгаажсан брэнд</span>
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
                  className="cursor-pointer mt-2 py-2 sm:py-3 text-center bg-[#4D55F5] border border-[#2D262D] rounded-lg text-white text-base sm:text-xl font-bold"
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
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="flex flex-col gap-3 w-full sm:w-1/2">
                <label className="text-[#6F6F6F] text-lg" htmlFor="Name">
                  Брэндийн нэр
                </label>
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.Name}
                  className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl w-full"
                />
                {formik.touched.Name && formik.errors.Name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.Name}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label className="text-[#6F6F6F] text-lg" htmlFor="type">
                    Брэндийн төрөл
                  </label>
                  <div className="relative flex flex-row flex-wrap items-center gap-2">
                    {productTypes?.map((p, i) => (
                      <div
                        key={i}
                        className="bg-[#4D55F5] text-center text-base sm:text-xl rounded-full px-5 sm:px-8 py-3 sm:py-4"
                      >
                        {p.TypeName}
                      </div>
                    ))}
                    <div
                      onClick={() => setdropdownOpen(!dropdownOpen)}
                      className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center"
                    >
                      <Image
                        src={"/plus-icon-black.png"}
                        width={24}
                        height={24}
                        alt="+"
                        className=""
                      />
                    </div>
                    <div
                      className={`${
                        dropdownOpen
                          ? `top-full opacity-100 visible`
                          : "top-[110%] invisible opacity-0"
                      } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                    >
                      {!listProductTypesError ? (
                        listProductTypesData?.map((p, i) => (
                          <div
                            onClick={() => handleProductType(p)}
                            key={i}
                            className="cursor-pointer mt-1 bg-[#4D55F5] text-center text-xs rounded-full px-4 py-2"
                          >
                            {p.TypeName}
                          </div>
                        ))
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="email">
                Имэйл
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <div
                  onClick={handleChangeEmail}
                  className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
                >
                  Өөрчлөх
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
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
                className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
              />
              {formik.touched.PhoneNumber && formik.errors.PhoneNumber && (
                <div className="text-red-500 text-sm">
                  {formik.errors.PhoneNumber}
                </div>
              )}
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
              {formik.touched.RegNo && formik.errors.RegNo && (
                <div className="text-red-500 text-sm">
                  {formik.errors.RegNo}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="bio">
                Брэндийн тухай
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
              {formik.touched.Bio && formik.errors.Bio && (
                <div className="text-red-500 text-sm">{formik.errors.Bio}</div>
              )}
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
                  Сошиал хаягууд
                </label>
                <div className="flex flex-row gap-4 w-full items-start">
                  <div className="flex flex-col gap-3 w-1/2">
                    <div className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl flex flex-row items-center gap-3">
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
                    <div className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl flex flex-row items-center gap-3">
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
                    className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
                  >
                    Хадгалах
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="oldPassword">
                Хуучин нууц үг
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type="password"
                  onChange={(e) => setOldPassword(e.target.value)}
                  onBlur={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="newPassword">
                Шинэ нууц үг
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  onChange={(e) => setNewPassword(e.target.value)}
                  onBlur={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  className="w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
                />
                <div
                  onClick={handleChangePassword}
                  className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
                >
                  Өөрчлөх
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="address">
                Хаяг
              </label>
              <textarea
                id="Address"
                name="Address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Address}
                rows={4}
                className="p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl"
              />
              {formik.touched.Address && formik.errors.Address && (
                <div className="text-red-500 text-sm">
                  {formik.errors.Address}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#4D55F5] rounded-2xl border border-[#2D262D] text-white py-4 font-bold text-base sm:text-xl"
            >
              Хадгалах
            </button>
          </form>
          <button
            onClick={handleLogout}
            className="flex flex-row justify-center items-center gap-2 mt-3 w-full bg-[#F5F4F0] rounded-2xl border border-[#2D262D] py-4 text-base sm:text-xl"
          >
            <Image
              src={"/logout-icon.png"}
              width={26}
              height={26}
              className="w-6 h-6"
              alt=""
            />
            Гарах
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
