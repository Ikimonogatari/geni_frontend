"use client";
import BrandProfile from "./_components/brand/profile";
import CreatorProfile from "./_components/creator/profile";
import StudentProfile from "./_components/student/profile";
import { redirect } from "next/navigation";
import { useGetUserInfoQuery } from "../services/service";
import Loader from "@/components/common/Loader";

export default function Page() {
  // @ts-ignore
  const {
    data: userInfo,
    isLoading,
    error,
    refetch: refetchUserInfo,
  } = useGetUserInfoQuery({ refetchOnMountOrArgChange: true });
  if (isLoading) {
    return <Loader />;
  }

  if (
    (userInfo?.UserType === "Student" &&
      (!userInfo?.Nickname ||
        !userInfo?.LastName ||
        !userInfo?.FirstName ||
        !userInfo?.Bio ||
        !userInfo?.RegNo ||
        !userInfo?.PhoneNumber ||
        !userInfo?.Birthday ||
        !userInfo?.Gender)) ||
    (userInfo?.UserType === "Brand" &&
      userInfo?.IsVerified === false &&
      userInfo?.OnBoardingStatus === "New")
  ) {
    redirect("/onboarding");
  }

  return (
    <>
      {userInfo?.UserType === "Student" && (
        <StudentProfile
          getUserInfoData={userInfo}
          getUserInfoLoading={isLoading}
        />
      )}
      {userInfo?.UserType === "Creator" && (
        <CreatorProfile
          getUserInfoData={userInfo}
          getUserInfoLoading={isLoading}
        />
      )}
      {userInfo?.UserType === "Brand" && (
        <BrandProfile
          getUserInfoData={userInfo}
          getUserInfoLoading={isLoading}
          refetchUserInfo={refetchUserInfo}
        />
      )}
    </>
  );
}
