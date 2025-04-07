"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import BackButton from "@/components/common/BackButton";
import Image from "next/image";
import CreatorDetails from "./CreatorDetails";
import { useCreatorApplyMutation } from "@/app/services/service";
import CreatorQuestions from "./CreatorQuestions";
import UploadSampleContent from "./UploadSampleContent";
import SuccessModal from "@/components/common/SuccessModal";
import { addCreatorDetailsSchema } from "./schema";
import { useRouter } from "next/navigation";

function CreatorOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const sidebarNavs = ["Ерөнхий мэдээлэл", "Асуулт", "Контент нэмэх"];

  const [creatorApply, { data, error, isLoading, isSuccess }] =
    useCreatorApplyMutation();

  useEffect(() => {
    if (error) {
      // @ts-ignore
      toast.error(error?.data?.error);
    }
    if (isSuccess) {
      toast.success("Мэдээлэл засагдлаа");
      setIsSuccessModalOpen(true);
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: {
      FirstName: "",
      LastName: "",
      Nickname: "",
      Email: "",
      PhoneNo: "",
      Birthday: "",
      FacebookLink: "",
      InstagramLink: "",
      WorkInfo: "",
      EssentialToolInfo: "",
      ApplicationPurpose: "",
      ContentLink: "",
      ContentFileId: null,
    },
    validationSchema: addCreatorDetailsSchema,
    onSubmit: async (values) => {
      try {
        await creatorApply({
          ...values,
        }).unwrap();
      } catch (error) {
        toast.error("Алдаа гарлаа");
      }
    },
  });
  console.log(formik.errors, "ERRORS");
  const renderStepContent = () => {
    switch (step) {
      case 0:
        return <CreatorDetails formik={formik} />;
      case 1:
        return <CreatorQuestions formik={formik} />;
      case 2:
        return <UploadSampleContent formik={formik} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <div className="mt-24 sm:mt-36 mb-12">
        <div className="max-w-5xl min-h-screen mx-auto sm:px-14 py-5 sm:py-11 container">
          <BackButton />
          <div className="flex flex-row justify-between items-center gap-5 my-7 w-full">
            <p className="text-xl sm:text-3xl xl:text-4xl font-bold">
              Geni Creator болох өргөдөл
            </p>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col sm:flex-row items-start gap-5 sm:gap-10"
          >
            <div className="grid grid-cols-3 sm:grid-cols-1 gap-2 sm:min-w-[215px] sm:max-w-[215px] w-full">
              {sidebarNavs.map((s, i) => (
                <div
                  key={i}
                  className={`${
                    i === step
                      ? "border border-primary text-primary"
                      : "border border-white text-[#6F6F6F]"
                  } transition-all duration-150 col-span-1 w-full rounded-lg p-2 flex flex-col sm:flex-row items-center gap-1 sm:gap-3`}
                  onClick={() => setStep(i)}
                >
                  <Image
                    src={`/creator-onboarding-icon${i + 1}.png`}
                    width={24}
                    height={24}
                    className="w-6 h-6 aspect-square"
                    alt=""
                  />
                  <span className="text-xs sm:text-lg text-center whitespace-normal sm:whitespace-nowrap">
                    {s}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row flex-grow items-start gap-5 sm:gap-10">
              <div className="border-t-[1px] border-l-0 sm:border-t-0 sm:border-l-[1px] pt-5 sm:pl-10 border-[#CDCDCD]">
                {renderStepContent()}
              </div>
            </div>
          </form>
        </div>
      </div>
      <SuccessModal
        isSuccessDialogOpen={isSuccessModalOpen}
        setIsSuccessDialogOpen={setIsSuccessModalOpen}
        modalImage="/creator-image.png"
        modalTitle="ӨРГӨДӨЛ АМЖИЛТТАЙ ИЛГЭЭГДЛЭЭ"
        context={
          <div className="flex flex-col gap-3">
          <span className="bg-primary-bg text-base sm:text-xl rounded-2xl p-3 sm:p-4">
            Өргөдөлийн хариу 24-48 цагын хугацаанд таны бүртгүүлсэн имэйл
              хаягаар очих тул түр хүлээгээрэй. Амжилт хүсье!
            </span>
            <button
            onClick={() => router.push("/creator")}
            className="w-full py-4 text-white font-semibold bg-geni-pink text-xl sm:text-2xl border border-[#2D262D] rounded-2xl"
          >
            Баярлалаа
          </button>
          </div>
        }
        imageClassName="w-[207px] h-[216px]"
      />
    </div>
  );
}

export default CreatorOnboarding;
