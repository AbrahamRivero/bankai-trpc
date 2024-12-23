import {
  createCategoriesHandler,
  getCategoryByIdHandler,
  getCategoriesHandler,
  getCategoriesByTypeHandler,
} from "./categories-controller";
import {
  createCategorySchema,
  filterCategoriesByTypeSchema,
  searchCategoryByIdSchema,
} from "./categories-schema";
import { t } from "@/lib/trpc-server";

const categoriesRouter = t.router({
  createCategory: t.procedure
    .input(createCategorySchema)
    .mutation(({ input }) => createCategoriesHandler({ input })),
  getCategories: t.procedure.query(() => getCategoriesHandler()),
  getCategoriesByType: t.procedure
    .input(filterCategoriesByTypeSchema)
    .query(({ input }) =>
      getCategoriesByTypeHandler({ categoryType: input.type })
    ),
  getCategoryById: t.procedure
    .input(searchCategoryByIdSchema)
    .query(({ input }) => getCategoryByIdHandler({ id: input.id })),
});

export default categoriesRouter;
