import {
  createProductsHandler,
  getFilteredProductsHandler,
  getLatestProductsHandler,
  getProductByKeysHandler,
} from "./products-controller";
import {
  createProductSchema,
  productsFilterQuery,
  getProductByKeysSchema,
} from "./products-schema";
import { t } from "@/lib/trpc-server";

const productsRouter = t.router({
  createProduct: t.procedure
    .input(createProductSchema)
    .mutation(({ input }) => createProductsHandler({ input })),
  getLatestProducts: t.procedure.query(() => getLatestProductsHandler()),
  getFilteredProducts: t.procedure
    .input(productsFilterQuery)
    .query(({ input }) => getFilteredProductsHandler({ filterQuery: input })),
  getProductByKeys: t.procedure
    .input(getProductByKeysSchema)
    .query(({ input }) => getProductByKeysHandler({ productKeys: input })),
});

export default productsRouter;
