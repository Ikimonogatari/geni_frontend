"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { UserInfoProvider } from "./context/UserInfoContext";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>
    <Toaster
      toastOptions={{
        className: "text-lg",
      }}
      position="top-right"
      reverseOrder={false}
    />
    <UserInfoProvider>
      <Suspense fallback={<Loader />}>
        <div className="flex flex-col min-h-screen h-full">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </Suspense>
    </UserInfoProvider>
  </Provider>
);

export default Layout;
