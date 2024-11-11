import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import ListProducts from "@/components/list-products";
import Hydrate from "@/lib/hydrate-client";

export default async function SearchPage({
  query,
  sizes,
  colors,
  category_id,
}: {
  query?: string | undefined;
  sizes?: string[] | undefined;
  colors?: string[] | undefined;
  category_id?: string[] | undefined;
}) {
  const helpers = createSSRHelper();
  await helpers.getFilteredProducts.prefetch({
    query,
    sizes,
    colors,
    category_id,
  });
  await helpers.getCategories.prefetch();

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Productos</h1>
          <p className="mx-auto mt-4 max-w-3xl text-base text-muted-foreground">
            Navega a través de nuestra amplia gama de productos y encuentra tus
            favoritos.
          </p>
        </div>
        <Hydrate state={dehydrate(helpers.queryClient)}>
          <ListProducts initialParams={{ query, sizes, colors, category_id }} />
        </Hydrate>
      </div>
    </div>
  );
}
