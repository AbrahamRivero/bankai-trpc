import { t } from "@/lib/trpc-server";
import { createEventSchema, eventFilterQuery } from "./events-schema";
import {
  createEventHandler,
  getEventByIdHandler,
  getEventsHandler,
} from "./events-controller";

const eventsRouter = t.router({
  createEvent: t.procedure
    .input(createEventSchema)
    .mutation(({ input }) => createEventHandler({ input })),
  getEvents: t.procedure.query(() => getEventsHandler()),
  getEventById: t.procedure
    .input(eventFilterQuery)
    .query(({ input }) => getEventByIdHandler({ eventFilterQuery: input })),
});

export default eventsRouter;
