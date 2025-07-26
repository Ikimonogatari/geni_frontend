import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const DashboardPage = () => {
  const router = useRouter();

  useEffect(() => {
    const userType = Cookies.get("userType");
    if (!userType) {
      router.push("/login");
    }
    if (userType !== "Brand") {
      router.push("/profile");
    }
  }, []);

  return <div>DashboardPage</div>;
};

export default DashboardPage;
