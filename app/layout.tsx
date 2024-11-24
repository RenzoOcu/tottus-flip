import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider,} from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
//error 2

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Admin RenzoOcupa",
  description: "aplicacion web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={outfit.className}>

          <NextTopLoader color="#000" />
          {children}
          <Toaster/>
          
        </body>
      </html>
    </ClerkProvider>
  );
}