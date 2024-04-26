export const revalidate = 10;
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/providers/toaster-provider";
import { AuthProvider } from "@/store/authContext";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tradewise- A financial services platform",
  description:
    "Tradewise is growing financial services platform where users can find their investment solutions pertaining to mutual funds, stocks, US Stocks, ETFs, IPO, and F&Os, to invest their money without hassles.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={roboto.className}>
          <ToastProvider />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
