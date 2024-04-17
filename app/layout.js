import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GENI",
  description: "GENI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>GENI</title>
      </Head>
      <body className={inter.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
