import { Header } from "@/components/Header/Header";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { AuthProvider } from "../../context/AuthContext";
import "../styles/globals.scss";

const roboto = Roboto({ 
  weight: ['100', '400', '700'],
  subsets: ["latin"],
  display: 'swap'
 });

export const metadata: Metadata = {
  title: "Compre +",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
