import "./globals.css";

import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NEXT_PUBLIC_SITE_DOMAIN = "postalcodes.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "Sri Lankan Postal Codes",
    template: "%s | Sri Lankan Postal Codes",
  },
  description: "Find postal codes for locations across Sri Lanka easily.",
  applicationName: "Sri Lankan Postal Codes",
  keywords: [
    "Sri Lanka",
    "Postal Codes",
    "Zip Codes",
    "Sri Lankan Addresses",
    "Location Finder",
    "Address Lookup",
    "Postal Code Directory",
    "Sri Lanka Postal System",
    "City Postal Codes",
    "Area Postal Codes",
  ],
  openGraph: {
    title: "Sri Lankan Postal Codes",
    description: "Find postal codes for locations across Sri Lanka easily.",
    url: `https://${NEXT_PUBLIC_SITE_DOMAIN}`,
    siteName: "Sri Lankan Postal Codes",
    images: [
      {
        url: `https://${NEXT_PUBLIC_SITE_DOMAIN}/images/og.png`,
        width: 1200,
        height: 630,
        alt: "Sri Lankan Postal Codes",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sri Lankan Postal Codes",
    description: "Find postal codes for locations across Sri Lanka easily.",
    images: [`https://${NEXT_PUBLIC_SITE_DOMAIN}/images/og.png`],
    creator: "@sivothajan",
  },

  alternates: {
    canonical: `https://${NEXT_PUBLIC_SITE_DOMAIN}`,
    languages: {
      "en-US": `https://${NEXT_PUBLIC_SITE_DOMAIN}`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },

  appleWebApp: {
    capable: true,
    title: "Sri Lankan Postal Codes",
    startupImage: "/favicon/apple-touch-icon.png",
    statusBarStyle: "default",
  },

  manifest: "/favicon/site.webmanifest",

  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-42x42.png", sizes: "42x42", type: "image/png" },
      { url: "/favicon/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      {
        url: "/favicon/favicon-16x16.webp",
        sizes: "16x16",
        type: "image/webp",
      },
      {
        url: "/favicon/favicon-32x32.webp",
        sizes: "32x32",
        type: "image/webp",
      },
      {
        url: "/favicon/favicon-42x42.webp",
        sizes: "42x42",
        type: "image/webp",
      },
      {
        url: "/favicon/favicon-48x48.webp",
        sizes: "48x48",
        type: "image/webp",
      },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon/android-chrome-72x72.png", sizes: "72x72" },
      { url: "/favicon/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon/android-chrome-144x144.png", sizes: "144x144" },
      { url: "/favicon/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon/apple-touch-icon-167x167.png", sizes: "167x167" },
      { url: "/favicon/apple-touch-icon-180x180.png", sizes: "180x180" },
      { url: "/favicon/apple-touch-icon-1024x1024.png", sizes: "1024x1024" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon/logo-symbol-icon.svg",
        color: "#020617",
      },
      { rel: "manifest", url: "/favicon/site.webmanifest" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
