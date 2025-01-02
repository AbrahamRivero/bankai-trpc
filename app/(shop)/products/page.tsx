import { cn } from "@/lib/utils";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import ListProducts from "@/components/list-products";
import Hydrate from "@/lib/hydrate-client";
import ProductFilteringInterface from "@/components/layout/filters/product-filtering-interface";

export interface SearchParams {
  query?: string;
  sizes?: string[];
  colors?: string[];
  category_slug?: string[];
}

interface ProductsPageProps {
  searchParams: SearchParams;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const { query, sizes, colors, category_slug } = searchParams;

  const helpers = createSSRHelper();
  await helpers.getFilteredProducts.prefetch({
    query,
    sizes,
    colors,
    category_slug,
  });
  await helpers.getCategories.prefetch();

  return (
    <div className={cn("min-h-screen font-sans antialiased grainy")}>
      <ProductFilteringInterface>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Hydrate state={dehydrate(helpers.queryClient)}>
            <ListProducts initialParams={searchParams} />
          </Hydrate>
        </div>
      </ProductFilteringInterface>
    </div>
  );
}
