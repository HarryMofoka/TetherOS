import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TetherOS â€” Your life. Organized. Powered by AI.",
  description: "TetherOS is an AI-powered life operating system to plan your day, build better habits, and take control of your life.",
  openGraph: {
    title: "TetherOS â€” Your life. Organized.",
    description: "AI-powered planning, habits, and reflection in one intelligent system.",
    type: "website",
    siteName: "TetherOS",
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.svg",
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
