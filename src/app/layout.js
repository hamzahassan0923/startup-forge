import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StartupForge - Build Your Dream Startup Team",

  description:
    "StartupForge is a platform that connects aspiring entrepreneurs with talented individuals to build their dream startup teams.",

  icons: {
    icon: "/startupforge-logo.png",
    shortcut: "/startupforge-logo.png",
    apple: "/startupforge-logo.png",
  },

  openGraph: {
    title: "StartupForge - Build Your Dream Startup Team",

    description:
      "Connect with developers, designers, marketers, and co-founders to launch your startup.",

    images: [
      {
        url: "/startupforge-logo.png",
        width: 512,
        height: 512,
        alt: "StartupForge Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "StartupForge",
    description:
      "Build and grow startup teams with talented collaborators.",
    images: ["/startupforge-logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        
        

        <main className="flex-1">
          <Navbar />
          {children}
          <Footer></Footer>
        </main>
        

      </body>
    </html>
  );
}