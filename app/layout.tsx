import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { metadataBase: new URL("https://demlogct.com"), icons: { icon: "/favicon.png" } };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-CA"><body>{children}</body></html>;
}
