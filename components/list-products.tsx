"use client";

import { trpc } from "@/lib/trpc";
import { buttonVariants } from "./ui/button";
import { useEffect } from "react";
import type { ProductsFilterQueryInput } from "@/server/products/products-schema";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import Pagination from "./products-pagination";
import Link from "next/link";
import { useProductStore } from "@/store/useProductStore";

export default function ListProducts() {
  const { category_slug, sizes, colors, sort, page, limit, setPage } =
    useProductStore();

  const currentParams: ProductsFilterQueryInput = {
    category_slug: category_slug || undefined,
    sizes,
    colors,
    sort: sort || undefined,
    page,
    limit,
  };

  const { data, isLoading } = trpc.getFilteredProducts.useQuery(currentParams, {
    keepPreviousData: true,
    refetchInterval: 15000,
  });

  useEffect(() => {
    setPage(1);
  }, [setPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <>
      {isLoading ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-3">
            {[...Array(limit)].map((_, index) => (
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
                  price={price}
                  discountPercentage={discount}
                  discountEndDate={discount_end_date}
                />
              )
            )}
          </div>
          <div className="flex justify-center mt-6 mb-10">
            {data.totalPages > 0 && (
              <Pagination
                totalPages={data.totalPages}
                currentPage={data.currentPage}
                onPageChange={handlePageChange}
              />
            )}
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
