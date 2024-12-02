import { ClerkProvider } from "@clerk/nextjs";

import localFont from "next/font/local";
import "./globals.css";

import { Metadata } from "next";

import  ToasterProvider  from "@/components/toaster-provider";

import CrispProvider from "@/components/CrispProvider";

export const metadata: Metadata = {
  title: "Synthify",
  description: "AI Platform",
};

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <CrispProvider />
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ToasterProvider />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
