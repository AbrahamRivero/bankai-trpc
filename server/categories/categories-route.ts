import {
  createCategoriesHandler,
  getCategoriesHandler,
} from "./categories-controller";
import { createCategorySchema } from "./categories-schema";
import { t } from "@/lib/trpc-server";

const categoriesRouter = t.router({
  createCategory: t.procedure
    .input(createCategorySchema)
    .mutation(({ input }) => createCategoriesHandler({ input })),
  getCategories: t.procedure.query(() => getCategoriesHandler()),
});

export default categoriesRouter;
