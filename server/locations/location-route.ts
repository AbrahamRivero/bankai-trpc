import { t } from "@/lib/trpc-server";
import {
  createLocationSchema,
  searchLocationByIdSchema,
} from "./location-schema";
import {
  createLocationHandler,
  getLocationByIdHandler,
  getLocationsHandler,
} from "./location-controller";

const locationsRouter = t.router({
  createLocation: t.procedure
    .input(createLocationSchema)
    .mutation(({ input }) => createLocationHandler({ input })),
  getLocations: t.procedure.query(() => getLocationsHandler()),
  getLocationsById: t.procedure
    .input(searchLocationByIdSchema)
    .query(({ input }) => getLocationByIdHandler({ id: input.id })),
});

export default locationsRouter;
