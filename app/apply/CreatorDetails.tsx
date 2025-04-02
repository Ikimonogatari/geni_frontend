"use client";
import React from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

function CreatorDetails({ formik }) {
  return (
    <div className="flex flex-col w-full gap-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 items-start gap-4 w-full">
        <Input
          id="FirstName"
          name="FirstName"
          type="text"
          className="text-sm sm:text-xl bg-primary-bg"
          wrapperClassName="col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Нэр"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.FirstName}
          errorText={formik.errors.FirstName}
          errorVisible={formik.touched.FirstName && formik.errors.FirstName}
        />
        <Input
          id="LastName"
          name="LastName"
          type="text"
          className="text-sm sm:text-xl bg-primary-bg"
          wrapperClassName="col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Овог"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.LastName}
          errorText={formik.errors.LastName}
          errorVisible={formik.touched.LastName && formik.errors.LastName}
        />
        <Input
          id="Nickname"
          name="Nickname"
          type="text"
          className="text-sm sm:text-xl bg-primary-bg"
          wrapperClassName="col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Хэрэглэгчийн нэр"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Nickname}
          errorText={formik.errors.Nickname}
          errorVisible={formik.touched.Nickname && formik.errors.Nickname}
        />
        <Input
          id="Email"
          name="Email"
          type="mail"
          className="text-sm sm:text-xl bg-primary-bg"
          wrapperClassName="col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Имэйл хаяг"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.Email}
          errorText={formik.errors.Email}
          errorVisible={formik.touched.Email && formik.errors.Email}
        />
        <Input
          id="PhoneNo"
          name="PhoneNo"
          type="PhoneNo"
          className="text-sm sm:text-xl no-spinner bg-primary-bg"
          wrapperClassName="col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Утасны дугаар"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.PhoneNo}
          errorText={formik.errors.PhoneNo}
          errorVisible={formik.touched.PhoneNo && formik.errors.PhoneNo}
        />
        <Input
          id="Birthday"
          name="Birthday"
          type="date"
          className="text-sm sm:text-xl w-full col-span-1 no-spinner bg-primary-bg h-5"
          wrapperClassName="w-full col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Төрсөн огноо"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={
            formik.values.Birthday &&
            formik.values.Birthday !== "0001-01-01T00:00:00Z"
              ? formik.values.Birthday
              : new Date().toISOString().split("T")[0]
          }
          errorText={formik.errors.Birthday}
          errorVisible={formik.touched.Birthday && formik.errors.Birthday}
        />
        <Input
          id="FacebookLink"
          name="FacebookLink"
          type="text"
          className="text-sm sm:text-xl w-full col-span-1 no-spinner bg-primary-bg"
          wrapperClassName="w-full col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Фэйсбүүк хаяг"
          leftSection={
            <Image
              src={"/Facebook.png"}
              width={24}
              height={24}
              alt=""
              className="w-6 h-6"
            />
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.FacebookLink}
          errorText={formik.errors.FacebookLink}
          errorVisible={
            formik.touched.FacebookLink && formik.errors.FacebookLink
          }
        />
        <Input
          id="InstagramLink"
          name="InstagramLink"
          type="text"
          className="text-sm sm:text-xl w-full col-span-1 no-spinner bg-primary-bg"
          wrapperClassName="w-full col-span-1"
          labelClassName="text-[#6F6F6F] text-base sm:text-lg font-normal"
          layoutClassName="h-full p-4 sm:p-5 w-full bg-primary-bg"
          label="Инстаграм хаяг"
          leftSection={
            <Image
              src={"/Instagram.png"}
              width={24}
              height={24}
              alt=""
              className="w-6 h-6"
            />
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.InstagramLink}
          errorText={formik.errors.InstagramLink}
          errorVisible={
            formik.touched.InstagramLink && formik.errors.InstagramLink
          }
        />
      </div>
    </div>
  );
}

export default CreatorDetails;
