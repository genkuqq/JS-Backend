import { Inter } from "next/font/google";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const BodyFont = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={BodyFont.className}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}