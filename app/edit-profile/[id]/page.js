"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import GraphCMSImageLoader from "@/app/components/GraphCMSImageLoader";
import { useEditCreatorProfileMutation } from "@/app/services/service";

function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments.pop();
  const router = useRouter();

  const [creatorData, setCreatorData] = useState(null);
  const [editCreatorProfile, { data, error, isLoading }] =
    useEditCreatorProfileMutation();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      nickName: "",
      email: "",
      bio: "",
      RegNo: "123456129",
      PhoneNumber: "+1234567890",
      AdditionalPhoneNum: "",
      location: "",
      EbarimtConsumerNo: "987654321",
      Birthday: "1990-01-01",
      EduId: 3,
      Gender: "M",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        await editCreatorProfile(values).unwrap();
        alert("Profile updated successfully");
      } catch (err) {
        alert("Failed to update profile");
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

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-32 mb-12">
        <div className="max-w-4xl min-h-screen mx-auto px-7 py-11 container">
          <button
            onClick={() => router.back()}
            className="w-14 h-14 bg-[#F5F4F0] rounded-lg p-4"
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
              {creatorData?.image ? (
                <Image
                  src={creatorData ? creatorData.image : null}
                  loader={GraphCMSImageLoader}
                  width={194}
                  height={194}
                  loading="lazy"
                  className="rounded-xl"
                  alt="creator"
                />
              ) : (
                <></>
              )}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center gap-3">
                  <span className="text-lg">Creator point: &nbsp; 1020 xp</span>
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
                <button className="mt-2 py-3 text-center bg-[#CA7FFE] border border-[#2D262D] rounded-lg text-white text-xl font-bold">
                  Change picture
                </button>
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
              <label className="text-[#6F6F6F] text-lg" htmlFor="nickName">
                Nickname
              </label>
              <input
                id="nickName"
                name="nickName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nickName}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.nickName && formik.errors.nickName && (
                <div className="text-red-500 text-sm">
                  {formik.errors.nickName}
                </div>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              )}
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
