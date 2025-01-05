import {
  createCategoryHandler,
  fetchCategoryBySlug,
  getCategoriesHandler,
} from "./events-categories-controller";
import {
  eventCategoryCreationSchema,
  slugBasedCategorySearchSchema,
} from "./events-categories-schema";
import { t } from "@/lib/trpc-server";

const eventCategoriesRouter = t.router({
  createEventCategory: t.procedure
    .input(eventCategoryCreationSchema)
    .mutation(({ input }) => createCategoryHandler({ input })),
  getEventCategories: t.procedure.query(() => getCategoriesHandler()),
  getEventCategoryBySlug: t.procedure
    .input(slugBasedCategorySearchSchema)
    .query(({ input }) => fetchCategoryBySlug({ slug: input.slug })),
});

export default eventCategoriesRouter;
