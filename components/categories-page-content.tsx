"use client";
import { trpc } from "@/lib/trpc";
import { buttonVariants } from "./ui/button";
import React, { Suspense } from "react";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import Link from "next/link";

const CategoriesPageContent = ({ slug }: { slug: string }) => {
  const { data, isLoading } = trpc.getCategoryBySlug.useQuery({ slug });

  return (
    <>
      <div className="py-24 text-center">
        <h1 className="text-4xl font-bold tracking-tight">{data?.name}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground">
          Navega a través de nuestra amplia gama de productos y encuentra tus
          favoritos.
        </p>
      </div>
      <>
        {isLoading ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {[...Array(6)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
            <div className="flex justify-center mt-6 mb-10">
              <div className="h-6 w-[120px] bg-gray-200 mb-2 rounded-md animate-pulse" />
            </div>
          </>
        ) : data && data.products.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
              {data.products.map(
                ({
                  id,
                  name,
                  slug,
                  img_url,
                  price,
                  discount,
                  discount_end_date,
                  product_categories,
                }) => (
                  <ProductCard
                    key={id}
                    id={id}
                    name={name}
                    href={`/products/${slug}`}
                    category={product_categories?.name}
                    img_url={img_url}
                    price={Number(price)}
                    discountPercentage={Number(discount)}
                    discountEndDate={discount_end_date}
                  />
                )
              )}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 mt-20 mb-16 sm:mt-28 sm:mb-24 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No se han encontrado productos
              <br /> para esta categoría.
            </h3>

            <Link
              href="/"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "mt-4",
              })}
            >
              <span>Volver a inicio</span>
            </Link>
          </div>
        )}
      </>
    </>
  );
};

export default CategoriesPageContent;
