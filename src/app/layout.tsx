import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-context";
import { LanguageProvider } from "@/components/language-context";
import { Toaster } from "sonner";
import { ProofaPreloader } from "@/components/preloader";
import { BetaBanner } from "@/components/beta-banner";
import { CookieConsent } from "@/components/cookie-consent";
import { InternetStatus } from "@/components/internet-status";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Proofa",
  description: "Monetize and protect your art. Orchestrate the world's most powerful models.",
  icons: {
    icon: "/proofa.png",
    shortcut: "/proofa.png",
    apple: "/proofa.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased min-h-screen bg-white dark:bg-black text-black dark:text-white selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <LanguageProvider>
              {/* Closed Beta Warning Banner */}
              <BetaBanner />
              <CookieConsent />
              <Toaster />
              <InternetStatus />
              <ProofaPreloader />
              {children}
            </LanguageProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
