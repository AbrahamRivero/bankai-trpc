import { createSSRHelper } from "../api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/hydrate-client";
import Banner from "@/components/banner";
import Categories from "@/components/categories";
import LatestProducts from "@/components/latest-products";

export default async function Home() {
  const helpers = createSSRHelper();
  await helpers.getCategoriesByType.prefetch({ type: "product" });
  await helpers.getLatestProducts.prefetch();

  return (
    <div className="min-h-screen bg-white">
      <Hydrate state={dehydrate(helpers.queryClient)}>
        <main>
          <Banner />

          <Categories />

          <LatestProducts />
          {/* 

          <Events /> */}
        </main>
      </Hydrate>
    </div>
  );
}
