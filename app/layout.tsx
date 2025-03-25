import type React from "react";
import type { Metadata } from "next";
import { Inter, Encode_Sans_Expanded } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavigationWrapper from "@/components/navigation-wrapper";

const inter = Inter({ subsets: ["latin"] });

const encoded_sans = Encode_Sans_Expanded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "College Events App",
  description: "Discover and register for events at your college",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${encoded_sans.className} min-h-screen flex flex-col`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NavigationWrapper>{children}</NavigationWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
