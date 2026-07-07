import MainFooter from "../components/layout/main-footer";
import MainHeader from "../components/layout/main-header";
import { RepoProvider } from "../context/SavedContext";
import "./globals.css";
import localFont from "next/font/local";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata = {
  title: "REPOLENS",
  description: "Explore all repositories from GITHUB with REPOLENS",
};
const jersey = localFont({
  src: "../../public/fonts/Jersey15-Regular.ttf",
  variable: "--font-jersey",
});
const inter = localFont({
  src: "../../public/fonts/Inter-VariableFont_opsz,wght.ttf",
  variable: "--font-inter",
  weight: "100 900",
});
type Props = {
  children: React.ReactNode;
};
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <RepoProvider>
        <body className={`${jersey.variable} ${inter.variable} bg-[#151b23] `}>
          <MainHeader />
          {children}
          <MainFooter />
        </body>
      </RepoProvider>
    </html>
  );
}
