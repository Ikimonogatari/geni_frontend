import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Head from "next/head";

export const metadata = {
  title: "GENI",
  description: "GENI",
};
import "/public/fonts/font/stylesheet.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>GENI</title>
      </Head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
