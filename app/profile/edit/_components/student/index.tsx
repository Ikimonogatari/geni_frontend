"use client";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import { handleLogout } from "@/components/common/logout-function";
import { ErrorText } from "@/components/ui/error-text";
import {
  useChangeEmail,
  useChangePassword,
  useChangeProfilePicture,
  useCreateSocialChannel,
  useEditCreatorProfile,
  useSendOtpToEmail,
  useUpdateSocialChannel,
  useUploadFile,
} from "@/hooks/react-queries";
import Cookies from "js-cookie";
import { useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
function EditProfileStudent() {
  const router = useRouter();

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

  const {
    mutateAsync: editCreatorProfile,
    data,
    error,
    isPending,
    isSuccess,
  } = useEditCreatorProfile();

  const {
    mutateAsync: uploadFile,
    data: uploadFileData,
    error: uploadFileError,
    isPending: uploadFileLoading,
  } = useUploadFile();

  const {
    mutateAsync: changeProfilePicture,
    data: changeProfilePictureData,
    error: changeProfilePictureError,
    isPending: changeProfilePictureLoading,
  } = useChangeProfilePicture();

  const {
    mutateAsync: changePassword,
    data: changePasswordData,
    error: changePasswordError,
    isPending: changePasswordLoading,
  } = useChangePassword();

  const {
    mutateAsync: sendOtpToEmail,
    data: sendOtpToEmailData,
    error: sendOtpToEmailError,
    isPending: sendOtpToEmailLoading,
    isSuccess: sendOtpToEmailSuccess,
  } = useSendOtpToEmail();

  const {
    mutateAsync: changeEmail,
    data: changeEmailData,
    error: changeEmailError,
    isPending: changeEmailLoading,
    isSuccess: changeEmailSuccess,
  } = useChangeEmail();

  const {
    mutateAsync: updateSocialChannel,
    data: updateSocialChannelData,
    error: updateSocialChannelError,
    isPending: updateSocialChannelLoading,
  } = useUpdateSocialChannel();

  const {
    mutateAsync: createSocialChannel,
    data: createSocialChannelData,
    error: createSocialChannelError,
    isPending: createSocialChannelLoading,
  } = useCreateSocialChannel();

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
      editCreatorProfile({ variables: values });
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
              variables: {
                FileId: id,
              },
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
        variables: {
          OldPassword: oldPassword,
          NewPassword: newPassword,
        },
      });
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
            variables: {
              PlatformId: 2,
              SocialAddress: socials.instagram,
            },
          });
        } else {
          await createSocialChannel({
            variables: {
              PlatformId: 2,
              SocialAddress: socials.instagram,
            },
          });
        }
      }

      if (socials.facebook.trim() !== "") {
        const hasExistingFacebook = parsedUserInfo?.SocialChannels?.some(
          (channel) => channel.PlatformId === 1
        );

        if (hasExistingFacebook) {
          await updateSocialChannel({
            variables: {
              PlatformId: 1,
              SocialAddress: socials.facebook,
            },
          });
        } else {
          await createSocialChannel({
            variables: {
              PlatformId: 1,
              SocialAddress: socials.facebook,
            },
          });
        }
      }

      toast.success("Амжилттай хадгаллаа");
    } catch (err) {
      toast.error("Алдаа гарлаа");
    }
  };

  const handleSendOtp = async () => {
    sendOtpToEmail({
      variables: {
        To: newEmail,
        UserType: userType, //Sys, Brand, Creator
        Channel: "smtp", //smtp, sms
        Type: "changeemail",
      },
    });
  };

  const handleChangeEmail = () => {
    changeEmail({
      variables: {
        OTP: otp,
        NewEmail: newEmail,
      },
    });
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
                visible={!!formik.touched.Nickname && !!formik.errors.Nickname}
              />
            </div>
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
                  className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
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
                    className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
                  >
                    Мэйл солих
                  </div>
                </div>
              </div>
            )}

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
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label
                  className="text-[#6F6F6F] text-lg"
                  htmlFor="SocialChannels"
                >
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
                          setSocials({ ...socials, instagram: e.target.value })
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
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="oldPassword">
                Хуучин нууц үг
              </label>
              <div className="flex flex-row justify-between items-center w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl">
                <input
                  id="oldPassword"
                  name="oldPassword"
                  type={showOldPassword ? "text" : "password"}
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  className="outline-none w-full bg-inherit"
                />
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
                    className="w-6 h-6"
                  />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="newPassword">
                Шинэ нууц үг
              </label>
              <div className="flex flex-row gap-5 items-center w-full">
                <div className="w-1/2 p-3 sm:p-4 bg-[#F5F4F0] rounded-lg border text-base sm:text-xl flex flex-row items-center justify-between">
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
                    className="outline-none bg-inherit"
                  />
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
                      className="w-6 h-6"
                    />
                  </button>
                </div>
                <div
                  onClick={handleChangePassword}
                  className="cursor-pointer py-4 w-1/3 sm:w-[128px] text-center bg-[#F5F4F0] rounded-lg text-sm sm:text-xl border border-[#2D262D]"
                >
                  Өөрчлөх
                </div>
              </div>
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
                visible={!!formik.touched.Location && !!formik.errors.Location}
              />
            </div>
            <button
              type="submit"
              className="bg-[#4FB755] rounded-2xl border border-[#2D262D] text-white py-4 font-bold text-base sm:text-xl"
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
              className="w-5 h-5 sm:w-6 sm:h-6"
              alt=""
            />
            Гарах
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfileStudent;
