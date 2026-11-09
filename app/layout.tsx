import type { Metadata } from "next";
import "./globals.css";
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL
    : "http://localhost:3000");
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Tushar Mishra — Backend / Full-Stack Developer",
  description:
    "Backend engineering, real-time applications, and developer tools. Explore BuildCore ERP, Co-Op Code, and Hammy CLI by Tushar Mishra.",
  openGraph: {
    title: "Tushar Mishra — Engineering with intent",
    description:
      "Thoughtful interfaces. Serious engineering. Backend systems, real-time products, and developer tools.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Mishra — Backend / Full-Stack Developer",
    description: "Thoughtful interfaces. Serious engineering.",
  },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tushar Mishra",
              jobTitle: "Backend / Full-Stack Developer",
              sameAs: [
                "https://github.com/cout-Tushar",
                "https://linkedin.com/in/tushar-mishra-1b15701ab",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
