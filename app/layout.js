import { validateRequest } from "@/validate-request";
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

export default async function RootLayout({ children, entries, data }) {
  const { user } = await validateRequest();

  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main className="p-2 flex h-screen flex-col justify-between space-y-4">
          <Header />
          {children}
          {user && (
            <div className="space-y-4">
              {entries}
              {data}
            </div>
          )}
          <Footer />
        </main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
