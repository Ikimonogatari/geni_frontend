import { cookies } from "next/headers";
import BrandOnboarding from "./_components/brand/page";
import StudentOnboarding from "./_components/student/page";

export default async function Page() {
  const cookieStore = cookies();
  const userType = cookieStore.get("userType")?.value;

  return (
    <>
      {userType === "Brand" && <BrandOnboarding />}
      {userType === "Student" && <StudentOnboarding />}
    </>
  );
}
