import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Runwell | Your Posts",
  description: "Easily showcase and organize your posts in a clean, elegant feed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
