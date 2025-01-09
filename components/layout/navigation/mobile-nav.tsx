"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { ArrowRight, Menu, Search, X } from "lucide-react";
import Link from "next/link";
import UserAccountNav from "./user-account-nav";
import { Input } from "../../ui/input";
import Image from "next/image";

const MobileNav = ({ isAuth }: { isAuth: string | null }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: 0 },
  };

  const listItemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <div className="lg:hidden">
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 bg-white shadow-md">
        <motion.button
          aria-label="Toggle Button"
          whileTap={{ scale: 0.95 }}
          onClick={toggleOpen}
          className={buttonVariants({
            variant: "ghost",
            className:
              "relative z-50 h-10 w-10 text-zinc-700 bg-white rounded-full flex items-center justify-center",
          })}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="h-5 w-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        {/* Search Bar */}
        <div className="lg:hidden flex flex-1 max-w-md mx-4 ">
          <div className="relative w-full">
            <Input
              className="w-full bg-gray-200 border-primary-foreground/20 pl-10 pr-4 py-2 text-primary placeholder:text-primary/65 focus-visible:ring-2 focus-visible:ring-accent transition-all"
              placeholder="Buscar producto..."
              type="search"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/65" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <UserAccountNav />
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 w-full bg-white shadow-xl"
          >
            <motion.ul
              className="grid w-full gap-3 px-10 pt-20 pb-8 bg-slate-200"
              variants={{
                open: {
                  transition: { staggerChildren: 0.07, delayChildren: 0.2 },
                },
                closed: {
                  transition: { staggerChildren: 0.05, staggerDirection: -1 },
                },
              }}
            >
              {!isAuth ? (
                <>
                  <motion.li variants={listItemVariants}>
                    <SignedOut>
                      <SignInButton>
                        <a className="flex items-center w-full font-semibold">
                          Acceder <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                      </SignInButton>
                    </SignedOut>
                  </motion.li>
                </>
              ) : (
                <>
                  <motion.li variants={listItemVariants}>
                    <Link
                      onClick={() => closeOnCurrent("/")}
                      className="flex items-center w-full font-semibold"
                      href="/"
                    >
                      <div className="w-6 h-6 relative">
                        <Image
                          src="/favicon.svg"
                          alt="BANKAI Project Logo"
                          fill
                        />
                      </div>
                      BANKAI Project
                    </Link>
                  </motion.li>
                  <motion.li variants={listItemVariants}>
                    <Link
                      onClick={() => closeOnCurrent("/store")}
                      className="flex items-center w-full font-semibold"
                      href="/store"
                    >
                      Tienda
                    </Link>
                  </motion.li>
                  <motion.li
                    variants={listItemVariants}
                    className="my-3 h-px w-full bg-gray-300"
                  />
                  <motion.li variants={listItemVariants}>
                    <Link
                      onClick={() => closeOnCurrent("/events")}
                      className="flex items-center w-full font-semibold"
                      href="/events"
                    >
                      Eventos
                    </Link>
                  </motion.li>
                  <motion.li
                    variants={listItemVariants}
                    className="my-3 h-px w-full bg-gray-300"
                  />
                  <motion.li variants={listItemVariants}>
                    <Link
                      onClick={() => closeOnCurrent("/about-us")}
                      className="flex items-center w-full font-semibold"
                      href="/about-us"
                    >
                      Sobre Nosotros
                    </Link>
                  </motion.li>
                  <motion.li
                    variants={listItemVariants}
                    className="my-3 h-px w-full bg-gray-300"
                  />
                  <motion.li variants={listItemVariants}>
                    <Link
                      className="flex items-center w-full font-semibold"
                      href="/contact-us"
                    >
                      Contáctenos
                    </Link>
                  </motion.li>
                </>
              )}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
