import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from 'next-auth';
import SessionProvider from '../components/SessionProvider'
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Trader",
  description: "Track and review stock trades systematically",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession()
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
