import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TrpcProvider } from "@/lib/trpc-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { esES } from "@clerk/localizations";
import { auth } from "@clerk/nextjs/server";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BANKAI Project: ¡Libera tu friki interior!",
  description:
    "BANKAI Project es una tienda virtual donde podrás encontrar todo tipo de artículos vinculados a la cultura friki.",
  openGraph: {
    title: "BANKAI Project: ¡Libera tu friki interior!",
    description:
      "BANKAI Project es una tienda virtual donde podrás encontrar todo tipo de artículos vinculados a la cultura friki.",
    url: "https://your-website.com",
    siteName: "BANKAI Project",
    images: [
      {
        url: "https://localhost:3000/favicon.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: "/favicon.svg",
  metadataBase: new URL("https://bankai-project.vercel.app/"),
  ...{
    robots: {
      index: false,
      follow: false,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <TrpcProvider>
          <ClerkProvider localization={esES}>
            <Navbar currentUser={userId} />
            {children}
          </ClerkProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
