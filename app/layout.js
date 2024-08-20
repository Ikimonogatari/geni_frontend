"use client";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Head from "next/head";

import "/public/fonts/font/stylesheet.css";
import { store } from "./store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:image" content="/meta-logo.png" />
        <Head>
          <title>GENI</title>
        </Head>
        <body className="bg-white text-[#2D262D]">
          <Toaster
            toastOptions={{
              className: "text-lg",
            }}
            position="top-right"
            reverseOrder="false"
          />
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </Provider>
  );
}
