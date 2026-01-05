import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BackToTop } from "@/components/BackToTop";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: {
    default: site.name,
    template: `%s · ${site.name}`,
  },
  description: site.tagline,
  keywords: [
    "cybersecurity",
    "red team",
    "penetration testing",
    "offensive security",
    "security researcher",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: site.name,
    description: site.tagline,
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-dvh flex flex-col">
          <SiteHeader />
          <main className="mx-auto w-full max-w-6xl px-5 py-12 sm:py-14 flex-1">
            {children}
          </main>
          <SiteFooter />
          <BackToTop />
        </div>
      </body>
    </html>
  );
}
