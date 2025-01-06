"use client";

import { Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trpc } from "@/lib/trpc";
import { buttonVariants } from "./ui/button";
import { CategoryHeader } from "./category-header";
import { Skeleton } from "./ui/skeleton";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import Link from "next/link";

type ProductGridProps = {
  id: string;
  name: string;
  slug: string;
  description: string;
  img_url: string;
  product_categories: {
    name: string;
  } | null;
  price: number;
  discount_end_date: Date | null;
  has_discount: boolean;
  discount: number;
}[];

const ProductGrid = ({ products }: { products: ProductGridProps }) => {
  return (
    <motion.div
      className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, staggerChildren: 0.1 }}
    >
      {products.map(
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
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProductCard
              id={id}
              name={name}
              href={`/products/${slug}`}
              category={product_categories?.name}
              img_url={img_url}
              price={price}
              discountPercentage={discount}
              discountEndDate={discount_end_date}
            />
          </motion.div>
        )
      )}
    </motion.div>
  );
};

const LoadingState = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <div className="py-24 text-center">
      <Skeleton className="h-10 w-1/4 mx-auto mb-4" />
      <Skeleton className="h-12 w-3/4 mx-auto" />
    </div>
    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      {[...Array(8)].map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  </motion.div>
);

const NoProductsFound = () => (
  <motion.div
    className="flex flex-col items-center gap-1 mt-20 mb-16 sm:mt-28 sm:mb-24 text-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
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
  </motion.div>
);

const CategoriesPageContent = ({ slug }: { slug: string }) => {
  const { data, isLoading } = trpc.getCategoryBySlug.useQuery(
    { slug },
    {
      suspense: true,
    }
  );

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <Suspense fallback={<LoadingState />}>
        <AnimatePresence>
          {isLoading ? (
            <LoadingState />
          ) : (
            <>
              <CategoryHeader name={data?.name || ""} />
              {data?.products && data.products.length > 0 ? (
                <ProductGrid products={data.products} />
              ) : (
                <NoProductsFound />
              )}
            </>
          )}
        </AnimatePresence>
      </Suspense>
    </div>
  );
};

export default CategoriesPageContent;
