"use client";

import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "./ui/card";
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import CategorySkeleton from "./category-skeleton";

const Categories = () => {
  const { data } = trpc.getCategories.useQuery();
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {data?.map((category) => (
            <Suspense key={category.name} fallback={<CategorySkeleton />}>
              <Card
                key={category.name}
                className="group overflow-hidden bg-white hover:shadow-lg transition-shadow duration-300"
              >
                <Link
                  href={`/categories/${category.id}`}
                  className="relative block h-48"
                >
                  <Image
                    src={
                      category.img_url
                        ? category.img_url
                        : "https://placehold.co/600x400?text=No+Image"
                    }
                    alt={category.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  <CardContent className="absolute bottom-0 left-0 right-0 p-2">
                    <h3 className="text-lg font-semibold text-white text-center">
                      {category.name}
                    </h3>
                  </CardContent>
                </Link>
              </Card>
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
