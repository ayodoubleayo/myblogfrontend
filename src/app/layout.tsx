// src/app/layout.tsx
import "./globals.css";
import React from "react";
import ClientWrapper from "./ClientWrapper";
import Link from "next/link";
import Nav from "../components/Nav";


export const metadata = {
  title: "DevJourney by Ayo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#f5f5f7] text-gray-900">
        <ClientWrapper>
          {/* Navbar */}
       <Nav />


          {/* Main content */}
          <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
}
