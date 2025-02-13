import { cookies } from "next/headers";
import BrandOnboarding from "./_components/brand/page";

export default async function Page() {
  const cookieStore = cookies();
  const userType = cookieStore.get("userType")?.value;
  const userInfo = cookieStore.get("user-info")?.value;
  const parsedUserInfo = userInfo ? JSON.parse(userInfo) : null;

  return (
    <>
      {userType === "Creator" && <></>}
      {userType === "Brand" && <BrandOnboarding />}
    </>
  );
}
