import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const migha = localFont({
  src: "../../public/fonts/Migha-BoldCNTR.otf",
  variable: "--font-migha",
  display: "swap",
});

export const metadata = {
  title: "Atayr - Buy Less. Borrow More.",
  description:
    "Your pre-purchase wardrobe advisor. See what fits your closet before you buy it - or just borrow it from a friend. Join the Atayr waitlist.",
  keywords: [
    "Atayr",
    "wardrobe",
    "fashion",
    "AI styling",
    "borrow clothes",
    "sustainable fashion",
    "outfit matching",
    "wardrobe management",
    "shared closet",
    "circular fashion",
    "eco-friendly fashion",
    "personal stylist app",
    "peer-to-peer clothing rental",
    "pre-purchase advisor",
    "closet matching",
    "digital closet",
    "virtual closet",
    "closet organizer",
    "clothing app"
  ],
  openGraph: {
    title: "Atayr - Buy Less. Borrow More.",
    description:
      "Your pre-purchase wardrobe advisor. See what fits your closet before you buy it - or just borrow it from a friend.",
    type: "website",
    locale: "en_US",
    siteName: "Atayr",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atayr - Buy Less. Borrow More.",
    description:
      "Your pre-purchase wardrobe advisor. See what fits your closet before you buy it - or just borrow it from a friend.",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${migha.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <div className="noise-overlay" />
        {children}
      </body>
    </html>
  );
}
