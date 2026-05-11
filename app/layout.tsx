import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "デザインジャングル株式会社 | DESIGN JUNGLE",
  description:
    "デザインジャングル株式会社は、広告代理事業、SNS運用、ブランディング、Web制作を通じて、奈良から企業の認知と地域の動きを設計する会社です。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
