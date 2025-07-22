"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { UserInfoProvider } from "./context/UserInfoContext";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import { Navbar  } from "@/components/layout/navbar";
import { SideNavbar } from "@/components/layout/side-navbar";
import Footer from "@/components/layout/footer";
import { WebSocketProvider } from "./context/WebsocketProvider";
import Cookies from "js-cookie";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const userType = Cookies.get("userType");

  const renderContent = () => {
    if (userType === "Brand") {
      return (
        <div className="flex min-h-screen h-full">
          <SideNavbar />
          <main className="flex-grow">{children}</main>
          {/* <Footer /> */}
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
