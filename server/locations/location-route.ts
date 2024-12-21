import { t } from "@/lib/trpc-server";
import { createLocationSchema } from "./location-schema";
import {
  createLocationHandler,
  getLocationsHandler,
} from "./location-controller";

const locationsRouter = t.router({
  createLocation: t.procedure
    .input(createLocationSchema)
    .mutation(({ input }) => createLocationHandler({ input })),
  getLocations: t.procedure.query(() => getLocationsHandler()),
});

export default locationsRouter;
