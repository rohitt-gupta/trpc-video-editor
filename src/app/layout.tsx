import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
