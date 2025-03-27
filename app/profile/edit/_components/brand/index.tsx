"use client";
import { useUserInfo } from "@/app/context/UserInfoContext";
import {
  geniApi,
  useChangeBrandTypeMutation,
  useChangeEmailMutation,
  useChangePasswordMutation,
  useChangeProfilePictureMutation,
  useCreateSocialChannelMutation,
  useEditBrandProfileMutation,
  useListBrandTypesQuery,
  useSendOtpToEmailMutation,
  useUpdateSocialChannelMutation,
  useUploadFileMutation,
} from "@/app/services/service";
import { ErrorText } from "@/components/ui/error-text";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Mail, User, Lock, Share2, LogOut } from "lucide-react";
import { Sidebar } from "@/components/common/Sidebar";
import PasswordSettings from "../PasswordSettings";
import EmailSettings from "../EmailSettings";
import SocialsSettings from "../SocialsSettings";

function EditProfileBrand() {
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
    parsedUserInfo ? parsedUserInfo?.BusinessEmail : ""
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

  const [brandTypes, setBrandTypes] = useState([]);
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
    changeBrandType,
    {
      data: changeBrandTypeData,
      error: changeBrandTypeError,
      isLoading: changeBrandTypeLoading,
      isSuccess: changeBrandTypeSuccess,
    },
  ] = useChangeBrandTypeMutation();

  const {
    data: listBrandTypesData,
    error: listBrandTypesError,
    isLoading: listBrandTypesLoading,
  } = useListBrandTypesQuery({});

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
    },
    validationSchema: Yup.object({
      Name: Yup.string().required("Required"),
      PhoneNumber: Yup.string().required("Required"),
      Bio: Yup.string().required("Required"),
      RegNo: Yup.string().required("Required"),
      Address: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      editBrandProfile(values).unwrap();
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/jpg": [],
    },
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
      // @ts-ignore
      toast.error(error?.data?.error);
    }
  }, [data, error]);

  useEffect(() => {
    if (uploadFileError) {
      // @ts-ignore
      toast.error(uploadFileError?.data?.error);
    }
  }, [uploadFileData, uploadFileError]);

  useEffect(() => {
    if (changeProfilePictureSuccess) {
      toast.success("Амжилттай");
    }
    if (changeProfilePictureError) {
      // @ts-ignore
      toast.error(changeProfilePictureError?.data?.error);
    }
  }, [changeProfilePictureData, changeProfilePictureError]);

  useEffect(() => {
    if (changePasswordSuccess) {
      toast.success("Амжилттай");
    }
    if (changePasswordError) {
      // @ts-ignore
      toast.error(changePasswordError?.data?.error);
    }
  }, [changePasswordData, changePasswordError]);

  useEffect(() => {
    if (sendOtpToEmailSuccess) {
      setIsOtpSent(true);
      toast.success("Таны хуучин мэйл рүү нэг удаагийн код илгээгдлээ");
    } else if (sendOtpToEmailError) {
      // @ts-ignore
      toast.error(sendOtpToEmailError?.data?.error);
    }
  }, [sendOtpToEmailSuccess, sendOtpToEmailError]);

  useEffect(() => {
    if (changeEmailSuccess) {
      setIsOtpSent(false);
      toast.success("Имэйл шинэчлэгдлээ");
    } else if (changeEmailError) {
      // @ts-ignore
      toast.error(changeEmailError?.data?.error);
    }
  }, [changeEmailSuccess, changeEmailError]);

  useEffect(() => {
    if (changeBrandTypeSuccess) {
      toast.success("Амжилттай");
    }
    if (changeBrandTypeError) {
      // @ts-ignore
      toast.error(changeBrandTypeError?.data?.error);
    }
  }, [changeBrandTypeSuccess, changeBrandTypeError]);

  useEffect(() => {
    if (parsedUserInfo && parsedUserInfo.BrandTypes) {
      setBrandTypes(parsedUserInfo?.BrandTypes.map((p) => p));
    }
  }, []);

  useEffect(() => {
    if (listBrandTypesData) {
      setAvailableBrandTypes(listBrandTypesData);
    }
  }, [listBrandTypesData]);

  const [availableBrandTypes, setAvailableBrandTypes] = useState([]);

  const handleAddBrandTypes = (value) => {
    setBrandTypes((prev) => {
      if (!prev.some((type) => type.TypeName === value.TypeName)) {
        // Filter out the added brand type from available options
        setAvailableBrandTypes((prevOptions) =>
          prevOptions.filter((option) => option.TypeName !== value.TypeName)
        );
        return [...prev, value];
      }
      return prev;
    });
  };

  const handleRemoveBrandTypes = (value) => {
    setBrandTypes((prev) => {
      const updatedBrandTypes = prev.filter(
        (item) => item.TypeName !== value.TypeName
      );
      return updatedBrandTypes;
    });
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

  const handleBrandTypesChange = () => {
    const brandTypeIds = brandTypes.map(
      (brandType) => brandType.TypeId || brandType.BrandTypeId
    );

    changeBrandType({
      BrandTypeIds: brandTypeIds,
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
                        : "/dummy-brand.png"
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
                      Баталгаажсан брэнд
                    </span>
                    <Image
                      src={"/verified-icon.png"}
                      width={24}
                      height={24}
                      alt=""
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
              <div className="flex flex-col gap-3 w-full">
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
                <ErrorText
                  text={formik.errors.Name}
                  visible={!!formik.touched.Name && !!formik.errors.Name}
                />
              </div>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-3 w-full">
                  <label className="text-[#6F6F6F] text-lg" htmlFor="type">
                    Брэндийн төрөл
                  </label>
                  <div className="relative flex flex-row flex-wrap items-center gap-2">
                    {brandTypes?.map((p, i) => (
                      <div
                        key={i}
                        className="bg-[#4D55F5] text-white text-center text-sm sm:text-lg rounded-full px-3 sm:px-5 py-1 sm:py-2 flex flex-row items-center justify-between gap-2"
                      >
                        {p.TypeName}
                        <button
                          className="rounded-full w-6 h-6 text-center"
                          onClick={() => handleRemoveBrandTypes(p)}
                        >
                          <Image
                            alt="remove"
                            src={"/product-remove-icon.png"}
                            width={24}
                            height={24}
                            className="rounded-full bg-white h-full aspect-square min-h-6 mih-w-6"
                          />
                        </button>
                      </div>
                    ))}

                    <div className="flex flex-row items-center">
                      <div
                        onClick={() => setdropdownOpen(!dropdownOpen)}
                        className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-7 h-7 sm:w-11 sm:h-11 flex items-center justify-center"
                      >
                        <Image
                          alt="add"
                          src={"/plus-icon-black.png"}
                          width={24}
                          height={24}
                          className="aspect-square w-2 h-2 sm:w-3 sm:h-3"
                        />
                      </div>
                      {brandTypes.length > 0 ? (
                        <div
                          onClick={handleBrandTypesChange}
                          className="cursor-pointer outline-none bg-[#F5F4F0] text-xs rounded-lg w-7 h-7 sm:w-11 sm:h-11 flex items-center justify-center"
                        >
                          <Image
                            alt="check"
                            src={"/check-icon.png"}
                            width={16}
                            height={16}
                            className="aspect-square w-3 h-3 sm:w-4 sm:h-4"
                          />
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <div
                      className={`${
                        dropdownOpen &&
                        availableBrandTypes?.filter(
                          (productType) =>
                            !brandTypes.some(
                              (brandType) =>
                                brandType.TypeName === productType.TypeName
                            )
                        ).length > 0
                          ? `top-full opacity-100 visible`
                          : "top-[110%] invisible opacity-0"
                      } absolute left-0 z-40 mt-2 max-w-[300px] flex flex-row gap-2 items-center flex-wrap rounded-lg border-[.5px] border-light bg-white p-2 shadow-card transition-all text-[#273266]`}
                    >
                      {availableBrandTypes
                        ?.filter(
                          (productType) =>
                            !brandTypes.some(
                              (brandType) =>
                                brandType.TypeName === productType.TypeName
                            )
                        )
                        .map((p, i) => (
                          <div
                            onClick={() => handleAddBrandTypes(p)}
                            key={i}
                            className="cursor-pointer bg-[#4D55F5] text-white text-center text-sm rounded-full px-3 py-1"
                          >
                            {p.TypeName}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
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
                <ErrorText
                  text={formik.errors.PhoneNumber}
                  visible={
                    !!formik.touched.PhoneNumber && !!formik.errors.PhoneNumber
                  }
                />
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
                <ErrorText
                  text={formik.errors.Bio}
                  visible={!!formik.touched.Bio && !!formik.errors.Bio}
                />
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
                <ErrorText
                  text={formik.errors.Address}
                  visible={!!formik.touched.Address && !!formik.errors.Address}
                />
              </div>
              <button
                type="submit"
                className="bg-[#4D55F5] rounded-2xl border border-[#2D262D] text-white py-4 font-bold text-base sm:text-xl"
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

export default EditProfileBrand;
