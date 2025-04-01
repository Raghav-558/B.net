import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/common/Header";
import Preloader from "@/components/common/PreLoader";

export const metadata: Metadata = {
  title: "Mobile App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> 
        <Preloader />
        {children}
      </body>
    </html>
  );
}
