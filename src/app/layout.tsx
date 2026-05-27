import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Yashwanth Puligilla | AI & Cloud Developer Command Center",
  description: "Interactive portfolio of Yashwanth Puligilla - Associate Software Engineer Intern at Accenture, AWS Certified Solutions Architect, and GenAI / Cloud Developer. Experience a premium, cyberpunk AAA-game-inspired developer console.",
  keywords: [
    "Yashwanth Puligilla",
    "AI Engineer",
    "Cloud Developer",
    "AWS Certified Solutions Architect",
    "Next.js Portfolio",
    "Cyberpunk Portfolio",
    "Accenture",
    "DevOps"
  ],
  authors: [{ name: "Yashwanth Puligilla" }],
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
    shortcut: "/favicon.png",
  },
  openGraph: {
    title: "Yashwanth Puligilla | AI & Cloud Developer Command Center",
    description: "Cinematic, interactive game-inspired console portfolio of Yashwanth Puligilla. Cyberpunk dashboard, terminal commands, and AI assistant orb.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full bg-[#060608] text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-[#00f0ff] selection:text-black">
        {children}
      </body>
    </html>
  );
}
