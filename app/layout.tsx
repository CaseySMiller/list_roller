import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeModeScript, CustomFlowbiteTheme, Flowbite } from "flowbite-react";
import { useState } from "react";

import customTheme from "./lib/customTheme";
import CustomNav from "./components/CustomNav/CustomNav";
import CustomFooter from "./components/CustomFooter/CustomFooter";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "List Roller",
  description: "A simple web app to randomly select an item from a list.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const customFlowbiteTheme: CustomFlowbiteTheme = customTheme;


  return (
    <html lang="en">
      <head>
        <ThemeModeScript />
      </head>
      <Flowbite theme={{ theme: customFlowbiteTheme }}>
        <body className={`dark ${inter.className}`}>
          <CustomNav />
          <main className="footer-v-spacer">{children}</main>
          <CustomFooter />
        </body>
      </Flowbite>
    </html>
  );
}
