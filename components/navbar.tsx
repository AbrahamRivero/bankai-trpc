"use client";

import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  Home,
  ShoppingCart,
  Info,
  Phone,
  BookOpen,
  LogIn,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "./ui/separator";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import CartSheet from "./cart-sheet";
import { SignedOut, SignInButton, useAuth } from "@clerk/nextjs";
import UserAccountNav from "./user-account-nav";

export default function Navbar() {
  const navLinks = [
    { href: "/", label: "Inicio", icon: Home },
    { href: "/products/search", label: "Productos", icon: ShoppingBag },
    { href: "/about", label: "Sobre nosotros", icon: Info },
    { href: "/contact", label: "Contacto", icon: Phone },
    { href: "/events", label: "Eventos", icon: BookOpen },
  ];

  const { items } = useCartStore();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { isSignedIn } = useAuth();

  return (
    <header className="w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo (hidden on mobile) */}
          <Link
            href="/"
            className="items-center gap-2 text-lg font-semibold flex-shrink-0 hidden lg:block"
          >
            <div className="w-6 h-6 relative">
              <Image src="/favicon.svg" alt="BANKAI Project Logo" fill />
            </div>
            <span className="sr-only">BANKAI Project</span>
          </Link>

          {/* Mobile Sidebar Trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden text-primary hover:text-accent transition-colors"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open mobile menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[300px] sm:w-[400px] bg-[#252C37] border-none"
            >
              <SheetHeader className="text-left">
                <SheetTitle className="text-primary-foreground items-center gap-2 text-lg font-semibold flex-shrink-0 flex">
                  <div className="w-6 h-6 relative">
                    <Image src="/favicon.svg" alt="BANKAI Project Logo" fill />
                  </div>
                  <span>BANKAI Project</span>
                </SheetTitle>
              </SheetHeader>

              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center text-primary-foreground hover:text-accent transition-colors text-lg"
                  >
                    <link.icon className="h-5 w-5 mr-4" />
                    <span>{link.label}</span>
                  </Link>
                ))}
              </nav>
              <Separator className="my-6 bg-primary-foreground/20" />
              <div className="flex flex-col gap-6">
                <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                  <SheetTrigger asChild>
                    <button className="flex items-center text-primary-foreground hover:text-accent transition-colors">
                      <ShoppingCart className="h-5 w-5 mr-4" />
                      <span>Carrito</span>
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-1/4 bg-primary-foreground border-none"
                  >
                    <CartSheet />
                  </SheetContent>
                </Sheet>
                <button className="flex items-center text-primary-foreground hover:text-accent transition-colors">
                  <Heart className="h-5 w-5 mr-4" />
                  <span>Favoritos</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>

          {/* Search Bar */}
          <div className="flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Input
                className="w-full bg-gray-200 border-primary-foreground/20 pl-10 pr-4 py-2 text-primary placeholder:text-primary/65 focus-visible:ring-2 focus-visible:ring-accent transition-all"
                placeholder="Buscar producto..."
                type="search"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/65" />
            </div>
          </div>

          {/* Desktop Navigation */}

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary hover:text-primary/65 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="flex items-center gap-4">
            {isSignedIn && (
              <div className="hidden lg:flex items-center gap-4">
                <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-primary hover:text-primary/65 transition-colors relative"
                    >
                      <ShoppingBag className="h-6 w-6" />
                      {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-accent text-primary/85 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {items.length}
                        </span>
                      )}
                      <span className="sr-only">Shopping Cart</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-[300px] sm:w-1/4 bg-primary-foreground border-none"
                  >
                    <CartSheet />
                  </SheetContent>
                </Sheet>

                <Button
                  variant="ghost"
                  size="icon"
                  className="text-primary hover:text-primary/65 transition-colors relative"
                >
                  <Heart className="h-6 w-6" />
                  <span className="absolute -top-1 -right-1 bg-accent text-primary/85 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                  <span className="sr-only">Favorites</span>
                </Button>
              </div>
            )}

            {/* User Button */}
            {isSignedIn ? (
              <UserAccountNav />
            ) : (
              <SignedOut>
                <SignInButton>
                  <Button variant="ghost" size="sm">
                    <LogIn className="w-4 h-4 mr-0.5" />
                    Acceder
                  </Button>
                </SignInButton>
              </SignedOut>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
