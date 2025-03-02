import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Provider";
import { Analytics } from "@vercel/analytics/next";
import { PlayerProvider } from "@/context/PlayerContext";
import ParentContainer from "@/components/parentContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "RealMusic",
  description: "Indie music and discovery",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <PlayerProvider>
            <main>
              <ParentContainer>{children}</ParentContainer>
            </main>
          </PlayerProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
