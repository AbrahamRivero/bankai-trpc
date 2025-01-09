import { cn } from "@/lib/utils";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import ListProducts from "@/components/list-products";
import Hydrate from "@/lib/hydrate-client";
import ProductFilteringInterface from "@/components/layout/filters/product-filtering-interface";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{
    query?: string;
    category_slug?: string;
    colors?: string[] | string;
    sizes?: string[] | string;
  }>;
}) {
  const { query, category_slug, colors, sizes } = await params;

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
            <ListProducts
              initialParams={{ query, category_slug, colors, sizes }}
            />
          </Hydrate>
        </div>
      </ProductFilteringInterface>
    </div>
  );
}
