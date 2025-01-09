import Navbar from "@/components/layout/navigation/navbar";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import Footer from "@/components/layout/navigation/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <div className={cn("min-h-screen font-sans antialiased grainy")}>
        <Navbar />
        {children}
        <Footer />
      </div>
    </Fragment>
  );
}
