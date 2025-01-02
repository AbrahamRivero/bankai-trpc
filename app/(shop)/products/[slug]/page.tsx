import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/hydrate-client";
import ProductOverview from "@/components/product-overview";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = await params;

  const helpers = createSSRHelper();
  await helpers.getProductBySlug.prefetch({ slug });

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hydrate state={dehydrate(helpers.queryClient)}>
          <ProductOverview slug={slug} />
        </Hydrate>
      </div>
    </div>
  );
}
