import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import React from "react";

import { Providers } from "./providers";

import { siteConfig } from "@/src/config/site";
import { fontSans } from "@/src/config/fonts";
import ToastProvider from "@/src/components/toast/toastProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
        suppressHydrationWarning={true}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen">
            {/* <Navbar /> */}
            <main className="w-full flex-grow">
              <ToastProvider>{children}</ToastProvider>
            </main>
            {/* <footer className="w-full flex items-center justify-center py-3">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://nextui-docs-v2.vercel.app?utm_source=next-app-template"
                title="nextui.org homepage"
              >
                <span className="text-default-600">Powered by</span>
                <p className="text-primary">NextUI</p>
              </Link>
            </footer> */}
          </div>
        </Providers>
      </body>
    </html>
  );
}
