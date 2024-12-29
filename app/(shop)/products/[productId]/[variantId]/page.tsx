import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/hydrate-client";
import ProductOverview from "@/components/product-overview";

export default async function ProductPage({
  params,
}: {
  params: { productId: string; variantId: string };
}) {
  const { productId, variantId } = await params;

  const helpers = createSSRHelper();
  await helpers.getProductByKeys.prefetch({ productId, variantId });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hydrate state={dehydrate(helpers.queryClient)}>
          <ProductOverview productId={productId} variantId={variantId} />
        </Hydrate>
      </div>
    </div>
  );
}
