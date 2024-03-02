import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster"

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Complex Trading Pro",
  description: "Best Trading Platfrom across the globe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          > 
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>

  );
}
