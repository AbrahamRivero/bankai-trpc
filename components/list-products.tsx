"use client";

import { trpc } from "@/lib/trpc";
import { buttonVariants } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductsFilterQueryInput } from "@/server/products/products-schema";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import Pagination from "./products-pagination";
import Link from "next/link";

export default function ListProducts({
  initialParams,
}: {
  initialParams: ProductsFilterQueryInput;
}) {
  const searchParams = useSearchParams();
  const [currentParams, setCurrentParams] =
    useState<ProductsFilterQueryInput>(initialParams);

  // Update params when URL changes
  useEffect(() => {
    const newParams: ProductsFilterQueryInput = {
      query: searchParams.get("query") || undefined,
      sizes: searchParams.getAll("sizes"),
      colors: searchParams.getAll("colors"),
      category_slug: searchParams.getAll("category_slug") || undefined,
    };
    setCurrentParams(newParams);
  }, [searchParams]);

  const { data, isLoading } = trpc.getFilteredProducts.useQuery(currentParams, {
    keepPreviousData: true,
    refetchInterval: 15000,
  });

  return (
    <>
      {isLoading ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {[...Array(3)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
          <div className="flex justify-center mt-6 mb-10">
            <div className="h-6 w-[120px] bg-gray-200 mb-2 rounded-md animate-pulse" />
          </div>
        </>
      ) : data && data.results > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
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
          <div className="flex justify-center mt-6 mb-10">
            {data.totalPages > 0 && <Pagination totalPages={data.totalPages} />}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1 mt-20 mb-16 sm:mt-28 sm:mb-24 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            No se han encontrado productos.
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
  );
}
