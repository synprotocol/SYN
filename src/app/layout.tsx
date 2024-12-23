import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { WalletContextProvider } from "@/providers/WalletContextProvider";
import '@solana/wallet-adapter-react-ui/styles.css';

export const metadata: Metadata = {
  title: "SYN Protocol",
  description: "AI Persuasion Network",
  icons: {
    icon: [
      { url: "./favicon.ico", sizes: "32x32" },
      { url: "./favicon.svg", type: "image/svg+xml" }
    ],
    apple: { url: "./apple-touch-icon.png" }
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <WalletContextProvider>{children}</WalletContextProvider>
        <Analytics />
      </body>
    </html>
  );
}
