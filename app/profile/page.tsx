import { cookies } from "next/headers";
import BrandProfile from "./_components/brand/profile";
import CreatorProfile from "./_components/creator/profile";
import StudentProfile from "./_components/student/profile";
import { redirect } from "next/navigation";

export default async function Page() {
  const cookieStore = cookies();
  const userType = cookieStore.get("userType")?.value;
  const userInfo = cookieStore.get("user-info")?.value;
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  if (
    (userType === "Brand" || userType === "Creator") &&
    !parsedUserInfo?.IsVerified &&
    parsedUserInfo?.OnBoardingStatus == "New"
  ) {
    return redirect("/onboarding");
  }

  return (
    <>
      {userType === "Student" && <StudentProfile />}
      {userType === "Creator" && <CreatorProfile />}
      {userType === "Brand" && <BrandProfile />}
    </>
  );
}
