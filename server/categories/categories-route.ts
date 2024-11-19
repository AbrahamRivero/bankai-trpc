import {
  createCategoriesHandler,
  getCategoriesByIdHandler,
  getCategoriesHandler,
} from "./categories-controller";
import {
  createCategorySchema,
  searchCategoryByIdSchema,
} from "./categories-schema";
import { t } from "@/lib/trpc-server";

const categoriesRouter = t.router({
  createCategory: t.procedure
    .input(createCategorySchema)
    .mutation(({ input }) => createCategoriesHandler({ input })),
  getCategories: t.procedure.query(() => getCategoriesHandler()),
  getCategoryById: t.procedure
    .input(searchCategoryByIdSchema)
    .query(({ input }) => getCategoriesByIdHandler({ id: input.id })),
});

export default categoriesRouter;
