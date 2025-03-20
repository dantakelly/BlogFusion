import Footer from "../components/Footer/Footer";
import globals from "./globals.css"
import Header from "../components/Header/Header";
import { SessionProvider } from "next-auth/react";

export const metadata = {
  title: "Blog Fusion",
  description: "Read, Create, & Share Blogs with BlogFusion.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <SessionProvider>
      <Header />
        {children}
        <Footer/> 
        </SessionProvider>
      </body>
    </html>
  );
}
