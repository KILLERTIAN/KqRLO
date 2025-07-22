import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KqRLO | Zero-Knowledge Identity Verification",
  description: "Revolutionary privacy-first identity verification using zk-SNARKs. Prove your identity without revealing personal information. End-to-end encryption, no data selling, open source.",
  keywords: "zero-knowledge, identity verification, zk-SNARKs, privacy, blockchain, authentication, security, KqRLO",
  authors: [{ name: "KqRLO Team" }],
  openGraph: {
    title: "KqRLO | Zero-Knowledge Identity Verification",
    description: "Revolutionary privacy-first identity verification using zk-SNARKs",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KqRLO | Zero-Knowledge Identity Verification",
    description: "Revolutionary privacy-first identity verification using zk-SNARKs",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
