import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeOS — Your life. Organized. Powered by AI.",
  description: "LifeOS is an AI-powered life operating system to plan your day, build better habits, and take control of your life.",
  openGraph: {
    title: "LifeOS — Your life. Organized.",
    description: "AI-powered planning, habits, and reflection in one intelligent system.",
    type: "website",
    siteName: "LifeOS",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
