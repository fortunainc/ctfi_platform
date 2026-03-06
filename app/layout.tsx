import type { Metadata } from "next";
import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BehindTheProtocol - Where Clinical Trial Operators Tell the Truth",
  description: "Anonymous operational intelligence network for clinical trial operators. Get real answers, share experiences, and navigate the field safely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}