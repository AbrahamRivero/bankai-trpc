"use client";

import { trpc } from "@/lib/trpc";
import EventCard from "./event-card";

const LatestEvents = () => {
  const { data: events, isLoading } = trpc.getLatestEvents.useQuery();
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex items-center mb-8">
        <div className="w-1 h-6 bg-red-500 mr-2"></div>
        <h2 className="text-lg font-semibold">Eventos del mes</h2>
      </div>

      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {events?.map(
          ({ id, name, description, date, locations, event_img, slug }) => (
            <EventCard
              key={id}
              slug={slug}
              name={name}
              description={description}
              date={date}
              location={locations}
              event_img={event_img}
            />
          )
        )}
      </div>
    </section>
  );
};

export default LatestEvents;
