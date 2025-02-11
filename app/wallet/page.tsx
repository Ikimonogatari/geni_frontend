import { cookies } from "next/headers";
import BrandWallet from "./_components/brand/page";
import CreatorWallet from "./_components/creator/page";

export default async function Page() {
  const cookieStore = cookies();
  const userType = cookieStore.get("userType")?.value;

  return (
    <>
      {userType === "Creator" && <CreatorWallet />}
      {userType === "Brand" && <BrandWallet />}
    </>
  );
}
