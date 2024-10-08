import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100','300', '400', '500', '700'],
});

export const metadata: Metadata = {
  title: "StreamingPlatform",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} text-white`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
