import { createSSRHelper } from "../../api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/hydrate-client";

export default async function CategoriesPage() {
  const helpers = createSSRHelper();
  await helpers.getCategories.prefetch();

  return (
    <div className="min-h-screen bg-white">
      <Hydrate state={dehydrate(helpers.queryClient)}>
        <main>Categories Page</main>
      </Hydrate>
    </div>
  );
}
