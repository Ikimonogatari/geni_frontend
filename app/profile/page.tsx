import { cookies } from "next/headers";
import BrandProfile from "./_components/brand/profile";
import CreatorProfile from "./_components/creator/profile";
import StudentProfile from "./_components/student/profile";

export default async function Page() {
  const cookieStore = cookies();
  const userType = cookieStore.get("userType")?.value;

  return (
    <>
      {userType === "Student" && <StudentProfile />}
      {userType === "Creator" && <CreatorProfile />}
      {userType === "Brand" && <BrandProfile />}
    </>
  );
}
