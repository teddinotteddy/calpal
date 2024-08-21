import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { GeistSans } from "geist/font/sans";
import Header from "./components/header";
import Footer from "./components/footer";
import "./globals.css";

export const metadata = {
  title: "Home | CalPal",
  description: "Track your macros.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main className="p-2 flex h-screen flex-col justify-between space-y-4">
          <Header />
          {children}
          <Footer />
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
