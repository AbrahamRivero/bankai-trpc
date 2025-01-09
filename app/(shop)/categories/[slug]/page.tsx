import { createSSRHelper } from "@/app/api/trpc/trpc-router";
import { dehydrate } from "@tanstack/react-query";
import Hydrate from "@/lib/hydrate-client";
import CategoriesPageContent from "../../../../components/categories-page-content";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const helpers = createSSRHelper();
  await helpers.getCategoryBySlug.prefetch({ slug });

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Hydrate state={dehydrate(helpers.queryClient)}>
          <CategoriesPageContent slug={slug} />
        </Hydrate>
      </div>
    </div>
  );
}
