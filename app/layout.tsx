import "./theme-config.css";
import "./globals.css";

import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";

// import { Inter } from 'next/font/google'
import NavBar from "./NavBar";
import { Container, Theme, ThemePanel } from "@radix-ui/themes";
import AuthProvider from "./auth/Provider";
import QueryClientProvider from "./QueryClientProvider";

// const inter = Inter({
//   subsets: ['latin'],
//   variable: '--font-inter',
// })

export const metadata: Metadata = {
  title: "Issues Tracker App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // body className={inter.variable}
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <Theme accentColor="violet" radius="large">
              <NavBar />
              <main className="p-5">
                <Container>{children}</Container>
              </main>
              {/* <ThemePanel /> */}
            </Theme>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
