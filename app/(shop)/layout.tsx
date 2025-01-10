import Navbar from "@/components/layout/navigation/navbar";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import Footer from "@/components/layout/navigation/footer";
import PromotionalBanner from "@/components/layout/promotion/promotional-banner";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Fragment>
      <div className={cn("min-h-screen font-sans antialiased grainy")}>
        <div className="sticky top-0 z-50">
          <PromotionalBanner />
          <Navbar />
        </div>
        {children}
        <Footer />
      </div>
    </Fragment>
  );
}
