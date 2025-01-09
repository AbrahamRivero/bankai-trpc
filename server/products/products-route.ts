import {
  createProductsHandler,
  getFilteredProductsHandler,
  getLatestProductsHandler,
  getProductBySlugHandler,
} from "./products-controller";
import {
  createProductSchema,
  productsFilterQuery,
  productBySlugSchema,
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
  getProductBySlug: t.procedure
    .input(productBySlugSchema)
    .query(({ input }) => getProductBySlugHandler({ product_key: input })),
});

export default productsRouter;
