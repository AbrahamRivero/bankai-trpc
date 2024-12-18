"use client";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Link from "next/link";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import { Suspense } from "react";

const LatestProducts = () => {
  const { data, isLoading } = trpc.getLatestProducts.useQuery();
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-4">
        <div className="w-1 h-6 bg-red-500 mr-2"></div>
        <h2 className="text-lg font-semibold">Este Mes</h2>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <h1 className="text-xl font-bold">Nuestros productos</h1>
        <Link
          className="flex items-center whitespace-nowrap text-sm font-medium text-primary hover:text-primary/75"
          href="/products/search"
        >
          Mostrar más
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {data &&
          data.map((product) =>
            product.variants.map((variant, index) => (
              <Suspense key={variant.id} fallback={<ProductCardSkeleton />}>
                <ProductCard
                  variantId={variant.id}
                  name={product.name}
                  href={`/products/${product.id}/${variant.id}`}
                  category={product.categories?.name}
                  img_url={variant.img_url}
                  price={Number(variant.price)}
                  discountPercentage={Number(variant.discount)}
                  discountEndDate={variant.discount_end_date}
                />
              </Suspense>
            ))
          )}
      </div>
    </section>
  );
};

export default LatestProducts;
