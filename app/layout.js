import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Head from "next/head";

export const metadata = {
  title: "Geni",
  description: "Geni",
};
import "/public/fonts/font/stylesheet.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta property="og:image" content="/meta-logo.png" />
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
