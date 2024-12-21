import { t } from "@/lib/trpc-server";
import userRouter from "@/server/user-route";
import productsRouter from "@/server/products/products-route";
import categoriesRouter from "@/server/categories/categories-route";
import locationsRouter from "@/server/locations/location-route";

import { createServerSideHelpers } from "@trpc/react-query/server";
import SuperJSON from "superjson";

const healthCheckerRouter = t.router({
  healthchecker: t.procedure.query(({ ctx }) => {
    return {
      status: "success",
      message: "Welcome to trpc with Next.js 14 and React Query",
    };
  }),
});

export const appRouter = t.mergeRouters(
  userRouter,
  categoriesRouter,
  productsRouter,
  locationsRouter,
  healthCheckerRouter
);

export const createSSRHelper = () =>
  createServerSideHelpers({
    router: appRouter,
    transformer: SuperJSON,
    ctx: () => {},
  });

export type AppRouter = typeof appRouter;
