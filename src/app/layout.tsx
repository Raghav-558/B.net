import type { Metadata } from "next";
import "./globals.css";
import Preloader from "@/components/common/PreLoader";

export const metadata: Metadata = {
  title: "Mobile App",
  description: "Welcome back! Please enter your details.",
  openGraph: {
    title: "Mobile App",
    description: "Welcome back! Please enter your details.",
    images: ["/meta-tag.png"],
  },
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
