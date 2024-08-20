"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import GraphCMSImageLoader from "@/app/components/GraphCMSImageLoader";
import {
  useChangeProfilePictureMutation,
  useEditBrandProfileMutation,
  useListProductTypesQuery,
  useListSocialChannelsQuery,
  useUpdateSocialChannelMutation,
  useUploadFileMutation,
} from "@/app/services/service";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments.pop();
  const router = useRouter();
  const [creatorData, setCreatorData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // Change to handle a single image URL
  const [password, setPassword] = useState("");
  const [productTypes, setProductTypes] = useState([]);
  const [dropdownOpen, setdropdownOpen] = useState(false);

  const [editBrandProfile, { data, error, isLoading }] =
    useEditBrandProfileMutation();
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

  const {
    data: listProductTypesData,
    error: listProductTypesError,
    isLoading: listProductTypesLoading,
  } = useListProductTypesQuery();

  const {
    data: listSocialChannelsData,
    error: listSocialChannelsError,
    isLoading: listSocialChannelsLoading,
  } = useListSocialChannelsQuery();

  const [
    updateSocialChannel,
    {
      data: updateSocialChannelData,
      error: updateSocialChannelError,
      isLoading: updateSocialChannelLoading,
    },
  ] = useUpdateSocialChannelMutation();

  const userInfo = Cookies.get("user-info");
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;
  const [socials, setSocials] = useState({
    instagram: "",
    facebook: "",
  });
  const [email, setEmail] = useState(
    parsedUserInfo ? parsedUserInfo?.BusinessEmail : ""
  );

  const formik = useFormik({
    initialValues: {
      name: parsedUserInfo ? parsedUserInfo?.name : "",
      bio: parsedUserInfo ? parsedUserInfo?.Bio : "",
      website: parsedUserInfo ? parsedUserInfo?.Website : "temp-web",
      phoneNumber: parsedUserInfo ? parsedUserInfo?.PhoneNumber : "temp-phone",
      address: parsedUserInfo ? parsedUserInfo?.Address : "",
      brandAoADescription: "temp-desc",
      productTypes: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      bio: Yup.string().required("Required"),
      address: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await editBrandProfile(values).unwrap();
        toast.success("Амжилттай");
      } catch (err) {
        toast.error("Алдаа гарлаа");
      }
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
            const url = response.data.Url;
            const id = response.data.FileId;

            setImageUrl(url); // Set single image URL
            changeProfilePicture(id);
          }
        });
      }
    },
  });

  useEffect(() => {
    if (data) {
      console.log("Success:", data);
    }
    if (error) {
      console.log("Error:", error);
    }
  }, [data, error]);

  useEffect(() => {
    if (uploadFileError) {
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (changeProfilePictureData) {
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      toast.error("Зураг оруулахад алдаа гарлаа");
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  const handleProductType = (value) => {
    setProductTypes((prev) => {
      if (!prev.some((type) => type.TypeName === value.TypeName)) {
        return [...prev, value];
      }
      return prev;
    });
    formik.setFieldValue("productTypes", [
      ...formik.values.productTypes,
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
      await changePassword({ password: password }).unwrap();
      toast.success("Нууц үг амжилттай солигдлоо");
    } catch (err) {
      toast.error("Нууц үг солиход алдаа гарлаа");
    }
  };

  const handleSaveSocialChannels = async () => {
    try {
      if (socials.instagram) {
        await updateSocialChannel({
          PlatformId: 2,
          SocialAddress: socials.instagram,
        }).unwrap();
      }
      if (socials.facebook) {
        await updateSocialChannel({
          PlatformId: 1,
          SocialAddress: socials.facebook,
        }).unwrap();
      }
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
                parsedUserInfo?.profile
              ) : imageUrl ? (
                <Image
                  src={imageUrl}
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-xl w-[194px] h-[194px] xl:w-[258px] xl:h-[258px]"
                  alt="creator"
                />
              ) : (
                <></>
              )}
              <div className="flex flex-col gap-2">
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
                  Change picture
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="mt-11 flex flex-col gap-4"
          >
            <div className="flex flex-col sm:flex-row gap-5 w-full">
              <div className="flex flex-col gap-3 w-1/2">
                <label className="text-[#6F6F6F] text-lg" htmlFor="name">
                  Brand name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                  className="p-4 bg-[#F5F4F0] rounded-lg border text-xl w-full"
                />
                {formik.touched.name && formik.errors.name && (
                  <div className="text-red-500 text-sm">
                    {formik.errors.name}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                  <label className="text-[#6F6F6F] text-lg" htmlFor="type">
                    Brand type
                  </label>
                  <div className="relative flex flex-row flex-wrap items-center gap-2">
                    {productTypes?.map((p, i) => (
                      <div
                        key={i}
                        className="bg-[#CA7FFE] text-center text-xl rounded-full px-8 py-4"
                      >
                        {p.TypeName}
                      </div>
                    ))}
                    <div
                      onClick={() => setdropdownOpen(!dropdownOpen)}
                      className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-[62px] h-[62px] flex items-center justify-center"
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
                            className="cursor-pointer mt-1 bg-[#CA7FFE] text-center text-xs rounded-full px-4 py-2"
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
                  className="w-1/2 p-4 bg-[#F5F4F0] rounded-lg border text-xl"
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
                        id="instagram"
                        name="instagram"
                        type="text"
                        onChange={(e) =>
                          setSocials({ ...socials, instagram: e.target.value })
                        }
                        className="bg-transparent outline-none"
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
                        id="facebook"
                        name="facebook"
                        type="text"
                        onChange={(e) =>
                          setSocials({ ...socials, facebook: e.target.value })
                        }
                        className="bg-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div
                    onClick={handleSaveSocialChannels}
                    className="cursor-pointer bg-[#F5F4F0] h-auto py-4 w-[128px] text-center rounded-lg border border-[#2D262D] text-xl"
                  >
                    Хадгалах
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="email">
                Password
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={(e) => setPassword(e.target.value)}
                  value={email}
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
              <label className="text-[#6F6F6F] text-lg" htmlFor="address">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                rows={4}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              )}
            </div>
            <button
              type="submit"
              className="bg-[#CA7FFE] rounded-2xl border border-[#2D262D] text-white py-4 text-xl"
            >
              Хадгалах
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
