import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tushar Mishra — Full-Stack Developer",
  description:
    "Tushar Mishra builds backend systems, real-time products, and AI-powered developer tools.",
  openGraph: {
    title: "Tushar Mishra — Full-Stack Developer",
    description:
      "Backend-minded full-stack developer for ambitious products and engineering teams.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
