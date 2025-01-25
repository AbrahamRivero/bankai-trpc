"use client";

import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "./ui/card";
import { Fragment, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import CategorySkeleton from "./category-skeleton";

const Categories = () => {
  const { data, isLoading, isError } = trpc.getCategories.useQuery();
  return (
    <section className="container mx-auto px-4 py-12">
      <div>
        <div className="flex items-center mb-4">
          <div className="w-1 h-6 bg-red-500 mr-2"></div>
          <h2 className="text-lg font-semibold">Categorías</h2>
        </div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Buscar por Categoría</h1>
        </div>
        <div className="grid auto-rows-[192px] grid-cols-1 sm:grid-cols-3 gap-4">
          {isLoading || isError
            ? [...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`row-span-1 animate-pulse rounded-xl border-2 border-slate-400/10 bg-neutral-100 p-4 dark:bg-neutral-900 ${
                    i === 1 ? "md:row-span-2" : ""
                  }`}
                ></div>
              ))
            : data?.map((category, i) => (
                <div
                  key={i}
                  className={`row-span-1 rounded-xl border-2 border-slate-400/10 bg-neutral-100 dark:bg-neutral-900 overflow-hidden ${
                    i === 1 ? "md:row-span-2" : ""
                  }`}
                >
                  <Link
                    href={`/categories/${category.slug}`}
                    className="relative flex h-full w-full group"
                  >
                    <Image
                      src={
                        category.img_url
                          ? category.img_url
                          : "https://placehold.co/600x400?text=No+Image"
                      }
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105 group-active:scale-105 rounded-xl"
                      sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />

                    {/* Capa de oscurecimiento */}
                    <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/30 group-active:bg-black/30 rounded-xl" />

                    {/* Gradiente y texto (se mantienen igual) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <h3 className="text-lg font-semibold text-white text-center">
                        {category.name}
                      </h3>
                    </div>
                  </Link>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
