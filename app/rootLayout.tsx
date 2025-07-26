"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { UserInfoProvider } from "./context/UserInfoContext";
import { Suspense, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import { Navbar } from "@/components/layout/navbar";
import { SideNavbar } from "@/components/layout/side-navbar";
import Footer from "@/components/layout/footer";
import { WebSocketProvider } from "./context/WebsocketProvider";
import Cookies from "js-cookie";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [userType, setUserType] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const cookieUserType = Cookies.get("userType");
    setUserType(cookieUserType || null);
  }, []);

  const renderContent = () => {
    // Show loading state during hydration to prevent mismatch
    if (!isClient || !userType) {
      return (
        <div className="flex min-h-screen h-full">
          <div className="flex-grow">
            <main>{children}</main>
          </div>
        </div>
      );
    }
    if (userType === "Brand") {
      return (
        <div className="flex min-h-screen h-full">
          <SideNavbar />
          <main className="flex-grow lg:ml-72 pt-16 lg:pt-0">{children}</main>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen h-full">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );
  };
  return (
    <Provider store={store}>
      <Toaster
        toastOptions={{
          className: "text-lg",
        }}
        position="top-right"
        reverseOrder={false}
      />
      <UserInfoProvider>
        <WebSocketProvider>
          <Suspense fallback={<Loader />}>{renderContent()}</Suspense>
        </WebSocketProvider>
      </UserInfoProvider>
    </Provider>
  );
};

export default Layout;
