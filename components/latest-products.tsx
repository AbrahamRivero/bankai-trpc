"use client";
import { ArrowRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Suspense } from "react";
import Link from "next/link";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";

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
          href="/products"
        >
          Mostrar más
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
        {data &&
          data.map(
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
              <Suspense key={id} fallback={<ProductCardSkeleton />}>
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
              </Suspense>
            )
          )}
      </div>
    </section>
  );
};

export default LatestProducts;
