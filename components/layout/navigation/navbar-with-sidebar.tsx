"use client";

import { useState } from "react";
import { X, Home, Settings, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";

export default function NavbarWithSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarProvider open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
      <div className="relative min-w-full">
        {/* Navbar */}
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
          <div className="mx-auto w-full px-2.5 sm:px-4">
            <div className="flex h-14 items-center justify-between border-b border-zinc-200">
              <SidebarTrigger className="md:hidden" />
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/favicon.ico"
                  width={30}
                  height={30}
                  alt="BANKAI Project Logo"
                />
                <span className="text-lg font-bold text-gray-800">
                  BANKAI Project
                </span>
              </Link>
            </div>
          </div>
        </nav>

        {/* Sidebar */}
        <Sidebar>
          <SidebarHeader className="p-4 border-b">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">Menú</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
          </SidebarHeader>
          <SidebarContent className="py-4">
            <ul className="space-y-2">
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Home className="mr-2 h-4 w-4" />
                  Inicio
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configuración
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ayuda
                </Button>
              </li>
            </ul>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t">
            <p className="text-sm text-center">© 2024 Mi Aplicación</p>
          </SidebarFooter>
        </Sidebar>
      </div>
    </SidebarProvider>
  );
}
