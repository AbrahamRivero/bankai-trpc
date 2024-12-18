import { dehydrate } from "@tanstack/react-query";
import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import Hydrate from "@/lib/hydrate-client";
import CreateProductForm from "@/components/create-product-form";

export default async function ProductsPage() {
  const helpers = createSSRHelper();
  await helpers.getCategories.prefetch();

  return (
    <div className="min-h-screen bg-white">
      <Hydrate state={dehydrate(helpers.queryClient)}>
        <main>
          <CreateProductForm />
        </main>
      </Hydrate>
    </div>
  );
}
