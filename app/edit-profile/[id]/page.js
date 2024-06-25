"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import GraphCMSImageLoader from "@/app/components/GraphCMSImageLoader";

function Page() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments.pop();

  const router = useRouter();

  const [creatorData, setCreatorData] = useState([]);
  const [reviewData, setReviewData] = useState(null);
  const [getReviewBrand, setReviewBrand] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const r = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/Items/creator?sort=sort,-date_created&fields=*,Category.*.*,review.*.*,brand.*.*,content.*.*&filter=%7B%22status%22:%7B%22_eq%22:%22published%22%7D%7D`
        );
        const d = await r.json();
        const c = d.data.find((item) => item.id === id);

        setCreatorData(c);
        console.log(c);
        if (c.review) {
          const reviewData = c.review.find((item) => item.isFeatured === true);
          setReviewData(reviewData);
          const reviewBrand =
            await fetch(`${process.env.NEXT_PUBLIC_URL}/Items/brand?filter=%7B%22id%22:%7B%22_eq%22:%22${c?.reviewBrand?.brand?.key}%22%7D%7D
        `);
          const brand = reviewBrand.json();
          console.log(reviewBrand);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const formik = useFormik({
    initialValues: {
      name: "",
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      bio: "",
      instagram: "",
      facebook: "",
      password: "",
      address: "",
      files: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const [contentTypeOption, setContentTypeOption] = useState("");
  const [contentOutcomeOption, setContentOutcomeOption] = useState("");

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
              <Image
                src={creatorData ? creatorData.image : null}
                loader={GraphCMSImageLoader}
                width={194}
                height={194}
                loading="lazy"
                className="rounded-xl"
                alt="creator"
              />
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
                  placeholder={creatorData ? creatorData.name : ""}
                  className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </div>
                ) : null}
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
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full sm:w-1/2">
              <label className="text-[#6F6F6F] text-lg" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.username}
                </div>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="email">
                Email
              </label>
              <div className="flex flex-row gap-4 w-full">
                <div className="flex flex-col gap-3 w-1/2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.email}
                    </div>
                  ) : null}
                </div>
                <button className="bg-[#F5F4F0] w-[158px] text-center rounded-lg border border-[#2D262D] py-4 text-xl">
                  Change
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full sm:w-1/2">
              <label className="text-[#6F6F6F] text-lg" htmlFor="bio">
                Bio
              </label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Bio"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bio}
                rows={4} // Adjust the number of rows as needed
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl" // You can adjust other styles as needed
              />
              {formik.touched.bio && formik.errors.bio ? (
                <div className="text-red-500 text-sm">{formik.errors.bio}</div>
              ) : null}
            </div>
            <div className="flex flex-row gap-4 w-full">
              <div className="flex flex-col gap-3 w-full">
                <label className="text-[#6F6F6F] text-lg" htmlFor="firstName">
                  Social channels
                </label>
                <div className="flex flex-row gap-4 w-full">
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
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.instagram}
                        className="bg-transparent outline-none"
                      />
                    </div>
                    {formik.touched.instagram && formik.errors.instagram ? (
                      <div className="text-red-500 text-sm">
                        {formik.errors.instagram}
                      </div>
                    ) : null}
                  </div>
                  <button className="bg-[#F5F4F0] w-[158px] text-center rounded-lg border border-[#2D262D] py-4 text-xl">
                    Add channel
                  </button>
                </div>
                <div className="flex flex-col gap-3 w-1/2">
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
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.facebook}
                      className="bg-transparent outline-none"
                    />
                  </div>
                  {formik.touched.facebook && formik.errors.facebook ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.facebook}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="password">
                Password
              </label>
              <div className=" flex flex-row gap-4 w-full">
                <div className="flex flex-col gap-3 w-1/2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    className="p-4 bg-[#F5F4F0] rounded-lg border text-xl"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button className="bg-[#F5F4F0] w-[158px] text-center rounded-lg border border-[#2D262D] py-4 text-xl">
                  Change
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label className="text-[#6F6F6F] text-lg" htmlFor="name">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                placeholder=""
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                rows={4} // Adjust the number of rows as needed
                className="p-4 bg-[#F5F4F0] rounded-lg border text-xl" // You can adjust other styles as needed
              />
              {formik.touched.address && formik.errors.address ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.address}
                </div>
              ) : null}
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
