import "./globals.css";
<<<<<<< HEAD:app/layout.tsx
import Head from "next/head";
import localFont from "next/font/local";
=======
>>>>>>> 7a0d8c0b4180b788d8c7b5ae03b8fdd94940af41:app/layout.js

import localFont from "next/font/local";
import Layout from "./rootLayout";
import "/public/fonts/font/stylesheet.css";
<<<<<<< HEAD:app/layout.tsx
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { UserInfoProvider } from "./context/UserInfoContext";
import { Suspense } from "react";
import Loader from "@/components/common/Loader";
import { Navbar } from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
=======
>>>>>>> 7a0d8c0b4180b788d8c7b5ae03b8fdd94940af41:app/layout.js

const mabryPro = localFont({
  src: [
    {
      path: "../public/fonts/font/MabryPro-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/font/MabryPro-Medium.ttf",
      weight: "500",
    },
    {
      path: "../public/fonts/font/MabryPro-Bold.ttf",
      weight: "700",
    },
  ],
  display: "swap",
  variable: "--font-mabry-pro",
});

export const metadata = {
  title: "Geni Platform",
  description: "Geni Platform",
  metadataBase: new URL("https://www.geni.mn/"),
};

export default function RootLayout({ children }) {
  return (
<<<<<<< HEAD:app/layout.tsx
    <Provider store={store}>
      <html lang="en" className={mabryPro.className}>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:image" content="/meta-logo.png" />
        <Head>
          <title>GENI</title>
        </Head>
        <body className="bg-white text-[#2D262D] min-h-screen">
          <Toaster
            toastOptions={{
              className: "text-lg",
            }}
            position="top-right"
            reverseOrder={false}
          />
          <UserInfoProvider>
            <Suspense fallback={<Loader />}>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </Suspense>
          </UserInfoProvider>
        </body>
      </html>
    </Provider>
=======
    <html lang="en" className={mabryPro.className}>
      <body className="bg-white text-[#2D262D] min-h-screen">
        <Layout>{children}</Layout>
      </body>
    </html>
>>>>>>> 7a0d8c0b4180b788d8c7b5ae03b8fdd94940af41:app/layout.js
  );
}
