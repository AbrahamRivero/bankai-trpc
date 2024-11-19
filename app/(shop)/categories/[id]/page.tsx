import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/hydrate-client";
import CategoriesPageContent from "../../../../components/categories-page-content";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const categoryId = Number(id);

  const helpers = createSSRHelper();
  await helpers.getCategoryById.prefetch({ id: categoryId });

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hydrate state={dehydrate(helpers.queryClient)}>
          <CategoriesPageContent id={categoryId} />
        </Hydrate>
      </div>
    </div>
  );
}
