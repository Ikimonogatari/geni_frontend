import { cookies } from "next/headers";
import EditProfileStudent from "./_components/student";
import EditProfileCreator from "./_components/creator";
import EditProfileBrand from "./_components/brand";

export default async function Page() {
  const cookieStore = cookies();
  const userType = cookieStore.get("userType")?.value;

  return (
    <>
      {userType === "Student" && <EditProfileStudent />}
      {userType === "Creator" && <EditProfileCreator />}
      {userType === "Brand" && <EditProfileBrand />}
    </>
  );
}
