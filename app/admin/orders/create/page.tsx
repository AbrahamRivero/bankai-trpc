import { dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import Hydrate from "@/lib/hydrate-client";

export default async function ProductsPage() {
  const helpers = createSSRHelper();
  await helpers.getCategories.prefetch();
  await helpers.getLatestProducts.prefetch();

  return (
    <div className="min-h-screen bg-white">
      <Hydrate state={dehydrate(helpers.queryClient)}>
        <main>Create Products Page</main>
      </Hydrate>
    </div>
  );
}
