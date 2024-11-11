import {
  createProductsHandler,
  getFilteredProductsHandler,
  getLatestProductsHandler,
} from "./products-controller";
import { createProductSchema, productsFilterQuery } from "./products-schema";
import { t } from "@/lib/trpc-server";

const productsRouter = t.router({
  createProduct: t.procedure
    .input(createProductSchema)
    .mutation(({ input }) => createProductsHandler({ input })),
  getLatestProducts: t.procedure.query(() => getLatestProductsHandler()),
  getFilteredProducts: t.procedure
    .input(productsFilterQuery)
    .query(({ input }) => getFilteredProductsHandler({ filterQuery: input })),
});

export default productsRouter;
