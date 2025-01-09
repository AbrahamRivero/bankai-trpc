import {
  createCategoriesHandler,
  getCategoryBySlugHandler,
  getCategoriesHandler,
} from "./categories-controller";
import {
  createCategorySchema,
  searchCategoryBySlugSchema,
} from "./categories-schema";
import { t } from "@/lib/trpc-server";

const categoriesRouter = t.router({
  createCategory: t.procedure
    .input(createCategorySchema)
    .mutation(({ input }) => createCategoriesHandler({ input })),
  getCategories: t.procedure.query(() => getCategoriesHandler()),
  getCategoryBySlug: t.procedure
    .input(searchCategoryBySlugSchema)
    .query(({ input }) => getCategoryBySlugHandler({ slug: input.slug })),
});

export default categoriesRouter;
