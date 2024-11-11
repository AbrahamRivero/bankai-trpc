"use client";

import { trpc } from "@/lib/trpc";
import { buttonVariants } from "./ui/button";
import FilterHeading from "./filter-heading";
import ProductCard from "./product-card";
import Link from "next/link";
import ProductCardSkeleton from "./product-card-skeleton";
import Pagination from "./products-pagination";

interface SearchParams {
  query?: string;
  sizes?: string[];
  colors?: string[];
  category_id?: string[];
}

const ListProducts = ({ initialParams }: { initialParams: SearchParams }) => {
  const { data, isLoading } = trpc.getFilteredProducts.useQuery({
    query: initialParams.query,
    sizes: initialParams.sizes,
    colors: initialParams.colors,
    category_id: initialParams.category_id,
  });

  return (
    <>
      <FilterHeading />

      {isLoading ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {[Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
          <div className="flex justify-center mt-6 mb-10">
            <div className="h-6 w-[120px] bg-gray-200 mb-2 rounded-md animate-pulse" />
          </div>
        </>
      ) : data && data.results > 0 ? (
        <>
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            {data.products.map((product) =>
              product.variants.map((variant) => (
                <ProductCard
                  key={variant.id}
                  variantId={variant.id}
                  name={product.name}
                  href={`/products/${product.id}/${variant.id}`}
                  category={product.categories?.name}
                  image_url={variant.image}
                  price={Number(variant.price)}
                  discountPercentage={Number(variant.discount)}
                  discountEndDate={variant.discount_end_date}
                />
              ))
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
};

export default ListProducts;