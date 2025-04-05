import "./globals.css";

import localFont from "next/font/local";
import Layout from "./rootLayout";
import "/public/fonts/font/stylesheet.css";

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
    <html lang="en" className={mabryPro.className}>
      <body className="bg-white text-[#2D262D] min-h-screen">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
