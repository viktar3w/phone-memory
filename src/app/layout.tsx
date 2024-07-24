import { ReactNode } from "react";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";
import DefaultNavbar from "@/components/navbar/DefaultNavbar";
import DefaultFooter from "@/components/footer/DefaultFooter";
import { Toaster } from "@/components/ui/toaster";
import DefaultProvider from "@/components/providers/DefaultProvider";
import { constructMetadata } from "@/lib/utils";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={recursive.className}>
        <DefaultProvider>
          <DefaultNavbar />
          <main className="grainy-light flex flex-col min-h-[calc(100vh-3.5rem-1px)]">
            <div className="flex h-full flex-1 flex-col">{children}</div>
            <DefaultFooter />
          </main>
          <Toaster />
        </DefaultProvider>
      </body>
    </html>
  );
}
